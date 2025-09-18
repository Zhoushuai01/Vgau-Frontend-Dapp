import web3Service from './web3.js'
import VGAUExchangeABI from '@/vgau-contracts_bsc-testnet_20250820/abi/VGAUExchange.sol/VGAUExchange.json'
import USDTABI from '@/vgau-contracts_bsc-testnet_20250820/abi/BEP20USDT.json'
import VGAUABI from '@/vgau-contracts_bsc-testnet_20250820/abi/VGAUToken.sol/VGAUToken.json'

// 合约地址配置
const CONTRACT_ADDRESSES = {
  VGAU_EXCHANGE: '0xbEe820f5ACA3a90f21af24a6573F69E3D3232609',
  USDT_TOKEN: '0xf6307065A593840680765889Fc16461bC7781231',
  VGAU_TOKEN: '0x75579C9FB3A30e7c3CaBB5c74E4A6c0DB1e2054d'
}

class ContractExchange {
  constructor() {
    this.isInitialized = false
  }

  // 初始化合约
  async init() {
    try {
      if (this.isInitialized) return true

      console.log('🔧 初始化合约交换服务...')

      // 初始化web3服务
      const web3Initialized = await web3Service.init()
      if (!web3Initialized) {
        throw new Error('Web3初始化失败')
      }

      // 检查钱包是否已连接，如果未连接则抛出错误而不是自动连接
      if (!web3Service.isConnected || !web3Service.currentAccount) {
        throw new Error('请先连接钱包后再进行兑换操作')
      }

      console.log('✅ 钱包已连接，继续初始化合约...')

      // 加载合约
      await web3Service.loadContract(CONTRACT_ADDRESSES.VGAU_EXCHANGE, VGAUExchangeABI.abi, 'VGAUExchange')
      await web3Service.loadContract(CONTRACT_ADDRESSES.USDT_TOKEN, USDTABI, 'USDTToken')
      await web3Service.loadContract(CONTRACT_ADDRESSES.VGAU_TOKEN, VGAUABI.abi, 'VGAUToken')

      this.isInitialized = true
      console.log('✅ 合约交换服务初始化成功')
      return true
    } catch (error) {
      console.error('❌ 合约交换服务初始化失败:', error)
      throw error
    }
  }

  // 获取USDT授权额度
  async getUSDTAllowance() {
    try {
      await this.init()
      
      const allowance = await web3Service.callContractMethod(
        'USDTToken',
        'allowance',
        web3Service.currentAccount,
        CONTRACT_ADDRESSES.VGAU_EXCHANGE
      )

      console.log('📊 USDT授权额度:', allowance)
      return allowance
    } catch (error) {
      console.error('❌ 获取USDT授权额度失败:', error)
      throw error
    }
  }

  // 获取VGAU授权额度
  async getVGAUAllowance() {
    try {
      await this.init()
      
      const allowance = await web3Service.callContractMethod(
        'VGAUToken',
        'allowance',
        web3Service.currentAccount,
        CONTRACT_ADDRESSES.VGAU_EXCHANGE
      )

      console.log('📊 VGAU授权额度:', allowance)
      return allowance
    } catch (error) {
      console.error('❌ 获取VGAU授权额度失败:', error)
      throw error
    }
  }

  // 授权USDT
  async approveUSDT(amount) {
    try {
      await this.init()

      console.log('🔐 授权USDT:', amount)
      
      const transaction = await web3Service.sendTransaction(
        'USDTToken',
        'approve',
        { from: web3Service.currentAccount },
        CONTRACT_ADDRESSES.VGAU_EXCHANGE,
        amount
      )

      console.log('✅ USDT授权成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ USDT授权失败:', error)
      throw error
    }
  }

  // 授权VGAU
  async approveVGAU(amount) {
    try {
      await this.init()

      console.log('🔐 授权VGAU:', amount)
      
      const transaction = await web3Service.sendTransaction(
        'VGAUToken',
        'approve',
        { from: web3Service.currentAccount },
        CONTRACT_ADDRESSES.VGAU_EXCHANGE,
        amount
      )

      console.log('✅ VGAU授权成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ VGAU授权失败:', error)
      throw error
    }
  }

  // USDT兑换VGAU
  async exchangeUsdtToVgau(vgauAmount) {
    try {
      await this.init()

      console.log('💱 开始USDT兑换VGAU...')
      console.log('目标VGAU数量:', vgauAmount)

      // VGAU精度为0，直接使用整数数量
      const vgauAmountUnits = parseInt(vgauAmount.toString(), 10).toString()
      console.log('VGAU数量(单位):', vgauAmountUnits)

      // 1. 计算所需USDT
      console.log('🔍 计算所需USDT...')
      const requiredUSDT = await web3Service.callContractMethod(
        'VGAUExchange',
        'getRequiredUSDTByVGAU',
        vgauAmountUnits,
        await this.getLatestGoldPrice()
      )

      console.log('所需USDT(wei):', requiredUSDT)

      // 2. KYC阈值与累计兑换额度校验（前端提前拦截）
      try {
        const [kycThreshold, userTotalUsdt] = await Promise.all([
          this.getKycThreshold(),
          this.getUserTotalExchangeUsdtAmount()
        ])
        // 计划本次兑换将增加的USDT消耗：requiredUSDT
        const willTotal = BigInt(userTotalUsdt.toString()) + BigInt(requiredUSDT.toString())
        if (willTotal > BigInt(kycThreshold.toString())) {
          const kycError = new Error('请先完成钱包绑定和KYC认证后再进行大额兑换')
          kycError.errorType = 'KYC_REQUIRED'
          throw kycError
        }
      } catch (e) {
        // 若是KYC_REQUIRED则抛给上层；其他读取失败不阻塞后续授权与交易
        if (e && e.errorType === 'KYC_REQUIRED') throw e
        console.warn('KYC前置校验失败或未通过，继续由合约侧校验:', e)
      }

      // 3. 检查USDT授权额度
      console.log('🔍 检查USDT授权额度...')
      const allowance = await this.getUSDTAllowance()
      console.log('当前授权额度:', allowance)
      
      if (allowance === '0') {
        console.log('✅ 授权额度为0，直接授权所需金额...')
        await this.approveUSDT(requiredUSDT)
        
        // 等待授权确认
        await new Promise(resolve => setTimeout(resolve, 3000))
      } else {
        console.log('🔄 授权额度不为0，需要先清零...')
        await this.approveUSDT('0')
        
        // 等待清零确认
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        console.log('🔐 重新授权所需USDT...')
        await this.approveUSDT(requiredUSDT)
        
        // 等待授权确认
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      // 4. 执行兑换
      console.log('💱 执行兑换交易...')
      const transaction = await web3Service.sendTransaction(
        'VGAUExchange',
        'exchangeUsdtToExactVgau',
        { from: web3Service.currentAccount },
        vgauAmountUnits
      )

      console.log('✅ USDT兑换VGAU成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ USDT兑换VGAU失败:', error)
      
      // 处理KYC相关错误
      if (error.message && error.message.includes('wallet address must be bound and KYC')) {
        const kycError = new Error('请先完成钱包绑定和KYC认证后再进行大额兑换')
        kycError.errorType = 'KYC_REQUIRED'
        throw kycError
      }
      
      throw error
    }
  }

  // VGAU赎回USDT
  async exchangeVgauToUsdt(vgauAmount) {
    try {
      await this.init()

      console.log('💱 开始VGAU赎回USDT...')
      console.log('VGAU数量:', vgauAmount)

      // VGAU精度为0，直接使用整数数量
      const vgauAmountUnits = parseInt(vgauAmount.toString(), 10).toString()
      console.log('VGAU数量(单位):', vgauAmountUnits)

      // 1. 检查VGAU授权额度
      console.log('🔍 检查VGAU授权额度...')
      const allowance = await this.getVGAUAllowance()
      console.log('当前授权额度:', allowance)
      
      if (allowance === '0') {
        console.log('✅ 授权额度为0，直接授权所需金额...')
        await this.approveVGAU(vgauAmountUnits)
        
        // 等待授权确认
        await new Promise(resolve => setTimeout(resolve, 3000))
      } else {
        console.log('🔄 授权额度不为0，需要先清零...')
        await this.approveVGAU('0')
        
        // 等待清零确认
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        console.log('🔐 重新授权VGAU...')
        await this.approveVGAU(vgauAmountUnits)
        
        // 等待授权确认
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      // 2. 执行赎回
      console.log('💱 执行赎回交易...')
      const transaction = await web3Service.sendTransaction(
        'VGAUExchange',
        'exchangeVgauToUsdt',
        { from: web3Service.currentAccount },
        vgauAmountUnits
      )

      console.log('✅ VGAU赎回USDT成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ VGAU赎回USDT失败:', error)
      
      // 处理KYC相关错误
      if (error.message && error.message.includes('wallet address must be bound and KYC')) {
        const kycError = new Error('请先完成钱包绑定和KYC认证后再进行大额赎回')
        kycError.errorType = 'KYC_REQUIRED'
        throw kycError
      }
      
      throw error
    }
  }

  // 获取最新黄金价格
  async getLatestGoldPrice() {
    try {
      await this.init()
      
      const priceData = await web3Service.callContractMethod(
        'VGAUExchange',
        'getLatestValidXAUPrice'
      )

      return priceData.price
    } catch (error) {
      console.error('❌ 获取黄金价格失败:', error)
      throw error
    }
  }

  // 计算所需USDT
  async getRequiredUSDT(vgauAmount) {
    try {
      await this.init()

      // VGAU精度为0，VGAU数量按整数传入
      const vgauAmountUnits = parseInt(vgauAmount.toString(), 10).toString()
      const goldPrice = await this.getLatestGoldPrice()
      
      const requiredUSDT = await web3Service.callContractMethod(
        'VGAUExchange',
        'getRequiredUSDTByVGAU',
        vgauAmountUnits,
        goldPrice
      )

      // 获取USDT小数位数
      const usdtDecimals = await web3Service.callContractMethod(
        'VGAUExchange',
        'usdtDecimals'
      )
      
      // 转换为可读格式
      const formattedAmount = parseFloat(requiredUSDT) / Math.pow(10, parseInt(usdtDecimals))
      
      return {
        raw: requiredUSDT,
        formatted: formattedAmount
      }
    } catch (error) {
      console.error('❌ 计算所需USDT失败:', error)
      throw error
    }
  }

  // 读取KYC阈值（USDT，以最小单位返回）
  async getKycThreshold() {
    try {
      await this.init()
      const threshold = await web3Service.callContractMethod(
        'VGAUExchange',
        'kycThreshold'
      )
      return threshold
    } catch (error) {
      console.error('❌ 读取KYC阈值失败:', error)
      throw error
    }
  }

  // 读取用户累计兑换USDT金额（以最小单位返回）
  async getUserTotalExchangeUsdtAmount(address = null) {
    try {
      await this.init()
      const userAddress = address || web3Service.currentAccount
      if (!userAddress) throw new Error('没有可用的账户地址')
      const total = await web3Service.callContractMethod(
        'VGAUExchange',
        'userTotalExchangeUsdtAmount',
        userAddress
      )
      return total
    } catch (error) {
      console.error('❌ 读取用户累计兑换USDT失败:', error)
      throw error
    }
  }

  // 获取USDT小数位数
  async getUSDTDecimals() {
    try {
      await this.init()
      const decimals = await web3Service.callContractMethod(
        'VGAUExchange',
        'usdtDecimals'
      )
      return decimals
    } catch (error) {
      console.error('❌ 获取USDT小数位数失败:', error)
      throw error
    }
  }
}

// 创建单例实例
const contractExchange = new ContractExchange()

export default contractExchange
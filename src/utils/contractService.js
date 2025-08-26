import web3Service from './web3.js'
import VGAUPlatformRechargeABI from '@/vgau-contracts_bsc-testnet_20250820/abi/VGAUPlatformRecharge.sol/VGAUPlatformRecharge.json'
import USDTABI from '@/vgau-contracts_bsc-testnet_20250820/abi/BEP20USDT.json'
import VGAUABI from '@/vgau-contracts_bsc-testnet_20250820/abi/VGAUToken.sol/VGAUToken.json'

// 合约地址配置
const CONTRACT_ADDRESSES = {
  VGAU_PLATFORM_RECHARGE: '0xFb015C1e853a66a7713e7C750C2fc4451405601b',
  USDT_TOKEN: '0xf6307065A593840680765889Fc16461bC7781231',
  VGAU_TOKEN: '0x75579C9FB3A30e7c3CaBB5c74E4A6c0DB1e2054d'
}

class ContractService {
  constructor() {
    this.isInitialized = false
  }

  // 初始化合约服务
  async init() {
    try {
      if (this.isInitialized) return true

      // 初始化web3服务
      const web3Initialized = await web3Service.init()
      if (!web3Initialized) {
        throw new Error('Web3初始化失败')
      }

      // 连接钱包
      const walletConnected = await web3Service.connectWallet()
      if (!walletConnected.success) {
        throw new Error('钱包连接失败')
      }

      // 加载充值合约
      await web3Service.loadContract(
        CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE,
        VGAUPlatformRechargeABI.abi,
        'VGAUPlatformRecharge'
      )

      // 加载USDT代币合约
      await web3Service.loadContract(
        CONTRACT_ADDRESSES.USDT_TOKEN,
        USDTABI,
        'USDTToken'
      )

      // 加载VGAU代币合约
      await web3Service.loadContract(
        CONTRACT_ADDRESSES.VGAU_TOKEN,
        VGAUABI.abi,
        'VGAUToken'
      )

      this.isInitialized = true
      console.log('✅ 合约服务初始化成功')
      return true
    } catch (error) {
      console.error('❌ 合约服务初始化失败:', error)
      throw error
    }
  }

  // 获取USDT余额
  async getUSDTBalance(address = null) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      const targetAddress = address || web3Service.currentAccount
      const balance = await web3Service.callContractMethod(
        'USDTToken',
        'balanceOf',
        targetAddress
      )

      // USDT有18位小数
      const balanceInUSDT = balance / Math.pow(10, 18)
      return {
        raw: balance,
        formatted: balanceInUSDT.toFixed(2)
      }
    } catch (error) {
      console.error('获取USDT余额失败:', error)
      throw error
    }
  }

  // 获取VGAU余额
  async getVGAUBalance(address = null) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      const targetAddress = address || web3Service.currentAccount
      const balance = await web3Service.callContractMethod(
        'VGAUToken',
        'balanceOf',
        targetAddress
      )

      // VGAU有18位小数
      const balanceInVGAU = balance / Math.pow(10, 18)
      return {
        raw: balance,
        formatted: balanceInVGAU.toFixed(2)
      }
    } catch (error) {
      console.error('获取VGAU余额失败:', error)
      throw error
    }
  }

  // 检查USDT授权额度
  async getUSDTAllowance(owner = null, spender = null) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      const ownerAddress = owner || web3Service.currentAccount
      const spenderAddress = spender || CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE

      const allowance = await web3Service.callContractMethod(
        'USDTToken',
        'allowance',
        ownerAddress,
        spenderAddress
      )

      return {
        raw: allowance,
        formatted: allowance / Math.pow(10, 18)
      }
    } catch (error) {
      console.error('获取USDT授权额度失败:', error)
      throw error
    }
  }

  // 检查VGAU授权额度
  async getVGAUAllowance(owner = null, spender = null) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      const ownerAddress = owner || web3Service.currentAccount
      const spenderAddress = spender || CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE

      const allowance = await web3Service.callContractMethod(
        'VGAUToken',
        'allowance',
        ownerAddress,
        spenderAddress
      )

      return {
        raw: allowance,
        formatted: allowance / Math.pow(10, 18)
      }
    } catch (error) {
      console.error('获取VGAU授权额度失败:', error)
      throw error
    }
  }

  // 授权USDT给充值合约
  async approveUSDT(amount) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      // 将金额转换为wei单位（USDT有18位小数）
      const amountInWei = web3Service.web3.utils.toWei(amount.toString(), 'ether').toString()

      console.log('🔐 开始授权USDT...')
      console.log('授权金额:', amount, 'USDT')
      console.log('授权金额(wei):', amountInWei)

      const transaction = await web3Service.sendTransaction(
        'USDTToken',
        'approve',
        {
          from: web3Service.currentAccount
        },
        CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE,
        amountInWei
      )

      console.log('✅ USDT授权成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ USDT授权失败:', error)
      throw error
    }
  }

  // 授权VGAU给充值合约
  async approveVGAU(amount) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      // 将金额转换为wei单位（VGAU有18位小数）
      const amountInWei = web3Service.web3.utils.toWei(amount.toString(), 'ether').toString()

      console.log('🔐 开始授权VGAU...')
      console.log('授权金额:', amount, 'VGAU')
      console.log('授权金额(wei):', amountInWei)

      const transaction = await web3Service.sendTransaction(
        'VGAUToken',
        'approve',
        {
          from: web3Service.currentAccount
        },
        CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE,
        amountInWei
      )

      console.log('✅ VGAU授权成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ VGAU授权失败:', error)
      throw error
    }
  }

  // 重置USDT授权额度为0
  async resetUSDTAllowance() {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      console.log('🔄 重置USDT授权额度为0...')

      const transaction = await web3Service.sendTransaction(
        'USDTToken',
        'approve',
        {
          from: web3Service.currentAccount
        },
        CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE,
        0
      )

      console.log('✅ USDT授权额度重置成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ USDT授权额度重置失败:', error)
      throw error
    }
  }

  // 重置VGAU授权额度为0
  async resetVGAUAllowance() {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      console.log('🔄 重置VGAU授权额度为0...')

      const transaction = await web3Service.sendTransaction(
        'VGAUToken',
        'approve',
        {
          from: web3Service.currentAccount
        },
        CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE,
        0
      )

      console.log('✅ VGAU授权额度重置成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ VGAU授权额度重置失败:', error)
      throw error
    }
  }

  // 调用USDT充值合约
  async rechargeUSDT(amount) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      // 将金额转换为wei单位（USDT有18位小数）
      const amountInWei = web3Service.web3.utils.toWei(amount.toString(), 'ether').toString()

      console.log('💰 开始USDT充值...')
      console.log('充值金额:', amount, 'USDT')
      console.log('充值金额(wei):', amountInWei)

      const transaction = await web3Service.sendTransaction(
        'VGAUPlatformRecharge',
        'rechargeUSDT',
        {
          from: web3Service.currentAccount
        },
        amountInWei
      )

      console.log('✅ USDT充值成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ USDT充值失败:', error)
      throw error
    }
  }

  // 调用VGAU充值合约
  async rechargeVGAU(amount) {
    try {
      if (!this.isInitialized) {
        await this.init()
      }

      // 将金额转换为wei单位（VGAU有18位小数）
      const amountInWei = web3Service.web3.utils.toWei(amount.toString(), 'ether').toString()

      console.log('💰 开始VGAU充值...')
      console.log('充值金额:', amount, 'VGAU')
      console.log('充值金额(wei):', amountInWei)

      const transaction = await web3Service.sendTransaction(
        'VGAUPlatformRecharge',
        'rechargeVGAU',
        {
          from: web3Service.currentAccount
        },
        amountInWei
      )

      console.log('✅ VGAU充值成功:', transaction.transactionHash)
      return transaction
    } catch (error) {
      console.error('❌ VGAU充值失败:', error)
      throw error
    }
  }

  // 完整的USDT充值流程（授权+充值）
  async completeUSDTRecharge(amount) {
    try {
      console.log('🚀 开始完整USDT充值流程...')

      // 1. 检查授权额度
      const allowance = await this.getUSDTAllowance()
      const allowanceFormatted = parseFloat(allowance.formatted)
      const amountFormatted = parseFloat(amount)

      console.log('📊 授权额度检查:', {
        当前授权额度: allowanceFormatted,
        需要授权额度: amountFormatted,
        原始授权额度: allowance.raw
      })

      // 2. 智能授权管理
      if (allowanceFormatted === amountFormatted) {
        console.log('✅ USDT授权额度已足够，无需重复授权')
      } else if (allowanceFormatted > 0) {
        console.log('🔄 重置USDT授权额度为0')
        await this.resetUSDTAllowance()
        
        // 等待重置交易确认
        await this.waitForTransaction()
        
        console.log('🔄 重新授权USDT')
        await this.approveUSDT(amount)
        
        // 等待授权交易确认
        await this.waitForTransaction()
      } else {
        console.log('🆕 首次授权USDT')
        await this.approveUSDT(amount)
        
        // 等待授权交易确认
        await this.waitForTransaction()
      }

      // 3. 执行充值
      const rechargeResult = await this.rechargeUSDT(amount)
      
      console.log('🎉 USDT充值流程完成!')
      return rechargeResult
    } catch (error) {
      console.error('❌ USDT充值流程失败:', error)
      throw error
    }
  }

  // 完整的VGAU充值流程（授权+充值）
  async completeVGAURecharge(amount) {
    try {
      console.log('🚀 开始完整VGAU充值流程...')

      // 1. 检查授权额度
      const allowance = await this.getVGAUAllowance()
      const allowanceFormatted = parseFloat(allowance.formatted)
      const amountFormatted = parseFloat(amount)

      console.log('📊 授权额度检查:', {
        当前授权额度: allowanceFormatted,
        需要授权额度: amountFormatted,
        原始授权额度: allowance.raw
      })

      // 2. 智能授权管理
      if (allowanceFormatted === amountFormatted) {
        console.log('✅ VGAU授权额度已足够，无需重复授权')
      } else if (allowanceFormatted > 0) {
        console.log('🔄 重置VGAU授权额度为0')
        await this.resetVGAUAllowance()
        
        // 等待重置交易确认
        await this.waitForTransaction()
        
        console.log('🔄 重新授权VGAU')
        await this.approveVGAU(amount)
        
        // 等待授权交易确认
        await this.waitForTransaction()
      } else {
        console.log('🆕 首次授权VGAU')
        await this.approveVGAU(amount)
        
        // 等待授权交易确认
        await this.waitForTransaction()
      }

      // 3. 执行充值
      const rechargeResult = await this.rechargeVGAU(amount)
      
      console.log('🎉 VGAU充值流程完成!')
      return rechargeResult
    } catch (error) {
      console.error('❌ VGAU充值流程失败:', error)
      throw error
    }
  }

  // 等待交易确认
  async waitForTransaction() {
    return new Promise((resolve) => {
      setTimeout(resolve, 3000) // 等待3秒
    })
  }

  // 获取网络信息
  async getNetworkInfo() {
    try {
      return await web3Service.getNetworkInfo()
    } catch (error) {
      console.error('获取网络信息失败:', error)
      throw error
    }
  }

  // 检查网络是否支持
  async checkNetwork() {
    try {
      return await web3Service.checkNetwork([56, 97]) // BSC主网和测试网
    } catch (error) {
      console.error('检查网络失败:', error)
      throw error
    }
  }
}

// 创建单例实例
const contractService = new ContractService()

export default contractService 
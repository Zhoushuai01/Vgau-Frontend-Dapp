import web3Service from './web3.js'
import walletBindingService from './walletBindingService.js'
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
    this.setupEventListeners()
  }

  // 设置事件监听器
  setupEventListeners() {
    // 监听钱包账户变化事件
    window.addEventListener('walletAccountChanged', this.handleWalletChange.bind(this))
  }

  // 处理钱包变化
  async handleWalletChange(event) {
    console.log('检测到钱包变化，重新初始化合约:', event.detail)
    this.isInitialized = false
    try {
      await this.init()
      console.log('✅ 合约重新初始化成功')
      
      // 触发钱包绑定检测事件 - 强制从后端获取最新状态
      this.triggerWalletBindingCheck(event.detail)
      
      // 强制清除任何可能的本地缓存状态
      this.clearLocalCache()
    } catch (error) {
      console.error('❌ 合约重新初始化失败:', error)
    }
  }

  // 清除本地缓存状态
  clearLocalCache() {
    console.log('🧹 清除本地缓存状态...')
    
    // 清除可能存储的用户状态
    if (typeof window !== 'undefined') {
      // 清除 localStorage 中的用户相关数据
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && (key.includes('user') || key.includes('auth') || key.includes('login'))) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => {
        localStorage.removeItem(key)
        console.log('🗑️ 清除缓存:', key)
      })
      
      // 清除 sessionStorage 中的用户相关数据
      const sessionKeysToRemove = []
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i)
        if (key && (key.includes('user') || key.includes('auth') || key.includes('login'))) {
          sessionKeysToRemove.push(key)
        }
      }
      
      sessionKeysToRemove.forEach(key => {
        sessionStorage.removeItem(key)
        console.log('🗑️ 清除会话缓存:', key)
      })
    }
    
    console.log('✅ 本地缓存状态清除完成')
  }

  // 触发钱包绑定检测
  triggerWalletBindingCheck(walletInfo) {
    const bindingEvent = new CustomEvent('walletBindingCheck', {
      detail: {
        account: walletInfo.account,
        chainId: walletInfo.chainId,
        timestamp: Date.now(),
        source: 'contractService'
      }
    })
    window.dispatchEvent(bindingEvent)
    console.log('合约服务触发钱包绑定检测事件')
  }

  // 初始化合约服务
  async init() {
    try {
      if (this.isInitialized) return true

      console.log('开始初始化合约服务...')

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

      // 初始化钱包绑定检测服务
      await walletBindingService.init()

      this.isInitialized = true
      console.log('✅ 合约服务初始化成功')
      return true
    } catch (error) {
      console.error('❌ 合约服务初始化失败:', error)
      throw error
    }
  }

  // 手动重新初始化合约服务
  async reinit() {
    console.log('手动重新初始化合约服务...')
    this.isInitialized = false
    return await this.init()
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

      console.log('🔐 开始授权VGAU...')
      console.log('授权金额:', amount, 'VGAU')

      const transaction = await web3Service.sendTransaction(
        'VGAUToken',
        'approve',
        {
          from: web3Service.currentAccount
        },
        CONTRACT_ADDRESSES.VGAU_PLATFORM_RECHARGE,
        amount.toString()
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

      // 先检查网络状态
      console.log('🔍 开始检查网络状态...')
      const networkStatus = await this.checkNetwork()
      console.log('📋 网络状态检查结果:', networkStatus)
      
      if (!networkStatus.isSupported) {
        console.error('❌ 网络不支持:', {
          currentChainId: networkStatus.chainId,
          supportedChainIds: networkStatus.supportedChainIds,
          isSupported: networkStatus.isSupported
        })
        throw new Error(`当前网络不支持，请切换到BSC测试网。当前链ID: ${networkStatus.chainId}`)
      }
      
      console.log('✅ 网络状态检查通过')

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
      
      // 如果是RPC错误，提供更友好的错误信息
      if (error.message && error.message.includes('RPC endpoint returned HTTP client error')) {
        const enhancedError = new Error('区块链网络连接失败，请稍后重试')
        enhancedError.originalError = error
        enhancedError.errorType = 'RPC_ERROR'
        enhancedError.suggestions = [
          '检查网络连接是否正常',
          '尝试切换网络（4G/5G/WiFi）',
          '检查VPN设置',
          '稍后重试（可能是网络拥堵）'
        ]
        throw enhancedError
      }
      
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

      console.log('💰 开始VGAU充值...')
      console.log('充值金额:', amount, 'VGAU')

      const transaction = await web3Service.sendTransaction(
        'VGAUPlatformRecharge',
        'rechargeVGAU',
        {
          from: web3Service.currentAccount
        },
        amount.toString()
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
      console.log('📱 设备信息:', {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      })

      // 1. 检查授权额度
      console.log('🔍 步骤1: 检查USDT授权额度...')
      const allowance = await this.getUSDTAllowance()
      const allowanceFormatted = parseFloat(allowance.formatted)
      const amountFormatted = parseFloat(amount)

      console.log('📊 授权额度检查:', {
        '当前授权额度': allowanceFormatted,
        '需要授权额度': amountFormatted,
        '原始授权额度': allowance.raw,
        '是否需要授权': allowanceFormatted !== amountFormatted
      })

      // 2. 智能授权管理
      if (allowanceFormatted === amountFormatted) {
        console.log('✅ USDT授权额度已足够，无需重复授权')
      } else if (allowanceFormatted > 0) {
        console.log('🔄 重置USDT授权额度为0...')
        console.log('⏳ 等待重置交易确认...')
        await this.resetUSDTAllowance()
        
        // 等待重置交易确认
        await this.waitForTransaction()
        console.log('✅ 重置交易确认完成')
        
        console.log('🔄 重新授权USDT...')
        await this.approveUSDT(amount)
        
        // 等待授权交易确认
        console.log('⏳ 等待授权交易确认...')
        await this.waitForTransaction()
        console.log('✅ 授权交易确认完成')
      } else {
        console.log('🆕 首次授权USDT...')
        await this.approveUSDT(amount)
        
        // 等待授权交易确认
        console.log('⏳ 等待授权交易确认...')
        await this.waitForTransaction()
        console.log('✅ 授权交易确认完成')
      }

      // 3. 执行充值
      console.log('🔍 步骤3: 执行USDT充值...')
      const rechargeResult = await this.rechargeUSDT(amount)
      
      console.log('🎉 USDT充值流程完成!')
      return rechargeResult
    } catch (error) {
      console.error('❌ USDT充值流程失败:', {
        error: error.message,
        stack: error.stack,
        errorType: error.errorType,
        suggestions: error.suggestions,
        contractName: error.contractName,
        methodName: error.methodName,
        timestamp: error.timestamp
      })
      
      // 如果是增强的错误，直接抛出
      if (error.errorType) {
        throw error
      }
      
      // 否则创建增强的错误
      const enhancedError = new Error(`USDT充值失败: ${error.message}`)
      enhancedError.originalError = error
      enhancedError.errorType = 'RECHARGE_ERROR'
      enhancedError.suggestions = [
        '检查网络连接是否正常',
        '确保钱包已连接并解锁',
        '检查账户余额是否充足',
        '尝试减少充值金额',
        '联系技术支持'
      ]
      throw enhancedError
    }
  }

  // 完整的VGAU充值流程（授权+充值）
  async completeVGAURecharge(amount) {
    try {
      console.log('🚀 开始完整VGAU充值流程...')
      console.log('📱 设备信息:', {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      })

      // 1. 检查授权额度
      console.log('🔍 步骤1: 检查VGAU授权额度...')
      const allowance = await this.getVGAUAllowance()
      const allowanceFormatted = parseFloat(allowance.formatted)
      const amountFormatted = parseFloat(amount)

      console.log('📊 授权额度检查:', {
        '当前授权额度': allowanceFormatted,
        '需要授权额度': amountFormatted,
        '原始授权额度': allowance.raw,
        '是否需要授权': allowanceFormatted !== amountFormatted
      })

      // 2. 智能授权管理
      if (allowanceFormatted === amountFormatted) {
        console.log('✅ VGAU授权额度已足够，无需重复授权')
      } else if (allowanceFormatted > 0) {
        console.log('🔄 重置VGAU授权额度为0...')
        console.log('⏳ 等待重置交易确认...')
        await this.resetVGAUAllowance()
        
        // 等待重置交易确认
        await this.waitForTransaction()
        console.log('✅ 重置交易确认完成')
        
        console.log('🔄 重新授权VGAU...')
        await this.approveVGAU(amount)
        
        // 等待授权交易确认
        console.log('⏳ 等待授权交易确认...')
        await this.waitForTransaction()
        console.log('✅ 授权交易确认完成')
      } else {
        console.log('🆕 首次授权VGAU...')
        await this.approveVGAU(amount)
        
        // 等待授权交易确认
        console.log('⏳ 等待授权交易确认...')
        await this.waitForTransaction()
        console.log('✅ 授权交易确认完成')
      }

      // 3. 执行充值
      console.log('🔍 步骤3: 执行VGAU充值...')
      const rechargeResult = await this.rechargeVGAU(amount)
      
      console.log('🎉 VGAU充值流程完成!')
      return rechargeResult
    } catch (error) {
      console.error('❌ VGAU充值流程失败:', {
        error: error.message,
        stack: error.stack,
        errorType: error.errorType,
        suggestions: error.suggestions,
        contractName: error.contractName,
        methodName: error.methodName,
        timestamp: error.timestamp
      })
      
      // 如果是增强的错误，直接抛出
      if (error.errorType) {
        throw error
      }
      
      // 否则创建增强的错误
      const enhancedError = new Error(`VGAU充值失败: ${error.message}`)
      enhancedError.originalError = error
      enhancedError.errorType = 'RECHARGE_ERROR'
      enhancedError.suggestions = [
        '检查网络连接是否正常',
        '确保钱包已连接并解锁',
        '检查账户余额是否充足',
        '尝试减少充值金额',
        '联系技术支持'
      ]
      throw enhancedError
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
      console.log('🔍 ContractService.checkNetwork 开始...')
      console.log('📋 调用 web3Service.checkNetwork([97])')
      
      const result = await web3Service.checkNetwork([97]) // BSC测试网
      
      console.log('📋 web3Service.checkNetwork 返回结果:', result)
      console.log('📋 结果类型检查:', {
        chainId: result.chainId,
        chainIdType: typeof result.chainId,
        isSupported: result.isSupported,
        isSupportedType: typeof result.isSupported,
        supportedChainIds: result.supportedChainIds
      })
      
      return result
    } catch (error) {
      console.error('❌ ContractService.checkNetwork 失败:', error)
      throw error
    }
  }
}

// 创建单例实例
const contractService = new ContractService()

export default contractService 
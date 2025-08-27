import Web3 from 'web3'

class Web3Service {
  constructor() {
    this.web3 = null
    this.provider = null
    this.accounts = []
    this.currentAccount = null
    this.contracts = {}
    this.isConnected = false
  }

  // 初始化Web3
  async init() {
    try {
      // 检查是否安装了MetaMask
      if (typeof window.ethereum !== 'undefined') {
        this.provider = window.ethereum
        this.web3 = new Web3(this.provider)
        
        // 监听账户变化
        this.provider.on('accountsChanged', (accounts) => {
          this.handleAccountsChanged(accounts)
        })
        
        // 监听链变化
        this.provider.on('chainChanged', (chainId) => {
          this.handleChainChanged(chainId)
        })
        
        console.log('Web3初始化成功')
        return true
      } else {
        console.error('请安装MetaMask钱包')
        return false
      }
    } catch (error) {
      console.error('Web3初始化失败:', error)
      return false
    }
  }

  // 连接钱包
  async connectWallet() {
    try {
      if (!this.web3) {
        const initialized = await this.init()
        if (!initialized) {
          throw new Error('Web3未初始化')
        }
      }

      // 请求用户授权连接钱包
      const accounts = await this.provider.request({
        method: 'eth_requestAccounts'
      })

      this.handleAccountsChanged(accounts)
      this.isConnected = true
      
      console.log('钱包连接成功:', this.currentAccount)
      return {
        success: true,
        account: this.currentAccount,
        accounts: this.accounts
      }
    } catch (error) {
      console.error('连接钱包失败:', error)
      this.isConnected = false
      return {
        success: false,
        error: error.message
      }
    }
  }

  // 处理账户变化
  async handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // 用户断开了钱包连接
      this.accounts = []
      this.currentAccount = null
      this.isConnected = false
      console.log('钱包已断开连接')
      
      // 清除本地缓存状态
      this.clearLocalCache()
    } else if (accounts[0] !== this.currentAccount) {
      // 用户切换了账户
      this.accounts = accounts
      this.currentAccount = accounts[0]
      this.isConnected = true
      console.log('当前账户:', this.currentAccount)
      
      // 账户变化后，触发合约重新初始化事件
      await this.triggerContractReinit()
      
      // 清除本地缓存状态
      this.clearLocalCache()
    }
  }

  // 清除本地缓存状态
  clearLocalCache() {
    console.log('🧹 Web3服务清除本地缓存状态...')
    
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
    
    console.log('✅ Web3服务本地缓存状态清除完成')
  }

  // 处理链变化
  handleChainChanged(chainId) {
    console.log('链ID变化:', chainId)
    // 链变化后，触发合约重新初始化事件
    this.triggerContractReinit()
    // 可以在这里添加链切换的逻辑
    window.location.reload()
  }

  // 触发合约重新初始化事件
  async triggerContractReinit() {
    // 创建自定义事件，通知其他组件需要重新初始化合约
    const event = new CustomEvent('walletAccountChanged', {
      detail: {
        account: this.currentAccount,
        chainId: await this.getCurrentChainId()
      }
    })
    window.dispatchEvent(event)
    console.log('触发合约重新初始化事件')

    // 同时触发钱包绑定检测事件
    const bindingEvent = new CustomEvent('walletBindingCheck', {
      detail: {
        account: this.currentAccount,
        chainId: await this.getCurrentChainId(),
        timestamp: Date.now()
      }
    })
    window.dispatchEvent(bindingEvent)
    console.log('触发钱包绑定检测事件')
  }

  // 获取当前链ID
  async getCurrentChainId() {
    try {
      if (this.web3 && this.web3.eth) {
        return await this.web3.eth.net.getId()
      }
      return null
    } catch (error) {
      console.error('获取链ID失败:', error)
      return null
    }
  }

  // 获取当前网络信息
  async getNetworkInfo() {
    try {
      if (!this.web3) {
        throw new Error('Web3未初始化')
      }

      const chainId = await this.web3.eth.getChainId()
      const networkId = await this.web3.eth.net.getId()
      
      return {
        chainId: chainId,
        networkId: networkId,
        isConnected: this.isConnected,
        currentAccount: this.currentAccount
      }
    } catch (error) {
      console.error('获取网络信息失败:', error)
      return null
    }
  }

  // 获取账户余额
  async getBalance(address = null) {
    try {
      if (!this.web3) {
        throw new Error('Web3未初始化')
      }

      const targetAddress = address || this.currentAccount
      if (!targetAddress) {
        throw new Error('没有可用的账户地址')
      }

      const balance = await this.web3.eth.getBalance(targetAddress)
      const balanceInEth = this.web3.utils.fromWei(balance, 'ether')
      
      return {
        wei: balance,
        eth: balanceInEth
      }
    } catch (error) {
      console.error('获取余额失败:', error)
      return null
    }
  }

  // 加载合约
  async loadContract(contractAddress, abi, contractName = 'Contract') {
    try {
      if (!this.web3) {
        throw new Error('Web3未初始化')
      }

      if (!contractAddress || !abi) {
        throw new Error('合约地址和ABI不能为空')
      }

      const contract = new this.web3.eth.Contract(abi, contractAddress)
      this.contracts[contractName] = contract
      
      console.log(`合约 ${contractName} 加载成功`)
      return contract
    } catch (error) {
      console.error(`加载合约 ${contractName} 失败:`, error)
      return null
    }
  }

  // 调用合约方法（只读）
  async callContractMethod(contractName, methodName, ...args) {
    try {
      const contract = this.contracts[contractName]
      if (!contract) {
        throw new Error(`合约 ${contractName} 未加载`)
      }
  
      const method = contract.methods[methodName]
      if (!method) {
        throw new Error(`方法 ${methodName} 不存在`)
      }
  
      const result = await method(...args).call()
      
      // 处理 BigInt 类型的返回值
      // 在callContractMethod中添加BigInt处理
      const processResult = (obj) => {
        if (typeof obj === 'bigint') {
          return obj.toString()
        }
        if (Array.isArray(obj)) {
          return obj.map(processResult)
        }
        if (obj && typeof obj === 'object') {
          const processed = {}
          for (const [key, value] of Object.entries(obj)) {
            processed[key] = processResult(value)
          }
          return processed
        }
        return obj
      }
      
      return processResult(result)
    } catch (error) {
      console.error(`调用合约方法失败:`, error)
      throw error
    }
  }

  // 发送交易（需要签名）
  async sendTransaction(contractName, methodName, options = {}, ...args) {
    try {
      console.log('🚀 开始发送交易...', {
        contractName,
        methodName,
        options,
        args,
        currentAccount: this.currentAccount,
        isConnected: this.isConnected
      })

      if (!this.isConnected || !this.currentAccount) {
        throw new Error('请先连接钱包')
      }

      const contract = this.contracts[contractName]
      if (!contract) {
        throw new Error(`合约 ${contractName} 未加载`)
      }

      const method = contract.methods[methodName]
      if (!method) {
        throw new Error(`方法 ${methodName} 不存在`)
      }

      console.log('📋 合约方法信息:', {
        methodExists: !!method,
        methodName,
        contractAddress: contract._address,
        contractMethods: Object.keys(contract.methods)
      })

      // 检查网络状态
      const networkInfo = await this.checkNetwork()
      console.log('🌐 网络状态检查:', networkInfo)

      if (!networkInfo.isSupported) {
        throw new Error(`当前网络不支持，请切换到BSC网络。当前链ID: ${networkInfo.chainId}`)
      }

      console.log('⛽ 开始估算Gas费用...')
      const gasEstimate = await method(...args).estimateGas({
        from: this.currentAccount,
        ...options
      })

      // 处理BigInt类型的gas估算，转换为字符串后计算
      const gasEstimateNumber = typeof gasEstimate === 'bigint' ? Number(gasEstimate) : gasEstimate
      const gasLimit = Math.floor(gasEstimateNumber * 1.2) // 增加20%的gas限制

      console.log('⛽ Gas费用估算:', {
        原始估算: gasEstimate,
        处理后估算: gasEstimateNumber,
        最终Gas限制: gasLimit,
        增加比例: '20%'
      })

      // 检查账户余额
      const balance = await this.web3.eth.getBalance(this.currentAccount)
      const balanceInEth = this.web3.utils.fromWei(balance, 'ether')
      console.log('💰 账户余额检查:', {
        '余额(wei)': balance,
        '余额(ETH)': balanceInEth,
        '当前账户': this.currentAccount
      })

      console.log('📝 准备发送交易...', {
        from: this.currentAccount,
        gas: gasLimit,
        options: JSON.stringify(options, null, 2)
      })

      const transaction = await method(...args).send({
        from: this.currentAccount,
        gas: gasLimit,
        ...options
      })

      console.log('✅ 交易发送成功:', {
        transactionHash: transaction.transactionHash,
        blockNumber: transaction.blockNumber,
        gasUsed: transaction.gasUsed,
        status: transaction.status
      })

      return transaction
    } catch (error) {
      console.error('❌ 发送交易失败:', {
        error: error.message,
        stack: error.stack,
        contractName,
        methodName,
        args,
        currentAccount: this.currentAccount,
        isConnected: this.isConnected
      })

      // 增强错误信息
      const enhancedError = this.enhanceTransactionError(error, contractName, methodName)
      throw enhancedError
    }
  }

  // 发送ETH
  async sendEth(toAddress, amount, options = {}) {
    try {
      if (!this.isConnected || !this.currentAccount) {
        throw new Error('请先连接钱包')
      }

      const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether')
      
      const transaction = await this.web3.eth.sendTransaction({
        from: this.currentAccount,
        to: toAddress,
        value: amountInWei,
        ...options
      })

      return transaction
    } catch (error) {
      console.error('发送ETH失败:', error)
      throw error
    }
  }

  // 断开连接
  disconnect() {
    this.accounts = []
    this.currentAccount = null
    this.isConnected = false
    this.contracts = {}
    console.log('Web3服务已断开连接')
  }

  // 检查是否支持的网络
  async checkNetwork(supportedChainIds = [97]) { // 默认支持BSC测试网
    try {
      const chainId = await this.web3.eth.getChainId()
      console.log('当前链ID:', chainId)
      console.log('支持的链ID:', supportedChainIds)
      
      // 确保类型匹配，将chainId转换为数字进行比较
      const chainIdNumber = Number(chainId)
      
      // 额外的类型检查和处理
      console.log('🔍 详细类型分析:', {
        originalChainId: chainId,
        originalType: typeof chainId,
        chainIdNumber: chainIdNumber,
        chainIdNumberType: typeof chainIdNumber,
        supportedChainIds: supportedChainIds,
        supportedTypes: supportedChainIds.map(id => typeof id),
        isNaN: isNaN(chainIdNumber)
      })
      
      // 如果转换失败，尝试其他方法
      let finalChainId = chainIdNumber
      if (isNaN(chainIdNumber)) {
        // 尝试直接使用原始值
        finalChainId = chainId
        console.log('⚠️ 数字转换失败，使用原始值:', finalChainId)
      }
      
      const isSupported = supportedChainIds.includes(finalChainId)
      
      console.log('链ID类型检查:', {
        originalChainId: chainId,
        chainIdType: typeof chainId,
        chainIdNumber: chainIdNumber,
        supportedChainIds: supportedChainIds,
        isSupported: isSupported
      })
      
      return {
        chainId: finalChainId,
        isSupported,
        supportedChainIds
      }
    } catch (error) {
      console.error('检查网络失败:', error)
      return {
        chainId: null,
        isSupported: false,
        supportedChainIds
      }
    }
  }

  // 切换网络
  async switchNetwork(chainId) {
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }]
      })
      return true
    } catch (error) {
      console.error('切换网络失败:', error)
      return false
    }
  }

  /**
   * 增强交易错误信息，提供更详细的错误描述
   */
  enhanceTransactionError(error, contractName, methodName) {
    console.log('🔍 开始增强错误信息...', {
      originalError: error.message,
      contractName,
      methodName
    })

    // 添加设备信息检测
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    console.log('📱 设备信息:', {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      isMobile: isMobile,
      errorType: typeof error,
      errorKeys: Object.keys(error),
      errorMessage: error.message,
      errorStack: error.stack
    })

    let enhancedMessage = error.message
    let errorType = 'UNKNOWN'
    let suggestions = []

    // 分析错误类型
    if (error.message) {
      const errorMessage = error.message.toLowerCase()
      
      // RPC相关错误
      if (errorMessage.includes('rpc') || errorMessage.includes('http client error') || errorMessage.includes('-32080')) {
        errorType = 'RPC_ERROR'
        enhancedMessage = '区块链网络连接失败，RPC节点暂时不可用'
        suggestions = [
          '检查网络连接是否正常',
          '尝试切换网络（4G/5G/WiFi）',
          '检查VPN设置',
          '稍后重试（可能是网络拥堵）',
          '尝试使用其他RPC节点'
        ]
      }
      
      // 网络相关错误
      else if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
        errorType = 'NETWORK_ERROR'
        enhancedMessage = '网络连接失败，无法连接到区块链网络'
        suggestions = [
          '检查网络连接是否正常',
          '检查VPN设置',
          '尝试切换网络',
          '稍后重试'
        ]
      }
      
      // 钱包连接错误
      else if (errorMessage.includes('wallet') || errorMessage.includes('metamask') || errorMessage.includes('provider')) {
        errorType = 'WALLET_ERROR'
        enhancedMessage = '钱包连接问题，请检查钱包状态'
        suggestions = [
          '确保MetaMask已安装并解锁',
          '检查钱包是否连接到正确的网络',
          '尝试重新连接钱包',
          '刷新页面后重试'
        ]
      }
      
      // 用户拒绝错误
      else if (errorMessage.includes('user rejected') || errorMessage.includes('user denied') || errorMessage.includes('cancel')) {
        errorType = 'USER_REJECTED'
        enhancedMessage = '您取消了交易操作'
        suggestions = [
          '请重新点击确认按钮',
          '在MetaMask中确认交易请求',
          '检查MetaMask弹窗是否被阻止'
        ]
      }
      
      // Gas费用相关错误
      else if (errorMessage.includes('gas') || errorMessage.includes('insufficient funds')) {
        errorType = 'GAS_ERROR'
        enhancedMessage = 'Gas费用不足或余额不足'
        suggestions = [
          '检查账户BNB余额是否充足',
          '尝试减少交易金额',
          '检查Gas费用设置',
          '确保有足够的BNB支付手续费'
        ]
      }
      
      // 合约相关错误
      else if (errorMessage.includes('contract') || errorMessage.includes('method') || errorMessage.includes('abi')) {
        errorType = 'CONTRACT_ERROR'
        enhancedMessage = '合约调用失败，可能是合约问题或参数错误'
        suggestions = [
          '检查合约地址是否正确',
          '验证合约方法是否存在',
          '检查参数格式是否正确',
          '联系技术支持'
        ]
      }
      
      // 网络不支持错误
      else if (errorMessage.includes('chain') || errorMessage.includes('network') || errorMessage.includes('unsupported')) {
        errorType = 'NETWORK_UNSUPPORTED'
        enhancedMessage = '当前网络不支持，请切换到BSC测试网'
        suggestions = [
          '切换到BSC测试网 (Chain ID: 97)',
          '检查钱包网络设置',
          '确保网络配置正确'
        ]
      }
      
      // 签名错误
      else if (errorMessage.includes('signature') || errorMessage.includes('sign') || errorMessage.includes('personal_sign')) {
        errorType = 'SIGNATURE_ERROR'
        enhancedMessage = '交易签名失败，可能是钱包问题或用户拒绝'
        suggestions = [
          '在MetaMask中确认签名请求',
          '检查签名消息内容',
          '重新尝试签名操作',
          '检查钱包状态'
        ]
      }
      
      // 移动端特殊错误
      else if (isMobile && (errorMessage.includes('mobile') || errorMessage.includes('android') || errorMessage.includes('ios') || errorMessage.includes('phone'))) {
        errorType = 'MOBILE_ERROR'
        enhancedMessage = '移动端连接问题'
        suggestions = [
          '确保使用最新版本的MetaMask',
          '尝试在桌面端操作',
          '检查移动端网络设置',
          '联系技术支持'
        ]
      }
      
      // 其他未知错误
      else {
        errorType = 'UNKNOWN_ERROR'
        enhancedMessage = `交易失败: ${error.message}`
        suggestions = [
          '刷新页面后重试',
          '检查钱包状态',
          '联系技术支持',
          '查看控制台错误日志'
        ]
      }
    }

    // 创建增强的错误对象
    const enhancedError = new Error(enhancedMessage)
    enhancedError.originalError = error
    enhancedError.errorType = errorType
    enhancedError.contractName = contractName
    enhancedError.methodName = methodName
    enhancedError.suggestions = suggestions
    enhancedError.timestamp = new Date().toISOString()

    console.log('📋 错误信息增强完成:', {
      originalMessage: error.message,
      enhancedMessage,
      errorType,
      suggestions,
      contractName,
      methodName,
      设备类型: isMobile ? '移动端' : '桌面端'
    })

    return enhancedError
  }
}

// 创建单例实例
const web3Service = new Web3Service()

export default web3Service
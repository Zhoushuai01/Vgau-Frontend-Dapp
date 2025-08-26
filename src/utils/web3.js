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
  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // 用户断开了钱包连接
      this.accounts = []
      this.currentAccount = null
      this.isConnected = false
      console.log('钱包已断开连接')
    } else if (accounts[0] !== this.currentAccount) {
      // 用户切换了账户
      this.accounts = accounts
      this.currentAccount = accounts[0]
      this.isConnected = true
      console.log('当前账户:', this.currentAccount)
    }
  }

  // 处理链变化
  handleChainChanged(chainId) {
    console.log('链ID变化:', chainId)
    // 可以在这里添加链切换的逻辑
    window.location.reload()
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

      const gasEstimate = await method(...args).estimateGas({
        from: this.currentAccount,
        ...options
      })

      // 处理BigInt类型的gas估算，转换为字符串后计算
      const gasEstimateNumber = typeof gasEstimate === 'bigint' ? Number(gasEstimate) : gasEstimate
      const gasLimit = Math.floor(gasEstimateNumber * 1.2) // 增加20%的gas限制

      const transaction = await method(...args).send({
        from: this.currentAccount,
        gas: gasLimit,
        ...options
      })

      return transaction
    } catch (error) {
      console.error(`发送交易失败:`, error)
      throw error
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
  async checkNetwork(supportedChainIds = [56, 97]) { // 默认支持BSC主网和测试网
    try {
      const chainId = await this.web3.eth.getChainId()
      const isSupported = supportedChainIds.includes(chainId)
      
      return {
        chainId,
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
}

// 创建单例实例
const web3Service = new Web3Service()

export default web3Service
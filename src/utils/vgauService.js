import web3Service from './web3.js'
import { getContractConfig, getAllContracts } from '../config/contracts.js'
import { getContractABI } from './abiLoader.js'

class VGAUService {
  constructor() {
    this.contracts = {}
    this.isInitialized = false
  }

  // 初始化VGAU服务
  async init() {
    try {
      // 初始化Web3服务
      await web3Service.init()
      
      // 加载所有合约
      await this.loadAllContracts()
      
      this.isInitialized = true
      console.log('VGAU服务初始化成功')
      return true
    } catch (error) {
      console.error('VGAU服务初始化失败:', error)
      return false
    }
  }

  // 加载所有合约
  // 修复后的loadAllContracts方法
  async loadAllContracts() {
    try {
      const contractsConfig = getAllContracts()
      
      for (const [key, config] of Object.entries(contractsConfig)) {
        const abi = await this.getContractABI(config.name)
        
        if (abi) {
          // 使用统一的键名作为合约标识符
          await web3Service.loadContract(config.address, abi, key)
          this.contracts[key] = key  // 存储键名而不是config.name
        }
      }
      
      console.log('所有合约加载完成', this.contracts)
    } catch (error) {
      console.error('加载合约失败:', error)
      throw error
    }
  }

  // 获取合约ABI
  async getContractABI(contractName) {
    try {
      const abi = getContractABI(contractName)
      if (!abi) {
        console.warn(`未找到合约ABI: ${contractName}`)
        return null
      }
      return abi
    } catch (error) {
      console.error(`获取合约ABI失败: ${contractName}`, error)
      return null
    }
  }

  // 获取VGAU代币信息
  async getVGAUInfo() {
    try {
      const contractName = this.contracts.VGAU_TOKEN  // 现在这里会是'VGAU_TOKEN'
      if (!contractName) {
        throw new Error('VGAU代币合约未加载')
      }
  
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        web3Service.callContractMethod(contractName, 'name'),
        web3Service.callContractMethod(contractName, 'symbol'),
        web3Service.callContractMethod(contractName, 'decimals'),
        web3Service.callContractMethod(contractName, 'totalSupply')
      ])
  
      return {
        name,
        symbol,
        decimals: parseInt(decimals),
        totalSupply: web3Service.web3.utils.fromWei(totalSupply, 'ether')
      }
    } catch (error) {
      console.error('获取VGAU代币信息失败:', error)
      throw error
    }
  }

  // 获取用户VGAU余额
  async getVGAUBalance(address = null) {
    try {
      const contractName = this.contracts.VGAU_TOKEN  // 修改：使用正确的键名
      if (!contractName) {
        throw new Error('VGAU代币合约未加载')
      }

      const targetAddress = address || web3Service.currentAccount
      if (!targetAddress) {
        throw new Error('没有可用的账户地址')
      }

      const balance = await web3Service.callContractMethod(contractName, 'balanceOf', targetAddress)
      const balanceInVGAU = web3Service.web3.utils.fromWei(balance, 'ether')

      return {
        wei: balance,
        vgau: balanceInVGAU
      }
    } catch (error) {
      console.error('获取VGAU余额失败:', error)
      throw error
    }
  }

  // 获取VGAU价格
  async getVGAUPrice() {
    try {
      const contractName = this.contracts.VGAU_EXCHANGE
      if (!contractName) {
        throw new Error('VGAU兑换合约未加载')
      }

      // 获取XAU每盎司价格（从chainlink）
      const priceData = await web3Service.callContractMethod(
        contractName, 
        'getLatestValidXAUPrice'
      )
      
      if (priceData && priceData.price) {
        
        // 每盎司价格（从chainlink获取，通常有8位小数）
        const pricePerOunce = priceData.price
        
        // 调用合约的getRequiredUSDTByVGAU函数获取1克VGAU需要的USDT数量
        const result = await web3Service.callContractMethod(
          contractName, 
          'getRequiredUSDTByVGAU', 
          '1', pricePerOunce
        )
        
        if (result) {
          // 将结果转换为可读格式（使用18位小数精度）
          return web3Service.web3.utils.fromWei(result, 'ether')
        }
      }
      
      return '123.4561' // 默认价格
    } catch (error) {
      console.error('获取VGAU价格失败:', error)
      return '123.4561'
    }
  }

  // 获取TVL数据
  async getTVL() {
    try {
      const contractName = this.contracts.VGAU_EXCHANGE  // 修改：使用正确的键名
      if (!contractName) {
        throw new Error('VGAU兑换合约未加载')
      }

      // 获取合约中的USDT和VGAU余额
      const [usdtBalance, vgauBalance] = await Promise.all([
        web3Service.callContractMethod(contractName, 'getContractUSDTBalance'),
        web3Service.callContractMethod(contractName, 'getContractVGAUBalance')
      ])
      
      // 计算总价值（USDT余额 + VGAU余额的价值）
      const usdtValue = parseFloat(web3Service.web3.utils.fromWei(usdtBalance, 'ether'))
      const vgauValue = parseFloat(web3Service.web3.utils.fromWei(vgauBalance, 'ether'))
      
      // 获取VGAU价格来计算VGAU的USDT价值
      const vgauPrice = parseFloat(await this.getVGAUPrice())
      const totalValue = usdtValue + (vgauValue * vgauPrice)
      
      return totalValue.toFixed(0)
    } catch (error) {
      console.error('获取TVL失败:', error)
      // 如果获取失败，返回默认值
      return '561103'
    }
  }

  // 获取APR数据
  async getAPR() {
    try {
      // 由于合约中没有直接的APR方法，我们返回一个默认值
      // 在实际项目中，APR可能需要从其他合约或API获取
      return 0.01 // 1%
    } catch (error) {
      console.error('获取APR失败:', error)
      // 如果获取失败，返回默认值
      return 0.01 // 1%
    }
  }

  // USDT兑换VGAU
  async exchangeUSDTToVGAU(usdtAmount) {
    try {
      if (!web3Service.isConnected) {
        throw new Error('请先连接钱包')
      }

      const contractName = this.contracts.VGAUExchange
      if (!contractName) {
        throw new Error('VGAU兑换合约未加载')
      }

      const amountInWei = web3Service.web3.utils.toWei(usdtAmount.toString(), 'ether')
      
      // 使用实际的合约方法
      const transaction = await web3Service.sendTransaction(
        contractName,
        'exchangeUsdtToExactVgau',
        {},
        amountInWei
      )

      return transaction
    } catch (error) {
      console.error('USDT兑换VGAU失败:', error)
      throw error
    }
  }

  // VGAU兑换USDT
  async exchangeVGAUToUSDT(vgauAmount) {
    try {
      if (!web3Service.isConnected) {
        throw new Error('请先连接钱包')
      }

      const contractName = this.contracts.VGAUExchange
      if (!contractName) {
        throw new Error('VGAU兑换合约未加载')
      }

      const amountInWei = web3Service.web3.utils.toWei(vgauAmount.toString(), 'ether')
      
      // 使用实际的合约方法
      const transaction = await web3Service.sendTransaction(
        contractName,
        'exchangeVgauToUsdt',
        {},
        amountInWei
      )

      return transaction
    } catch (error) {
      console.error('VGAU兑换USDT失败:', error)
      throw error
    }
  }

  // 获取兑换率
  async getExchangeRate() {
    try {
      const contractName = this.contracts.VGAUExchange
      if (!contractName) {
        throw new Error('VGAU兑换合约未加载')
      }

      // 这里需要根据实际的合约方法名进行调整
      const rate = await web3Service.callContractMethod(contractName, 'getExchangeRate')
      
      return web3Service.web3.utils.fromWei(rate, 'ether')
    } catch (error) {
      console.error('获取兑换率失败:', error)
      throw error
    }
  }

  // 检查用户KYC状态
  async checkKYCStatus(address = null) {
    try {
      const contractName = this.contracts.VGAU_USER_KYC_MANAGER
      if (!contractName) {
        throw new Error('KYC管理合约未加载')
      }

      const targetAddress = address || web3Service.currentAccount
      if (!targetAddress) {
        throw new Error('没有可用的账户地址')
      }

      // 这里需要根据实际的合约方法名进行调整
      const kycStatus = await web3Service.callContractMethod(contractName, 'getKYCStatus', targetAddress)
      
      return kycStatus
    } catch (error) {
      console.error('检查KYC状态失败:', error)
      throw error
    }
  }

  // 获取用户权限
  async getUserRole(address = null) {
    try {
      const contractName = this.contracts.VGAU_ACCESS_CONTROL
      if (!contractName) {
        throw new Error('访问控制合约未加载')
      }

      const targetAddress = address || web3Service.currentAccount
      if (!targetAddress) {
        throw new Error('没有可用的账户地址')
      }

      // 这里需要根据实际的合约方法名进行调整
      const role = await web3Service.callContractMethod(contractName, 'getRole', targetAddress)
      
      return role
    } catch (error) {
      console.error('获取用户权限失败:', error)
      throw error
    }
  }

  // 获取平台统计数据
  async getPlatformStats() {
    try {
      const [tvl, apr, price, totalSupply] = await Promise.all([
        this.getTVL(),
        this.getAPR(),
        this.getVGAUPrice(),
        this.getVGAUInfo().then(info => info.totalSupply)
      ])

      return {
        tvl,
        apr,
        price,
        totalSupply
      }
    } catch (error) {
      console.error('获取平台统计数据失败:', error)
      throw error
    }
  }
}

// 创建单例实例
const vgauService = new VGAUService()

export default vgauService
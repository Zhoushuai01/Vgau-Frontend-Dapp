import { BASE_URL, API_ENDPOINTS, REQUEST_CONFIG, RESPONSE_CONFIG } from '@/config/api.js'

// 统一的API请求函数
class ApiService {
  constructor() {
    this.baseURL = BASE_URL
    this.endpoints = API_ENDPOINTS
    this.lastWalletAddress = null
    this.forceReauth = false
  }

  // 通用请求方法（带重试机制）
  async request(url, options = {}, retries = 3) {
    const config = {
      ...REQUEST_CONFIG,
      ...options,
      url: this.baseURL + url
    }

    // 禁用缓存，确保每次都从后端获取最新数据
    if (config.method === 'GET') {
      config.data = {
        ...config.data,
        _t: Date.now() // 添加时间戳防止缓存
      }
    }

    // 检查是否需要重新认证
    const needsReauth = this.checkIfNeedsReauth()
    if (needsReauth) {
      console.log('🔄 检测到需要重新认证，跳过API请求')
      throw new Error('需要重新认证')
    }

    console.log('🌐 API请求配置:', {
      method: config.method || 'GET',
      url: config.url,
      data: config.data,
      headers: config.headers,
      timeout: config.timeout,
      retries: retries
    })

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`📤 开始发送请求 (尝试 ${attempt}/${retries})...`)
        const response = await uni.request(config)
        
        console.log('📡 API响应详情:', {
          statusCode: response.statusCode,
          data: response.data,
          header: response.header,
          attempt: attempt
        })
        
        // 检查响应状态
        if (RESPONSE_CONFIG.successCodes.includes(response.statusCode)) {
          return response.data
        } else {
          console.error('❌ 响应状态码错误:', response.statusCode, response.data)
          throw new Error(response.data?.message || `Request failed with status ${response.statusCode}`)
        }
      } catch (error) {
        console.error(`💥 API请求异常 (尝试 ${attempt}/${retries}):`, {
          message: error.message,
          stack: error.stack,
          config: config,
          attempt: attempt
        })
        
        // 如果是最后一次尝试，直接抛出错误
        if (attempt === retries) {
          RESPONSE_CONFIG.errorHandler(error)
          throw error
        }
        
        // 如果是超时错误，等待后重试
        if (error.message?.includes('timeout') || error.errMsg?.includes('timeout')) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000) // 指数退避，最大5秒
          console.log(`⏳ 请求超时，${delay}ms后重试...`)
          await new Promise(resolve => setTimeout(resolve, delay))
        } else {
          // 其他错误直接抛出
          RESPONSE_CONFIG.errorHandler(error)
          throw error
        }
      }
    }
  }

  // GET请求
  async get(url, params = {}) {
    return this.request(url, {
      method: 'GET',
      data: params
    })
  }

  // POST请求
  async post(url, data = {}) {
    console.log('🚀🚀🚀 使用最新的POST方法 - 版本2024')
    console.log('📋 原始数据:', data)
    
    try {
      console.log('📤 开始发送POST请求...')
      
      const response = await new Promise((resolve, reject) => {
        uni.request({
          url: this.baseURL + url,
          method: 'POST',
          data: data, // 不要JSON.stringify，让uni.request自动处理
          header: {
            'Content-Type': 'application/json'
          },
          timeout: 10000,
          success: (res) => {
            console.log('✅ uni.request success:', res)
            console.log('📊 响应数据详情:', JSON.stringify(res.data, null, 2))
            resolve(res)
          },
          fail: (err) => {
            console.error('❌ uni.request fail:', err)
            reject(err)
          }
        })
      })
      
      console.log('📡 POST响应详情:', {
        statusCode: response.statusCode,
        data: response.data,
        header: response.header
      })
      
      // 检查响应状态
      if (RESPONSE_CONFIG.successCodes.includes(response.statusCode)) {
        return response.data
      } else {
        console.error('❌ POST响应状态码错误:', response.statusCode, response.data)
        throw new Error(response.data?.message || `Request failed with status ${response.statusCode}`)
      }
    } catch (error) {
      console.error('💥 POST请求异常:', error)
      RESPONSE_CONFIG.errorHandler(error)
      throw error
    }
  }

  // PUT请求
  async put(url, data = {}) {
    return this.request(url, {
      method: 'PUT',
      data
    })
  }

  // DELETE请求
  async delete(url) {
    return this.request(url, {
      method: 'DELETE'
    })
  }

  // 用户认证相关API
  auth = {
    // 用户登录
    login: (credentials) => this.post(this.endpoints.AUTH.LOGIN, credentials),
    
    // 用户登出
    logout: () => this.post(this.endpoints.AUTH.LOGOUT),
    
    // 用户注册
    register: (userData) => this.post(this.endpoints.AUTH.REGISTER, userData),
    
    // 获取用户信息
    getProfile: () => this.get(this.endpoints.AUTH.PROFILE),
    
    // 获取当前用户信息（检查登录状态）
    getMe: () => this.get(this.endpoints.AUTH.ME),
    
    // 2FA 验证（/auth/2fa/verify）
    verify2FA: (data) => this.post(this.endpoints.AUTH_2FA.VERIFY, data),
    
    // 发送邮箱验证码
    sendEmailCode: () => this.post(this.endpoints.AUTH_2FA.SEND_EMAIL_CODE)
  }

  // 钱包认证相关API
  walletAuth = {
              // 创建登录挑战
          createLoginChallenge: (walletAddress, chainId) => {
            // 验证必需参数
            if (!walletAddress) {
              throw new Error('钱包地址不能为空')
            }
            if (!chainId) {
              throw new Error('链ID不能为空，chainId是必需的参数')
            }
            
            // 验证chainId格式（必须是10进制数字）
            if (typeof chainId !== 'number' || chainId <= 0 || !Number.isInteger(chainId)) {
              throw new Error('链ID格式无效，必须是10进制数字')
            }
            
            return this.post(this.endpoints.WALLET_AUTH.LOGIN_CHALLENGE, { walletAddress, chainId })
          },
    
    // 验证登录签名
    verifyLoginSignature: (data) => this.post(this.endpoints.WALLET_AUTH.LOGIN_VERIFY, data)
  }

  // 钱包相关API
  wallet = {
    // 获取余额
    getBalance: () => this.get(this.endpoints.WALLET.BALANCE),
    
    // 获取交易记录
    getTransactions: (params) => this.get(this.endpoints.WALLET.TRANSACTIONS, params),
    
    // 提现
    withdraw: (data) => this.post(this.endpoints.WALLET.WITHDRAW, data),
    
    // 充值
    deposit: (data) => this.post(this.endpoints.WALLET.DEPOSIT, data)
  }

  // 用户管理相关API
  user = {
    // 获取用户资料
    getProfile: () => this.get(this.endpoints.USER.PROFILE),
    
    // 更新用户资料
    updateProfile: (data) => this.put(this.endpoints.USER.UPDATE, data),
    
    // KYC相关
    getKyc: () => this.get(this.endpoints.USER.KYC),
    submitKyc: (data) => this.post(this.endpoints.USER.KYC, data)
  }

  // 2FA认证相关API
  totp = {
    // 设置2FA
    setup: () => this.get(this.endpoints.TOTP.SETUP),
    
    // 验证2FA
    verify: (code) => this.post(this.endpoints.TOTP.VERIFY, { code }),
    
    // 禁用2FA
    disable: (code) => this.post(this.endpoints.TOTP.DISABLE, { code })
  }

  // 新版 2FA 验证接口（/auth/2fa/verify）
  auth2fa = {
    verify: (data) => this.post(this.endpoints.AUTH_2FA.VERIFY, data),
    sendEmailCode: () => this.post(this.endpoints.AUTH_2FA.SEND_EMAIL_CODE)
  }

  // 文件管理相关API
  file = {
    // 上传文件
    upload: (fileData) => this.post(this.endpoints.FILE.UPLOAD, fileData),
    
    // 下载文件
    download: (fileId) => this.get(this.endpoints.FILE.DOWNLOAD, { fileId }),
    
    // 预览文件
    preview: (fileId) => this.get(this.endpoints.FILE.PREVIEW, { fileId })
  }

  // 邀请管理相关API
  invite = {
    // 获取邀请码
    getCode: () => this.get(this.endpoints.INVITE.CODE),
    
    // 绑定邀请人
    bind: (code) => this.post(this.endpoints.INVITE.BIND, { code }),
    
    // 获取邀请关系
    getRelations: (params) => this.get(this.endpoints.INVITE.RELATIONS, params),
    
    // 获取我的邀请统计（使用更长超时时间）
    getMyStats: () => this.request(this.endpoints.INVITE.MY_STATS, { 
      method: 'GET',
      timeout: 45000 // 45秒超时
    })
  }

  // 质押管理相关API
  stake = {
    // 获取可用产品列表
    getProducts: () => this.get(this.endpoints.STAKE.PRODUCTS),
    
    // 创建质押订单
    createOrder: (data) => this.post(this.endpoints.STAKE.ORDERS, data),
    
    // 获取用户订单列表
    getOrders: () => this.get(this.endpoints.STAKE.ORDERS),
    
    // 获取质押统计信息
    getStatistics: () => this.get(this.endpoints.STAKE.STATISTICS),
    
    // 赎回质押订单
    redeemOrder: (orderId) => this.post(this.endpoints.STAKE.REDEEM.replace('{orderId}', orderId))
  }
  
  // 用户资金余额相关API
  userFunds = {
    // 获取用户资金余额
    getBalances: () => this.get(this.endpoints.USER_FUNDS.BALANCES),
    // 提现申请
    withdraw: (data) => this.post(this.endpoints.USER_FUNDS.WITHDRAW, data),
    // 获取用户资金操作记录
    getOperations: (params = {}) => this.get(this.endpoints.USER_FUNDS.OPERATIONS, params)
  }
  
  // 借贷配置相关API
  loan = {
    // 获取借贷配置
    getConfig: () => this.get(this.endpoints.LOAN.CONFIG),
    // 获取借贷订单列表
    getOrders: () => this.get(this.endpoints.LOAN.ORDERS),
    // 获取订单详情
    getOrderDetail: (orderNumber) => this.get(`${this.endpoints.LOAN.ORDER_DETAIL}/${orderNumber}`),
    // 创建借贷订单
    createOrder: (data) => this.post(this.endpoints.LOAN.ORDERS, data),
    // 获取借贷汇总信息（使用更长超时时间）
    getSummary: () => this.request(this.endpoints.LOAN.SUMMARY, { 
      method: 'GET',
      timeout: 60000 // 60秒超时
    }),
    // 获取借贷统计数据
    getStatistics: () => this.get(this.endpoints.LOAN.STATISTICS),
    // 增加抵押金额
    addCollateral: (data) => this.post(this.endpoints.LOAN.ADD_COLLATERAL, data),
    // 全额还款
    repay: (data) => this.post(this.endpoints.LOAN.REPAY, data)
  }
  
  // 积分管理相关API
  points = {
    // 获取我的积分统计
    getMyStatistics: () => this.get(this.endpoints.POINTS.MY_STATISTICS),
    
    // 获取我的积分详情
    getMy: () => this.get(this.endpoints.POINTS.MY),
    
    // 获取我的积分记录
    getMyRecords: (params = {}) => this.get(this.endpoints.POINTS.MY_RECORDS, params),
    
    // 根据类型获取我的积分记录（注意：后端只支持按操作类型EARN/CONSUME，这里改为获取所有记录后客户端过滤）
    getMyRecordsByType: (type, params = {}) => this.get(this.endpoints.POINTS.MY_RECORDS, params)
  }
  
  // VGAU储蓄管理相关API
  vgauSavings = {
    // 获取可领取利息
    getClaimableInterest: () => this.get(this.endpoints.VGAU_SAVINGS.CLAIMABLE_INTEREST),
    // 领取利息
    claimInterest: (data) => this.post(this.endpoints.VGAU_SAVINGS.CLAIM_INTEREST, data)
  }
  
  // DeFi相关API
  defi = {
    // 创建充值订单
    createDepositOrder: (orderData) => {
      console.log('🔧 createDepositOrder 调用 post 方法')
      return this.post(this.endpoints.DEFI.DEPOSITS_ORDERS, orderData)
    },
    
    // 获取充值订单列表
    getDepositOrdersList: (params = {}) => {
      console.log('🔧 getDepositOrdersList 调用 get 方法', params)
      return this.get(this.endpoints.DEFI.DEPOSITS_ORDERS_LIST, params)
    }
  }
  
  // 内容管理相关API
  content = {
    // 获取所有外链
    getLinks: () => this.get(this.endpoints.CONTENT.LINKS),
    
    // 获取热门外链
    getPopularLinks: () => this.get(this.endpoints.CONTENT.POPULAR_LINKS),
    
    // 根据分类获取外链
    getLinksByCategory: (category) => this.get(`${this.endpoints.CONTENT.LINKS_BY_CATEGORY}/${category}`),
    
    // 获取外链分类
    getLinkCategories: () => this.get(this.endpoints.CONTENT.LINK_CATEGORIES)
  }

  // 检查是否需要重新认证
  checkIfNeedsReauth() {
    // 如果强制重新认证标志为true，返回true
    if (this.forceReauth) {
      return true
    }

    // 检查当前钱包地址是否发生变化
    const currentWalletAddress = this.getCurrentWalletAddress()
    if (this.lastWalletAddress && currentWalletAddress && this.lastWalletAddress !== currentWalletAddress) {
      console.log('🔄 检测到钱包地址变化，需要重新认证:', {
        lastAddress: this.lastWalletAddress,
        currentAddress: currentWalletAddress
      })
      return true
    }

    return false
  }

  // 获取当前钱包地址
  getCurrentWalletAddress() {
    try {
      // 优先从web3Service获取
      if (typeof window !== 'undefined' && window.web3Service && window.web3Service.currentAccount) {
        return window.web3Service.currentAccount
      }
      
      // 从localStorage获取
      const storedAddress = localStorage.getItem('connectedWalletAddress')
      if (storedAddress) {
        return storedAddress
      }
      
      // 从ethereum provider获取
      if (typeof window !== 'undefined' && window.ethereum && window.ethereum.selectedAddress) {
        return window.ethereum.selectedAddress
      }
      
      return null
    } catch (error) {
      console.error('获取当前钱包地址失败:', error)
      return null
    }
  }

  // 更新钱包地址
  updateWalletAddress(address) {
    this.lastWalletAddress = address
    this.forceReauth = false
    console.log('✅ API服务钱包地址已更新:', address)
  }

  // 设置强制重新认证标志
  setForceReauth(force = true) {
    this.forceReauth = force
    console.log('🔄 API服务强制重新认证标志已设置:', force)
  }

  // 重置认证状态
  resetAuthState() {
    this.lastWalletAddress = null
    this.forceReauth = true
    console.log('🧹 API服务认证状态已重置')
  }
}

// 创建API服务实例
const apiService = new ApiService()

// 导出API服务实例
export default apiService

// 导出各个模块的API方法
export const authAPI = apiService.auth
export const walletAuthAPI = apiService.walletAuth
export const walletAPI = apiService.wallet
export const userAPI = apiService.user
export const totpAPI = apiService.totp
export const fileAPI = apiService.file
export const inviteAPI = apiService.invite
export const stakeAPI = apiService.stake
export const userFundsAPI = apiService.userFunds
export const loanAPI = apiService.loan
export const pointsAPI = apiService.points
export const vgauSavingsAPI = apiService.vgauSavings
export const defiAPI = apiService.defi
export const contentAPI = apiService.content

// 导出基础配置
export { BASE_URL, API_ENDPOINTS } 
import { walletAuthAPI, authAPI } from '@/api/apiService.js'
import { getCurrentChainId } from './walletService.js'

class WalletBindingService {
  constructor() {
    this.isInitialized = false
    this.setupEventListeners()
  }

  // 设置事件监听器
  setupEventListeners() {
    // 监听钱包绑定检测事件
    window.addEventListener('walletBindingCheck', this.handleWalletBindingCheck.bind(this))
  }

  // 处理钱包绑定检测事件
  async handleWalletBindingCheck(event) {
    const { account, chainId, source } = event.detail
    console.log('🔍 开始检测钱包绑定状态:', { account, chainId, source })
    
    if (!account) {
      console.log('❌ 无效的钱包地址')
      return
    }

    try {
      // 强制清除本地缓存，确保从后端获取最新数据
      this.clearLocalCache()
      
      // 检测新钱包地址的绑定状态
      const bindingStatus = await this.checkWalletBindingStatus(account, chainId)
      
      // 触发绑定状态更新事件
      this.triggerBindingStatusUpdate(bindingStatus)
      
      console.log('✅ 钱包绑定状态检测完成:', bindingStatus)
    } catch (error) {
      console.error('❌ 钱包绑定状态检测失败:', error)
      
      // 触发错误事件
      this.triggerBindingError(error)
    }
  }

  // 检测钱包绑定状态
  async checkWalletBindingStatus(walletAddress, chainId) {
    try {
      console.log('🔍 检测钱包地址绑定状态:', walletAddress)
      
      // 1. 首先检查用户是否已经登录
      const loginStatus = await this.checkUserLoginStatus()
      
      if (loginStatus.isLoggedIn) {
        console.log('✅ 用户已登录，检查钱包地址匹配')
        
        // 检查登录用户的钱包地址是否与当前钱包地址匹配
        if (loginStatus.userData.walletAddress === walletAddress) {
          return {
            isBound: true,
            isLoggedIn: true,
            userData: loginStatus.userData,
            walletAddress: walletAddress,
            message: '钱包地址已绑定并已登录'
          }
        } else {
          // 钱包地址不匹配，需要重新登录
          console.log('⚠️ 钱包地址不匹配，需要重新登录')
          return {
            isBound: false,
            isLoggedIn: false,
            walletAddress: walletAddress,
            message: '钱包地址已切换，需要重新登录'
          }
        }
      }

      // 2. 如果用户未登录，尝试钱包登录
      console.log('🔍 用户未登录，尝试钱包登录')
      const walletLoginResult = await this.attemptWalletLogin(walletAddress, chainId)
      
      return walletLoginResult
      
    } catch (error) {
      console.error('检测钱包绑定状态失败:', error)
      throw error
    }
  }

  // 检查用户登录状态 - 强制从后端获取最新数据
  async checkUserLoginStatus() {
    try {
      console.log('🔍 强制从后端获取用户登录状态...')
      
      // 添加时间戳确保不缓存
      const response = await authAPI.getMe()
      
      if (response && response.success) {
        console.log('✅ 从后端获取到用户数据:', response.data)
        return {
          isLoggedIn: true,
          userData: response.data
        }
      } else {
        console.log('❌ 后端返回用户未登录状态')
        return {
          isLoggedIn: false,
          userData: null
        }
      }
    } catch (error) {
      console.error('❌ 获取用户登录状态失败:', error)
      return {
        isLoggedIn: false,
        userData: null
      }
    }
  }

  // 尝试钱包登录
  async attemptWalletLogin(walletAddress, chainId) {
    try {
      console.log('🔐 尝试钱包登录:', { walletAddress, chainId })
      
      // 这里可以调用钱包登录逻辑
      // 由于钱包登录需要用户签名，这里只返回状态
      return {
        isBound: false,
        isLoggedIn: false,
        walletAddress: walletAddress,
        message: '需要用户签名进行钱包登录',
        requiresSignature: true,
        nextStep: '请点击"连接钱包"按钮进行登录'
      }
    } catch (error) {
      console.error('❌ 钱包登录尝试失败:', error)
      
      // 分析错误类型并提供详细错误信息
      const errorAnalysis = this.analyzeWalletLoginError(error, walletAddress, chainId)
      
      return {
        isBound: false,
        isLoggedIn: false,
        walletAddress: walletAddress,
        message: errorAnalysis.userMessage,
        error: error.message,
        errorCode: errorAnalysis.errorCode,
        errorType: errorAnalysis.errorType,
        suggestions: errorAnalysis.suggestions,
        requiresSignature: false,
        canRetry: errorAnalysis.canRetry
      }
    }
  }

  // 分析钱包登录错误
  analyzeWalletLoginError(error, walletAddress, chainId) {
    console.log('🔍 分析钱包登录错误:', error)
    
    const errorInfo = {
      errorCode: 'UNKNOWN_ERROR',
      errorType: 'UNKNOWN',
      userMessage: '钱包登录失败',
      suggestions: [],
      canRetry: true
    }

    // 分析错误类型
    if (error.message) {
      const errorMessage = error.message.toLowerCase()
      
      // 网络相关错误
      if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
        errorInfo.errorCode = 'NETWORK_ERROR'
        errorInfo.errorType = 'NETWORK'
        errorInfo.userMessage = '网络连接失败，请检查网络设置'
        errorInfo.suggestions = [
          '检查网络连接是否正常',
          '检查VPN设置',
          '尝试切换网络',
          '稍后重试'
        ]
        errorInfo.canRetry = true
      }
      
      // 钱包连接错误
      else if (errorMessage.includes('wallet') || errorMessage.includes('metamask') || errorMessage.includes('provider')) {
        errorInfo.errorCode = 'WALLET_CONNECTION_ERROR'
        errorInfo.errorType = 'WALLET'
        errorInfo.userMessage = '钱包连接失败，请检查钱包状态'
        errorInfo.suggestions = [
          '确保MetaMask已安装并解锁',
          '检查钱包是否连接到正确的网络',
          '尝试重新连接钱包',
          '刷新页面后重试'
        ]
        errorInfo.canRetry = true
      }
      
      // 用户拒绝错误
      else if (errorMessage.includes('user rejected') || errorMessage.includes('user denied') || errorMessage.includes('cancel')) {
        errorInfo.errorCode = 'USER_REJECTED'
        errorInfo.errorType = 'USER_ACTION'
        errorInfo.userMessage = '用户取消了钱包连接操作'
        errorInfo.suggestions = [
          '请重新点击"连接钱包"按钮',
          '在MetaMask中确认连接请求',
          '检查MetaMask弹窗是否被阻止'
        ]
        errorInfo.canRetry = true
      }
      
      // 链ID错误
      else if (errorMessage.includes('chain') || errorMessage.includes('network') || errorMessage.includes('unsupported')) {
        errorInfo.errorCode = 'CHAIN_ID_ERROR'
        errorInfo.errorType = 'NETWORK'
        errorInfo.userMessage = '网络不支持，请切换到正确的网络'
        errorInfo.suggestions = [
          '切换到BSC测试网 (Chain ID: 97)',
          '检查钱包网络设置',
          '确保网络配置正确'
        ]
        errorInfo.canRetry = true
      }
      
      // 签名错误
      else if (errorMessage.includes('signature') || errorMessage.includes('sign') || errorMessage.includes('personal_sign')) {
        errorInfo.errorCode = 'SIGNATURE_ERROR'
        errorInfo.errorType = 'SIGNATURE'
        errorInfo.userMessage = '消息签名失败，请重试'
        errorInfo.suggestions = [
          '在MetaMask中确认签名请求',
          '检查签名消息内容',
          '重新尝试签名操作'
        ]
        errorInfo.canRetry = true
      }
      
      // 服务器错误
      else if (errorMessage.includes('server') || errorMessage.includes('500') || errorMessage.includes('502') || errorMessage.includes('503')) {
        errorInfo.errorCode = 'SERVER_ERROR'
        errorInfo.errorType = 'SERVER'
        errorInfo.userMessage = '服务器暂时不可用，请稍后重试'
        errorInfo.suggestions = [
          '稍后重试',
          '检查服务状态',
          '联系客服支持'
        ]
        errorInfo.canRetry = true
      }
      
      // 认证错误
      else if (errorMessage.includes('unauthorized') || errorMessage.includes('401') || errorMessage.includes('auth')) {
        errorInfo.errorCode = 'AUTH_ERROR'
        errorInfo.errorType = 'AUTH'
        errorInfo.userMessage = '认证失败，请重新登录'
        errorInfo.suggestions = [
          '重新连接钱包',
          '清除浏览器缓存',
          '检查登录状态'
        ]
        errorInfo.canRetry = true
      }
      
      // 钱包未绑定错误
      else if (errorMessage.includes('not bound') || errorMessage.includes('wallet not bound')) {
        errorInfo.errorCode = 'WALLET_NOT_BOUND'
        errorInfo.errorType = 'BINDING'
        errorInfo.userMessage = '该钱包地址未绑定用户账户'
        errorInfo.suggestions = [
          '使用已绑定的钱包地址',
          '联系客服绑定新钱包',
          '检查钱包地址是否正确'
        ]
        errorInfo.canRetry = false
      }
      
      // 余额不足错误
      else if (errorMessage.includes('insufficient') || errorMessage.includes('balance') || errorMessage.includes('gas')) {
        errorInfo.errorCode = 'INSUFFICIENT_BALANCE'
        errorInfo.errorType = 'BALANCE'
        errorInfo.userMessage = '钱包余额不足，无法完成操作'
        errorInfo.suggestions = [
          '检查钱包BNB余额',
          '确保有足够的Gas费用',
          '充值后重试'
        ]
        errorInfo.canRetry = true
      }
    }

    // 检查HTTP状态码
    if (error.response) {
      const statusCode = error.response.status
      errorInfo.httpStatus = statusCode
      
      switch (statusCode) {
        case 400:
          errorInfo.errorCode = 'BAD_REQUEST'
          errorInfo.userMessage = '请求参数错误，请检查输入'
          break
        case 401:
          errorInfo.errorCode = 'UNAUTHORIZED'
          errorInfo.userMessage = '未授权访问，请重新登录'
          break
        case 403:
          errorInfo.errorCode = 'FORBIDDEN'
          errorInfo.userMessage = '权限不足，无法执行此操作'
          break
        case 404:
          errorInfo.errorCode = 'NOT_FOUND'
          errorInfo.userMessage = '请求的资源不存在'
          break
        case 429:
          errorInfo.errorCode = 'RATE_LIMITED'
          errorInfo.userMessage = '请求过于频繁，请稍后重试'
          break
        case 500:
          errorInfo.errorCode = 'INTERNAL_SERVER_ERROR'
          errorInfo.userMessage = '服务器内部错误，请稍后重试'
          break
        case 502:
          errorInfo.errorCode = 'BAD_GATEWAY'
          errorInfo.userMessage = '网关错误，请稍后重试'
          break
        case 503:
          errorInfo.errorCode = 'SERVICE_UNAVAILABLE'
          errorInfo.userMessage = '服务暂时不可用，请稍后重试'
          break
      }
    }

    // 添加通用建议
    if (errorInfo.suggestions.length === 0) {
      errorInfo.suggestions = [
        '检查网络连接',
        '重新连接钱包',
        '刷新页面后重试',
        '联系技术支持'
      ]
    }

    // 记录详细错误日志
    this.logWalletLoginError(error, errorInfo, { walletAddress, chainId })
    
    console.log('📋 钱包登录错误分析结果:', errorInfo)
    
    return errorInfo
  }

  // 记录钱包登录错误日志
  logWalletLoginError(error, errorInfo, context) {
    const errorLog = {
      timestamp: Date.now(),
      errorType: 'WALLET_LOGIN_ERROR',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo: errorInfo,
      context: context,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'unknown'
    }
    
    console.log('📝 钱包登录错误日志:', errorLog)
    
    // 保存到本地存储
    try {
      if (typeof window !== 'undefined') {
        const existingLogs = JSON.parse(localStorage.getItem('wallet_login_error_logs') || '[]')
        existingLogs.push(errorLog)
        
        // 只保留最近20条错误日志
        if (existingLogs.length > 20) {
          existingLogs.splice(0, existingLogs.length - 20)
        }
        
        localStorage.setItem('wallet_login_error_logs', JSON.stringify(existingLogs))
        console.log('💾 钱包登录错误日志已保存到本地存储')
      }
    } catch (e) {
      console.error('保存钱包登录错误日志失败:', e)
    }
  }

  // 触发绑定状态更新事件
  triggerBindingStatusUpdate(bindingStatus) {
    const event = new CustomEvent('walletBindingStatusUpdated', {
      detail: {
        ...bindingStatus,
        timestamp: Date.now()
      }
    })
    window.dispatchEvent(event)
    console.log('触发钱包绑定状态更新事件:', bindingStatus)
  }

  // 触发绑定错误事件
  triggerBindingError(error) {
    const event = new CustomEvent('walletBindingError', {
      detail: {
        error: error.message || '钱包绑定检测失败',
        timestamp: Date.now()
      }
    })
    window.dispatchEvent(event)
    console.log('触发钱包绑定错误事件:', error)
  }

  // 手动检测钱包绑定状态
  async manualCheckBinding(walletAddress, chainId) {
    console.log('手动检测钱包绑定状态:', walletAddress)
    
    // 强制清除本地缓存
    this.clearLocalCache()
    
    return await this.checkWalletBindingStatus(walletAddress, chainId)
  }

  // 清除本地缓存状态
  clearLocalCache() {
    console.log('🧹 钱包绑定服务清除本地缓存状态...')
    
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
    
    console.log('✅ 钱包绑定服务本地缓存状态清除完成')
  }

  // 初始化服务
  init() {
    if (this.isInitialized) return true
    
    this.isInitialized = true
    console.log('✅ 钱包绑定检测服务初始化成功')
    
    // 开发环境下添加调试工具
    if (process.env.NODE_ENV === 'development') {
      this.setupDebugTools()
    }
    
    return true
  }

  // 设置调试工具
  setupDebugTools() {
    if (typeof window !== 'undefined') {
      console.log('🔧 开发环境 - 钱包登录错误日志查看工具已启用')
      console.log('📋 查看钱包登录错误日志: window.viewWalletLoginErrorLogs()')
      console.log('🗑️ 清除钱包登录错误日志: window.clearWalletLoginErrorLogs()')
      
      // 添加全局调试方法
      window.viewWalletLoginErrorLogs = () => {
        try {
          const logs = JSON.parse(localStorage.getItem('wallet_login_error_logs') || '[]')
          console.log('📋 钱包登录错误日志:', logs)
          
          if (logs.length === 0) {
            console.log('✅ 暂无钱包登录错误日志')
          } else {
            console.log(`📊 共 ${logs.length} 条钱包登录错误日志`)
            logs.forEach((log, index) => {
              console.log(`--- 错误日志 ${index + 1} ---`)
              console.log('时间:', new Date(log.timestamp).toLocaleString())
              console.log('错误类型:', log.errorInfo.errorType)
              console.log('错误代码:', log.errorInfo.errorCode)
              console.log('用户消息:', log.errorInfo.userMessage)
              console.log('错误详情:', log.error.message)
              console.log('建议:', log.errorInfo.suggestions)
              console.log('可重试:', log.errorInfo.canRetry)
            })
          }
        } catch (error) {
          console.error('查看钱包登录错误日志失败:', error)
        }
      }
      
      window.clearWalletLoginErrorLogs = () => {
        try {
          localStorage.removeItem('wallet_login_error_logs')
          console.log('🗑️ 钱包登录错误日志已清除')
        } catch (error) {
          console.error('清除钱包登录错误日志失败:', error)
        }
      }
      
      window.analyzeWalletLoginError = (errorMessage) => {
        try {
          // 模拟错误对象进行分析
          const mockError = { message: errorMessage }
          const analysis = this.analyzeWalletLoginError(mockError, '0x...', 97)
          console.log('🔍 错误分析结果:', analysis)
          return analysis
        } catch (error) {
          console.error('分析错误失败:', error)
        }
      }
    }
  }
}

// 创建单例实例
const walletBindingService = new WalletBindingService()

// 导出实例和类
export default walletBindingService
export { WalletBindingService } 
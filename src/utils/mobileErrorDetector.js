/**
 * 移动端错误检测工具
 * 专门用于检测和分析移动端的钱包连接和交易错误
 */

class MobileErrorDetector {
  constructor() {
    this.isMobile = this.detectMobileDevice()
    this.deviceInfo = this.getDeviceInfo()
    this.errorLogs = []
    this.maxLogs = 10
  }

  /**
   * 检测是否为移动设备
   */
  detectMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase())
  }

  /**
   * 获取设备信息
   */
  getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      isMobile: this.isMobile,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight
    }
  }

  /**
   * 检测移动端钱包环境
   */
  async detectWalletEnvironment() {
    const environment = {
      hasEthereum: typeof window.ethereum !== 'undefined',
      hasMetaMask: false,
      isUnlocked: false,
      isConnected: false,
      currentAccount: null,
      chainId: null,
      networkName: null
    }

    try {
      if (environment.hasEthereum) {
        // 检测MetaMask
        environment.hasMetaMask = window.ethereum.isMetaMask || false
        
        // 检测是否解锁
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          environment.isUnlocked = accounts.length > 0
          environment.isConnected = accounts.length > 0
          environment.currentAccount = accounts[0] || null
        } catch (error) {
          console.log('检测钱包解锁状态失败:', error.message)
        }

        // 检测网络
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' })
          environment.chainId = parseInt(chainId, 16)
          environment.networkName = this.getNetworkName(environment.chainId)
        } catch (error) {
          console.log('检测网络状态失败:', error.message)
        }
      }
    } catch (error) {
      console.error('检测钱包环境失败:', error)
    }

    return environment
  }

  /**
   * 获取网络名称
   */
  getNetworkName(chainId) {
    const networks = {
      1: 'Ethereum Mainnet',
      97: 'BSC Testnet',
      137: 'Polygon',
      80001: 'Mumbai Testnet'
    }
    return networks[chainId] || `Unknown Network (${chainId})`
  }

  /**
   * 分析移动端错误
   */
  analyzeMobileError(error, context = {}) {
    console.log('🔍 开始分析移动端错误...', {
      error: error.message,
      context,
      deviceInfo: this.deviceInfo
    })

    const analysis = {
      isMobile: this.isMobile,
      deviceInfo: this.deviceInfo,
      errorType: 'UNKNOWN',
      userMessage: '移动端连接失败',
      details: '',
      suggestions: [],
      technicalDetails: {
        originalError: error.message,
        errorStack: error.stack,
        context: context
      }
    }

    // 分析错误类型
    if (error.message) {
      const errorMessage = error.message.toLowerCase()
      
      // 移动端特殊错误
      if (errorMessage.includes('mobile') || errorMessage.includes('android') || errorMessage.includes('ios')) {
        analysis.errorType = 'MOBILE_SPECIFIC'
        analysis.userMessage = '移动端兼容性问题'
        analysis.details = '检测到移动端特定的错误，可能是设备兼容性问题'
        analysis.suggestions = [
          '确保使用最新版本的MetaMask',
          '尝试在桌面端操作',
          '检查移动端网络设置',
          '清除浏览器缓存和Cookie',
          '联系技术支持'
        ]
      }
      
      // 网络连接错误
      else if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
        analysis.errorType = 'NETWORK_ERROR'
        analysis.userMessage = '网络连接失败'
        analysis.details = '移动端网络连接不稳定，可能是网络问题或VPN设置'
        analysis.suggestions = [
          '检查移动网络或WiFi连接',
          '尝试切换网络（4G/5G/WiFi）',
          '检查VPN设置',
          '稍后重试',
          '联系网络运营商'
        ]
      }
      
      // 钱包连接错误
      else if (errorMessage.includes('wallet') || errorMessage.includes('metamask') || errorMessage.includes('provider')) {
        analysis.errorType = 'WALLET_ERROR'
        analysis.userMessage = '钱包连接失败'
        analysis.details = '移动端MetaMask连接问题，可能是钱包状态或权限问题'
        analysis.suggestions = [
          '确保MetaMask已安装并解锁',
          '检查钱包是否连接到正确的网络',
          '尝试重新连接钱包',
          '检查浏览器权限设置',
          '刷新页面后重试'
        ]
      }
      
      // 用户拒绝错误
      else if (errorMessage.includes('user rejected') || errorMessage.includes('user denied') || errorMessage.includes('cancel')) {
        analysis.errorType = 'USER_REJECTED'
        analysis.userMessage = '用户取消了操作'
        analysis.details = '您在移动端MetaMask中取消了操作'
        analysis.suggestions = [
          '请重新点击确认按钮',
          '在MetaMask中确认操作请求',
          '检查MetaMask弹窗是否被阻止',
          '确保MetaMask在前台运行'
        ]
      }
      
      // 其他错误
      else {
        analysis.errorType = 'GENERAL_ERROR'
        analysis.userMessage = '移动端操作失败'
        analysis.details = `发生未知错误: ${error.message}`
        analysis.suggestions = [
          '刷新页面后重试',
          '检查钱包状态',
          '尝试在桌面端操作',
          '联系技术支持'
        ]
      }
    }

    // 记录错误日志
    this.logError(analysis)

    console.log('📋 移动端错误分析完成:', analysis)
    return analysis
  }

  /**
   * 记录错误日志
   */
  logError(analysis) {
    const errorLog = {
      timestamp: new Date().toISOString(),
      analysis: analysis,
      deviceInfo: this.deviceInfo
    }
    
    this.errorLogs.push(errorLog)
    
    // 限制日志数量
    if (this.errorLogs.length > this.maxLogs) {
      this.errorLogs = this.errorLogs.slice(-this.maxLogs)
    }
    
    // 保存到本地存储
    try {
      localStorage.setItem('mobile_error_logs', JSON.stringify(this.errorLogs))
    } catch (e) {
      console.error('保存移动端错误日志失败:', e)
    }
  }

  /**
   * 获取错误日志
   */
  getErrorLogs() {
    return this.errorLogs
  }

  /**
   * 清除错误日志
   */
  clearErrorLogs() {
    this.errorLogs = []
    try {
      localStorage.removeItem('mobile_error_logs')
    } catch (e) {
      console.error('清除移动端错误日志失败:', e)
    }
  }

  /**
   * 生成移动端错误报告
   */
  generateErrorReport() {
    return {
      deviceInfo: this.deviceInfo,
      errorLogs: this.errorLogs,
      summary: {
        totalErrors: this.errorLogs.length,
        lastError: this.errorLogs[this.errorLogs.length - 1],
        timestamp: new Date().toISOString()
      }
    }
  }

  /**
   * 检查移动端常见问题
   */
  async checkCommonMobileIssues() {
    const issues = []
    
    try {
      // 检查钱包环境
      const walletEnv = await this.detectWalletEnvironment()
      
      if (!walletEnv.hasEthereum) {
        issues.push({
          type: 'NO_ETHEREUM',
          severity: 'high',
          message: '未检测到以太坊环境',
          suggestion: '请安装MetaMask钱包'
        })
      }
      
      if (!walletEnv.hasMetaMask) {
        issues.push({
          type: 'NO_METAMASK',
          severity: 'high',
          message: '未检测到MetaMask',
          suggestion: '请安装MetaMask钱包'
        })
      }
      
      if (!walletEnv.isUnlocked) {
        issues.push({
          type: 'WALLET_LOCKED',
          severity: 'medium',
          message: '钱包已锁定',
          suggestion: '请在MetaMask中解锁钱包'
        })
      }
      
      if (walletEnv.chainId && ![97].includes(walletEnv.chainId)) {
        issues.push({
          type: 'WRONG_NETWORK',
          severity: 'medium',
          message: `当前网络不支持: ${walletEnv.networkName}`,
          suggestion: '请切换到BSC网络'
        })
      }
      
      // 检查网络连接
      if (!navigator.onLine) {
        issues.push({
          type: 'OFFLINE',
          severity: 'high',
          message: '设备处于离线状态',
          suggestion: '请检查网络连接'
        })
      }
      
    } catch (error) {
      console.error('检查移动端常见问题失败:', error)
    }
    
    return issues
  }
}

// 创建单例实例
const mobileErrorDetector = new MobileErrorDetector()

export default mobileErrorDetector
export { MobileErrorDetector } 
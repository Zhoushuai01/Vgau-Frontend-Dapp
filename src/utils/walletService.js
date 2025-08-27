// 钱包服务工具
import { walletAuthAPI, authAPI } from '@/api/apiService.js'

// 检查用户是否已登录 - 强制从后端获取最新数据
export const checkUserLoginStatus = async () => {
  try {
    console.log('🔍 强制从后端检查用户登录状态...')
    
    // 强制从后端获取最新数据，不依赖缓存
    const response = await authAPI.getMe()
    
    if (response && response.success) {
      console.log('✅ 从后端获取到用户已登录状态:', response.data)
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
    console.log('❌ 从后端检查用户登录状态失败:', error.message)
    return {
      isLoggedIn: false,
      userData: null
    }
  }
}

// 检查钱包是否已连接
export const checkWalletConnection = async () => {
  try {
    // 检查是否有可用的钱包
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      return accounts.length > 0 ? accounts[0] : null
    }
    return null
  } catch (error) {
    console.error('检查钱包连接失败:', error)
    return null
  }
}

// 连接钱包
export const connectWallet = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      return accounts[0]
    } else {
      throw new Error('未检测到MetaMask钱包')
    }
  } catch (error) {
    console.error('连接钱包失败:', error)
    throw error
  }
}

// 验证chainId格式
const validateChainId = (chainId) => {
  if (!chainId) return false
  // 检查是否为有效的10进制数字
  return typeof chainId === 'number' && chainId > 0 && Number.isInteger(chainId)
}

// 创建签名挑战
export const createSignatureChallenge = async (walletAddress, chainId) => {
  try {
    // 验证必需参数
    if (!walletAddress) {
      throw new Error('钱包地址不能为空')
    }
    if (!chainId) {
      throw new Error('链ID不能为空，chainId是必需的参数')
    }
    
    // 验证chainId格式
    if (!validateChainId(chainId)) {
      throw new Error('链ID格式无效，必须是10进制数字')
    }
    
    console.log('🔥 调用挑战接口 /wallet/login/challenge，参数:', { 
      walletAddress, 
      chainId,
      chainIdType: typeof chainId 
    })
    
    const response = await walletAuthAPI.createLoginChallenge(walletAddress, chainId)
    console.log('✅ 挑战接口响应:', response)
    return response
  } catch (error) {
    console.error('❌ 创建签名挑战失败:', error)
    console.error('错误详情:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    })
    throw error
  }
}

// 签名消息
export const signMessage = async (message, walletAddress) => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      })
      return signature
    } else {
      throw new Error('未检测到MetaMask钱包')
    }
  } catch (error) {
    console.error('签名消息失败:', error)
    throw error
  }
}

// 验证签名
export const verifySignature = async (data) => {
  try {
    console.log('🔥 调用确认接口 /wallet/login/confirm，参数:', data)
    const response = await walletAuthAPI.verifyLoginSignature(data)
    console.log('✅ 确认接口响应:', response)
    return response
  } catch (error) {
    console.error('❌ 验证签名失败:', error)
    throw error
  }
}

// 智能用户验证（优先检查登录状态，未登录才进行钱包验证）
export const smartUserVerify = async () => {
  try {
    console.log('🚀 开始智能用户验证...')
    
    // 1. 首先检查用户是否已经登录
    const loginStatus = await checkUserLoginStatus()
    
    if (loginStatus.isLoggedIn) {
      console.log('✅ 用户已登录，跳过钱包验证')
      return {
        success: true,
        isLoggedIn: true,
        userData: loginStatus.userData,
        skipWalletCheck: true
      }
    }
    
    console.log('⚠️ 用户未登录，需要进行钱包验证')
    
    // 2. 如果用户未登录，执行钱包登录流程
    const walletResult = await walletLogin()
    
    if (walletResult.success) {
      return {
        success: true,
        isLoggedIn: true,
        walletAddress: walletResult.walletAddress,
        userData: walletResult.userData,
        token: walletResult.token,
        skipWalletCheck: false
      }
    } else {
      return walletResult
    }
    
  } catch (error) {
    console.error('智能用户验证失败:', error)
    return {
      success: false,
      error: 'SMART_VERIFY_FAILED',
      message: error.message || '用户验证失败'
    }
  }
}

// 完整的钱包登录流程
export const walletLogin = async () => {
  try {
    // 1. 检查钱包连接
    let walletAddress = await checkWalletConnection()
    
    if (!walletAddress) {
      // 2. 如果未连接，则连接钱包
      walletAddress = await connectWallet()
    }
    
    // 3. 获取当前链ID
    const chainId = await getCurrentChainId()
    
    // 验证chainId是否获取成功
    if (!chainId) {
      return {
        success: false,
        error: 'CHAIN_ID_MISSING',
        message: '无法获取当前网络链ID，请确保钱包已连接并切换到正确的网络'
      }
    }
    
    // 4. 创建签名挑战
    const challengeResponse = await createSignatureChallenge(walletAddress, chainId)
    
    // 5. 签名挑战消息 - 使用正确的字段名
    const signature = await signMessage(challengeResponse.data.challengeMessage, walletAddress)
    
    // 6. 验证签名 - 使用最新API文档要求的格式（已删除challengeId）
    const verifyData = {
      signature,
      signerAddress: walletAddress
    }
    
    const loginResult = await verifySignature(verifyData)
    
    return {
      success: true,
      walletAddress,
      userData: loginResult.userData,
      token: loginResult.token
    }
    
  } catch (error) {
    console.error('钱包登录失败:', error)
    
    // 分析错误类型并提供详细描述
    const errorAnalysis = analyzeWalletLoginError(error)
    
    // 检查是否是钱包未绑定的错误
    if (error.response && error.response.status === 400) {
      const errorData = error.response.data
      if (errorData.code === 'WALLET_NOT_BOUND') {
        return {
          success: false,
          error: 'WALLET_NOT_BOUND',
          message: errorData.message || '钱包未绑定用户账户',
          details: errorAnalysis.details,
          suggestions: errorAnalysis.suggestions
        }
      }
    }
    
    return {
      success: false,
      error: 'LOGIN_FAILED',
      message: errorAnalysis.userMessage,
      details: errorAnalysis.details,
      suggestions: errorAnalysis.suggestions
    }
  }
}

// 获取当前链ID
export const getCurrentChainId = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      // 将16进制转换为10进制数字
      return parseInt(chainId, 16)
    }
    return null
  } catch (error) {
    console.error('获取链ID失败:', error)
    return null
  }
}

// 检查网络连接
export const checkNetwork = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      // 将16进制转换为10进制数字
      return parseInt(chainId, 16)
    }
    return null
  } catch (error) {
    console.error('检查网络失败:', error)
    return null
  }
}

// 切换网络
export const switchNetwork = async (chainId) => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      })
      return true
    }
    return false
  } catch (error) {
    console.error('切换网络失败:', error)
    return false
  }
}

// 测试函数：验证chainId的必需性
export const testChainIdRequirement = async () => {
  console.log('=== 测试 chainId 必需性 ===')
  
  try {
    // 测试1: 不传递chainId参数
    console.log('测试1: 尝试不传递chainId参数')
    try {
      await createSignatureChallenge('0x1234567890abcdef', null)
      console.log('❌ 测试失败：应该抛出错误')
    } catch (error) {
      console.log('✅ 测试通过：正确抛出了chainId缺失错误')
      console.log('错误信息:', error.message)
    }
    
    // 测试2: 传递字符串格式
    console.log('测试2: 尝试传递字符串格式的chainId')
    try {
      await createSignatureChallenge('0x1234567890abcdef', '1')
      console.log('❌ 测试失败：应该抛出错误')
    } catch (error) {
      console.log('✅ 测试通过：正确抛出了chainId格式错误')
      console.log('错误信息:', error.message)
    }
    
    // 测试3: 传递有效的chainId (10进制数字)
    console.log('测试3: 尝试传递有效的chainId (10进制数字)')
    try {
      await createSignatureChallenge('0x1234567890abcdef', 1) // 以太坊主网 chainId = 1
      console.log('✅ 测试通过：有效参数没有抛出错误')
    } catch (error) {
      console.log('❌ 测试失败：有效参数不应该抛出错误')
      console.log('错误信息:', error.message)
    }
    
    // 测试4: 传递BSC测试网chainId
    console.log('测试4: 尝试传递BSC测试网chainId')
    try {
      await createSignatureChallenge('0x1234567890abcdef', 97) // BSC测试网 chainId = 97
      console.log('✅ 测试通过：BSC测试网chainId有效')
    } catch (error) {
      console.log('❌ 测试失败：BSC测试网chainId应该有效')
      console.log('错误信息:', error.message)
    }
    
  } catch (error) {
    console.error('测试过程中发生错误:', error)
  }
}

/**
 * 分析钱包登录错误并提供详细描述
 */
function analyzeWalletLoginError(error) {
  console.log('🔍 分析钱包登录错误:', error)
  
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
  
  const errorInfo = {
    userMessage: '钱包登录失败',
    details: '',
    suggestions: []
  }

  // 分析错误类型
  if (error.message) {
    const errorMessage = error.message.toLowerCase()
    
    // 网络相关错误
    if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout') || errorMessage.includes('connection')) {
      errorInfo.userMessage = '网络连接失败'
      errorInfo.details = '无法连接到服务器，可能是网络问题或服务器暂时不可用'
      errorInfo.suggestions = [
        '检查网络连接是否正常',
        '检查VPN设置',
        '尝试切换网络',
        '稍后重试'
      ]
    }
    
    // 钱包连接错误
    else if (errorMessage.includes('wallet') || errorMessage.includes('metamask') || errorMessage.includes('provider') || errorMessage.includes('ethereum')) {
      errorInfo.userMessage = '钱包连接失败'
      errorInfo.details = '无法连接到MetaMask钱包，请检查钱包状态'
      errorInfo.suggestions = [
        '确保MetaMask已安装并解锁',
        '检查钱包是否连接到正确的网络',
        '尝试重新连接钱包',
        '刷新页面后重试'
      ]
    }
    
    // 用户拒绝错误
    else if (errorMessage.includes('user rejected') || errorMessage.includes('user denied') || errorMessage.includes('cancel') || errorMessage.includes('rejected')) {
      errorInfo.userMessage = '用户取消了操作'
      errorInfo.details = '您在MetaMask中取消了钱包连接或签名请求'
      errorInfo.suggestions = [
        '请重新点击"连接钱包"按钮',
        '在MetaMask中确认连接请求',
        '检查MetaMask弹窗是否被阻止'
      ]
    }
    
    // 链ID错误
    else if (errorMessage.includes('chain') || errorMessage.includes('network') || errorMessage.includes('unsupported') || errorMessage.includes('chainid')) {
      errorInfo.userMessage = '网络不支持'
      errorInfo.details = '当前网络不被支持，请切换到正确的网络'
      errorInfo.suggestions = [
        '切换到BSC测试网 (Chain ID: 97)',
        '检查钱包网络设置',
        '确保网络配置正确'
      ]
    }
    
    // 签名错误
    else if (errorMessage.includes('signature') || errorMessage.includes('sign') || errorMessage.includes('personal_sign') || errorMessage.includes('signing')) {
      errorInfo.userMessage = '消息签名失败'
      errorInfo.details = '无法完成消息签名，可能是钱包问题或用户拒绝'
      errorInfo.suggestions = [
        '在MetaMask中确认签名请求',
        '检查签名消息内容',
        '重新尝试签名操作'
      ]
    }
    
    // 服务器错误
    else if (errorMessage.includes('server') || errorMessage.includes('500') || errorMessage.includes('502') || errorMessage.includes('503') || errorMessage.includes('http')) {
      errorInfo.userMessage = '服务器暂时不可用'
      errorInfo.details = '服务器可能正在维护或遇到技术问题'
      errorInfo.suggestions = [
        '稍后重试',
        '检查服务状态',
        '联系客服支持'
      ]
    }
    
    // 认证错误
    else if (errorMessage.includes('auth') || errorMessage.includes('unauthorized') || errorMessage.includes('401') || errorMessage.includes('login')) {
      errorInfo.userMessage = '认证失败'
      errorInfo.details = '用户认证信息无效或已过期'
      errorInfo.suggestions = [
        '重新登录',
        '清除浏览器缓存',
        '检查登录状态'
      ]
    }
    
    // 移动端特殊错误
    else if (errorMessage.includes('mobile') || errorMessage.includes('android') || errorMessage.includes('ios') || errorMessage.includes('phone')) {
      errorInfo.userMessage = '移动端连接问题'
      errorInfo.details = '移动端钱包连接可能存在兼容性问题'
      errorInfo.suggestions = [
        '确保使用最新版本的MetaMask',
        '尝试在桌面端操作',
        '检查移动端网络设置',
        '联系技术支持'
      ]
    }
    
    // 其他未知错误
    else {
      errorInfo.userMessage = '连接失败，请重试'
      errorInfo.details = `发生未知错误: ${error.message}`
      errorInfo.suggestions = [
        '刷新页面后重试',
        '检查钱包状态',
        '联系技术支持',
        '查看控制台错误日志'
      ]
    }
  }
  
  // 如果没有错误消息，提供通用描述
  if (!error.message) {
    errorInfo.userMessage = '连接失败，请重试'
    errorInfo.details = '钱包连接过程中发生未知错误'
    errorInfo.suggestions = [
      '刷新页面后重试',
      '检查钱包状态',
      '联系技术支持'
    ]
  }
  
  console.log('📋 错误分析结果:', errorInfo)
  console.log('🔍 最终错误信息:', {
    用户消息: errorInfo.userMessage,
    错误详情: errorInfo.details,
    解决建议: errorInfo.suggestions,
    设备类型: isMobile ? '移动端' : '桌面端',
    原始错误: error.message
  })
  return errorInfo
} 
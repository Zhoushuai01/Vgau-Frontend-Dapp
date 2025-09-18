// 钱包服务工具
import { walletAuthAPI, authAPI } from '@/api/apiService.js'
import web3Service from './web3.js'

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

// 获取用户绑定的钱包地址
export const getBoundWalletAddress = async () => {
  try {
    console.log('🔍 获取用户绑定的钱包地址...')
    
    // 首先检查当前连接的钱包地址
    const currentWalletAddress = await checkWalletConnection()
    if (!currentWalletAddress) {
      console.log('❌ 未检测到连接的钱包')
      return null
    }
    
    // 获取当前链ID
    const chainId = await getCurrentChainId()
    if (!chainId) {
      console.log('❌ 无法获取链ID')
      return null
    }
    
    // 调用 /api/wallet/login/challenge 接口获取钱包地址
    const response = await walletAuthAPI.createLoginChallenge(currentWalletAddress, chainId)
    
    if (response && response.data && response.data.walletAddress) {
      const walletAddress = response.data.walletAddress
      console.log('✅ 从 /api/wallet/login/challenge 获取到钱包地址:', walletAddress)
      return walletAddress
    } else {
      console.log('⚠️ /api/wallet/login/challenge 响应中未找到 walletAddress')
      return null
    }
  } catch (error) {
    console.error('❌ 获取用户绑定钱包地址失败:', error)
    return null
  }
}

// 检查钱包是否已连接
export const checkWalletConnection = async () => {
  try {
    // 确保web3Service已初始化
    if (!web3Service.web3) {
      await web3Service.init()
    }
    
    // 使用web3Service获取当前账户
    if (web3Service.isConnected && web3Service.currentAccount) {
      console.log('✅ 通过web3Service获取到钱包地址:', web3Service.currentAccount)
      return web3Service.currentAccount
    }
    
    console.log('⚠️ web3Service未连接或没有当前账户')
    return null
  } catch (error) {
    console.error('检查钱包连接失败:', error)
    return null
  }
}

// 连接钱包
export const connectWallet = async () => {
  try {
    // 确保web3Service已初始化
    if (!web3Service.web3) {
      await web3Service.init()
    }
    
    // 使用web3Service连接钱包
    const result = await web3Service.connectWallet()
    
    if (result.success) {
      console.log('✅ 通过web3Service连接钱包成功:', result.account)
      return result.account
    } else {
      throw new Error(result.message || '钱包连接失败')
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
    console.log('🔍 验证链ID:', { 
      chainId, 
      type: typeof chainId, 
      isNumber: typeof chainId === 'number',
      isInteger: Number.isInteger(chainId),
      isPositive: chainId > 0
    })
    
    if (!validateChainId(chainId)) {
      throw new Error(`链ID格式无效，必须是10进制数字。当前值: ${chainId} (类型: ${typeof chainId})`)
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

// 智能用户验证（直接进行钱包验证）
export const smartUserVerify = async () => {
  try {
    console.log('🚀 开始钱包验证...')
    
    // 直接执行钱包登录流程
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
    console.error('钱包验证失败:', error)
    return {
      success: false,
      error: 'WALLET_VERIFY_FAILED',
      message: error.message || '钱包验证失败'
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
    
    console.log('🔗 获取到钱包信息:', { walletAddress, chainId })
    
    // 4. 创建签名挑战
    const challengeResponse = await createSignatureChallenge(walletAddress, chainId)
    
    // 5. 签名挑战消息
    const signature = await signMessage(challengeResponse.data.challengeMessage, walletAddress)
    
    // 6. 验证签名
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
    // 确保web3Service已初始化
    if (!web3Service.web3) {
      await web3Service.init()
    }
    
    // 使用web3Service获取链ID
    const chainId = await web3Service.getChainId()
    
    if (chainId) {
      console.log('✅ 通过web3Service获取到链ID:', { 
        chainId, 
        type: typeof chainId,
        isNumber: typeof chainId === 'number',
        isInteger: Number.isInteger(chainId)
      })
      return chainId
    }
    
    console.log('⚠️ 无法获取链ID')
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

/**
 * 断开钱包连接并清除所有权限
 * 包括断开"查看您的账户并建议交易"和"使用您启用的网络"权限
 */
export const disconnectWallet = async () => {
  try {
    console.log('开始断开钱包连接...')
    
    // 1. 检查是否有ethereum provider
    if (typeof window.ethereum === 'undefined') {
      console.log('未检测到钱包，无需断开连接')
      return {
        success: true,
        message: '未检测到钱包连接'
      }
    }

    // 2. 尝试断开钱包连接
    // 注意：MetaMask等钱包可能不支持直接断开连接，但我们可以清除本地状态
    try {
      // 尝试使用wallet_revokePermissions方法（如果支持）
      if (window.ethereum.request) {
        // 获取当前权限
        const permissions = await window.ethereum.request({
          method: 'wallet_getPermissions'
        }).catch(() => [])
        
        console.log('当前权限:', permissions)
        
        // 如果有权限，尝试撤销
        if (permissions && permissions.length > 0) {
          for (const permission of permissions) {
            try {
              await window.ethereum.request({
                method: 'wallet_revokePermissions',
                params: [permission.caveats]
              })
              console.log('已撤销权限:', permission.caveats)
            } catch (revokeError) {
              console.log('撤销权限失败（可能不支持）:', revokeError.message)
            }
          }
        }
      }
    } catch (permissionError) {
      console.log('权限管理失败（可能不支持）:', permissionError.message)
    }

    // 3. 清除本地存储的认证信息
    try {
      // 清除localStorage中的认证相关数据
      const authKeys = [
        'userToken',
        'walletAddress', 
        'userData',
        'authToken',
        'loginStatus',
        'walletConnection',
        'userLoginData'
      ]
      
      authKeys.forEach(key => {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      })
      
      console.log('已清除本地认证数据')
    } catch (storageError) {
      console.error('清除本地存储失败:', storageError)
    }

    // 4. 清除Web3相关状态
    try {
      // 如果存在全局Web3实例，重置其状态
      if (window.web3Service) {
        window.web3Service.disconnect(true)
      }
      
      // 清除全局状态
      if (window.ethereum && window.ethereum.removeAllListeners) {
        window.ethereum.removeAllListeners('accountsChanged')
        window.ethereum.removeAllListeners('chainChanged')
        window.ethereum.removeAllListeners('disconnect')
      }
      
      console.log('已清除Web3状态')
    } catch (web3Error) {
      console.error('清除Web3状态失败:', web3Error)
    }

    // 5. 触发账户变化事件（模拟断开连接）
    try {
      // 手动触发accountsChanged事件，传入空数组表示断开连接
      if (window.ethereum && window.ethereum.emit) {
        window.ethereum.emit('accountsChanged', [])
      }
      
      // 或者直接设置accounts为空
      if (window.ethereum && window.ethereum._state) {
        window.ethereum._state.accounts = []
      }
      
      console.log('已触发断开连接事件')
    } catch (eventError) {
      console.error('触发断开连接事件失败:', eventError)
    }

    // 6. 调用后端登出API（如果用户已登录）
    try {
      const { logout } = await import('@/api/apiService.js')
      await logout()
      console.log('后端登出成功')
    } catch (apiError) {
      console.log('后端登出失败（可能未登录）:', apiError.message)
    }

    console.log('✅ 钱包断开连接完成')
    
    return {
      success: true,
      message: '钱包已断开连接，所有权限已清除'
    }

  } catch (error) {
    console.error('断开钱包连接失败:', error)
    
    // 即使出错，也尝试清除本地状态
    try {
      localStorage.clear()
      sessionStorage.clear()
    } catch (clearError) {
      console.error('清除存储失败:', clearError)
    }
    
    return {
      success: false,
      error: error.message,
      message: '断开连接时出现错误，但已清除本地状态'
    }
  }
}

/**
 * 检查钱包是否已断开连接
 */
export const isWalletDisconnected = () => {
  try {
    // 检查localStorage中是否有认证信息
    const hasAuthData = localStorage.getItem('userToken') || 
                       localStorage.getItem('walletAddress') ||
                       localStorage.getItem('authToken')
    
    // 检查ethereum provider状态
    const hasEthereum = typeof window.ethereum !== 'undefined'
    const hasAccounts = hasEthereum && window.ethereum.selectedAddress
    
    // 如果本地没有认证数据且钱包没有选中账户，则认为已断开
    return !hasAuthData && (!hasEthereum || !hasAccounts)
  } catch (error) {
    console.error('检查断开连接状态失败:', error)
    return true // 出错时认为已断开
  }
}

/**
 * 强制断开所有连接（用于错误恢复）
 */
export const forceDisconnectAll = async () => {
  try {
    console.log('强制断开所有连接...')
    
    // 1. 清除所有本地存储
    localStorage.clear()
    sessionStorage.clear()
    
    // 2. 重置Web3状态
    if (window.web3Service) {
      window.web3Service.disconnect(true)
    }
    
    // 3. 移除所有事件监听器
    if (window.ethereum && window.ethereum.removeAllListeners) {
      window.ethereum.removeAllListeners()
    }
    
    // 4. 触发页面刷新（可选）
    // window.location.reload()
    
    console.log('✅ 强制断开完成')
    
    return {
      success: true,
      message: '已强制断开所有连接'
    }
  } catch (error) {
    console.error('强制断开失败:', error)
    return {
      success: false,
      error: error.message
    }
  }
}
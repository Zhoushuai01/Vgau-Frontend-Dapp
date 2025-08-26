// 钱包服务工具
import { walletAuthAPI, authAPI } from '@/api/apiService.js'

// 检查用户是否已登录
export const checkUserLoginStatus = async () => {
  try {
    console.log('🔍 检查用户登录状态...')
    const response = await authAPI.getMe()
    
    if (response && response.success) {
      console.log('✅ 用户已登录:', response.data)
      return {
        isLoggedIn: true,
        userData: response.data
      }
    } else {
      console.log('❌ 用户未登录')
      return {
        isLoggedIn: false,
        userData: null
      }
    }
  } catch (error) {
    console.log('❌ 用户未登录或登录状态检查失败:', error.message)
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
    
    // 检查是否是钱包未绑定的错误
    if (error.response && error.response.status === 400) {
      const errorData = error.response.data
      if (errorData.code === 'WALLET_NOT_BOUND') {
        return {
          success: false,
          error: 'WALLET_NOT_BOUND',
          message: errorData.message || '钱包未绑定用户账户'
        }
      }
    }
    
    return {
      success: false,
      error: 'LOGIN_FAILED',
      message: error.message || '钱包登录失败'
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
    
    // 测试4: 传递BSC主网chainId
    console.log('测试4: 尝试传递BSC主网chainId')
    try {
      await createSignatureChallenge('0x1234567890abcdef', 56) // BSC主网 chainId = 56
      console.log('✅ 测试通过：BSC主网chainId有效')
    } catch (error) {
      console.log('❌ 测试失败：BSC主网chainId应该有效')
      console.log('错误信息:', error.message)
    }
    
  } catch (error) {
    console.error('测试过程中发生错误:', error)
  }
} 
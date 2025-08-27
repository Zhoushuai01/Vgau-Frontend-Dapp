/**
 * 钱包错误类型定义
 * 提供标准化的错误代码、类型和用户友好的消息
 */

export const WALLET_ERROR_TYPES = {
  // 网络相关错误
  NETWORK_ERROR: {
    code: 'NETWORK_ERROR',
    type: 'NETWORK',
    category: 'CONNECTION',
    userMessage: '网络连接失败，请检查网络设置',
    suggestions: [
      '检查网络连接是否正常',
      '检查VPN设置',
      '尝试切换网络',
      '稍后重试'
    ],
    canRetry: true,
    severity: 'MEDIUM'
  },

  // 钱包连接错误
  WALLET_CONNECTION_ERROR: {
    code: 'WALLET_CONNECTION_ERROR',
    type: 'WALLET',
    category: 'CONNECTION',
    userMessage: '钱包连接失败，请检查钱包状态',
    suggestions: [
      '确保MetaMask已安装并解锁',
      '检查钱包是否连接到正确的网络',
      '尝试重新连接钱包',
      '刷新页面后重试'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 用户拒绝错误
  USER_REJECTED: {
    code: 'USER_REJECTED',
    type: 'USER_ACTION',
    category: 'INTERACTION',
    userMessage: '用户取消了钱包连接操作',
    suggestions: [
      '请重新点击"连接钱包"按钮',
      '在MetaMask中确认连接请求',
      '检查MetaMask弹窗是否被阻止'
    ],
    canRetry: true,
    severity: 'LOW'
  },

  // 链ID错误
  CHAIN_ID_ERROR: {
    code: 'CHAIN_ID_ERROR',
    type: 'NETWORK',
    category: 'CONFIGURATION',
    userMessage: '网络不支持，请切换到正确的网络',
    suggestions: [
      '切换到BSC测试网 (Chain ID: 97)',
      '检查钱包网络设置',
      '确保网络配置正确'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 签名错误
  SIGNATURE_ERROR: {
    code: 'SIGNATURE_ERROR',
    type: 'SIGNATURE',
    category: 'AUTHENTICATION',
    userMessage: '消息签名失败，请重试',
    suggestions: [
      '在MetaMask中确认签名请求',
      '检查签名消息内容',
      '重新尝试签名操作'
    ],
    canRetry: true,
    severity: 'MEDIUM'
  },

  // 服务器错误
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    type: 'SERVER',
    category: 'INFRASTRUCTURE',
    userMessage: '服务器暂时不可用，请稍后重试',
    suggestions: [
      '稍后重试',
      '检查服务状态',
      '联系客服支持'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 认证错误
  AUTH_ERROR: {
    code: 'AUTH_ERROR',
    type: 'AUTH',
    category: 'AUTHENTICATION',
    userMessage: '认证失败，请重新登录',
    suggestions: [
      '重新连接钱包',
      '清除浏览器缓存',
      '检查登录状态'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 钱包未绑定错误
  WALLET_NOT_BOUND: {
    code: 'WALLET_NOT_BOUND',
    type: 'BINDING',
    category: 'ACCOUNT',
    userMessage: '该钱包地址未绑定用户账户',
    suggestions: [
      '使用已绑定的钱包地址',
      '联系客服绑定新钱包',
      '检查钱包地址是否正确'
    ],
    canRetry: false,
    severity: 'CRITICAL'
  },

  // 余额不足错误
  INSUFFICIENT_BALANCE: {
    code: 'INSUFFICIENT_BALANCE',
    type: 'BALANCE',
    category: 'FINANCIAL',
    userMessage: '钱包余额不足，无法完成操作',
    suggestions: [
      '检查钱包BNB余额',
      '确保有足够的Gas费用',
      '充值后重试'
    ],
    canRetry: true,
    severity: 'MEDIUM'
  },

  // 请求参数错误
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    type: 'REQUEST',
    category: 'VALIDATION',
    userMessage: '请求参数错误，请检查输入',
    suggestions: [
      '检查输入参数是否正确',
      '确保所有必填字段都已填写',
      '检查参数格式'
    ],
    canRetry: true,
    severity: 'LOW'
  },

  // 未授权访问
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    type: 'AUTH',
    category: 'AUTHENTICATION',
    userMessage: '未授权访问，请重新登录',
    suggestions: [
      '重新连接钱包',
      '检查登录状态',
      '清除浏览器缓存'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 权限不足
  FORBIDDEN: {
    code: 'FORBIDDEN',
    type: 'AUTH',
    category: 'AUTHORIZATION',
    userMessage: '权限不足，无法执行此操作',
    suggestions: [
      '检查账户权限',
      '联系客服升级账户',
      '使用有权限的账户'
    ],
    canRetry: false,
    severity: 'HIGH'
  },

  // 资源不存在
  NOT_FOUND: {
    code: 'NOT_FOUND',
    type: 'REQUEST',
    category: 'RESOURCE',
    userMessage: '请求的资源不存在',
    suggestions: [
      '检查请求的URL是否正确',
      '确认资源是否已被删除',
      '联系技术支持'
    ],
    canRetry: false,
    severity: 'MEDIUM'
  },

  // 请求频率限制
  RATE_LIMITED: {
    code: 'RATE_LIMITED',
    type: 'REQUEST',
    category: 'LIMITATION',
    userMessage: '请求过于频繁，请稍后重试',
    suggestions: [
      '等待一段时间后重试',
      '减少操作频率',
      '联系客服了解限制详情'
    ],
    canRetry: true,
    severity: 'LOW'
  },

  // 服务器内部错误
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    type: 'SERVER',
    category: 'INFRASTRUCTURE',
    userMessage: '服务器内部错误，请稍后重试',
    suggestions: [
      '稍后重试',
      '检查服务状态',
      '联系技术支持'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 网关错误
  BAD_GATEWAY: {
    code: 'BAD_GATEWAY',
    type: 'SERVER',
    category: 'INFRASTRUCTURE',
    userMessage: '网关错误，请稍后重试',
    suggestions: [
      '稍后重试',
      '检查网络连接',
      '联系技术支持'
    ],
    canRetry: true,
    severity: 'MEDIUM'
  },

  // 服务不可用
  SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    type: 'SERVER',
    category: 'INFRASTRUCTURE',
    userMessage: '服务暂时不可用，请稍后重试',
    suggestions: [
      '稍后重试',
      '检查服务状态页面',
      '联系客服了解维护时间'
    ],
    canRetry: true,
    severity: 'HIGH'
  },

  // 未知错误
  UNKNOWN_ERROR: {
    code: 'UNKNOWN_ERROR',
    type: 'UNKNOWN',
    category: 'UNKNOWN',
    userMessage: '发生未知错误，请稍后重试',
    suggestions: [
      '刷新页面后重试',
      '清除浏览器缓存',
      '联系技术支持并提供错误详情'
    ],
    canRetry: true,
    severity: 'MEDIUM'
  }
}

/**
 * 根据错误消息匹配错误类型
 * @param {string} errorMessage - 错误消息
 * @returns {Object} 匹配的错误类型信息
 */
export function matchErrorType(errorMessage) {
  if (!errorMessage) {
    return WALLET_ERROR_TYPES.UNKNOWN_ERROR
  }

  const message = errorMessage.toLowerCase()

  // 网络相关错误
  if (message.includes('network') || message.includes('fetch') || message.includes('timeout')) {
    return WALLET_ERROR_TYPES.NETWORK_ERROR
  }

  // 钱包连接错误
  if (message.includes('wallet') || message.includes('metamask') || message.includes('provider')) {
    return WALLET_ERROR_TYPES.WALLET_CONNECTION_ERROR
  }

  // 用户拒绝错误
  if (message.includes('user rejected') || message.includes('user denied') || message.includes('cancel')) {
    return WALLET_ERROR_TYPES.USER_REJECTED
  }

  // 链ID错误
  if (message.includes('chain') || message.includes('network') || message.includes('unsupported')) {
    return WALLET_ERROR_TYPES.CHAIN_ID_ERROR
  }

  // 签名错误
  if (message.includes('signature') || message.includes('sign') || message.includes('personal_sign')) {
    return WALLET_ERROR_TYPES.SIGNATURE_ERROR
  }

  // 服务器错误
  if (message.includes('server') || message.includes('500') || message.includes('502') || message.includes('503')) {
    return WALLET_ERROR_TYPES.SERVER_ERROR
  }

  // 认证错误
  if (message.includes('unauthorized') || message.includes('401') || message.includes('auth')) {
    return WALLET_ERROR_TYPES.AUTH_ERROR
  }

  // 钱包未绑定错误
  if (message.includes('not bound') || message.includes('wallet not bound')) {
    return WALLET_ERROR_TYPES.WALLET_NOT_BOUND
  }

  // 余额不足错误
  if (message.includes('insufficient') || message.includes('balance') || message.includes('gas')) {
    return WALLET_ERROR_TYPES.INSUFFICIENT_BALANCE
  }

  // 默认返回未知错误
  return WALLET_ERROR_TYPES.UNKNOWN_ERROR
}

/**
 * 根据HTTP状态码获取错误类型
 * @param {number} statusCode - HTTP状态码
 * @returns {Object} 对应的错误类型信息
 */
export function getErrorTypeByHttpStatus(statusCode) {
  switch (statusCode) {
    case 400:
      return WALLET_ERROR_TYPES.BAD_REQUEST
    case 401:
      return WALLET_ERROR_TYPES.UNAUTHORIZED
    case 403:
      return WALLET_ERROR_TYPES.FORBIDDEN
    case 404:
      return WALLET_ERROR_TYPES.NOT_FOUND
    case 429:
      return WALLET_ERROR_TYPES.RATE_LIMITED
    case 500:
      return WALLET_ERROR_TYPES.INTERNAL_SERVER_ERROR
    case 502:
      return WALLET_ERROR_TYPES.BAD_GATEWAY
    case 503:
      return WALLET_ERROR_TYPES.SERVICE_UNAVAILABLE
    default:
      return WALLET_ERROR_TYPES.UNKNOWN_ERROR
  }
}

/**
 * 获取错误严重程度描述
 * @param {string} severity - 严重程度
 * @returns {string} 严重程度描述
 */
export function getSeverityDescription(severity) {
  const descriptions = {
    'LOW': '低 - 不影响主要功能',
    'MEDIUM': '中 - 部分功能受影响',
    'HIGH': '高 - 主要功能受影响',
    'CRITICAL': '严重 - 功能完全不可用'
  }
  return descriptions[severity] || '未知严重程度'
}

/**
 * 生成用户友好的错误提示
 * @param {Object} errorType - 错误类型信息
 * @param {Object} context - 错误上下文
 * @returns {string} 用户友好的错误提示
 */
export function generateUserFriendlyMessage(errorType, context = {}) {
  let message = errorType.userMessage

  // 根据上下文添加额外信息
  if (context.walletAddress) {
    message += ` (钱包地址: ${context.walletAddress.slice(0, 6)}...${context.walletAddress.slice(-4)})`
  }

  if (context.chainId) {
    message += ` (网络ID: ${context.chainId})`
  }

  return message
} 
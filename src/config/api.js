// API配置文件
export const API_CONFIG = {
  // 开发环境配置
  development: {
    baseURL: '/api',
    proxy: {
      target:'http://192.168.1.100:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
  },
  
  // 生产环境配置
  production: {
    baseURL: 'https://api.verigold.ai/api',
    proxy: null
  }
} 

// 获取当前环境配置
const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development'
  return API_CONFIG[env]
}

// 导出当前环境的baseURL
export const BASE_URL = getCurrentConfig().baseURL

// 导出代理配置
export const PROXY_CONFIG = getCurrentConfig().proxy

// API端点配置
export const API_ENDPOINTS = {
  // 用户认证
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
    ME: '/auth/me'
  },
  
  // 钱包认证
  WALLET_AUTH: {
    LOGIN_CHALLENGE: '/wallet/login/challenge',
    // 登录签名确认
    LOGIN_VERIFY: '/wallet/login/confirm'
  },
  
  // 用户资金管理
  WALLET: {
    BALANCE: '/wallet/balance',
    TRANSACTIONS: '/wallet/transactions',
    WITHDRAW: '/wallet/withdraw',
    DEPOSIT: '/wallet/deposit'
  },
  
  // 用户资金余额
  USER_FUNDS: {
    BALANCES: '/user-funds/balances',
    WITHDRAW: '/user-funds/withdraw',
    OPERATIONS: '/user-funds/operations'
  },
  
  // 借贷配置
  LOAN: {
    CONFIG: '/loan/config',
    ORDERS: '/loan/orders',
    ORDER_DETAIL: '/loan/orders',
    SUMMARY: '/loan/summary',
    STATISTICS: '/loan/orders/statistics',
    ADD_COLLATERAL: '/loan/orders/add-collateral',
    REPAY: '/loan/repay'
  },
  
  // 用户管理
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    KYC: '/user/kyc'
  },
  
  // 2FA认证
  TOTP: {
    SETUP: '/totp/setup',
    VERIFY: '/totp/verify',
    DISABLE: '/totp/disable'
  },

  // 新版 2FA 验证（/auth/2fa/verify）
  AUTH_2FA: {
    VERIFY: '/auth/2fa/verify',
    SEND_EMAIL_CODE: '/auth/2fa/email/send-code'
  },
  
  // 文件管理
  FILE: {
    UPLOAD: '/file/upload',
    DOWNLOAD: '/file/download',
    PREVIEW: '/file/preview'
  },
  
  // 邀请管理
  INVITE: {
    CODE: '/invite/code',
    BIND: '/invite/bind',
    RELATIONS: '/invite/relations',
    MY_CODE: '/invite/my-code',
    MY_DOWNLINE: '/invite/my-downline'
  },
  
  // 质押管理
  STAKE: {
    PRODUCTS: '/stake/products',
    ORDERS: '/stake/orders',
    STATISTICS: '/stake/statistics',
    REDEEM: '/stake/orders/{orderId}/redeem'
  },
  
  // 积分管理
  POINTS: {
    MY_STATISTICS: '/points/my/statistics',
    MY: '/points/my',
    MY_RECORDS: '/points/my/records',
    MY_RECORDS_BY_TYPE: '/points/my/records/by-type'
  },
  
  // VGAU储蓄管理
  VGAU_SAVINGS: {
    CLAIMABLE_INTEREST: '/vgau-savings/claimable-interest',
    CLAIM_INTEREST: '/vgau-savings/claim-interest'
  },
  
  // DeFi 相关
  DEFI: {
    DEPOSITS_ORDERS: '/defi/deposits/orders',
    DEPOSITS_ORDERS_LIST: '/defi/deposits/orders/list'
  },
  
  // 内容管理相关
  CONTENT: {
    LINKS: '/content/links',
    POPULAR_LINKS: '/content/links/popular',
    LINKS_BY_CATEGORY: '/content/links/category',
    LINK_CATEGORIES: '/content/links/categories'
  }
}

// 请求拦截器配置
export const REQUEST_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 支持跨域携带cookie
}

// 响应拦截器配置
export const RESPONSE_CONFIG = {
  // 成功状态码
  successCodes: [200, 201, 204],
  
  // 错误处理
  errorHandler: (error) => {
    console.error('API Error:', error)
    
    // 获取当前语言
    let currentLocale = 'en'
    try {
      currentLocale = uni.getStorageSync('locale') || 'en'
    } catch (e) {
      console.error('Failed to get locale from storage:', e)
    }
    
    // 错误信息映射
    const errorMessages = {
      zh: {
        401: '请先登录',
        403: '权限不足',
        404: '资源不存在',
        500: '服务器错误，请稍后重试',
        network: '网络错误，请检查连接',
        default: '请求失败'
      },
      en: {
        401: 'Please login first',
        403: 'Permission denied',
        404: 'Resource not found',
        500: 'Server error, please try again later',
        network: 'Network error, please check your connection',
        default: 'Request failed'
      }
    }
    
    const messages = errorMessages[currentLocale] || errorMessages.en
    
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response
      
      let message = messages.default
      
      switch (status) {
        case 401:
          message = messages[401]
          // 可以在这里添加跳转登录页的逻辑
          break
        case 403:
          message = messages[403]
          break
        case 404:
          message = messages[404]
          break
        case 500:
          message = messages[500]
          break
        default:
          message = data?.message || messages.default
      }
      
      uni.showToast({
        title: message,
        icon: 'none',
        duration: 2000
      })
    } else if (error.request) {
      // 网络错误
      uni.showToast({
        title: messages.network,
        icon: 'none',
        duration: 2000
      })
    } else {
      // 其他错误
      uni.showToast({
        title: messages.default,
        icon: 'none',
        duration: 2000
      })
    }
    
    return Promise.reject(error)
  }
}
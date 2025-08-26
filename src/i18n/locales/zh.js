export default {
  // 通用
  common: {
    confirm: '確認',
    cancel: '取消',
    save: '保存',
    delete: '刪除',
    edit: '編輯',
    add: '添加',
    search: '搜索',
    loading: '載入中...',
    noData: '暫無數據',
    noMoreData: '沒有更多數據了',
    copy: '複製',
    copied: '已複製',
    back: '返回',
    next: '下一步',
    previous: '上一步',
    submit: '提交',
    reset: '重置',
    close: '關閉',
    open: '打開',
    refresh: '刷新',
    retry: '重試',
    success: '成功',
    error: '錯誤',
    warning: '警告',
    info: '信息'
  },

  // 导航
  navigation: {
    home: '首頁',
    defi: 'DeFi',
    ecology: '生態',
    person: '個人中心',
    history: '歷史記錄',
    settings: '設置'
  },

  // 首页
  home: {
    title: 'VGAU 數字黃金',
    subtitle: '安全、透明、可信的數字黃金平台',
    tvl: 'VGAU 總鎖倉量',
    exchange: 'USDT 兌換 VGAU',
    enterAmount: '輸入兌換金額',
    confirmOperation: '確認操作',
    projectTitle: '非洲黃金賬本',
    projectDesc: '一個將黃金資產與鏈上代幣錨定的RWA協議，提供安全透明的黃金數字化解決方案。',
    walletAddress: '錢包地址：',
    contractAddress: '合約地址：',
    goldInventory: '黃金庫存',
    inventoryAmount: '庫存數量',
    dailyInventory: '每日庫存數量',
    source: '來源：非洲黃金礦區',
    certificate: '證書編號：AGL-2021-001',
    banner: {
      title1: '數字黃金新時代',
      title2: '區塊鏈技術保障',
      title3: '全球資產配置'
    },
    features: {
      audited: '已審計',
      custodian: '託管服務',
      details: '詳細信息'
    }
  },

  // DeFi页面
  defi: {
    title: 'DeFi 服務',
    exchangeRate: '兌換匯率',
    balance: '餘額',
    currentApr: '當前年化收益率',
    pending: '待領取',
    claim: '領取',
    deposit: '充值',
    withdraw: '提現',
    finance: '理財',
    lending: '借貸',
    myFinance: '我的理財',
    productPurchase: '產品申購',
    borrowOrder: '借幣訂單',
    newLending: '新的借貸',
    tabs: {
      account: '賬戶',
      loans: '借貸',
      earn: '理財'
    },
    products: {
      huoqi: '活期理財',
      dingqi: '定期理財',
      jiedai: '借貸服務',
      licai: '理財產品',
      shengou: '申購',
      shuhui: '贖回',
      jiebi: '解幣',
      fengxian: '風險提示'
    }
  },

  // 生态页面
  ecology: {
    title: '生態建設',
    description: '構建完整的數字黃金生態系統'
  },

  // 个人中心
  person: {
    title: '個人中心',
    walletAddress: '錢包地址',
    walletAddressCopied: '錢包地址已複製',
    copyFailed: '複製失敗',
    assetOverview: '資產概覽',
    currentStakedAmount: '當前質押數量',
    totalStakedRewards: '總質押獎勵',
    currentCollateral: '當前抵押品',
    remainingDebt: '剩餘債務',
    totalPoints: '總積分',
    notificationCenter: '通知中心（清算警報）',
    liquidationAlert: '您的資產接近清算閾值，請及時補充。',
    topUpNow: '立即補充',
    moreSettings: '更多設置',
    menu: {
      details: '詳細信息',
      exchange: '兌換',
      history: '歷史記錄',
      invite: '邀請',
      points: '積分',
      redeem: '兌換',
      service: '客服',
      settings: '設置',
      notice: '通知'
    }
  },

  // 历史记录
  history: {
    title: '歷史記錄',
    tabs: {
      all: '全部',
      vgau: 'VGAU',
      usdt: 'USDT'
    },
    transaction: {
      deposit: '充值',
      withdraw: '提現',
      transfer: '轉賬',
      swap: '兌換',
      ongoing: '進行中',
      done: '已完成'
    },
    noMoreData: '沒有更多數據了'
  },

  // 交易详情
  transactionDetail: {
    title: '交易詳情',
    order: '訂單',
    transactionTime: '交易時間',
    serialNumber: '流水號',
    orderId: '訂單編號',
    recordNumber: '記錄號',
    walletAddress: '錢包地址',
    transactionHash: '交易哈希',
    noTransactionHash: '暫無交易哈希'
  },

  // 钱包
  wallet: {
    connect: '連接錢包',
    disconnect: '斷開連接',
    connected: '錢包已連接',
    disconnected: '錢包已斷開',
    connectionFailed: '連接失敗',
    pleaseConnect: '請先連接錢包',
    addressCopied: '地址已複製',
    contractAddressCopied: '合約地址已複製',
    copyFailed: '複製失敗',
    balance: '餘額',
    available: '可用',
    frozen: '凍結',
    total: '總額',
    recharge: '充值',
    withdraw: '提現',
    transfer: '轉賬',
    address: '地址',
    amount: '金額',
    currency: '幣種',
    fee: '手續費',
    confirm: '確認交易',
    bind: {
      title: '錢包未綁定',
      subtitle: '錢包未連接',
      description: '您的錢包未綁定用戶賬戶。請先訪問我們的官方網站綁定郵箱地址。',
      visitWebsite: '訪問官網',
      cancel: '取消',
             checking: '檢查錢包綁定中...',
       notBound: '錢包未綁定用戶賬戶',
       checkFailed: '錢包檢查失敗',
       chainIdMissing: '無法獲取網絡鏈ID，請確保錢包已連接並切換到正確的網絡'
    }
  },

  // 用户认证
  auth: {
    login: '登錄',
    logout: '登出',
    register: '註冊',
    email: '郵箱',
    password: '密碼',
    confirmPassword: '確認密碼',
    forgotPassword: '忘記密碼',
    rememberMe: '記住我',
    loginSuccess: '登錄成功',
    loginFailed: '登錄失敗',
    logoutSuccess: '登出成功',
    registerSuccess: '註冊成功',
    registerFailed: '註冊失敗'
  },

  // 用户资料
  profile: {
    title: '個人資料',
    nickname: '暱稱',
    phone: '手機號',
    email: '郵箱',
    country: '國家',
    avatar: '頭像',
    updateSuccess: '更新成功',
    updateFailed: '更新失敗'
  },

  // KYC认证
  kyc: {
    title: '身份認證',
    status: {
      pending: '待審核',
      approved: '已通過',
      rejected: '已拒絕',
      null: '未提交'
    },
    documents: {
      documentPhoto: '證件照片',
      portraitPhoto: '人像照片',
      holdingDocumentPhoto: '手持證件照',
      addressProof: '地址證明'
    },
    submitSuccess: '提交成功',
    submitFailed: '提交失敗'
  },

  // 2FA认证
  totp: {
    title: '雙重認證',
    setup: '設置2FA',
    verify: '驗證2FA',
    disable: '禁用2FA',
    code: '驗證碼',
    qrCode: '二維碼',
    secretKey: '密鑰',
    setupSuccess: '設置成功',
    verifySuccess: '驗證成功',
    disableSuccess: '禁用成功'
  },

  // 邀请
  invite: {
    title: '邀請好友',
    code: '邀請碼',
    copyCode: '複製邀請碼',
    bindCode: '綁定邀請碼',
    relations: '邀請關係',
    inviter: '邀請人',
    invitees: '被邀請人',
    rewards: '獎勵',
    copySuccess: '邀請碼已複製'
  },

  // 设置
  settings: {
    title: '設置',
    language: '語言',
    theme: '主題',
    notification: '通知',
    security: '安全',
    about: '關於',
    version: '版本',
    privacy: '隱私政策',
    terms: '服務條款',
    help: '幫助中心'
  },

  // 错误信息
  errors: {
    networkError: '網絡錯誤，請檢查連接',
    serverError: '服務器錯誤，請稍後重試',
    unauthorized: '請先登錄',
    forbidden: '權限不足',
    notFound: '資源不存在',
    requestFailed: '請求失敗',
    invalidInput: '輸入無效',
    fileTooLarge: '文件過大',
    fileTypeNotSupported: '文件類型不支持'
  },

  // 成功信息
  success: {
    operationSuccess: '操作成功',
    saveSuccess: '保存成功',
    deleteSuccess: '刪除成功',
    copySuccess: '複製成功',
    uploadSuccess: '上傳成功'
  },

  // 表单验证
  validation: {
    required: '此字段為必填項',
    email: '請輸入有效的郵箱地址',
    phone: '請輸入有效的手機號',
    password: '密碼長度至少6位',
    confirmPassword: '兩次輸入的密碼不一致',
    amount: '請輸入有效的金額',
    address: '請輸入有效的地址'
  }
} 
export default {
  // 充值確認彈窗
  recharge: {
    modal: {
      title: '確認充值',
      content: '是否確認充值 {amount} {symbol}？',
      confirm: '確認',
      cancel: '取消'
    },
    loading: '正在充值...'
  },

  // 提現
  withdraw: {
    modal: {
      title: '確認提現',
      content: '是否確認提現 {amount} {symbol}？',
      confirm: '確認',
      cancel: '取消'
    },
    loading: '正在提現...'
  },

  // 通用UI元素
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
    info: '信息',
    networkError: '網絡連接錯誤',
    amount: '金額',
    balance: '餘額',
    available: '可用',
    currency: '幣種',
    confirmOperation: '確認操作',
    processing: '處理中...',
    operationSuccess: '操作成功',
    operationFailed: '操作失敗',
    loadFailed: '加載失敗',
    insufficientFunds: '餘額不足',
    userRejected: '用戶取消操作',
    gasInsufficient: 'Gas費用不足',
    networkError: '網絡錯誤',
    pleaseCheckConnection: '請檢查連接',
    pleaseEnterValidAmount: '請輸入有效金額',
    pleaseEnterPositiveInteger: '請輸入正整數',
    points: '積分',
    users: '用戶'
  },

  // 兑换
  exchange: {
    exchangeSuccess: '兌換成功',
    exchangeFailed: '兌換失敗'
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
    ,
    officialSite: 'VeriGold官網'
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
    disconnect: '斷開連接',
    disconnectConfirm: {
      title: '確認斷開連接',
      content: '確定要斷開錢包連接嗎？斷開後需要重新連接才能使用功能。',
      confirm: '確認斷開',
      cancel: '取消'
    },
    disconnectLoading: '正在斷開連接...',
    disconnectSuccess: '錢包已斷開連接',
    disconnectFailed: '斷開連接失敗',
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
    noWalletConnected: '未連接錢包',
    walletConnected: '已連接',
    walletDisconnected: '已斷開',
    connectWallet: '連接錢包',
    connectingWallet: '正在連接錢包...',
    walletConnectionSuccess: '錢包連接成功',
    walletConnectionFailed: '錢包連接失敗',
    userRejectedConnection: '用戶拒絕連接',
    noWalletDetected: '未檢測到錢包',
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
      redeem: '贖回',
      service: '客服',
      settings: '設置',
      notice: '通知'
    },
    logoutConfirm: {
      title: '確認登出',
      content: '確定要登出當前賬戶嗎？登出後需要重新登錄。',
      confirm: '確認登出',
      cancel: '取消'
    },
    logout: {
      button: '登出',
      loading: '正在登出...',
      success: '登出成功',
      failed: '登出失敗'
    },
    logoutErrors: {
      network: '網絡連接錯誤',
      auth: '認證錯誤',
      server: '服務器錯誤',
      timeout: '請求超時',
      unknown: '未知錯誤',
      details: '錯誤詳情',
      retry: '重試',
      close: '關閉',
      suggestions: '建議解決方案',
      errorTypes: {
        NETWORK: '網絡錯誤',
        AUTH: '認證錯誤',
        SERVER: '服務器錯誤',
        TIMEOUT: '超時錯誤',
        UNKNOWN: '未知錯誤'
      }
    }
  },

  // 历史记录
  history: {
    title: '歷史記錄',
    tabs: {
      account: '賬戶',
      loans: '借貸',
      earn: '理財'
    },
    filter: {
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
      done: '已完成',
      pending: '待處理',
      processing: '處理中',
      failed: '失敗',
      cancelled: '已取消'
    },
    loadMore: '載入更多',
    noMoreData: '沒有更多數據了',
    noTransactionsFound: '暫無交易記錄',
    transactionHistoryFeature: '交易記錄功能即將推出',
    loans: {
      stakeRedeem: '質押與贖回',
      loanRecords: '借貸記錄',
      rewardsHistory: '獎勵歷史',
      totalDebt: '總債務',
      totalDebtAmount: '121.221 USDT',
      collateralAmt: '抵押品數量',
      collateralAmtValue: '221 VGAU',
      borrowedAmt: '借款數量',
      borrowedAmtValue: '45.451115 USDT',
      riskWarning: '抵押率過低，存在清算風險',
      all: '全部',
      loan: '借款',
      repay: '還款',
      borrowing: '借款中',
      ongoing: '進行中',
      borrowedAmount: '借款金額',
      borrowedAmountValue: '45.451115 USDT',
      collateralAmount: '抵押品金額',
      collateralAmountValue: '221 VGAU',
      stakingRate: '質押率',
      stakingRateValue: '80%',
      collateralVGAU: '抵押品 (VGAU)',
      collateralVGAUValue: '20',
      borrowedUSDT: '借入 (USDT)',
      borrowedUSDTValue: '84.2255',
      interestRate: '利率',
      interestRateValue: '5.2%',
      liquidationPrice: '清算價格',
      liquidationPriceValue: '$0.85',
      noMoreData: '沒有更多數據',
      completed: '已完成',
      details: '詳情',
      ordersList: '借貸訂單',
      status: {
        active: '進行中',
        completed: '已完成',
        liquidated: '已清算',
        cancelled: '已取消',
        pending: '待處理'
      }
    },

    // 借貸詳情
    borrowingDetail: {
      title: '借貸詳情',
      orderId: '訂單號',
      borrowingStatus: '借款中',
      completedStatus: '已完成',
      collatRate: '抵押率',
      collateralVGAU: '抵押品 (VGAU)',
      netAPR: '淨年化收益率',
      liqPrice: '清算價格 (VGAU/USDT)',
      addCollat: '增加抵押品',
      borrow: '借款',
      collateral: '抵押品',
      noMoreData: '沒有更多數據'
    },

    earn: {
      filter: {
        all: '全部',
        staking: '質押中',
        toClaim: '待領取',
        completed: '已完成'
      },
      status: {
        pending: '待處理',
        staking: '質押中',
        toClaim: '待領取',
        completed: '已完成',
        cancelled: '已取消',
        redeemed: '已贖回'
      },
      viewDetails: '查看詳情',
      noTransactionsFound: '暫無理財交易記錄'
    },
    earnComingSoon: '理財內容即將推出'
  },

  // 质押详情
  stakingDetail: {
    title: '質押詳情',
    days: '天',
    staking: '質押中',
    toClaim: '待領取',
    completed: '已完成',
    ongoing: '進行中',
    active: '進行中',
    pending: '待處理',
    cancelled: '已取消',
    redeemed: '已贖回',
    startTime: '開始時間',
    endTime: '結束時間',
    order: '訂單',
    noMoreData: '沒有更多數據了',
    actions: {
      stake: '質押',
      redeem: '贖回'
    }
  },

  // 充值页面
  rechargePage: {
    usdtRecharge: 'USDT 充值',
    vgauRecharge: 'VGAU 充值',
    amount: '金額',
    minimumAmount: '最低 0',
    max: '最大',
    availableBalance: '可用餘額',
    available: '可用',
    confirm: '確認',
    confirmOperation: '確認操作',
    processing: '處理中...',
    pleaseEnterValidAmount: '請輸入有效的充值金額',
    rechargeSuccess: '充值成功！',
    rechargeFailed: '充值失敗',
    contractInitFailed: '合約服務初始化失敗',
    userDataLoadFailed: '用戶數據加載失敗',
    insufficientFunds: '餘額不足',
    userRejected: '用戶取消操作',
    gasInsufficient: 'Gas費用不足',
    networkError: '網絡錯誤',
    walletError: '錢包連接問題',
    contractError: '合約調用失敗',
    networkUnsupported: '當前網絡不支持',
    unknownError: '充值過程中發生未知錯誤',
    errorModal: {
      title: '⚠️ 充值失敗',
      close: '×',
      suggestions: '解決建議：',
      debugInfo: '調試信息：',
      errorType: '錯誤類型',
      contract: '合約',
      method: '方法',
      timestamp: '時間',
      deviceType: '設備類型',
      platform: '平台',
      onlineStatus: '在線狀態',
      online: '在線',
      offline: '離線',
      mobile: '移動端',
      retry: '重試',
      showDebug: '顯示調試',
      hideDebug: '隱藏調試',
      closeError: '關閉'
    },
    errorDetails: {
      networkError: '網絡連接問題，無法連接到區塊鏈網絡',
      walletError: '錢包連接問題，請檢查錢包狀態',
      gasError: 'Gas費用不足或賬戶餘額不足',
      contractError: '合約調用失敗，可能是合約問題或參數錯誤',
      networkUnsupported: '當前網絡不支持，請切換到BSC網絡',
      userRejected: '您取消了交易操作',
      unknownError: '充值過程中發生未知錯誤'
    },
    suggestions: {
      network: [
        '檢查網絡連接是否正常',
        '檢查VPN設置',
        '嘗試切換網絡',
        '稍後重試'
      ],
      wallet: [
        '確保MetaMask已安裝並解鎖',
        '檢查錢包是否連接到正確的網絡',
        '嘗試重新連接錢包',
        '刷新頁面後重試'
      ],
      gas: [
        '檢查賬戶BNB餘額是否充足',
        '嘗試減少充值金額',
        '檢查Gas費用設置',
        '確保有足夠的BNB支付手續費'
      ],
      networkUnsupported: [
        '切換到BSC主網 (Chain ID: 56)',
        '切換到BSC測試網 (Chain ID: 97)',
        '檢查錢包網絡設置',
        '確保網絡配置正確'
      ],
      default: [
        '刷新頁面後重試',
        '檢查錢包狀態',
        '聯繫技術支持',
        '查看控制台錯誤日誌'
      ]
    }
  },

  // 交易详情
  transactionDetail: {
    title: '交易詳情',
    transactionTime: '交易時間',
    serialNumber: '流水號',
    orderId: '訂單編號',
    recordNumber: '記錄號',
    walletAddress: '錢包地址',
    transactionHash: '交易哈希',
    currency: '幣種',
    amount: '數量',
    defaultType: '提現',
    defaultStatus: '進行中',
    addressCopied: '地址已複製',
    hashCopied: '哈希已複製',
    noHashToCopy: '暫無交易哈希',
    status: {
      pending: '待處理',
      processing: '處理中',
      success: '成功',
      completed: '已完成',
      failed: '失敗',
      cancelled: '已取消',
      timeout: '超時',
      done: '已完成',
      ongoing: '進行中'
    }
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
    help: '幫助中心',
    settings: '設置',
    termsOfService: '服務條款',
    liquidationAlertRepaymentRules: '清算預警與還款規則',
    serviceAgreement: '服務協議',
    inviter: '邀請人',
    liquidationAlert: '清算預警',
    liquidationAlertReminder: '當抵押比率達到85%時，用戶將通過郵件收到追加保證金提醒。',
    liquidationAlertApproaching: '當抵押比率達到88%時，用戶將通過郵件和個人頁面彈窗收到提醒，告知他們正在接近清算抵押比率。',
    repaymentRules: '還款規則',
    fullRepaymentOnly: '只允許全額還款。',
    forcedLiquidation: '強制清算',
    forcedLiquidationDisbursement: '發放貸款時，首先凍結貸款金額的2%作為清算保險，剩餘98%的USDT分配到USDT賬戶。',
    forcedLiquidationRedemption: '只有在貸款完全還清後，系統才會自動將相應的VGAU抵押品贖回到VGAU賬戶，並將該貸款的原始2%清算保險返還到USDT賬戶。',
    forcedLiquidationPlatformFee: '如果觸發強制清算，2%的清算保險將成為平台的清算費用；如果市場波動導致抵押資產價值低於總債務，借款人必須立即補足剩餘債務。',
    forcedLiquidationRemainingDebt: '平台支持多個貸款訂單，每個訂單獨立定價和風險控制，互不干擾。',
    forcedLiquidationMultipleLoans: '平台支持多個貸款訂單，每個訂單獨立定價和風險控制，互不干擾。',
    inviteDescription: '填寫邀請碼以幫助您的朋友完成邀請任務',
    submit: '提交',
    lastUpdated: '最後更新：2025年8月31日',
    serviceAgreementText: '本協議（以下簡稱"協議"）由您（"用戶"）和Verigold（"平台"）共同制定，旨在明確用戶在平台上使用相關服務的條款和條件。通過訪問或使用平台提供的任何服務，您同意遵守本協議的所有條款。',
    serviceContent: '服務內容',
    stakingReturnCalculation: '1. VGAU質押：用戶可以將VGAU代幣存入平台，根據選擇的質押期限和年化收益率（APY）獲得USDT回報。質押回報計算方法如下：',
    fixedTermStakingReturn: '（1）定期質押回報 = 質押金額 × 年利率 × 質押天數 / 365',
    flexibleStakingReturn: '（2）靈活質押回報 = 質押金額 × 當前VGAU價格 × 年利率 × 質押天數 / 365',
    lendingServices: '2. 借貸服務：用戶可以使用VGAU代幣作為抵押品借入USDT。在借貸過程中，抵押比率、追加保證金線和清算線等參數將根據市場價格波動動態調整。',
    redemptionServices: '3. 贖回服務：用戶可以通過平台提供的贖回功能贖回已質押或借入的資產。贖回金額根據實時匯率和質押條件計算。',
    exchangeServices: '4. 兌換服務：用戶可以在平台內將USDT兌換為VGAU代幣，或將VGAU代幣兌換為USDT。'
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
    address: '請輸入有效的地址',
    code: '驗證碼',
    emailCodePlaceholder: '請輸入郵箱驗證碼',
    totpCodePlaceholder: '請輸入 TOTP 驗證碼',
    codePlaceholder: '請輸入驗證碼'
  },

  // 組件特定鍵值
  components: {
    // Exchange
    exchange: {
      title: '兌換',
      brandTitle: 'VGAU',
      brandSubtitle: '數字黃金',
      brandDescription: '安全、透明、可信的數字黃金兌換服務',
      rateText: '1 VGAU = 當前黃金價格',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: '請輸入兌換數量',
      requiredUSDT: '所需 USDT',
      exchanging: '正在兌換...',
      exchangeSuccess: '兌換成功',
      exchangeFailed: '兌換失敗',
      confirmExchange: '確認兌換'
    },

    // IncreaseCollateral
    increaseCollateral: {
      title: '增加抵押金額',
      increaseCollateralAmount: '增加抵押金額',
      currentCollateral: '抵押金額(VGAU)',
      collateralAmount: '抵押金額(VGAU)',
      insuranceFee: '強平保險費(USDT)',
      initialRatio: '初始質押率',
      initialCollateralRatio: '初始質押率',
      stakingRatio: '當前質押率',
      stakingRatioAfter: '增加抵押金額後的質押率',
      stakingRatioAfterIncrease: '增加抵押金額後的質押率',
      increaseAmount: '增加金額',
      amountPlaceholder: '請輸入金額',
      availableAssets: '可用資產',
      max: '最大',
      confirmOperation: '確認操作',
      confirm: '確認',
      warning: '如果抵押比率不為0%或未完成全額還款，您的抵押資產無法贖回。',
      collateralRatioWarning: '如果抵押比率不為0%或未完成全額還款，您的抵押資產無法贖回。',
      instruction: '請確保所有還款已完成，且抵押比率為0%。系統將自動將您的抵押資產返還到綁定的錢包地址。',
      collateralRatioInstruction: '請確保所有還款已完成，且抵押比率為0%。系統將自動將您的抵押資產返還到綁定的錢包地址。',
      repaying: '您正在還款',
      repaymentAmount: '您正在還款',
      repaymentAmountValue: '77.74 USDT',
      afterRepayment: '還款完成後',
      repaymentAfter: '還款完成後',
      willReturn: '將返還',
      repaymentResult: '將返還',
      repaymentResultRedeem: '100 VGAU',
      andRefund: '並退還',
      repaymentResultRefund: '1.56 USDT',
      repaymentSuccess: '還款成功',
      repaymentSuccessful: '還款成功',
      willRedeem: '將贖回',
      successResult: '將贖回',
      successResultRedeem: '100 VGAU',
      successResultRefund: '退還 1.56 USDT',
      collateralIncreased: '抵押金額增加成功',
      increaseSuccess: '您已增加{amount}',
      newCollateralRatio: '增加抵押金額後的質押率為{ratio}',
      confirmButton: '確定'
    },

    // Redeem
    redeem: {
      title: '贖回',
      brandTitle: 'Verifood',
      brandSubtitle: '1g 黃金 = 1 代幣',
      brandDescription: '基於區塊鏈的實物黃金數字化解決方案',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% 年化收益率',
      currency1: 'VGAU',
      currency2: 'USDT',
      redeemAmountPlaceholder: '輸入要贖回的數量',
      requiredUSDT: '所需USDT',
      usdtTitle: '要兌換的USDT',
      usdtAmountPlaceholder: '金額',
      confirmRedeem: '確認贖回',
      successText: '兌換成功',
      completeText: '完成',
      redeemAmount: '贖回金額',
      redeemTo: '贖回至',
      boundWallet: '綁定錢包地址',
      dailyLimit: '每日最大贖回限額',
      confirmRedeem: '確認贖回',
      redeeming: '贖回中...',
      redeemSuccess: '贖回成功',
      redeemFailed: '贖回失敗'
    },

    // MyFinance
    myFinance: {
      title: '我的理財',
      redemptionNotice: '選中的資產將立即贖回到您的賬戶',
      asset: '資產',
      maturityYield: '到期收益',
      startTime: '開始時間',
      endTime: '結束時間',
      redeemable: '可贖回',
      staking: '質押中',
      allLoaded: '全部載入完成',
      redeem: '贖回',
      redeemFeature: '贖回功能即將推出',
      totalAssets: '總資產',
      totalEarnings: '總收益',
      activeProducts: '活躍產品',
      noActiveProducts: '暫無活躍產品',
      viewDetails: '查看詳情',
      redeemConfirm: {
        title: '贖回',
        content: '確定要贖回 {amount} VGAU 嗎？',
        principal: '本金',
        interest: '收益',
        confirm: '確認贖回',
        cancel: '取消',
        currency: {
          vgau: 'VGAU',
          usdt: 'USDT'
        }
      },
      loading: '加載中...',
      noOrders: '暫無質押訂單',
      dataLoadFailed: '獲取數據失敗',
      orderNotExpired: '訂單尚未到期，無法贖回',
      redeemSuccess: '贖回成功',
      redeemFailed: '贖回失敗',
      redeemFailedRetry: '贖回失敗，請稍後重試',
      networkError: '網絡連接失敗，請檢查網絡後重試',
      loginExpired: '登錄已過期，請重新登錄',
      noPermission: '沒有權限執行此操作',
      orderNotFound: '訂單不存在或已被處理'
    },

    // ProductHelp
    productHelp: {
      title: '產品幫助',
      helpContent: '幫助內容即將推出...',
      contactSupport: '聯繫客服'
    },

    // ProductPurchase
    productPurchase: {
      productPurchase: '產品申購',
      productDetails: '產品詳情',
      term: '期限',
      apy: '年化收益率',
      minAmount: '最小金額',
      maxAmount: '最大金額',
      riskLevel: '風險等級',
      amount: '金額',
      enterStakingAmount: '請輸入金額',
      vgau: 'VGAU',
      max: '最大',
      availableBalance: '可用',
      balanceAmount: '0',
      transactionRules: '交易規則',
      productRules: '產品規則',
      purchaseTime: '申購時間',
      purchaseTimeValue: '2025-07-18 14:00',
      expirationTime: '到期時間',
      expirationTimeValue: '2025-07-29 08:00',
      estimatedInterest: '預計利息 (USDT)',
      estimatedInterestValue: '--',
      requiresManualRedemption: '需要手動贖回',
      requiresManualRedemptionValue: '--',
      rewards: '1. 獎勵',
      rewardsDailyChange: '您申購的定期產品的年化收益率可能會每日變化。',
      rewardsStartCalculation: '獎勵將在申購次日00:00（UTC）開始計算，質押期間無法贖回。',
      rewardsAfterStaking: '質押期滿後，需要手動轉換為靈活質押，相應收益將分配到賬戶，分配的收益可以立即提現。',
      settlementIncome: '結算收益 = 申購資產 × 年化收益率 ÷ 365 × 固定期限（精確到小數位）',
      subscriptionAndRedemption: '2. 申購與贖回',
      subscriptionAndRedemptionDaily: '保本定期收益產品的申購和贖回每日在00:10 UTC至23:50 UTC之間開放。',
      earlyRedemption: '3. 提前贖回',
      earlyRedemptionMyFinance: '對於指定的定期產品，您可以隨時在"我的理財"中贖回資產。',
      earlyRedemptionLoseIncome: '如果您提前贖回，將失去該產品已分配的所有收益。',
      earlyRedemptionBalanceCredit: '該產品鎖定的全部資產餘額，減去您在此期間收到的所有收益，將在72小時內記入您的現貨賬戶。',
      earlyRedemptionMarketFluctuations: '在極端市場波動、網絡延遲或贖回請求過多的情況下，贖回可能會延遲。',
      confirm: '確認',
      processing: '處理中...',
      recordsFeature: '記錄功能即將推出',
      amountOutOfRange: '金額超出範圍（100-10,000 VGAU）',
      selectProduct: '請選擇產品',
      orderCreateSuccess: '質押訂單創建成功！',
      orderCreateFailed: '創建訂單失敗',
      productNotFound: '產品不存在',
      invalidAmount: '金額無效',
      purchaseFeature: '申購功能即將推出',
      purchaseSuccess: '申購成功',
      purchaseFailed: '申購失敗'
    },

    // InfoPage
    infoPage: {
      title: '信息',
      infoContent: '信息內容...',
      moreInfo: '更多信息'
    },

    // NewLending
    newLending: {
      lending: '借貸',
      pledgedVGAUAssets: '質押的VGAU資產不會獲得本金保護獎勵',
      collateralQuantity: '抵押品數量',
      enterCollateralAmount: '請輸入抵押品數量',
      max: '最大',
      availableAssets: '可用資產',
      availableToBorrow: '可借金額',
      lendingAmount: '借貸金額',
      borrowRange: '可借範圍',
      enterBorrowAmount: '請輸入借款金額',
      liquidationInsuranceFee: '清算保險費',
      initialCollateralRatio: '初始抵押比率',
      additionalMargin: '追加保證金',
      forcedLiquidationCollateralRatio: '強制清算抵押比率',
      annualInterestRate: '年利率',
      netAnnualizedInterestRate: '淨年化利率',
      estimatedHourlyInterestRate: '預估小時利率',
      liquidationReferencePrice: '清算參考價格 (VGAU/USDT)',
      confirmLending: '確認借貸',
      pleaseEnterBorrowAmount: '請輸入有效的借款金額',
      lendingFeature: '借貸功能即將推出',
      loanAmount: '借款金額',
      collateralAmount: '抵押金額',
      interestRate: '利率',
      loanTerm: '借款期限',
      confirmLoan: '確認借款',
      applying: '申請中...',
      loanSuccess: '借款申請成功',
      loanFailed: '借款申請失敗'
    },

    // BorrowOrder
    borrowOrder: {
      title: '借幣訂單',
      borrowOrder: '借幣訂單',
      orderNumber: '訂單號',
      borrowedUSDTArrival: '借入的USDT將立即到達USDT提現的借入資金',
      totalLiabilities: '總負債 (USDT)',
      collateralAmount: '抵押品數量 (VGAU)',
      pledgeRatio: '質押比率',
      netAnnualizedInterestRate: '需還USDT',
      liquidationReferencePrice: '清算參考價格 (VGAU/USDT)',
      increaseCollateralAmount: '增加抵押金額',
      adjustPledgeRatio: '調整質押比率',
      fullRepayment: '全額還款',
      allLoaded: '全部載入完成',
      recordsFeature: '記錄功能即將推出',
      adjustPledgeRatioFeature: '全額還款功能即將推出',
      orderStatus: '訂單狀態',
      borrowAmount: '借款金額',
      repayAmount: '還款金額',
      dueDate: '到期日期',
      actions: '操作',
      repay: '還款',
      extend: '延期'
    },

    // USDTWithdraw & VGAUWithdraw
    withdraw: {
      title: '提現',
      withdrawAmount: '提現金額',
      withdrawTo: '提現至',
      boundWallet: '綁定錢包地址',
      confirmWithdraw: '確認提現',
      withdrawing: '提現中...',
      withdrawSuccess: '提現成功',
      withdrawFailed: '提現失敗'
    },

    // Exchange
    exchange: {
      title: '兌換',
      brandTitle: 'Verifood',
      brandSubtitle: '1g 黃金 = 1 代幣',
      brandDescription: '基於區塊鏈的實物黃金數字化解決方案',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% 年化收益率',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: '輸入要兌換的數量',
      requiredUSDT: '所需USDT',
      confirmExchange: '確認兌換',
      exchangeFeature: '兌換功能即將推出',
      from: '從',
      to: '到',
      exchangeRate: '兌換匯率',
      slippage: '滑點',
      exchanging: '兌換中...',
      exchangeSuccess: '兌換成功',
      exchangeFailed: '兌換失敗'
    },

    // Invitation
    invitation: {
      invitation: '邀請',
      invitationRewards: '1,580 積分',
      invitationRewardsLabel: '邀請獎勵',
      numberOfInvitedPeople: '12 用戶',
      numberOfInvitedPeopleLabel: '邀請人數',
      numberOfDirectPushPersonnel: '6 用戶',
      numberOfDirectPushPersonnelLabel: '直推人數',
      invitationLink: '邀請鏈接',
      copyLink: '複製鏈接',
      invitationRewardDetails: '邀請獎勵詳情',
      id: 'ID',
      walletAddr: '錢包地址',
      type: '類型',
      rewards: '獎勵（積分）',
      allContentLoaded: '全部內容已載入',
      ruleDetails: '規則詳情',
      successfullyReferUserThroughKYC: '成功通過KYC推薦用戶獲得積分：',
      directReferral: '直推',
      indirectReferral: '間推',
      rewardsPerUser: '2 積分/用戶',
      indirectRewardsPerUser: '0.2 積分/用戶',
      pointsUnit: '積分/用戶',
      linkCopied: '邀請鏈接已複製！',
      invitationCode: '邀請碼',
      copyCode: '複製碼',
      inviteFriends: '邀請好友',
      referralRewards: '推薦獎勵',
      myInvitations: '我的邀請',
      bindSuccess: '邀請碼提交成功！'
    },

    // PointsDetails
    pointsDetails: {
      pointsDetails: '積分詳情',
      totalPoints: '總積分',
      all: '全部',
      staking: '質押',
      invite: '邀請',
      lending: '借貸',
      exchange: '兌換',
      ecosystem: '生態',
      stakingRewards: '質押獎勵',
      invitation: '邀請',
      ecosystemParticipation: '生態參與',
      lending: '借貸',
      exchangeVGT: '兌換VGT',
      allLoaded: '全部載入完成',
      earnedPoints: '獲得積分',
      spentPoints: '消費積分',
      pointsHistory: '積分歷史',
      noHistory: '暫無積分歷史'
    },

    // Exchange
    exchange: {
      title: '兌換',
      brandTitle: 'Verifood',
      brandSubtitle: '1g 黃金 = 1 代幣',
      brandDescription: '基於區塊鏈的實物黃金數字化解決方案',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% 年化收益率',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: '輸入要兌換的數量',
      requiredUSDT: '所需USDT',
      confirmExchange: '確認兌換',
      exchangeFeature: '兌換功能即將推出'
    }
  },

  // Financial Products
  financialProducts: '理財產品',
  returnsAndRisks: '收益與風險',
  returnSources: '收益來源',
  whatAreFinancialProducts: '什麼是理財產品？',
  thisIsADigitalAssetAppreciationSchemeAnchoredToGold: '這是一個錨定黃金的數字資產增值方案。',
  whenUsersPurchaseAndHoldVGAUTokens: '當用戶購買並持有VGAU代幣時，它們代表等價實物黃金的存款，資產價值隨市場條件波動。',
  theyRepresentDepositsOfEquivalentPhysicalGold: '它們代表等價實物黃金的存款，資產價值隨市場條件波動。',
  andAssetValuesFluctuateWithMarketConditions: '資產價值隨市場條件波動。',
  inTheirAccounts: '在他們的賬戶中，',
  usersCanParticipateInDifferentTermAndRuleBasedYieldSchemesWithVGAU: '用戶可以使用VGAU參與不同期限和基於規則的收益方案，',
  andTheSystemWillGenerateRewardsAccordingToTheRules: '系統將根據規則生成獎勵。',
  rewardsInTheAccountNeedToBeClaimedManually: '賬戶中的獎勵需要手動領取。',
  rewardsInFinancialProductsAccumulateInRealTimeToMeetDifferentAssetManagementNeeds: '理財產品中的獎勵實時累積，以滿足不同的資產管理需求。',
  advantages: '優勢',
  flexibleProductsAvailableForRedemption: '靈活產品可隨時贖回',
  usersCanSubscribeAndRedeemFlexibleProductsAtAnyTime: '用戶可以隨時申購和贖回靈活產品。',
  fixedTermProductsOfferHigherAPY: '定期產品提供更高年化收益率',
  fixedTermProductsHaveFixedTermsButTheirAnnualizedYieldsAreTypicallyHigherThanFlexibleProducts: '定期產品有固定期限，但它們的年化收益率通常高於靈活產品。',
  manualRedemptionOfInterestEarnings: '手動贖回利息收益',
  dailyUSDTEarningsWillAutomaticallyGoToTheWithdrawalBalanceWhichNeedsToBeManuallyWithdrawn: '每日USDT收益將自動轉入提現餘額，需要手動提現。',
  risks: '風險',
  veryLowRisk: '極低風險',
  digitalAssetPricesMayFluctuateIfThereAreTooManyRedemptionRequestsItMayLeadToTemporarilyInsufficientAvailableRedemptionBalanceResultingInDelayedRedemptionRestAssuredYourAssetsAreAlwaysSafeAndSecure: '數字資產價格可能會波動。如果贖回請求過多，可能會導致可用贖回餘額暫時不足，從而導致贖回延遲。請放心，您的資產始終安全可靠。',
  eachOfYourTokensCorrespondsToPhysicalGoldHeldInOurAfricanMiningAreasAndAuditedByAuthoritativeInstitutions: '您的每個代幣（1 VGAU = 1g 實物黃金）對應我們非洲礦區持有的實物黃金，並由權威機構審計。',
  theStableReturnsYouEarnThroughStakingComeFromTheProjectTeamsActiveManagementAndOperationOfTheUnderlyingGoldAssets: '您通過質押獲得的穩定收益來自項目團隊對底層黃金資產的主動管理和運營。',
  confirm: '確認',

  // InfoPage
  glossary: '名詞解釋',
  repaymentRules: '還款規則',
  forcedLiquidationInsuranceFee: '強制清算保險費',
  forcedLiquidationInsuranceFeeDescription: '借款時，平台將根據初始質押率計算最大可借金額2%的強制清算保險費。此費用將從可借金額中扣除。',
  forcedLiquidationInsuranceFeeAfterRepayment: '借款人完全還清貸款後，平台將相應的強制清算保險費退還到其USDT借貸賬戶。',
  forcedLiquidationInsuranceFeeOnForcedLiquidation: '如果加密貨幣借貸訂單發生強制清算，平台將收取此強制清算保險費。',
  pledgeRateAnnotation: '質押率註釋',
  currentPledgeRate: '當前質押率',
  pledgeRateDescription: '質押率，或LTV（貸款價值比），代表借入的數字資產與抵押品價值之間的比率（基於抵押品計算）。資產價值基於不同加密貨幣的價格指數計算。',
  initialPledgeRate: '初始質押率',
  initialPledgeRatePercentage: '78%',
  initialPledgeRateDescription: '初始質押率是您需要提供的抵押品價值與貸款金額之間的初始比率。',
  marginCall: '追加保證金',
  marginCallPercentage: '85%',
  marginCallDescription: '追加保證金質押率是貸款合約接近強制清算質押率時的警告線。',
  forcedLiquidationPledgeRate: '強制清算質押率',
  forcedLiquidationPledgeRatePercentage: '91%',
  forcedLiquidationPledgeRateDescription: '如果您的質押率達到強制清算質押率，系統將立即執行強制清算，使用您的抵押品資產償還您的貨幣市場貸款，並將對貸款金額收取2%的強制清算費用。',
  netAnnualizedInterestRate: '淨年化利率',
  netAnnualizedInterestRateDescription: '抵押品資產將繼續獲得實時年化利息獎勵，幫助抵消加密貨幣借貸成本。淨年化利率 = 年利率 - (抵押品實時年利率 / 初始質押率)',
  annualInterestRate: '年利率',
  annualInterestRateDescription: '利息將使用複利計算。利息從成功借入加密貨幣開始累積，每分鐘計算一次。如果借貸期限少於一分鐘，也將按一分鐘計算。',
  collateralRequiredForLending: '借貸所需的抵押品來源於VGAU活期賬戶。一旦轉換為抵押品，這部分將不再產生活期收益。',
  defaultInitialPledgeRate: '默認初始質押率為',
  defaultInitialPledgeRatePercentage: '78%',
  loanAmountDescription: '。創建貸款訂單時，可以根據貸款金額調整質押率。',
  forcedLiquidationInsuranceFeeOnForcedLiquidationDescription: '如果觸發強制清算，2%的強制清算保險費歸平台所有，作為清算費用；如果抵押品資產價值因劇烈市場波動而低於總債務，借款人必須立即補足剩餘未償還金額。平台支持多個貸款訂單，每個訂單獨立定價和風險控制，互不影響。',
  repaymentUsingAccountBalance: '使用賬戶餘額還款：在完全還款之前無法贖回抵押品。用戶可以添加更多VGAU以降低質押率並避免清算。',

  // USDTWithdraw
  usdtWithdraw: 'USDT 提現',
  selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days: '選定的資產將在T+1天后完全贖回到您的錢包。',
  totalRedemptionAmount: '總贖回金額',
  minimum0: '最低 0',
  usdtMax: 'USDT |最大',
  availableBalance: '可用餘額',
  estimatedFee: '預估手續費',
  withdrawTo: '提現至',
  boundWalletAddress: '綁定錢包地址',
  dailyMaximumRedemptionLimit: '每日最大贖回限額：5000000000 USDT',
  confirm: '確認',
  pleaseEnterWithdrawAmount: '請輸入提現金額',
  withdrawFeatureComingSoon: '提現功能即將推出',

  // VGAUWithdraw
  vgauWithdraw: 'VGAU 提現',
  vgauMax: 'VGAU |最大',
  dailyMaximumRedemptionLimitVGAU: '每日最大贖回限額：5000000000 VGAU',

  // Language Names
  languageNames: {
    ar: 'اللغة العربية',
    en: 'English',
    fr: 'Français',
    zh: '繁體中文',
    pt: 'português'
  },

  // LanguageSwitcher
  switchedToChinese: '已切換到中文',
  switchedToEnglish: '已切換到英文'
} 
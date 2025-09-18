export default {
  // 充值確認彈窗
  recharge: {
    modal: {
      title: 'تأكيد الشحن',
      content: 'هل أنت متأكد من شحن {amount} {symbol}؟',
      confirm: 'تأكيد',
      cancel: 'إلغاء'
    },
    loading: 'جاري الشحن...'
  },

  // 提現
  withdraw: {
    modal: {
      title: 'تأكيد السحب',
      content: 'هل أنت متأكد من سحب {amount} {symbol}؟',
      confirm: 'تأكيد',
      cancel: 'إلغاء'
    },
    loading: 'جاري السحب...'
  },

  // 通用UI元素
  common: {
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    search: 'بحث',
    loading: 'جاري التحميل...',
    noData: 'لا توجد بيانات',
    noMoreData: 'لا توجد المزيد من البيانات',
    copy: 'نسخ',
    copied: 'تم النسخ',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    submit: 'إرسال',
    reset: 'إعادة تعيين',
    close: 'إغلاق',
    open: 'فتح',
    refresh: 'تحديث',
    retry: 'إعادة المحاولة',
    success: 'نجح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات',
    amount: 'المبلغ',
    balance: 'الرصيد',
    available: 'متاح',
    currency: 'العملة',
    confirmOperation: 'تأكيد العملية',
    processing: 'جاري المعالجة...',
    operationSuccess: 'تمت العملية بنجاح',
    operationFailed: 'فشلت العملية',
    insufficientFunds: 'رصيد غير كافي',
    userRejected: 'رفض المستخدم العملية',
    gasInsufficient: 'رسوم الغاز غير كافية',
    networkError: 'خطأ في الشبكة',
    pleaseCheckConnection: 'يرجى التحقق من الاتصال',
    pleaseEnterValidAmount: 'يرجى إدخال مبلغ صحيح',
    pleaseEnterPositiveInteger: 'يرجى إدخال رقم صحيح موجب',
    suggestions: 'اقتراحات',
    points: 'النقاط',
    users: 'مستخدم'
  },



  // 导航
  navigation: {
    home: 'الرئيسية',
    defi: 'DeFi',
    ecology: 'البيئة',
    person: 'الملف الشخصي',
    history: 'السجل',
    settings: 'الإعدادات'
  },

  // 首页
  home: {
    title: 'VGAU الذهب الرقمي',
    subtitle: 'منصة ذهب رقمي آمنة وشفافة وموثوقة',
    tvl: 'إجمالي القيمة المقفلة VGAU',
    exchange: 'تبديل USDT إلى VGAU',
    enterAmount: 'أدخل مبلغ التبديل',
    confirmOperation: 'تأكيد العملية',
    projectTitle: 'دفتر الذهب الأفريقي',
    projectDesc: 'بروتوكول RWA يربط أصول الذهب بالرموز المميزة على السلسلة، ويوفر حلولاً آمنة وشفافة لرقمنة الذهب.',
    walletAddress: 'عنوان المحفظة:',
    contractAddress: 'عنوان العقد:',
    goldInventory: 'مخزون الذهب',
    inventoryAmount: 'كمية المخزون',
    dailyInventory: 'كمية المخزون اليومية',
    source: 'المصدر: مناطق التعدين الذهبية الأفريقية',
    certificate: 'رقم الشهادة: AGL-2021-001',
    banner: {
      title1: 'عصر الذهب الرقمي الجديد',
      title2: 'تأمين تقنية البلوك تشين',
      title3: 'تخصيص الأصول العالمية'
    },
    features: {
      audited: 'تم التدقيق',
      custodian: 'خدمة الحفظ',
      details: 'التفاصيل'
    },
    officialSite: 'الموقع الرسمي'
  },

  // DeFi页面
  defi: {
    title: 'خدمات DeFi',
    exchangeRate: 'سعر الصرف',
    balance: 'الرصيد',
    currentApr: 'العائد السنوي الحالي',
    pending: 'في الانتظار',
    claim: 'المطالبة',
    deposit: 'إيداع',
    withdraw: 'سحب',
    finance: 'التمويل',
    lending: 'الإقراض',
    myFinance: 'تمويلي',
    productPurchase: 'شراء المنتج',
    borrowOrder: 'طلب الاقتراض',
    newLending: 'إقراض جديد',
    // عناوين النوافذ المنبثقة
    modalTitles: {
      deposit: 'إيداع',
      withdraw: 'سحب',
      finance: 'التمويل',
      lending: 'الإقراض',
      action: 'عمل'
    },
    tabs: {
      account: 'الحساب',
      loans: 'القروض',
      earn: 'الكسب'
    },
    products: {
      huoqi: 'التمويل الجاري',
      dingqi: 'التمويل المحدد',
      jiedai: 'خدمة الإقراض',
      licai: 'منتجات التمويل',
      shengou: 'الشراء',
      shuhui: 'الاسترداد',
      jiebi: 'فك الرموز',
      fengxian: 'تحذير المخاطر'
    }
  },

  // 生态页面
  ecology: {
    title: 'بناء البيئة',
    description: 'بناء نظام بيئي كامل للذهب الرقمي'
  },

  // 个人中心
  person: {
    title: 'الملف الشخصي',
    walletAddress: 'عنوان المحفظة',
    walletAddressCopied: 'تم نسخ عنوان المحفظة',
    copyFailed: 'فشل النسخ',
    noWalletConnected: 'لم يتم ربط المحفظة',
    connectWallet: 'ربط المحفظة',
    connectingWallet: 'جاري ربط المحفظة...',
    walletConnected: 'تم ربط المحفظة بنجاح',
    walletConnectionFailed: 'فشل ربط المحفظة',
    pleaseConnectWallet: 'يرجى ربط محفظتك أولاً',
    userRejectedConnection: 'رفض المستخدم الربط',
    noWalletDetected: 'لم يتم اكتشاف محفظة',
    assetOverview: 'نظرة عامة على الأصول',
    currentStakedAmount: 'كمية الرهان الحالية',
    totalStakedRewards: 'إجمالي مكافآت الرهان',
    currentCollateral: 'الضمان الحالي',
    remainingDebt: 'الدين المتبقي',
    totalPoints: 'إجمالي النقاط',
    notificationCenter: 'مركز الإشعارات (تنبيهات التصفية)',
    liquidationAlert: 'أصولك قريبة من عتبة التصفية، يرجى التكملة في الوقت المناسب.',
    topUpNow: 'التكملة الآن',
    moreSettings: 'المزيد من الإعدادات',
    menu: {
      details: 'التفاصيل',
      exchange: 'التبديل',
      history: 'السجل',
      invite: 'الدعوة',
      points: 'النقاط',
      redeem: 'الاسترداد',
      service: 'خدمة العملاء',
      settings: 'الإعدادات',
      notice: 'الإشعار'
    },
    logoutConfirm: {
      title: 'تأكيد تسجيل الخروج',
      content: 'هل أنت متأكد من تسجيل الخروج من الحساب الحالي؟ ستحتاج إلى تسجيل الدخول مرة أخرى بعد تسجيل الخروج.',
      confirm: 'تأكيد تسجيل الخروج',
      cancel: 'إلغاء'
    },
    logout: {
      button: 'تسجيل الخروج',
      loading: 'جاري تسجيل الخروج...',
      success: 'تم تسجيل الخروج بنجاح',
      failed: 'فشل تسجيل الخروج'
    },
    logoutErrors: {
      network: 'خطأ في اتصال الشبكة',
      auth: 'خطأ في المصادقة',
      server: 'خطأ في الخادم',
      timeout: 'انتهت مهلة الطلب',
      unknown: 'خطأ غير معروف',
      details: 'تفاصيل الخطأ',
      retry: 'إعادة المحاولة',
      close: 'إغلاق',
      suggestions: 'اقتراحات الحل',
      errorTypes: {
        NETWORK: 'خطأ في الشبكة',
        AUTH: 'خطأ في المصادقة',
        SERVER: 'خطأ في الخادم',
        TIMEOUT: 'خطأ انتهاء المهلة',
        UNKNOWN: 'خطأ غير معروف'
      }
    }
  },

  // 历史记录
  history: {
    title: 'السجل',
    tabs: {
      account: 'الحساب',
      loans: 'القروض',
      earn: 'الكسب'
    },
    filter: {
      all: 'الكل',
      vgau: 'VGAU',
      usdt: 'USDT'
    },
    transaction: {
      deposit: 'إيداع',
      withdraw: 'سحب',
      transfer: 'تحويل',
      swap: 'تبديل',
      ongoing: 'جاري',
      done: 'مكتمل',
      pending: 'في الانتظار',
      processing: 'قيد المعالجة',
      failed: 'فشل',
      cancelled: 'ملغي'
    },
    loadMore: 'تحميل المزيد',
    noMoreData: 'لا توجد المزيد من البيانات',
    noTransactionsFound: 'لا توجد سجلات معاملات',
    transactionHistoryFeature: 'ميزة سجل المعاملات قادمة قريباً',
    loans: {
      stakeRedeem: 'الرهان والاسترداد',
      loanRecords: 'سجلات القروض',
      rewardsHistory: 'تاريخ المكافآت',
      totalDebt: 'إجمالي الدين',
      totalDebtAmount: '121.221 USDT',
      collateralAmt: 'كمية الضمان',
      collateralAmtValue: '221 VGAU',
      borrowedAmt: 'كمية الاقتراض',
      borrowedAmtValue: '45.451115 USDT',
      riskWarning: 'نسبة الضمان منخفضة، يوجد خطر التصفية',
      all: 'الكل',
      loan: 'اقتراض',
      repay: 'سداد',
      borrowing: 'جاري الاقتراض',
      ongoing: 'جاري',
      borrowedAmount: 'مبلغ الاقتراض',
      borrowedAmountValue: '45.451115 USDT',
      collateralAmount: 'مبلغ الضمان',
      collateralAmountValue: '221 VGAU',
      stakingRate: 'معدل الرهان',
      stakingRateValue: '80%',
      collateralVGAU: 'الضمان (VGAU)',
      collateralVGAUValue: '20',
      borrowedUSDT: 'المقترض (USDT)',
      borrowedUSDTValue: '84.2255',
      interestRate: 'معدل الفائدة',
      interestRateValue: '5.2%',
      liquidationPrice: 'سعر التصفية',
      liquidationPriceValue: '$0.85',
      noMoreData: 'لا توجد المزيد من البيانات',
      completed: 'مكتمل',
      details: 'التفاصيل'
    },
    borrowingDetail: {
      title: 'تفاصيل الاقتراض',
      orderId: 'رقم الطلب',
      borrowingStatus: 'جاري الاقتراض',
      completedStatus: 'مكتمل',
      collatRate: 'معدل الضمان',
      collateralVGAU: 'الضمان (VGAU)',
      netAPR: 'صافي العائد السنوي',
      liqPrice: 'سعر التصفية (VGAU/USDT)',
      addCollat: 'إضافة ضمان',
      borrow: 'اقتراض',
      collateral: 'الضمان',
      noMoreData: 'لا توجد المزيد من البيانات'
    },
    earn: {
      filter: {
        all: 'الكل',
        staking: 'جاري الرهان',
        toClaim: 'في انتظار المطالبة',
        completed: 'مكتمل'
      },
      status: {
        staking: 'جاري الرهان',
        toClaim: 'في انتظار المطالبة',
        completed: 'مكتمل'
      },
      viewDetails: 'عرض التفاصيل',
      noTransactionsFound: 'لا توجد سجلات معاملات تمويل'
    },
    earnComingSoon: 'محتوى التمويل قادم قريباً'
  },

  // 质押详情
  stakingDetail: {
    title: 'تفاصيل الرهان',
    days: 'أيام',
    staking: 'جاري الرهان',
    toClaim: 'في انتظار المطالبة',
    completed: 'مكتمل',
    ongoing: 'جاري',
    active: 'نشط',
    pending: 'في الانتظار',
    cancelled: 'ملغي',
    redeemed: 'مسترد',
    startTime: 'وقت البداية',
    endTime: 'وقت النهاية',
    order: 'الطلب',
    noMoreData: 'لا توجد المزيد من البيانات',
    actions: {
      stake: 'رهان',
      redeem: 'استرداد'
    }
  },

  // 充值页面
  rechargePage: {
    usdtRecharge: 'شحن USDT',
    vgauRecharge: 'شحن VGAU',
    amount: 'المبلغ',
    minimumAmount: 'الحد الأدنى 0',
    max: 'الحد الأقصى',
    availableBalance: 'الرصيد المتاح',
    available: 'متاح',
    confirm: 'تأكيد',
    confirmOperation: 'تأكيد العملية',
    processing: 'جاري المعالجة...',
    pleaseEnterValidAmount: 'يرجى إدخال مبلغ شحن صحيح',
    rechargeSuccess: 'تم الشحن بنجاح!',
    rechargeFailed: 'فشل الشحن',
    contractInitFailed: 'فشل تهيئة خدمة العقد',
    userDataLoadFailed: 'فشل تحميل بيانات المستخدم',
    insufficientFunds: 'رصيد غير كافي',
    userRejected: 'رفض المستخدم العملية',
    gasInsufficient: 'رسوم الغاز غير كافية',
    networkError: 'خطأ في الشبكة',
    walletError: 'مشكلة في ربط المحفظة',
    contractError: 'فشل استدعاء العقد',
    networkUnsupported: 'الشبكة الحالية غير مدعومة',
    unknownError: 'حدث خطأ غير معروف أثناء الشحن',
    errorModal: {
      title: '⚠️ فشل الشحن',
      close: '×',
      suggestions: 'اقتراحات الحل:',
      debugInfo: 'معلومات التصحيح:',
      errorType: 'نوع الخطأ',
      contract: 'العقد',
      method: 'الطريقة',
      timestamp: 'الوقت',
      deviceType: 'نوع الجهاز',
      platform: 'المنصة',
      onlineStatus: 'حالة الاتصال',
      online: 'متصل',
      offline: 'غير متصل',
      mobile: 'الهاتف المحمول',
      retry: 'إعادة المحاولة',
      showDebug: 'عرض التصحيح',
      hideDebug: 'إخفاء التصحيح',
      closeError: 'إغلاق'
    },
    errorDetails: {
      networkError: 'مشكلة في اتصال الشبكة، لا يمكن الاتصال بشبكة البلوك تشين',
      walletError: 'مشكلة في ربط المحفظة، يرجى التحقق من حالة المحفظة',
      gasError: 'رسوم الغاز غير كافية أو رصيد الحساب غير كافي',
      contractError: 'فشل استدعاء العقد، قد تكون مشكلة في العقد أو خطأ في المعاملات',
      networkUnsupported: 'الشبكة الحالية غير مدعومة، يرجى التبديل إلى شبكة BSC',
      userRejected: 'لقد ألغيت عملية المعاملة',
      unknownError: 'حدث خطأ غير معروف أثناء الشحن'
    },
    suggestions: {
      network: [
        'تحقق من أن اتصال الشبكة طبيعي',
        'تحقق من إعدادات VPN',
        'حاول تبديل الشبكة',
        'حاول مرة أخرى لاحقاً'
      ],
      wallet: [
        'تأكد من تثبيت MetaMask وإلغاء قفله',
        'تحقق من أن المحفظة متصلة بالشبكة الصحيحة',
        'حاول إعادة ربط المحفظة',
        'قم بتحديث الصفحة وحاول مرة أخرى'
      ],
      gas: [
        'تحقق من أن رصيد BNB كافي',
        'حاول تقليل مبلغ الشحن',
        'تحقق من إعدادات رسوم الغاز',
        'تأكد من وجود BNB كافي لدفع الرسوم'
      ],
      networkUnsupported: [
        'التبديل إلى شبكة BSC الرئيسية (Chain ID: 56)',
        'التبديل إلى شبكة BSC التجريبية (Chain ID: 97)',
        'تحقق من إعدادات شبكة المحفظة',
        'تأكد من صحة إعدادات الشبكة'
      ],
      default: [
        'قم بتحديث الصفحة وحاول مرة أخرى',
        'تحقق من حالة المحفظة',
        'اتصل بالدعم الفني',
        'تحقق من سجل أخطاء وحدة التحكم'
      ]
    }
  },

  // 交易详情
  transactionDetail: {
    title: 'تفاصيل المعاملة',
    transactionTime: 'وقت المعاملة',
    serialNumber: 'الرقم التسلسلي',
    orderId: 'رقم الطلب',
    recordNumber: 'رقم السجل',
    walletAddress: 'عنوان المحفظة',
    transactionHash: 'هاش المعاملة',
    defaultType: 'سحب',
    defaultStatus: 'جاري',
    addressCopied: 'تم نسخ العنوان',
    hashCopied: 'تم نسخ الهاش',
    noHashToCopy: 'لا يوجد هاش معاملة للنسخ',
    status: {
      pending: 'في الانتظار',
      processing: 'قيد المعالجة',
      success: 'نجح',
      completed: 'مكتمل',
      failed: 'فشل',
      cancelled: 'ملغي',
      timeout: 'انتهت المهلة',
      done: 'مكتمل',
      ongoing: 'جاري'
    }
  },

  // 钱包
  wallet: {
    connect: 'ربط المحفظة',
    disconnect: 'قطع الاتصال',
    connected: 'تم ربط المحفظة',
    disconnected: 'تم قطع اتصال المحفظة',
    connectionFailed: 'فشل الاتصال',
    pleaseConnect: 'يرجى ربط المحفظة أولاً',
    addressCopied: 'تم نسخ العنوان',
    contractAddressCopied: 'تم نسخ عنوان العقد',
    copyFailed: 'فشل النسخ',
    balance: 'الرصيد',
    available: 'متاح',
    frozen: 'مجمد',
    total: 'الإجمالي',
    recharge: 'شحن',
    withdraw: 'سحب',
    transfer: 'تحويل',
    address: 'العنوان',
    amount: 'المبلغ',
    currency: 'العملة',
    fee: 'الرسوم',
    confirm: 'تأكيد المعاملة',
    bind: {
      title: 'المحفظة غير مربوطة',
      subtitle: 'المحفظة غير متصلة',
      description: 'محفظتك غير مربوطة بحساب المستخدم. يرجى زيارة موقعنا الرسمي أولاً لربط عنوان البريد الإلكتروني.',
      visitWebsite: 'زيارة الموقع الرسمي',
      cancel: 'إلغاء',
      checking: 'جاري التحقق من ربط المحفظة...',
      notBound: 'المحفظة غير مربوطة بحساب المستخدم',
      checkFailed: 'فشل فحص المحفظة',
      chainIdMissing: 'لا يمكن الحصول على معرف سلسلة الشبكة، يرجى التأكد من أن المحفظة متصلة ومبدلة إلى الشبكة الصحيحة'
    }
  },

  // 用户认证
  auth: {
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    register: 'التسجيل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور',
    rememberMe: 'تذكرني',
    loginSuccess: 'تم تسجيل الدخول بنجاح',
    loginFailed: 'فشل تسجيل الدخول',
    logoutSuccess: 'تم تسجيل الخروج بنجاح',
    registerSuccess: 'تم التسجيل بنجاح',
    registerFailed: 'فشل التسجيل'
  },

  // 用户资料
  profile: {
    title: 'الملف الشخصي',
    nickname: 'الاسم المستعار',
    phone: 'رقم الهاتف',
    email: 'البريد الإلكتروني',
    country: 'البلد',
    avatar: 'الصورة الشخصية',
    updateSuccess: 'تم التحديث بنجاح',
    updateFailed: 'فشل التحديث'
  },

  // KYC认证
  kyc: {
    title: 'التحقق من الهوية',
    status: {
      pending: 'في انتظار المراجعة',
      approved: 'تم الموافقة',
      rejected: 'تم الرفض',
      null: 'لم يتم الإرسال'
    },
    documents: {
      documentPhoto: 'صورة الهوية',
      portraitPhoto: 'صورة شخصية',
      holdingDocumentPhoto: 'صورة مع الهوية',
      addressProof: 'إثبات العنوان'
    },
    submitSuccess: 'تم الإرسال بنجاح',
    submitFailed: 'فشل الإرسال'
  },

  // 2FA认证
  totp: {
    title: 'المصادقة الثنائية',
    setup: 'إعداد 2FA',
    verify: 'التحقق من 2FA',
    disable: 'تعطيل 2FA',
    code: 'رمز التحقق',
    qrCode: 'رمز QR',
    secretKey: 'المفتاح السري',
    setupSuccess: 'تم الإعداد بنجاح',
    verifySuccess: 'تم التحقق بنجاح',
    disableSuccess: 'تم التعطيل بنجاح'
  },

  // 邀请
  invite: {
    title: 'دعوة الأصدقاء',
    code: 'رمز الدعوة',
    copyCode: 'نسخ رمز الدعوة',
    bindCode: 'ربط رمز الدعوة',
    relations: 'علاقات الدعوة',
    inviter: 'المدعو',
    invitees: 'المدعوين',
    rewards: 'المكافآت',
    copySuccess: 'تم نسخ رمز الدعوة'
  },

  // 设置
  settings: {
    title: 'الإعدادات',
    language: 'اللغة',
    theme: 'المظهر',
    notification: 'الإشعارات',
    security: 'الأمان',
    about: 'حول',
    version: 'الإصدار',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الخدمة',
    help: 'مركز المساعدة',
    settings: 'الإعدادات',
    termsOfService: 'شروط الخدمة',
    liquidationAlertRepaymentRules: 'قواعد تنبيه التصفية والسداد',
    serviceAgreement: 'اتفاقية الخدمة',
    inviter: 'المدعو',
    liquidationAlert: 'تنبيه التصفية',
    liquidationAlertReminder: 'عندما تصل نسبة الضمان إلى 85%، سيحصل المستخدمون على تذكير إضافة ضمان عبر البريد الإلكتروني.',
    liquidationAlertApproaching: 'عندما تصل نسبة الضمان إلى 88%، سيحصل المستخدمون على تذكير عبر البريد الإلكتروني وصفحة الملف الشخصي، لإعلامهم بأنهم يقتربون من نسبة التصفية.',
    repaymentRules: 'قواعد السداد',
    fullRepaymentOnly: 'يُسمح بالسداد الكامل فقط.',
    forcedLiquidation: 'التصفية الإجبارية',
    forcedLiquidationDisbursement: 'عند إصدار القرض، يتم تجميد 2% من مبلغ القرض أولاً كتأمين تصفية، ويتم توزيع 98% المتبقية من USDT على حساب USDT.',
    forcedLiquidationRedemption: 'فقط بعد سداد القرض بالكامل، سيقوم النظام تلقائياً بتحويل ضمان VGAU المقابل إلى حساب VGAU وإرجاع 2% الأصلية من تأمين التصفية إلى حساب USDT.',
    forcedLiquidationPlatformFee: 'إذا تم تشغيل التصفية الإجبارية، ستصبح 2% من تأمين التصفية رسوم تصفية المنصة؛ إذا تسبب تقلبات السوق في انخفاض قيمة الأصول المضمونة عن إجمالي الدين، يجب على المقترض إكمال الدين المتبقي فوراً.',
    forcedLiquidationRemainingDebt: 'تدعم المنصة أوامر قروض متعددة، كل طلب له تسعير مستقل ومراقبة مخاطر، ولا يتداخل مع بعضها البعض.',
    forcedLiquidationMultipleLoans: 'تدعم المنصة أوامر قروض متعددة، كل طلب له تسعير مستقل ومراقبة مخاطر، ولا يتداخل مع بعضها البعض.',
    inviteDescription: 'املأ رمز الدعوة لمساعدة أصدقائك في إكمال مهمة الدعوة',
    inviteCodePlaceholder: 'أدخل رمز الدعوة',
    submit: 'إرسال',
    lastUpdated: 'آخر تحديث: 31 أغسطس 2025',
    serviceAgreementText: 'هذه الاتفاقية (المشار إليها فيما بعد باسم "الاتفاقية") تم وضعها من قبلك ("المستخدم") وVerigold ("المنصة") لتوضيح الشروط والأحكام لاستخدام المستخدم للخدمات ذات الصلة على المنصة. من خلال الوصول إلى أو استخدام أي من الخدمات المقدمة من المنصة، فإنك توافق على الالتزام بجميع شروط هذه الاتفاقية.',
    serviceContent: 'محتوى الخدمة',
    stakingReturnCalculation: '1. رهان VGAU: يمكن للمستخدمين إيداع رموز VGAU في المنصة والحصول على عائد USDT بناءً على مدة الرهان المختارة والعائد السنوي (APY). طريقة حساب عائد الرهان كما يلي:',
    fixedTermStakingReturn: '（1）عائد الرهان المحدد = مبلغ الرهان × معدل الفائدة السنوي × أيام الرهان / 365',
    flexibleStakingReturn: '（2）عائد الرهان المرن = مبلغ الرهان × سعر VGAU الحالي × معدل الفائدة السنوي × أيام الرهان / 365',
    lendingServices: '2. خدمات الإقراض: يمكن للمستخدمين استخدام رموز VGAU كضمان لاقتراض USDT. في عملية الإقراض، ستتم تعديل معاملات مثل نسبة الضمان وخط إضافة الضمان وخط التصفية ديناميكياً بناءً على تقلبات أسعار السوق.',
    redemptionServices: '3. خدمات الاسترداد: يمكن للمستخدمين استرداد الأصول المرهونة أو المقترضة من خلال وظيفة الاسترداد المقدمة من المنصة. يتم حساب مبلغ الاسترداد بناءً على سعر الصرف الفوري وشروط الرهان.',
    exchangeServices: '4. خدمات التبديل: يمكن للمستخدمين تبديل USDT إلى رموز VGAU داخل المنصة، أو تبديل رموز VGAU إلى USDT.'
  },

  // 错误信息
  errors: {
    networkError: 'خطأ في الشبكة، يرجى التحقق من الاتصال',
    serverError: 'خطأ في الخادم، يرجى المحاولة لاحقاً',
    unauthorized: 'يرجى تسجيل الدخول أولاً',
    forbidden: 'صلاحيات غير كافية',
    notFound: 'المورد غير موجود',
    requestFailed: 'فشل الطلب',
    invalidInput: 'إدخال غير صحيح',
    fileTooLarge: 'الملف كبير جداً',
    fileTypeNotSupported: 'نوع الملف غير مدعوم'
  },

  // 成功信息
  success: {
    operationSuccess: 'تمت العملية بنجاح',
    saveSuccess: 'تم الحفظ بنجاح',
    deleteSuccess: 'تم الحذف بنجاح',
    copySuccess: 'تم النسخ بنجاح',
    uploadSuccess: 'تم الرفع بنجاح'
  },

  // 表单验证
  validation: {
    required: 'هذا الحقل مطلوب',
    email: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    phone: 'يرجى إدخال رقم هاتف صحيح',
    password: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    confirmPassword: 'كلمات المرور المدخلة غير متطابقة',
    amount: 'يرجى إدخال مبلغ صحيح',
    address: 'يرجى إدخال عنوان صحيح',
    code: 'رمز التحقق',
    emailCodePlaceholder: 'يرجى إدخال رمز التحقق من البريد الإلكتروني',
    totpCodePlaceholder: 'يرجى إدخال رمز التحقق TOTP',
    codePlaceholder: 'يرجى إدخال رمز التحقق'
  },

  // 組件特定鍵值
  components: {
    // Exchange
    exchange: {
      title: 'التبادل',
      brandTitle: 'VGAU',
      brandSubtitle: 'الذهب الرقمي',
      brandDescription: 'رمز ذهب رقمي قائم على تقنية البلوك تشين',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'أدخل مبلغ التبادل',
      requiredUSDT: 'USDT المطلوب',
      exchanging: 'جاري التبادل...',
      exchangeSuccess: 'تم التبادل بنجاح',
      exchangeSuccessDesc: 'تم تبادل {amount} VGAU بنجاح، استهلاك {usdt} USDT',
      exchangeFailed: 'فشل التبادل',
      confirmExchange: 'تأكيد التبادل',
      confirm: 'تأكيد'
    },

    // Redeem
    redeem: {
      title: 'الاسترداد',
      brandTitle: 'VGAU',
      brandSubtitle: 'الذهب الرقمي',
      brandDescription: 'رمز ذهب رقمي قائم على تقنية البلوك تشين',
      currency1: 'VGAU',
      currency2: 'USDT',
      redeemAmountPlaceholder: 'أدخل مبلغ الاسترداد',
      requiredUSDT: 'احصل على USDT',
      confirmRedeem: 'تأكيد الاسترداد',
      redeemSuccess: 'تم الاسترداد بنجاح',
      redeemSuccessDesc: 'تم استرداد {amount} VGAU بنجاح، حصلت على {usdt} USDT',
      confirm: 'تأكيد'
    },

    // IncreaseCollateral
    increaseCollateral: {
      title: 'زيادة مبلغ الضمان',
      increaseCollateralAmount: 'زيادة مبلغ الضمان',
      currentCollateral: 'مبلغ الضمان (VGAU)',
      collateralAmount: 'مبلغ الضمان (VGAU)',
      insuranceFee: 'رسوم تأمين التصفية (USDT)',
      initialRatio: 'نسبة الرهان الأولية',
      initialCollateralRatio: 'نسبة الرهان الأولية',
      stakingRatio: 'نسبة الرهان الحالية',
      stakingRatioAfter: 'نسبة الرهان بعد زيادة مبلغ الضمان',
      stakingRatioAfterIncrease: 'نسبة الرهان بعد زيادة مبلغ الضمان',
      increaseAmount: 'مبلغ الزيادة',
      amountPlaceholder: 'أدخل المبلغ',
      availableAssets: 'الأصول المتاحة',
      max: 'الحد الأقصى',
      confirmOperation: 'تأكيد العملية',
      confirm: 'تأكيد',
      warning: 'إذا لم تكن نسبة الضمان 0% أو لم يتم إكمال السداد الكامل، لا يمكن استرداد أصول الضمان الخاصة بك.',
      collateralRatioWarning: 'إذا لم تكن نسبة الضمان 0% أو لم يتم إكمال السداد الكامل، لا يمكن استرداد أصول الضمان الخاصة بك.',
      instruction: 'تأكد من إكمال جميع المدفوعات وأن نسبة الضمان 0%. سيقوم النظام تلقائياً بإرجاع أصول الضمان الخاصة بك إلى عنوان المحفظة المرتبط.',
      collateralRatioInstruction: 'تأكد من إكمال جميع المدفوعات وأن نسبة الضمان 0%. سيقوم النظام تلقائياً بإرجاع أصول الضمان الخاصة بك إلى عنوان المحفظة المرتبط.',
      repaying: 'أنت تسدد حالياً',
      repaymentAmount: 'أنت تسدد حالياً',
      repaymentAmountValue: '77.74 USDT',
      afterRepayment: 'بعد إكمال السداد',
      repaymentAfter: 'بعد إكمال السداد',
      willReturn: 'سيتم إرجاع',
      repaymentResult: 'سيتم إرجاع',
      repaymentResultRedeem: '100 VGAU',
      andRefund: 'واسترداد',
      repaymentResultRefund: '1.56 USDT',
      repaymentSuccess: 'تم السداد بنجاح',
      repaymentSuccessful: 'تم السداد بنجاح',
      willRedeem: 'سيتم استرداد',
      successResult: 'سيتم استرداد',
      successResultRedeem: '100 VGAU',
      successResultRefund: 'استرداد 1.56 USDT',
      collateralIncreased: 'تم زيادة مبلغ الضمان بنجاح',
      increaseSuccess: 'لقد زدت {amount}',
      newCollateralRatio: 'نسبة الرهان بعد زيادة مبلغ الضمان هي {ratio}',
      confirmButton: 'تأكيد'
    },

    // Redeem

    // MyFinance
    myFinance: {
      title: 'تمويلي',
      redemptionNotice: 'الأصول المحددة سيتم استردادها فوراً إلى حسابك',
      asset: 'الأصل',
      maturityYield: 'العائد عند الاستحقاق',
      startTime: 'وقت البداية',
      endTime: 'وقت النهاية',
      redeemable: 'قابل للاسترداد',
      staking: 'جاري الرهان',
      allLoaded: 'تم تحميل الكل',
      redeem: 'استرداد',
      redeemFeature: 'ميزة الاسترداد قادمة قريباً',
      totalAssets: 'إجمالي الأصول',
      totalEarnings: 'إجمالي الأرباح',
      activeProducts: 'المنتجات النشطة',
      noActiveProducts: 'لا توجد منتجات نشطة',
      viewDetails: 'عرض التفاصيل'
    },

    // ProductHelp
    productHelp: {
      title: 'مساعدة المنتج',
      helpContent: 'محتوى المساعدة قادم قريباً...',
      contactSupport: 'اتصل بالدعم'
    },

    // ProductPurchase
    productPurchase: {
      productPurchase: 'شراء المنتج',
      productDetails: 'تفاصيل المنتج',
      term: 'المدة',
      apy: 'العائد السنوي',
      minAmount: 'الحد الأدنى',
      maxAmount: 'الحد الأقصى',
      riskLevel: 'مستوى المخاطر',
      amount: 'المبلغ',
      enterStakingAmount: 'أدخل المبلغ',
      vgau: 'VGAU',
      max: 'الحد الأقصى',
      availableBalance: 'متاح',
      balanceAmount: '0',
      transactionRules: 'قواعد المعاملات',
      productRules: 'قواعد المنتج',
      purchaseTime: 'وقت الشراء',
      purchaseTimeValue: '2025-07-18 14:00',
      expirationTime: 'وقت الانتهاء',
      expirationTimeValue: '2025-07-29 08:00',
      estimatedInterest: 'الفائدة المقدرة (USDT)',
      estimatedInterestValue: '--',
      requiresManualRedemption: 'يتطلب استرداد يدوي',
      requiresManualRedemptionValue: '--',
      rewards: '1. المكافآت',
      rewardsDailyChange: 'العائد السنوي للمنتج المحدد الذي تشتريه قد يتغير يومياً.',
      rewardsStartCalculation: 'ستبدأ المكافآت في الحساب في اليوم التالي للشراء في 00:00 (UTC)، ولا يمكن الاسترداد أثناء فترة الرهان.',
      rewardsAfterStaking: 'بعد انتهاء فترة الرهان، تحتاج إلى التحويل يدوياً إلى رهان مرن، وسيتم توزيع العائدات المقابلة على الحساب، ويمكن سحب العائدات الموزعة فوراً.',
      settlementIncome: 'عائد التسوية = أصل الشراء × العائد السنوي ÷ 365 × المدة الثابتة (دقيق إلى منزلة عشرية)',
      subscriptionAndRedemption: '2. الشراء والاسترداد',
      subscriptionAndRedemptionDaily: 'شراء واسترداد منتجات العائد الثابت المضمون مفتوح يومياً من 00:10 UTC إلى 23:50 UTC.',
      earlyRedemption: '3. الاسترداد المبكر',
      earlyRedemptionMyFinance: 'بالنسبة للمنتج المحدد، يمكنك استرداد الأصول في أي وقت في "تمويلي".',
      earlyRedemptionLoseIncome: 'إذا قمت بالاسترداد المبكر، ستفقد جميع المكافآت الموزعة لهذا المنتج.',
      earlyRedemptionBalanceCredit: 'إجمالي رصيد الأصول المقفل لهذا المنتج، مطروحاً منه جميع المكافآت التي تلقتها خلال هذه الفترة، سيتم إضافته إلى حسابك النقدي خلال 72 ساعة.',
      earlyRedemptionMarketFluctuations: 'في حالات التقلبات السوقية الشديدة أو تأخير الشبكة أو كثرة طلبات الاسترداد، قد يتأخر الاسترداد.',
      confirm: 'تأكيد',
      processing: 'جاري المعالجة...',
      recordsFeature: 'ميزة السجلات قادمة قريباً',
      amountOutOfRange: 'المبلغ خارج النطاق (100-10,000 VGAU)',
      selectProduct: 'يرجى اختيار منتج',
      orderCreateSuccess: 'تم إنشاء طلب الرهان بنجاح!',
      orderCreateFailed: 'فشل إنشاء الطلب',
      productNotFound: 'المنتج غير موجود',
      invalidAmount: 'مبلغ غير صحيح',
      purchaseFeature: 'ميزة الشراء قادمة قريباً',
      purchaseSuccess: 'تم الشراء بنجاح',
      purchaseFailed: 'فشل الشراء'
    },

    // InfoPage
    infoPage: {
      title: 'معلومات',
      infoContent: 'محتوى المعلومات...',
      moreInfo: 'مزيد من المعلومات'
    },

    // NewLending
    newLending: {
      lending: 'إقراض',
      pledgedVGAUAssets: 'أصول VGAU المرهونة لن تحصل على مكافآت حماية رأس المال',
      collateralQuantity: 'كمية الضمان',
      enterCollateralAmount: 'أدخل كمية الضمان',
      max: 'الحد الأقصى',
      availableAssets: 'الأصول المتاحة',
      availableToBorrow: 'المبلغ القابل للاقتراض',
      lendingAmount: 'مبلغ الإقراض',
      borrowRange: 'نطاق الاقتراض',
      enterBorrowAmount: 'أدخل مبلغ الاقتراض',
      liquidationInsuranceFee: 'رسوم تأمين التصفية',
      initialCollateralRatio: 'نسبة الضمان الأولية',
      additionalMargin: 'الهامش الإضافي',
      forcedLiquidationCollateralRatio: 'نسبة ضمان التصفية الإجبارية',
      annualInterestRate: 'معدل الفائدة السنوي',
      netAnnualizedInterestRate: 'صافي معدل الفائدة السنوي',
      estimatedHourlyInterestRate: 'معدل الفائدة الساعي المقدر',
      liquidationReferencePrice: 'سعر مرجع التصفية (VGAU/USDT)',
      confirmLending: 'تأكيد الإقراض',
      pleaseEnterBorrowAmount: 'أدخل مبلغ اقتراض صحيح',
      lendingFeature: 'ميزة الإقراض قادمة قريباً',
      loanAmount: 'مبلغ القرض',
      collateralAmount: 'مبلغ الضمان',
      interestRate: 'معدل الفائدة',
      loanTerm: 'مدة القرض',
      confirmLoan: 'تأكيد القرض',
      applying: 'جاري التقديم...',
      loanSuccess: 'تم تقديم طلب القرض بنجاح',
      loanFailed: 'فشل تقديم طلب القرض'
    },

    // BorrowOrder
    borrowOrder: {
      title: 'طلب اقتراض العملات',
      borrowOrder: 'طلب اقتراض العملات',
      orderNumber: 'رقم الطلب',
      borrowedUSDTArrival: 'USDT المقترض سيصل فوراً إلى أموال الاقتراض لسحب USDT',
      totalLiabilities: 'إجمالي الالتزامات (USDT)',
      collateralAmount: 'كمية الضمان (VGAU)',
      pledgeRatio: 'نسبة الرهان',
      netAnnualizedInterestRate: 'USDT المطلوب سداده',
      liquidationReferencePrice: 'سعر مرجع التصفية (VGAU/USDT)',
      increaseCollateralAmount: 'زيادة مبلغ الضمان',
      adjustPledgeRatio: 'تعديل نسبة الرهان',
      fullRepayment: 'سداد كامل',
      allLoaded: 'تم تحميل الكل',
      recordsFeature: 'ميزة السجلات قادمة قريباً',
      adjustPledgeRatioFeature: 'ميزة السداد الكامل قادمة قريباً',
      orderStatus: 'حالة الطلب',
      borrowAmount: 'مبلغ الاقتراض',
      repayAmount: 'مبلغ السداد',
      dueDate: 'تاريخ الاستحقاق',
      actions: 'الإجراءات',
      repay: 'سداد',
      extend: 'تمديد',
      // نافذة تأكيد السداد
      repayModal: {
        title: 'تأكيد السداد الكامل',
        content: 'هل أنت متأكد من أنك تريد سداد الطلب {orderNumber} بالكامل؟',
        contentWithAmount: 'هل أنت متأكد من أنك تريد سداد الطلب {orderNumber} بالكامل؟\nمبلغ السداد: {amount} USDT',
        confirm: 'تأكيد السداد',
        cancel: 'إلغاء',
        loading: 'جاري السداد...',
        success: 'تم السداد بنجاح',
        failed: 'فشل في السداد'
      }
    },

    // USDTWithdraw & VGAUWithdraw
    withdraw: {
      title: 'سحب',
      withdrawAmount: 'مبلغ السحب',
      withdrawTo: 'سحب إلى',
      boundWallet: 'عنوان المحفظة المرتبط',
      confirmWithdraw: 'تأكيد السحب',
      withdrawing: 'جاري السحب...',
      withdrawSuccess: 'تم السحب بنجاح',
      withdrawFailed: 'فشل السحب'
    },


    // Invitation
    invitation: {
      invitation: 'دعوة',
      invitationRewards: '1,580 نقطة',
      invitationRewardsLabel: 'مكافآت الدعوة',
      numberOfInvitedPeople: '12 مستخدم',
      numberOfInvitedPeopleLabel: 'عدد المدعوين',
      numberOfDirectPushPersonnel: '6 مستخدم',
      numberOfDirectPushPersonnelLabel: 'عدد الدفع المباشر',
      invitationLink: 'رابط الدعوة',
      copyLink: 'نسخ الرابط',
      invitationRewardDetails: 'تفاصيل مكافآت الدعوة',
      id: 'المعرف',
      walletAddr: 'عنوان المحفظة',
      type: 'النوع',
      rewards: 'المكافآت (نقاط)',
      allContentLoaded: 'تم تحميل كل المحتوى',
      ruleDetails: 'تفاصيل القواعد',
      successfullyReferUserThroughKYC: 'نجح في إحالة المستخدم من خلال KYC والحصول على النقاط:',
      directReferral: 'مكافأة الإحالة المباشرة',
      indirectReferral: 'مكافأة الدعوة غير المباشرة',
      directPush: 'مباشر',
      indirectPush: 'غير مباشر',
      // 后端返回值的映射
      rewardTypeMapping: {
        '直推': 'مباشر',
        '间推': 'غير مباشر',
        'direct': 'مباشر',
        'indirect': 'غير مباشر',
        '完成质押赎回获得积分': 'إكمال استرداد الرهان',
        'staking': 'رهان',
        '质押': 'رهان'
      },
      rewardsPerUser: '2 نقطة/مستخدم',
      indirectRewardsPerUser: '0.2 نقطة/مستخدم',
      pointsUnit: 'نقطة/مستخدم',
      linkCopied: 'تم نسخ رابط الدعوة!',
      invitationCode: 'رمز الدعوة',
      copyCode: 'نسخ الرمز',
      inviteFriends: 'دعوة الأصدقاء',
      referralRewards: 'مكافآت الإحالة',
      myInvitations: 'دعواتي',
      bindSuccess: 'تم إرسال رمز الدعوة بنجاح!'
    },

    // PointsDetails
    pointsDetails: {
      pointsDetails: 'تفاصيل النقاط',
      totalPoints: 'إجمالي النقاط',
      all: 'الكل',
      staking: 'رهان',
      invite: 'دعوة',
      lending: 'إقراض',
      exchange: 'تبديل',
      ecosystem: 'بيئة',
      stakingRewards: 'رهان',
      invitation: 'دعوة',
      ecosystemParticipation: 'مشاركة البيئة',
      lending: 'إقراض',
      exchangeVGT: 'تبديل VGT',
      allLoaded: 'تم تحميل الكل',
      earnedPoints: 'النقاط المكتسبة',
      spentPoints: 'النقاط المنفقة',
      pointsHistory: 'تاريخ النقاط',
      noHistory: 'لا يوجد تاريخ نقاط',
      // أوصاف أنواع عمليات النقاط
      createStakingOrder: 'رهان',
      inviteRelationship: 'دعوة',
      directReferral: 'مباشر',
      indirectReferral: 'غير مباشر',
      lendingRepayment: 'سداد القرض'
    },

  },

  // Financial Products
  financialProducts: 'المنتجات المالية',
  returnsAndRisks: 'العوائد والمخاطر',
  returnSources: 'مصادر العوائد',
  whatAreFinancialProducts: 'ما هي المنتجات المالية؟',
  thisIsADigitalAssetAppreciationSchemeAnchoredToGold: 'هذا مخطط تقييم للأصول الرقمية مرتبط بالذهب.',
  whenUsersPurchaseAndHoldVGAUTokens: 'عندما يشتري المستخدمون ويحتفظون برموز VGAU، فإنها تمثل ودائع ذهب مادي مكافئ، وتتقلب قيمة الأصول مع ظروف السوق.',
  theyRepresentDepositsOfEquivalentPhysicalGold: 'تمثل ودائع ذهب مادي مكافئ، وتتقلب قيمة الأصول مع ظروف السوق.',
  andAssetValuesFluctuateWithMarketConditions: 'تتقلب قيمة الأصول مع ظروف السوق.',
  inTheirAccounts: 'في حساباتهم،',
  usersCanParticipateInDifferentTermAndRuleBasedYieldSchemesWithVGAU: 'يمكن للمستخدمين استخدام VGAU للمشاركة في مخططات عوائد مختلفة المدة وقائمة على القواعد،',
  andTheSystemWillGenerateRewardsAccordingToTheRules: 'وسيقوم النظام بتوليد المكافآت وفقاً للقواعد.',
  rewardsInTheAccountNeedToBeClaimedManually: 'المكافآت في الحساب تحتاج إلى مطالبة يدوية.',
  rewardsInFinancialProductsAccumulateInRealTimeToMeetDifferentAssetManagementNeeds: 'المكافآت في المنتجات المالية تتراكم في الوقت الفعلي لتلبية احتياجات إدارة الأصول المختلفة.',
  advantages: 'المزايا',
  flexibleProductsAvailableForRedemption: 'المنتجات المرنة قابلة للاسترداد في أي وقت',
  usersCanSubscribeAndRedeemFlexibleProductsAtAnyTime: 'يمكن للمستخدمين الاشتراك واسترداد المنتجات المرنة في أي وقت.',
  fixedTermProductsOfferHigherAPY: 'المنتجات محددة المدة تقدم عائد سنوي أعلى',
  fixedTermProductsHaveFixedTermsButTheirAnnualizedYieldsAreTypicallyHigherThanFlexibleProducts: 'المنتجات محددة المدة لها شروط ثابتة، لكن عوائدها السنوية عادة ما تكون أعلى من المنتجات المرنة.',
  manualRedemptionOfInterestEarnings: 'استرداد يدوي لأرباح الفوائد',
  dailyUSDTEarningsWillAutomaticallyGoToTheWithdrawalBalanceWhichNeedsToBeManuallyWithdrawn: 'أرباح USDT اليومية ستذهب تلقائياً إلى رصيد السحب الذي يحتاج إلى سحب يدوي.',
  risks: 'المخاطر',
  veryLowRisk: 'مخاطر منخفضة جداً',
  digitalAssetPricesMayFluctuateIfThereAreTooManyRedemptionRequestsItMayLeadToTemporarilyInsufficientAvailableRedemptionBalanceResultingInDelayedRedemptionRestAssuredYourAssetsAreAlwaysSafeAndSecure: 'أسعار الأصول الرقمية قد تتقلب. إذا كانت هناك طلبات استرداد كثيرة جداً، فقد يؤدي ذلك إلى عدم كفاية رصيد الاسترداد المتاح مؤقتاً، مما يؤدي إلى تأخير الاسترداد. كن مطمئناً، أصولك آمنة ومأمونة دائماً.',
  eachOfYourTokensCorrespondsToPhysicalGoldHeldInOurAfricanMiningAreasAndAuditedByAuthoritativeInstitutions: 'كل رمز من رموزك (1 VGAU = 1g ذهب مادي) يتوافق مع ذهب مادي محتفظ به في مناطق التعدين الأفريقية لدينا ومدقق من قبل مؤسسات معتمدة.',
  theStableReturnsYouEarnThroughStakingComeFromTheProjectTeamsActiveManagementAndOperationOfTheUnderlyingGoldAssets: 'العوائد المستقرة التي تكسبها من خلال الرهان تأتي من الإدارة النشطة وتشغيل أصول الذهب الأساسية من قبل فريق المشروع.',
  confirm: 'تأكيد',

  // InfoPage
  glossary: 'شرح المصطلحات',
  repaymentRules: 'قواعد السداد',
  forcedLiquidationInsuranceFee: 'رسوم تأمين التصفية الإجبارية',
  forcedLiquidationInsuranceFeeDescription: 'عند الاقتراض، ستحسب المنصة رسوم تأمين التصفية الإجبارية 2% من الحد الأقصى للمبلغ القابل للاقتراض. سيتم خصم هذه الرسوم من المبلغ القابل للاقتراض.',
  forcedLiquidationInsuranceFeeAfterRepayment: 'بعد أن يسدد المقترض القرض بالكامل، ستعيد المنصة رسوم تأمين التصفية الإجبارية المقابلة إلى حساب اقتراض USDT الخاص به.',
  forcedLiquidationInsuranceFeeOnForcedLiquidation: 'إذا حدثت تصفية إجبارية لطلب اقتراض العملات المشفرة، ستقوم المنصة بتحصيل رسوم تأمين التصفية الإجبارية هذه.',
  pledgeRateAnnotation: 'شرح نسبة الرهان',
  currentPledgeRate: 'نسبة الرهان الحالية',
  pledgeRateDescription: 'نسبة الرهان، أو LTV (نسبة القرض إلى القيمة)، تمثل النسبة بين الأصول الرقمية المقترضة وقيمة الضمان (محسوبة على أساس الضمان). قيمة الأصول محسوبة على أساس مؤشرات أسعار العملات المشفرة المختلفة.',
  initialPledgeRate: 'نسبة الرهان الأولية',
  initialPledgeRatePercentage: '78%',
  initialPledgeRateDescription: 'نسبة الرهان الأولية هي النسبة الأولية بين قيمة الضمان التي تحتاج إلى تقديمها ومبلغ القرض.',
  marginCall: 'الهامش الإضافي',
  marginCallPercentage: '85%',
  marginCallDescription: 'نسبة رهان الهامش الإضافي هي خط التحذير عندما يقترب عقد القرض من نسبة رهان التصفية الإجبارية.',
  forcedLiquidationPledgeRate: 'نسبة رهان التصفية الإجبارية',
  forcedLiquidationPledgeRatePercentage: '91%',
  forcedLiquidationPledgeRateDescription: 'إذا وصلت نسبة الرهان إلى نسبة رهان التصفية الإجبارية، سيقوم النظام فوراً بتنفيذ التصفية الإجبارية، باستخدام أصول الضمان الخاصة بك لسداد قرض السوق النقدي الخاص بك، وستقوم بتحصيل رسوم تصفية إجبارية 2% على مبلغ القرض.',
  netAnnualizedInterestRate: 'صافي معدل الفائدة السنوي',
  netAnnualizedInterestRateDescription: 'ستستمر أصول الضمان في الحصول على مكافآت فائدة سنوية في الوقت الفعلي، مما يساعد على تعويض تكلفة اقتراض العملات المشفرة. صافي معدل الفائدة السنوي = معدل الفائدة السنوي - (معدل الفائدة السنوي في الوقت الفعلي للضمان / نسبة الرهان الأولية)',
  annualInterestRate: 'معدل الفائدة السنوي',
  annualInterestRateDescription: 'سيتم حساب الفائدة باستخدام الفائدة المركبة. تتراكم الفائدة من بداية اقتراض العملات المشفرة بنجاح، وتحسب كل دقيقة. إذا كانت مدة الاقتراض أقل من دقيقة، فستحسب أيضاً كدقيقة واحدة.',
  collateralRequiredForLending: 'الضمان المطلوب للإقراض يأتي من حساب VGAU الجاري. بمجرد تحويله إلى ضمان، لن ينتج هذا الجزء عوائد جارية.',
  defaultInitialPledgeRate: 'نسبة الرهان الأولية الافتراضية هي',
  defaultInitialPledgeRatePercentage: '78%',
  loanAmountDescription: '. عند إنشاء طلب قرض، يمكن تعديل نسبة الرهان وفقاً لمبلغ القرض.',
  forcedLiquidationInsuranceFeeOnForcedLiquidationDescription: 'إذا تم تشغيل التصفية الإجبارية، ستصبح رسوم تأمين التصفية الإجبارية 2% ملكاً للمنصة كرسوم تصفية؛ إذا تسبب تقلبات السوق الشديدة في انخفاض قيمة أصول الضمان عن إجمالي الدين، يجب على المقترض إكمال المبلغ المستحق المتبقي فوراً. تدعم المنصة طلبات قروض متعددة، كل طلب له تسعير مستقل ومراقبة مخاطر، ولا يتداخل مع بعضها البعض.',
  repaymentUsingAccountBalance: 'السداد باستخدام رصيد الحساب: لا يمكن استرداد الضمان قبل السداد الكامل. يمكن للمستخدمين إضافة المزيد من VGAU لتقليل نسبة الرهان وتجنب التصفية.',

  // USDTWithdraw
  usdtWithdraw: 'سحب USDT',
  selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days: 'الأصول المحددة سيتم استردادها بالكامل إلى محفظتك بعد T+1 يوم.',
  totalRedemptionAmount: 'إجمالي مبلغ الاسترداد',
  minimum0: 'الحد الأدنى 0',
  usdtMax: 'USDT |الحد الأقصى',
  availableBalance: 'الرصيد المتاح',
  estimatedFee: 'الرسوم المقدرة',
  withdrawTo: 'سحب إلى',
  boundWalletAddress: 'عنوان المحفظة المرتبط',
  dailyMaximumRedemptionLimit: 'الحد الأقصى اليومي للاسترداد: 5000000000 USDT',
  confirm: 'تأكيد',
  pleaseEnterWithdrawAmount: 'أدخل مبلغ السحب',
  withdrawFeatureComingSoon: 'ميزة السحب قادمة قريباً',

  // VGAUWithdraw
  vgauWithdraw: 'سحب VGAU',
  vgauMax: 'VGAU |الحد الأقصى',
  dailyMaximumRedemptionLimitVGAU: 'الحد الأقصى اليومي للاسترداد: 5000000000 VGAU',

  // Language Names
  languageNames: {
    ar: 'اللغة العربية',
    en: 'English',
    fr: 'Français',
    zh: '繁體中文',
    pt: 'português'
  },

  // LanguageSwitcher
  switchedToArabic: 'تم التبديل إلى العربية',
  switchedToEnglish: 'تم التبديل إلى الإنجليزية'
}
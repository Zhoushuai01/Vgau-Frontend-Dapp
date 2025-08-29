export default {
  // Recharge modal
  recharge: {
    modal: {
      title: 'Confirm Recharge',
      content: 'Are you sure you want to recharge {amount} {symbol}?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    loading: 'Recharging...'
  },

  // Withdraw
  withdraw: {
    modal: {
      title: 'Confirm Withdrawal',
      content: 'Are you sure you want to withdraw {amount} {symbol}?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    },
    loading: 'Withdrawing...'
  },

  // Common UI Elements
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    loading: 'Loading...',
    noData: 'No Data',
    noMoreData: 'No More Data',
    copy: 'Copy',
    copied: 'Copied',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    close: 'Close',
    open: 'Open',
    refresh: 'Refresh',
    retry: 'Retry',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
    amount: 'Amount',
    balance: 'Balance',
    available: 'Available',
    currency: 'Currency',
    confirmOperation: 'Confirm Operation',
    processing: 'Processing...',
    operationSuccess: 'Operation Successful',
    operationFailed: 'Operation Failed',
    insufficientFunds: 'Insufficient Funds',
    userRejected: 'User Cancelled Operation',
    gasInsufficient: 'Insufficient Gas Fee',
    networkError: 'Network Error',
    pleaseCheckConnection: 'Please Check Connection',
    pleaseEnterValidAmount: 'Please Enter Valid Amount',
    pleaseEnterPositiveInteger: 'Please Enter Positive Integer'
  },

  // Navigation
  navigation: {
    home: 'Home',
    defi: 'DeFi',
    ecology: 'Ecology',
    person: 'Profile',
    history: 'History',
    settings: 'Settings'
  },

  // Home
  home: {
    title: 'VGAU Digital Gold',
    subtitle: 'Secure, Transparent, Trusted Digital Gold Platform',
    tvl: 'Total TVL of VGAU',
    exchange: 'USDT to VGAU',
    enterAmount: 'Enter exchange amount',
    confirmOperation: 'Confirm Operation',
    projectTitle: 'Afrigold Ledger',
    projectDesc: 'An RWA protocol that anchors gold assets with on-chain tokens, providing secure and transparent gold digitization solutions.',
    walletAddress: 'Wallet address:',
    contractAddress: 'Contract address:',
    goldInventory: 'Gold Inventory',
    inventoryAmount: 'Inventory Amount',
    dailyInventory: 'Daily Inventory Amount',
    source: 'Source: African Gold Mining Area',
    certificate: 'Certificate No: AGL-2021-001',
    banner: {
      title1: 'New Era of Digital Gold',
      title2: 'Blockchain Technology Protection',
      title3: 'Global Asset Allocation'
    },
    features: {
      audited: 'Audited',
      custodian: 'Custody Service',
      details: 'Details'
    }
  },

  // DeFi Page
  defi: {
    title: 'DeFi Services',
    exchangeRate: 'Exchange Rate',
    balance: 'Balance',
    currentApr: 'Current APR',
    pending: 'Pending',
    claim: 'Claim',
    deposit: 'Deposit',
    withdraw: 'Withdraw',
    finance: 'Finance',
    lending: 'Lending',
    myFinance: 'My Finance',
    productPurchase: 'Product Purchase',
    borrowOrder: 'Borrow Order',
    newLending: 'New Lending',
    tabs: {
      account: 'Account',
      loans: 'Loans',
      earn: 'Earn'
    },
    products: {
      huoqi: 'Current Account',
      dingqi: 'Fixed Term',
      jiedai: 'Lending Service',
      licai: 'Investment Products',
      shengou: 'Purchase',
      shuhui: 'Redemption',
      jiebi: 'Unlock',
      fengxian: 'Risk Warning'
    }
  },

  // Ecology Page
  ecology: {
    title: 'Ecosystem',
    description: 'Building a Complete Digital Gold Ecosystem'
  },

  // Profile
  person: {
    title: 'Profile',
    walletAddress: 'Wallet Address',
    walletAddressCopied: 'Wallet address copied!',
    copyFailed: 'Copy failed',
    assetOverview: 'Asset Overview',
    currentStakedAmount: 'Current Staked Amount',
    totalStakedRewards: 'Total Staked Rewards',
    currentCollateral: 'Current Collateral',
    remainingDebt: 'Remaining Debt',
    totalPoints: 'Total Points',
    notificationCenter: 'Notification Center (Liquidation Alert)',
    liquidationAlert: 'Your assets are near liquidation threshold, please top up.',
    topUpNow: 'Top Up Now',
    moreSettings: 'More Settings',
    menu: {
      details: 'Details',
      exchange: 'Exchange',
      history: 'History',
      invite: 'Invite',
      points: 'Points',
      redeem: 'Redeem',
      service: 'Service',
      settings: 'Settings',
      notice: 'Notice'
    },
    logoutConfirm: {
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout? You will need to login again after logout.',
      confirm: 'Confirm Logout',
      cancel: 'Cancel'
    },
    logout: {
      button: 'Logout',
      loading: 'Logging out...',
      success: 'Logout successful',
      failed: 'Logout failed'
    },
    logoutErrors: {
      network: 'Network Connection Error',
      auth: 'Authentication Error',
      server: 'Server Error',
      timeout: 'Request Timeout',
      unknown: 'Unknown Error',
      details: 'Error Details',
      retry: 'Retry',
      close: 'Close',
      suggestions: 'Suggested Solutions',
      errorTypes: {
        NETWORK: 'Network Error',
        AUTH: 'Authentication Error',
        SERVER: 'Server Error',
        TIMEOUT: 'Timeout Error',
        UNKNOWN: 'Unknown Error'
      }
    }
  },

  // History
  history: {
    title: 'History',
    tabs: {
      account: 'Account',
      loans: 'Loans',
      earn: 'Earn'
    },
    filter: {
      all: 'All',
      vgau: 'VGAU',
      usdt: 'USDT'
    },
    transaction: {
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      transfer: 'Transfer',
      swap: 'Swap',
      ongoing: 'Ongoing',
      done: 'Done'
    },
    loadMore: 'Load More',
    noMoreData: 'No More Data',
    noTransactionsFound: 'No transactions found',
    transactionHistoryFeature: 'Transaction history feature coming soon',
    loans: {
      stakeRedeem: 'Stake & Redeem',
      loanRecords: 'Loan Records',
      rewardsHistory: 'Rewards History',
      totalDebt: 'Total Debt',
      totalDebtAmount: '121.221 USDT',
      collateralAmt: 'Collateral Amt',
      collateralAmtValue: '221 VGAU',
      borrowedAmt: 'Borrowed Amt',
      borrowedAmtValue: '45.451115 USDT',
      riskWarning: 'Collateral ratio too low, liquidation risk exists',
      all: 'All',
      loan: 'Loan',
      repay: 'Repay',
      borrowing: 'Borrowing',
      ongoing: 'Ongoing',
      borrowedAmount: 'Borrowed Amount',
      borrowedAmountValue: '45.451115 USDT',
      collateralAmount: 'Collateral Amount',
      collateralAmountValue: '221 VGAU',
      stakingRate: 'Staking Rate',
      stakingRateValue: '80%',
      collateralVGAU: 'Collateral (VGAU)',
      collateralVGAUValue: '20',
      borrowedUSDT: 'Borrowed (USDT)',
      borrowedUSDTValue: '84.2255',
      interestRate: 'Interest Rate',
      interestRateValue: '5.2%',
      liquidationPrice: 'Liquidation Price',
      liquidationPriceValue: '$0.85',
      noMoreData: 'No more data',
      completed: 'Completed',
      details: 'Details'
    },

    // Borrowing Detail
    borrowingDetail: {
      title: 'Borrowing Details',
      orderId: 'Order L-202503-0133',
      borrowingStatus: 'Borrowing',
      completedStatus: 'Completed',
      collatRate: 'Collat. Rate',
      collateralVGAU: 'Collateral (VGAU)',
      netAPR: 'Net APR',
      liqPrice: 'Liq. Price (VGAU/USDT)',
      addCollat: 'Add Collat.',
      borrow: 'Borrow',
      collateral: 'Collateral',
      noMoreData: 'No More Data'
    },

    earn: {
      filter: {
        all: 'All',
        staking: 'Staking',
        toClaim: 'To Claim',
        completed: 'Completed'
      },
      status: {
        staking: 'Staking',
        toClaim: 'To Claim',
        completed: 'Completed'
      },
      viewDetails: 'View Details',
      noTransactionsFound: 'No earn transactions found'
    },
    earnComingSoon: 'Earn content coming soon'
  },

  // Staking Detail
  stakingDetail: {
    title: 'Staking Detail',
    days: 'Days',
    staking: 'Staking',
    toClaim: 'To Claim',
    completed: 'Completed',
    ongoing: 'Ongoing',
    startTime: 'Start Time',
    endTime: 'End Time',
    order: 'Order',
    noMoreData: 'No More Data',
    actions: {
      stake: 'Stake',
      redeem: 'Redeem'
    }
  },

  // Recharge Pages
  rechargePage: {
    usdtRecharge: 'USDT Recharge',
    vgauRecharge: 'VGAU Recharge',
    amount: 'Amount',
    minimumAmount: 'Minimum 0',
    max: 'Max',
    availableBalance: 'Available Balance',
    available: 'Available',
    confirm: 'Confirm',
    confirmOperation: 'Confirm Operation',
    processing: 'Processing...',
    pleaseEnterValidAmount: 'Please enter valid recharge amount',
    rechargeSuccess: 'Recharge successful!',
    rechargeFailed: 'Recharge failed',
    contractInitFailed: 'Contract service initialization failed',
    userDataLoadFailed: 'User data loading failed',
    insufficientFunds: 'Insufficient funds',
    userRejected: 'User cancelled operation',
    gasInsufficient: 'Insufficient gas fee',
    networkError: 'Network error',
    walletError: 'Wallet connection problem',
    contractError: 'Contract call failed',
    networkUnsupported: 'Current network not supported',
    unknownError: 'Unknown error occurred during recharge',
    errorModal: {
      title: '⚠️ Recharge Failed',
      close: '×',
      suggestions: 'Suggested Solutions:',
      debugInfo: 'Debug Information:',
      errorType: 'Error Type',
      contract: 'Contract',
      method: 'Method',
      timestamp: 'Timestamp',
      deviceType: 'Device Type',
      platform: 'Platform',
      onlineStatus: 'Online Status',
      online: 'Online',
      offline: 'Offline',
      mobile: 'Mobile',
      retry: 'Retry',
      showDebug: 'Show Debug',
      hideDebug: 'Hide Debug',
      closeError: 'Close'
    },
    errorDetails: {
      networkError: 'Network connection problem, unable to connect to blockchain network',
      walletError: 'Wallet connection problem, please check wallet status',
      gasError: 'Insufficient gas fee or account balance',
      contractError: 'Contract call failed, may be contract issue or parameter error',
      networkUnsupported: 'Current network not supported, please switch to BSC network',
      userRejected: 'You cancelled the transaction',
      unknownError: 'Unknown error occurred during recharge process'
    },
    suggestions: {
      network: [
        'Check if network connection is normal',
        'Check VPN settings',
        'Try switching networks',
        'Retry later'
      ],
      wallet: [
        'Ensure MetaMask is installed and unlocked',
        'Check if wallet is connected to correct network',
        'Try reconnecting wallet',
        'Refresh page and retry'
      ],
      gas: [
        'Check if account BNB balance is sufficient',
        'Try reducing recharge amount',
        'Check gas fee settings',
        'Ensure sufficient BNB for transaction fees'
      ],
      networkUnsupported: [
        'Switch to BSC Mainnet (Chain ID: 56)',
        'Switch to BSC Testnet (Chain ID: 97)',
        'Check wallet network settings',
        'Ensure network configuration is correct'
      ],
      default: [
        'Refresh page and retry',
        'Check wallet status',
        'Contact technical support',
        'Check console error logs'
      ]
    }
  },

  // Transaction Detail
  transactionDetail: {
    title: 'Transaction Detail',
    transactionTime: 'Transaction Time',
    serialNumber: 'Serial Number',
    orderId: 'Order ID',
    recordNumber: 'Record Number',
    walletAddress: 'Wallet Address',
    transactionHash: 'Transaction Hash',
    defaultType: 'Withdraw',
    defaultStatus: 'Ongoing',
    addressCopied: 'Address Copied',
    hashCopied: 'Hash Copied',
    noHashToCopy: 'No Transaction Hash'
  },

  // Wallet
  wallet: {
    connect: 'Connect Wallet',
    disconnect: 'Disconnect',
    connected: 'Wallet Connected',
    disconnected: 'Wallet Disconnected',
    connectionFailed: 'Connection Failed',
    pleaseConnect: 'Please Connect Wallet',
    addressCopied: 'Address Copied',
    contractAddressCopied: 'Contract Address Copied',
    copyFailed: 'Copy Failed',
    balance: 'Balance',
    available: 'Available',
    frozen: 'Frozen',
    total: 'Total',
    recharge: 'Recharge',
    withdraw: 'Withdraw',
    transfer: 'Transfer',
    address: 'Address',
    amount: 'Amount',
    currency: 'Currency',
    fee: 'Fee',
    confirm: 'Confirm Transaction',
    bind: {
      title: 'Wallet Not Bound',
      subtitle: 'Wallet Not Connected',
      description: 'Your wallet is not bound to a user account. Please visit our official website to bind your email address first.',
      visitWebsite: 'Visit Website',
      cancel: 'Cancel',
             checking: 'Checking wallet binding...',
       notBound: 'Wallet not bound to user account',
       checkFailed: 'Wallet check failed',
       chainIdMissing: 'Unable to get network chain ID, please ensure wallet is connected and switch to the correct network'
    }
  },

  // Authentication
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password',
    rememberMe: 'Remember Me',
    loginSuccess: 'Login Successful',
    loginFailed: 'Login Failed',
    logoutSuccess: 'Logout Successful',
    registerSuccess: 'Registration Successful',
    registerFailed: 'Registration Failed'
  },

  // Profile
  profile: {
    title: 'Profile',
    nickname: 'Nickname',
    phone: 'Phone',
    email: 'Email',
    country: 'Country',
    avatar: 'Avatar',
    updateSuccess: 'Update Successful',
    updateFailed: 'Update Failed'
  },

  // KYC
  kyc: {
    title: 'Identity Verification',
    status: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      null: 'Not Submitted'
    },
    documents: {
      documentPhoto: 'Document Photo',
      portraitPhoto: 'Portrait Photo',
      holdingDocumentPhoto: 'Holding Document Photo',
      addressProof: 'Address Proof'
    },
    submitSuccess: 'Submission Successful',
    submitFailed: 'Submission Failed'
  },

  // 2FA
  totp: {
    title: 'Two-Factor Authentication',
    setup: 'Setup 2FA',
    verify: 'Verify 2FA',
    disable: 'Disable 2FA',
    code: 'Verification Code',
    qrCode: 'QR Code',
    secretKey: 'Secret Key',
    setupSuccess: 'Setup Successful',
    verifySuccess: 'Verification Successful',
    disableSuccess: 'Disable Successful'
  },

  // Invite
  invite: {
    title: 'Invite Friends',
    code: 'Invitation Code',
    copyCode: 'Copy Invitation Code',
    bindCode: 'Bind Invitation Code',
    relations: 'Invitation Relations',
    inviter: 'Inviter',
    invitees: 'Invitees',
    rewards: 'Rewards',
    copySuccess: 'Invitation Code Copied'
  },

  // Settings
  settings: {
    settings: 'Settings',
    termsOfService: 'Terms of Service',
    liquidationAlertRepaymentRules: 'Liquidation Alert & Repayment Rules',
    serviceAgreement: 'Service Agreement',
    inviter: 'Inviter',
    liquidationAlert: 'Liquidation Alert',
    liquidationAlertReminder: 'When the collateral ratio reaches 85%, users will be notified via email for margin call reminders.',
    liquidationAlertApproaching: 'When the collateral ratio reaches 88%, users will be notified via email and personal page popup to alert them that they are approaching the liquidation collateral ratio.',
    repaymentRules: 'Repayment Rules',
    fullRepaymentOnly: 'Only full repayment is allowed.',
    forcedLiquidation: 'Forced Liquidation',
    forcedLiquidationDisbursement: 'When disbursing loans, 2% of the loan amount is first frozen as liquidation insurance, with the remaining 98% USDT distributed to the USDT account.',
    forcedLiquidationRedemption: 'Only after the loan is fully repaid, the system automatically redeems the corresponding VGAU collateral to the VGAU account and returns the original 2% liquidation insurance for that loan to the USDT account.',
    forcedLiquidationPlatformFee: 'If forced liquidation is triggered, the 2% liquidation insurance becomes the platform\'s liquidation fee; if market volatility causes the collateral asset value to be less than the total debt, the borrower must immediately make up the remaining debt.',
    forcedLiquidationRemainingDebt: 'The platform supports multiple loan orders, with each order independently priced and risk-controlled without mutual interference.',
    forcedLiquidationMultipleLoans: 'The platform supports multiple loan orders, with each order independently priced and risk-controlled without mutual interference.',
    inviteDescription: 'Fill in the invite code to help your friends complete the invitation task',
    submit: 'Submit',
    lastUpdated: 'Last updated: August 31, 2025',
    serviceAgreementText: 'This agreement (hereinafter referred to as the "Agreement") is jointly established by you (the "User") and Verigold (the "Platform") to clarify the terms and conditions for users to use related services on the platform. By accessing or using any services provided by the platform, you agree to comply with all terms of this Agreement.',
    serviceContent: 'Service Content',
    stakingReturnCalculation: '1. VGAU Staking: Users can deposit VGAU tokens into the platform and earn USDT returns based on the selected staking period and annual percentage yield (APY). The staking return calculation method is as follows:',
    fixedTermStakingReturn: '(1) Fixed-term staking return = Staking amount × Annual interest rate × Staking days / 365',
    flexibleStakingReturn: '(2) Flexible staking return = Staking amount × Current VGAU price × Annual interest rate × Staking days / 365',
    lendingServices: '2. Lending Services: Users can use VGAU tokens as collateral to borrow USDT. During the lending process, parameters such as collateral ratio, margin call line, and liquidation line will be dynamically adjusted based on market price fluctuations.',
    redemptionServices: '3. Redemption Services: Users can redeem staked or borrowed assets through the redemption function provided by the platform. The redemption amount is calculated based on real-time exchange rates and staking conditions.',
    exchangeServices: '4. Exchange Services: Users can exchange USDT for VGAU tokens or exchange VGAU tokens for USDT within the platform.'
  },

  // Error Messages
  errors: {
    networkError: 'Network error, please check your connection',
    serverError: 'Server error, please try again later',
    unauthorized: 'Please login first',
    forbidden: 'Permission denied',
    notFound: 'Resource not found',
    requestFailed: 'Request failed',
    invalidInput: 'Invalid input',
    fileTooLarge: 'File too large',
    fileTypeNotSupported: 'File type not supported'
  },

  // Success Messages
  success: {
    operationSuccess: 'Operation successful',
    saveSuccess: 'Save successful',
    deleteSuccess: 'Delete successful',
    copySuccess: 'Copy successful',
    uploadSuccess: 'Upload successful'
  },

  // Form Validation
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    password: 'Password must be at least 6 characters',
    confirmPassword: 'Passwords do not match',
    amount: 'Please enter a valid amount',
    address: 'Please enter a valid address'
  },

  // Component Specific Keys
  components: {
    // IncreaseCollateral
    increaseCollateral: {
      title: 'Increase Collateral Amount',
      increaseCollateralAmount: 'Increase Collateral Amount',
      currentCollateral: 'Collateral Amount(VGAU)',
      collateralAmount: 'Collateral Amount(VGAU)',
      initialRatio: 'Initial Collateral Ratio',
      initialCollateralRatio: 'Initial Collateral Ratio',
      stakingRatio: 'Staking Ratio',
      stakingRatioAfter: 'Staking Ratio After Increase',
      stakingRatioAfterIncrease: 'Staking Ratio After Increase',
      increaseAmount: 'Increase Amount',
      availableAssets: 'Available Assets',
      max: 'MAX',
      confirmOperation: 'Confirm Operation',
      confirm: 'Confirm',
      warning: 'If the collateral ratio is not 0% or full repayment has not been completed, your collateral assets cannot be redeemed.',
      collateralRatioWarning: 'If the collateral ratio is not 0% or full repayment has not been completed, your collateral assets cannot be redeemed.',
      instruction: 'Please ensure that all repayments have been completed, and the collateral ratio is 0%. The system will automatically return your collateral assets to the bound wallet address.',
      collateralRatioInstruction: 'Please ensure that all repayments have been completed, and the collateral ratio is 0%. The system will automatically return your collateral assets to the bound wallet address.',
      repaying: 'You are repaying',
      repaymentAmount: 'You are repaying',
      repaymentAmountValue: '77.74 USDT',
      afterRepayment: 'After repayment is completed',
      repaymentAfter: 'After repayment is completed',
      willReturn: 'Will return',
      repaymentResult: 'Will return',
      repaymentResultRedeem: '100 VGAU',
      andRefund: 'and refund',
      repaymentResultRefund: '1.56 USDT',
      repaymentSuccess: 'Repayment successful',
      repaymentSuccessful: 'Repayment successful',
      willRedeem: 'Will redeem',
      successResult: 'Will redeem',
      successResultRedeem: '100 VGAU',
      successResultRefund: 'refund 1.56 USDT',
      collateralIncreased: 'Collateral increased successfully'
    },

    // Redeem
    redeem: {
      title: 'Redeem',
      brandTitle: 'Verifood',
      brandSubtitle: '1g Gold = 1 Token',
      brandDescription: 'Blockchain-based physical gold digitalization solution',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% APR',
      currency1: 'VGAU',
      currency2: 'USDT',
      redeemAmountPlaceholder: 'Enter the quantity to be redeemed',
      requiredUSDT: 'Required USDT',
      usdtTitle: 'The USDT to be exchanged',
      usdtAmountPlaceholder: 'Amount',
      confirmRedeem: 'Confirm Redeem',
      successText: 'Successfully Exchanged',
      completeText: 'Complete',
      redeemAmount: 'Redeem Amount',
      redeemTo: 'Redeem To',
      boundWallet: 'Bound Wallet Address',
      dailyLimit: 'Daily Maximum Redemption Limit',
      confirmRedeem: 'Confirm Redeem',
      redeeming: 'Redeeming...',
      redeemSuccess: 'Redeem Successful',
      redeemFailed: 'Redeem Failed'
    },

    // MyFinance
    myFinance: {
      title: 'My Finance',
      redemptionNotice: 'Selected assets will be immediately redeemed to your account',
      asset: 'Asset',
      maturityYield: 'Maturity Yield',
      startTime: 'Start Time',
      endTime: 'End Time',
      redeemable: 'Redeemable',
      staking: 'Staking',
      allLoaded: 'All loaded',
      redeem: 'Redeem',
      redeemFeature: 'Redeem feature coming soon',
      totalAssets: 'Total Assets',
      totalEarnings: 'Total Earnings',
      activeProducts: 'Active Products',
      noActiveProducts: 'No Active Products',
      viewDetails: 'View Details'
    },

    // ProductHelp
    productHelp: {
      title: 'Product Help',
      helpContent: 'Help content coming soon...',
      contactSupport: 'Contact Support'
    },

    // ProductPurchase
    productPurchase: {
      productPurchase: 'Product Purchase',
      productDetails: 'Product Details',
      term: 'Term',
      apy: 'APY',
      minAmount: 'Min Amount',
      maxAmount: 'Max Amount',
      riskLevel: 'Risk Level',
      amount: 'Amount',
      enterStakingAmount: 'Please enter amount',
      vgau: 'VGAU',
      max: 'MAX',
      availableBalance: 'Available',
      balanceAmount: '0',
      transactionRules: 'Transaction Rules',
      productRules: 'Product Rules',
      purchaseTime: 'Purchase time',
      purchaseTimeValue: '2025-07-18 14:00',
      expirationTime: 'Expiration Time',
      expirationTimeValue: '2025-07-29 08:00',
      estimatedInterest: 'Estimated Interest (USDT)',
      estimatedInterestValue: '--',
      requiresManualRedemption: 'Requires Manual Redemption',
      requiresManualRedemptionValue: '--',
      rewards: '1. Rewards',
      rewardsDailyChange: 'The annualized yield of the fixed-term products you subscribe to may change daily.',
      rewardsStartCalculation: 'Rewards will start to be calculated at 00:00 (UTC) on the day following the subscription, and cannot be redeemed during the staking period.',
      rewardsAfterStaking: 'After the staking period expires, it needs to be manually converted to flexible staking, and the corresponding income will be distributed to the account, and the distributed income can be withdrawn immediately.',
      settlementIncome: 'Settlement income = subscribed assets * annualized yield / 365 * fixed term (accurate to decimal places)',
      subscriptionAndRedemption: '2. Subscription and Redemption',
      subscriptionAndRedemptionDaily: 'Subscription and redemption for principal-protected fixed-term earning products are open daily between 00:10 UTC and 23:50 UTC.',
      earlyRedemption: '3. Early Redemption',
      earlyRedemptionMyFinance: 'For specified fixed-term products, you can redeem assets at any time in "My Finance".',
      earlyRedemptionLoseIncome: 'If you redeem early, you will lose all the income already distributed by this product.',
      earlyRedemptionBalanceCredit: 'The entire balance of assets locked by this product, minus all income you received during this period, will be credited to your spot account within 72 hours.',
      earlyRedemptionMarketFluctuations: 'In case of extreme market fluctuations, network delays, or an excessive number of redemption requests, redemption may be delayed.',
      confirm: 'Confirm',
      processing: 'Processing...',
      recordsFeature: 'Records feature coming soon',
      amountOutOfRange: 'Amount out of range (100-10,000 VGAU)',
      purchaseFeature: 'Purchase feature coming soon',
      selectProduct: 'Please select a product',
      orderCreateSuccess: 'Staking order created successfully!',
      orderCreateFailed: 'Failed to create order',
      productNotFound: 'Product not found',
      invalidAmount: 'Invalid amount',
      purchaseSuccess: 'Purchase Successful',
      purchaseFailed: 'Purchase Failed'
    },

    // InfoPage
    infoPage: {
      title: 'Information',
      infoContent: 'Information content...',
      moreInfo: 'More Information'
    },

    // NewLending
    newLending: {
      lending: 'Lending',
      pledgedVGAUAssets: 'Pledged VGAU assets will not receive capital protection rewards',
      collateralQuantity: 'Collateral Quantity',
      max: 'MAX',
      availableAssets: 'Available Assets',
      availableToBorrow: 'Available to Borrow',
      liquidationInsuranceFee: 'Liquidation Insurance Fee',
      initialCollateralRatio: 'Initial Collateral Ratio',
      additionalMargin: 'Additional Margin',
      forcedLiquidationCollateralRatio: 'Forced Liquidation Collateral Ratio',
      annualInterestRate: 'Annual Interest Rate',
      netAnnualizedInterestRate: 'Net Annualized Interest Rate',
      estimatedHourlyInterestRate: 'Estimated Hourly Interest Rate',
      liquidationReferencePrice: 'Liquidation Reference Price (VGAU/USDT)',
      confirmLending: 'Confirm Lending',
      pleaseEnterBorrowAmount: 'Please enter valid borrow amount',
      lendingFeature: 'Lending feature coming soon',
      loanAmount: 'Loan Amount',
      collateralAmount: 'Collateral Amount',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term',
      confirmLoan: 'Confirm Loan',
      applying: 'Applying...',
      loanSuccess: 'Loan Application Successful',
      loanFailed: 'Loan Application Failed'
    },

    // BorrowOrder
    borrowOrder: {
      title: 'Borrow Order',
      borrowOrder: 'Borrow Order',
      borrowedUSDTArrival: 'Borrowed USDT will immediately arrive in USDT withdrawal\'s borrowed funds',
      totalLiabilities: 'Total Liabilities (USDT)',
      collateralAmount: 'Collateral Amount (VGAU)',
      pledgeRatio: 'Pledge Ratio',
      netAnnualizedInterestRate: 'Net Annualized Interest Rate',
      liquidationReferencePrice: 'Liquidation Reference Price (VGAU/USDT)',
      increaseCollateralAmount: 'Increase Collateral Amount',
      adjustPledgeRatio: 'Adjust Pledge Ratio',
      allLoaded: 'All loaded',
      recordsFeature: 'Records feature coming soon',
      adjustPledgeRatioFeature: 'Adjust pledge ratio feature coming soon',
      orderStatus: 'Order Status',
      borrowAmount: 'Borrow Amount',
      repayAmount: 'Repay Amount',
      dueDate: 'Due Date',
      actions: 'Actions',
      repay: 'Repay',
      extend: 'Extend'
    },

    // USDTWithdraw & VGAUWithdraw
    withdraw: {
      title: 'Withdraw',
      withdrawAmount: 'Withdraw Amount',
      withdrawTo: 'Withdraw To',
      boundWallet: 'Bound Wallet Address',
      confirmWithdraw: 'Confirm Withdraw',
      withdrawing: 'Withdrawing...',
      withdrawSuccess: 'Withdraw Successful',
      withdrawFailed: 'Withdraw Failed'
    },

    // Exchange
    exchange: {
      title: 'Exchange',
      brandTitle: 'Verifood',
      brandSubtitle: '1g Gold = 1 Token',
      brandDescription: 'Blockchain-based physical gold digitalization solution',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% APR',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Enter the quantity to be redeemed',
      requiredUSDT: 'Required USDT',
      confirmExchange: 'Confirm Exchange',
      exchangeFeature: 'Exchange feature coming soon',
      from: 'From',
      to: 'To',
      exchangeRate: 'Exchange Rate',
      slippage: 'Slippage',
      exchanging: 'Exchanging...',
      exchangeSuccess: 'Exchange Successful',
      exchangeFailed: 'Exchange Failed'
    },

    // Invitation
    invitation: {
      invitation: 'Invitation',
      invitationRewards: '1,580 Points',
      invitationRewardsLabel: 'Invitation Rewards',
      numberOfInvitedPeople: '12 Users',
      numberOfInvitedPeopleLabel: 'Number of invited people',
      numberOfDirectPushPersonnel: '6 Users',
      numberOfDirectPushPersonnelLabel: 'Number of direct push personnel',
      invitationLink: 'Invitation Link',
      copyLink: 'Copy Link',
      invitationRewardDetails: 'Invitation Reward Details',
      id: 'ID',
      walletAddr: 'Wallet Addr',
      type: 'Type',
      rewards: 'Rewards (Pts)',
      allContentLoaded: 'All content loaded',
      ruleDetails: 'Rule Details',
      successfullyReferUserThroughKYC: 'Successfully refer a user through KYC to earn points:',
      directReferral: 'Direct Referral',
      indirectReferral: 'Indirect Referral',
      rewardsPerUser: '2 Points/User',
      indirectRewardsPerUser: '0.2 Points/User',
      linkCopied: 'Invitation link copied!',
      invitationCode: 'Invitation Code',
      copyCode: 'Copy Code',
      inviteFriends: 'Invite Friends',
      referralRewards: 'Referral Rewards',
      myInvitations: 'My Invitations',
      bindSuccess: 'Invite code submitted!'
    },

    // PointsDetails
    pointsDetails: {
      pointsDetails: 'Points Details',
      totalPoints: 'Total Points',
      all: 'All',
      staking: 'Staking',
      invite: 'Invite',
      lending: 'Lending',
      exchange: 'Exchange',
      ecosystem: 'Ecosystem',
      stakingRewards: 'Staking Rewards',
      invitation: 'Invitation',
      ecosystemParticipation: 'Ecosystem Participation',
      lending: 'Lending',
      exchangeVGT: 'Exchange VGT',
      allLoaded: 'All loaded',
      earnedPoints: 'Earned Points',
      spentPoints: 'Spent Points',
      pointsHistory: 'Points History',
      noHistory: 'No Points History'
    },

    // Exchange
    exchange: {
      title: 'Exchange',
      brandTitle: 'Verifood',
      brandSubtitle: '1g Gold = 1 Token',
      brandDescription: 'Blockchain-based physical gold digitalization solution',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% APR',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Enter the quantity to be redeemed',
      requiredUSDT: 'Required USDT',
      confirmExchange: 'Confirm Exchange',
      exchangeFeature: 'Exchange feature coming soon'
    }
  },
  // Financial Products
  financialProducts: 'Financial Products',
  returnsAndRisks: 'Returns & Risks',
  returnSources: 'Return Sources',
  whatAreFinancialProducts: 'What are financial products?',
  thisIsADigitalAssetAppreciationSchemeAnchoredToGold: 'This is a digital asset appreciation scheme anchored to gold.',
  whenUsersPurchaseAndHoldVGAUTokens: 'When users purchase and hold VGAU Tokens, they represent deposits of equivalent physical gold, and asset values fluctuate with market conditions.',
  theyRepresentDepositsOfEquivalentPhysicalGold: 'They represent deposits of equivalent physical gold, and asset values fluctuate with market conditions.',
  andAssetValuesFluctuateWithMarketConditions: 'And asset values fluctuate with market conditions.',
  inTheirAccounts: 'In their accounts,',
  usersCanParticipateInDifferentTermAndRuleBasedYieldSchemesWithVGAU: 'users can participate in different term and rule-based yield schemes with VGAU,',
  andTheSystemWillGenerateRewardsAccordingToTheRules: 'and the system will generate rewards according to the rules.',
  rewardsInTheAccountNeedToBeClaimedManually: 'Rewards in the account need to be claimed manually.',
  rewardsInFinancialProductsAccumulateInRealTimeToMeetDifferentAssetManagementNeeds: 'Rewards in financial products accumulate in real-time to meet different asset management needs.',
  advantages: 'Advantages',
  flexibleProductsAvailableForRedemption: 'Flexible Products Available for Redemption',
  usersCanSubscribeAndRedeemFlexibleProductsAtAnyTime: 'Users can subscribe and redeem flexible products at any time.',
  fixedTermProductsOfferHigherAPY: 'Fixed-term Products Offer Higher APY',
  fixedTermProductsHaveFixedTermsButTheirAnnualizedYieldsAreTypicallyHigherThanFlexibleProducts: 'Fixed-term products have fixed terms, but their annualized yields are typically higher than flexible products.',
  manualRedemptionOfInterestEarnings: 'Manual Redemption of Interest Earnings',
  dailyUSDTEarningsWillAutomaticallyGoToTheWithdrawalBalanceWhichNeedsToBeManuallyWithdrawn: 'Daily USDT earnings will automatically go to the withdrawal balance, which needs to be manually withdrawn.',
  risks: 'Risks',
  veryLowRisk: 'Very Low Risk',
  digitalAssetPricesMayFluctuateIfThereAreTooManyRedemptionRequestsItMayLeadToTemporarilyInsufficientAvailableRedemptionBalanceResultingInDelayedRedemptionRestAssuredYourAssetsAreAlwaysSafeAndSecure: 'Digital asset prices may fluctuate. If there are too many redemption requests, it may lead to temporarily insufficient available redemption balance, resulting in delayed redemption. Rest assured, your assets are always safe and secure.',
  eachOfYourTokensCorrespondsToPhysicalGoldHeldInOurAfricanMiningAreasAndAuditedByAuthoritativeInstitutions: 'Each of your tokens (1 VGAU = 1g physical gold) corresponds to the physical gold held in our African mining areas and audited by authoritative institutions.',
  theStableReturnsYouEarnThroughStakingComeFromTheProjectTeamsActiveManagementAndOperationOfTheUnderlyingGoldAssets: 'The stable returns you earn through staking come from the project team\'s active management and operation of the underlying gold assets.',
  confirm: 'Confirm',

  // InfoPage
  glossary: 'Glossary',
  repaymentRules: 'Repayment Rules',
  forcedLiquidationInsuranceFee: 'Forced Liquidation Insurance Fee',
  forcedLiquidationInsuranceFeeDescription: 'When borrowing, the platform will calculate a forced liquidation insurance fee of 2% of the maximum borrowable amount based on the initial pledge rate. This fee will be deducted from the borrowable amount.',
  forcedLiquidationInsuranceFeeAfterRepayment: 'After the borrower fully repays the loan, the platform will refund the corresponding forced liquidation insurance fee to their USDT lending account.',
  forcedLiquidationInsuranceFeeOnForcedLiquidation: 'If a crypto borrowing order undergoes forced liquidation, the platform will charge this forced liquidation insurance fee.',
  pledgeRateAnnotation: 'Pledge Rate Annotation',
  currentPledgeRate: 'Current Pledge Rate',
  pledgeRateDescription: 'Pledge rate, or LTV (Loan-to-Value), represents the ratio between the borrowed digital assets and the value of the collateral (calculated based on the collateral). Asset value is calculated based on price indices of different cryptocurrencies.',
  initialPledgeRate: 'Initial Pledge Rate',
  initialPledgeRatePercentage: '78%',
  initialPledgeRateDescription: 'Initial pledge rate is the initial ratio between the value of the collateral you need to provide and your loan amount.',
  marginCall: 'Margin Call',
  marginCallPercentage: '85%',
  marginCallDescription: 'Margin call pledge rate is the warning line when the loan contract approaches the forced liquidation pledge rate.',
  forcedLiquidationPledgeRate: 'Forced Liquidation Pledge Rate',
  forcedLiquidationPledgeRatePercentage: '91%',
  forcedLiquidationPledgeRateDescription: 'If your pledge rate reaches the forced liquidation pledge rate, the system will immediately execute forced liquidation, using your collateral assets to repay your money market loan, and will charge a 2% forced liquidation fee on the loan amount.',
  netAnnualizedInterestRate: 'Net Annualized Interest Rate',
  netAnnualizedInterestRateDescription: 'Collateral assets will continue to earn real-time annualized interest rewards, helping to offset crypto borrowing costs. Net Annualized Interest Rate = Annual Interest Rate - (Real-time Annual Interest Rate of Collateral / Initial Pledge Rate)',
  annualInterestRate: 'Annual Interest Rate',
  annualInterestRateDescription: 'Interest will be calculated using compound interest. Interest accrues from the successful borrowing of crypto, calculated once per minute. If the borrowing duration is less than one minute, it will also be calculated as one minute.',
  collateralRequiredForLending: 'The collateral required for lending originates from the VGAU current account. Once transferred as collateral, this portion will no longer generate current income.',
  defaultInitialPledgeRate: 'The default initial pledge rate is',
  defaultInitialPledgeRatePercentage: '78%',
  loanAmountDescription: '. When creating a loan order, the pledge rate can be adjusted based on the loan amount.',
  forcedLiquidationInsuranceFeeOnForcedLiquidationDescription: 'If forced liquidation is triggered, the 2% forced liquidation insurance fee belongs to the platform as a liquidation fee; if the value of the collateral assets falls below the total debt due to drastic market fluctuations, the borrower must immediately make up the remaining outstanding amount. The platform supports multiple loan orders, each independently priced and risk-controlled, without mutual influence.',
  repaymentUsingAccountBalance: 'Repayment using account balance: Collateral cannot be redeemed before full repayment. Users can add more VGAU to reduce the pledge rate and avoid liquidation.',

  // USDTWithdraw
  usdtWithdraw: 'USDT Withdraw',
  selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days: 'Selected assets will be fully redeemed to your wallet after T+1 days.',
  totalRedemptionAmount: 'Total Redemption Amount',
  minimum0: 'Minimum 0',
  usdtMax: 'USDT |Max',
  availableBalance: 'Available Balance',
  estimatedFee: 'Estimated Fee',
  withdrawTo: 'Withdraw To',
  boundWalletAddress: 'Bound Wallet Address',
  dailyMaximumRedemptionLimit: 'Daily Maximum Redemption Limit: 5000000000 USDT',
  confirm: 'Confirm',
  pleaseEnterWithdrawAmount: 'Please enter withdraw amount',
  withdrawFeatureComingSoon: 'Withdraw feature coming soon',

  // VGAUWithdraw
  vgauWithdraw: 'VGAU Withdraw',
  vgauMax: 'VGAU |Max',
  dailyMaximumRedemptionLimitVGAU: 'Daily Maximum Redemption Limit: 5000000000 VGAU',

  // Language Names
  languageNames: {
    ar: 'اللغة العربية',
    en: 'English',
    fr: 'Français',
    zh: '繁體中文',
    pt: 'português'
  },

  // LanguageSwitcher
  switchedToChinese: 'Switched to Chinese',
  switchedToEnglish: 'Switched to English'
} 
export default {
  // 充值確認彈窗
  recharge: {
    modal: {
      title: 'Confirmer le Rechargement',
      content: 'Êtes-vous sûr de vouloir recharger {amount} {symbol} ?',
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },
    loading: 'Rechargement en cours...'
  },

  // 提現
  withdraw: {
    modal: {
      title: 'Confirmer le Retrait',
      content: 'Êtes-vous sûr de vouloir retirer {amount} {symbol} ?',
      confirm: 'Confirmer',
      cancel: 'Annuler'
    },
    loading: 'Retrait en cours...'
  },

  // 通用UI元素
  common: {
    confirm: 'Confirmer',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    delete: 'Supprimer',
    edit: 'Modifier',
    add: 'Ajouter',
    search: 'Rechercher',
    loading: 'Chargement...',
    noData: 'Aucune Donnée',
    noMoreData: 'Plus de Données',
    copy: 'Copier',
    copied: 'Copié',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    submit: 'Soumettre',
    reset: 'Réinitialiser',
    close: 'Fermer',
    open: 'Ouvrir',
    refresh: 'Actualiser',
    retry: 'Réessayer',
    success: 'Succès',
    error: 'Erreur',
    warning: 'Avertissement',
    info: 'Information',
    amount: 'Montant',
    balance: 'Solde',
    available: 'Disponible',
    currency: 'Devise',
    confirmOperation: 'Confirmer l\'Opération',
    processing: 'Traitement en cours...',
    operationSuccess: 'Opération Réussie',
    operationFailed: 'Opération Échouée',
    insufficientFunds: 'Solde Insuffisant',
    userRejected: 'Utilisateur a Annulé l\'Opération',
    gasInsufficient: 'Frais de Gas Insuffisants',
    networkError: 'Erreur de Réseau',
    pleaseCheckConnection: 'Vérifiez la Connexion',
    pleaseEnterValidAmount: 'Veuillez Entrer un Montant Valide',
    pleaseEnterPositiveInteger: 'Veuillez Entrer un Entier Positif',
    points: 'Points',
    users: 'Utilisateurs'
  },

  // 兑换
  exchange: {
    exchangeSuccess: 'Échange Réussi',
    exchangeFailed: 'Échange Échoué'
  },

  // 导航
  navigation: {
    home: 'Accueil',
    defi: 'DeFi',
    ecology: 'Écologie',
    person: 'Profil',
    history: 'Historique',
    settings: 'Paramètres'
  },

  // 首页
  home: {
    title: 'VGAU Or Numérique',
    subtitle: 'Plateforme d\'Or Numérique Sécurisée, Transparente et Fiable',
    tvl: 'Valeur Totale Verrouillée VGAU',
    exchange: 'Échanger USDT vers VGAU',
    enterAmount: 'Entrer le Montant d\'Échange',
    confirmOperation: 'Confirmer l\'Opération',
    projectTitle: 'Livre d\'Or Africain',
    projectDesc: 'Un protocole RWA qui ancre les actifs d\'or aux tokens on-chain, fournissant des solutions sécurisées et transparentes pour la numérisation de l\'or.',
    walletAddress: 'Adresse du Portefeuille :',
    contractAddress: 'Adresse du Contrat :',
    goldInventory: 'Inventaire d\'Or',
    inventoryAmount: 'Quantité d\'Inventaire',
    dailyInventory: 'Quantité d\'Inventaire Quotidienne',
    source: 'Source : Zones Minières d\'Or Africaines',
    certificate: 'Numéro de Certificat : AGL-2021-001',
    banner: {
      title1: 'Nouvelle Ère de l\'Or Numérique',
      title2: 'Protection de la Technologie Blockchain',
      title3: 'Allocation d\'Actifs Globaux'
    },
    features: {
      audited: 'Audité',
      custodian: 'Service de Garde',
      details: 'Détails'
    },
    officialSite: 'Site Officiel VeriGold'
  },

  // DeFi页面
  defi: {
    title: 'Services DeFi',
    exchangeRate: 'Taux de Change',
    balance: 'Solde',
    currentApr: 'Rendement Annuel Actuel',
    pending: 'En Attente',
    claim: 'Réclamer',
    deposit: 'Dépôt',
    withdraw: 'Retrait',
    finance: 'Finance',
    lending: 'Prêt',
    myFinance: 'Mes Finances',
    productPurchase: 'Achat de Produit',
    borrowOrder: 'Commande d\'Emprunt',
    newLending: 'Nouveau Prêt',
    tabs: {
      account: 'Compte',
      loans: 'Prêts',
      earn: 'Gagner'
    },
    products: {
      huoqi: 'Finance à Vue',
      dingqi: 'Finance à Terme',
      jiedai: 'Service de Prêt',
      licai: 'Produits Financiers',
      shengou: 'Acheter',
      shuhui: 'Racheter',
      jiebi: 'Débloquer',
      fengxian: 'Avertissement de Risque'
    }
  },

  // 生态页面
  ecology: {
    title: 'Construction d\'Écosystème',
    description: 'Construire un écosystème complet d\'or numérique'
  },

  // 个人中心
  person: {
    title: 'Profil',
    walletAddress: 'Adresse du Portefeuille',
    walletAddressCopied: 'Adresse du Portefeuille Copiée',
    copyFailed: 'Échec de la Copie',
    noWalletConnected: 'Portefeuille Non Connecté',
    connectWallet: 'Connecter le Portefeuille',
    connectingWallet: 'Connexion du Portefeuille...',
    walletConnected: 'Portefeuille Connecté avec Succès',
    walletConnectionFailed: 'Échec de la Connexion du Portefeuille',
    userRejectedConnection: 'Utilisateur a Rejeté la Connexion',
    noWalletDetected: 'Aucun Portefeuille Détecté',
    assetOverview: 'Aperçu des Actifs',
    currentStakedAmount: 'Montant Actuel en Stake',
    totalStakedRewards: 'Récompenses Totales en Stake',
    currentCollateral: 'Garantie Actuelle',
    remainingDebt: 'Dette Restante',
    totalPoints: 'Points Totaux',
    notificationCenter: 'Centre de Notifications (Alertes de Liquidation)',
    liquidationAlert: 'Vos actifs sont proches du seuil de liquidation, complétez à temps.',
    topUpNow: 'Compléter Maintenant',
    moreSettings: 'Plus de Paramètres',
    menu: {
      details: 'Détails',
      exchange: 'Échanger',
      history: 'Historique',
      invite: 'Inviter',
      points: 'Points',
      redeem: 'Racheter',
      service: 'Service Client',
      settings: 'Paramètres',
      notice: 'Avis'
    },
    logoutConfirm: {
      title: 'Confirmer la Déconnexion',
      content: 'Êtes-vous sûr de vouloir vous déconnecter du compte actuel ? Vous devrez vous reconnecter après la déconnexion.',
      confirm: 'Confirmer la Déconnexion',
      cancel: 'Annuler'
    },
    logout: {
      button: 'Déconnexion',
      loading: 'Déconnexion en cours...',
      success: 'Déconnexion Réussie',
      failed: 'Échec de la Déconnexion'
    },
    logoutErrors: {
      network: 'Erreur de Connexion Réseau',
      auth: 'Erreur d\'Authentification',
      server: 'Erreur du Serveur',
      timeout: 'Délai d\'Attente de la Demande',
      unknown: 'Erreur Inconnue',
      details: 'Détails de l\'Erreur',
      retry: 'Réessayer',
      close: 'Fermer',
      suggestions: 'Suggestions de Solution',
      errorTypes: {
        NETWORK: 'Erreur de Réseau',
        AUTH: 'Erreur d\'Authentification',
        SERVER: 'Erreur du Serveur',
        TIMEOUT: 'Erreur de Délai d\'Attente',
        UNKNOWN: 'Erreur Inconnue'
      }
    }
  },

  // 历史记录
  history: {
    title: 'Historique',
    tabs: {
      account: 'Compte',
      loans: 'Prêts',
      earn: 'Gagner'
    },
    filter: {
      all: 'Tous',
      vgau: 'VGAU',
      usdt: 'USDT'
    },
    transaction: {
      deposit: 'Dépôt',
      withdraw: 'Retrait',
      transfer: 'Transfert',
      swap: 'Échange',
      ongoing: 'En Cours',
      done: 'Terminé',
      pending: 'En Attente',
      processing: 'En Traitement',
      failed: 'Échoué',
      cancelled: 'Annulé'
    },
    loadMore: 'Charger Plus',
    noMoreData: 'Plus de Données',
    noTransactionsFound: 'Aucun Enregistrement de Transaction',
    transactionHistoryFeature: 'Fonctionnalité d\'Historique des Transactions Bientôt Disponible',
    loans: {
      stakeRedeem: 'Stake et Rachat',
      loanRecords: 'Enregistrements de Prêt',
      rewardsHistory: 'Historique des Récompenses',
      totalDebt: 'Dette Totale',
      totalDebtAmount: '121.221 USDT',
      collateralAmt: 'Quantité de Garantie',
      collateralAmtValue: '221 VGAU',
      borrowedAmt: 'Quantité Empruntée',
      borrowedAmtValue: '45.451115 USDT',
      riskWarning: 'Taux de Garantie Faible, Risque de Liquidation',
      all: 'Tous',
      loan: 'Prêt',
      repay: 'Remboursement',
      borrowing: 'Emprunt',
      ongoing: 'En Cours',
      borrowedAmount: 'Montant Emprunté',
      borrowedAmountValue: '45.451115 USDT',
      collateralAmount: 'Montant de Garantie',
      collateralAmountValue: '221 VGAU',
      stakingRate: 'Taux de Stake',
      stakingRateValue: '80%',
      collateralVGAU: 'Garantie (VGAU)',
      collateralVGAUValue: '20',
      borrowedUSDT: 'Emprunté (USDT)',
      borrowedUSDTValue: '84.2255',
      interestRate: 'Taux d\'Intérêt',
      interestRateValue: '5.2%',
      liquidationPrice: 'Prix de Liquidation',
      liquidationPriceValue: '$0.85',
      noMoreData: 'Plus de Données',
      completed: 'Terminé',
      details: 'Détails'
    },
    borrowingDetail: {
      title: 'Détails de l\'Emprunt',
      orderId: 'Commande L-202503-0133',
      borrowingStatus: 'Emprunt',
      completedStatus: 'Terminé',
      collatRate: 'Taux de Garantie',
      collateralVGAU: 'Garantie (VGAU)',
      netAPR: 'Rendement Annuel Net',
      liqPrice: 'Prix de Liquidation (VGAU/USDT)',
      addCollat: 'Ajouter Garantie',
      borrow: 'Emprunter',
      collateral: 'Garantie',
      noMoreData: 'Plus de Données'
    },
    earn: {
      filter: {
        all: 'Tous',
        staking: 'En Stake',
        toClaim: 'À Réclamer',
        completed: 'Terminé'
      },
      status: {
        staking: 'En Stake',
        toClaim: 'À Réclamer',
        completed: 'Terminé'
      },
      viewDetails: 'Voir Détails',
      noTransactionsFound: 'Aucun Enregistrement de Transaction Financière'
    },
    earnComingSoon: 'Contenu Financier Bientôt Disponible'
  },

  // 质押详情
  stakingDetail: {
    title: 'Détails du Stake',
    days: 'Jours',
    staking: 'En Stake',
    toClaim: 'À Réclamer',
    completed: 'Terminé',
    ongoing: 'En Cours',
    startTime: 'Heure de Début',
    endTime: 'Heure de Fin',
    order: 'Commande',
    noMoreData: 'Plus de Données',
    actions: {
      stake: 'Stake',
      redeem: 'Racheter'
    }
  },

  // 充值页面
  rechargePage: {
    usdtRecharge: 'Rechargement USDT',
    vgauRecharge: 'Rechargement VGAU',
    amount: 'Montant',
    minimumAmount: 'Minimum 0',
    max: 'Maximum',
    availableBalance: 'Solde Disponible',
    available: 'Disponible',
    confirm: 'Confirmer',
    confirmOperation: 'Confirmer l\'Opération',
    processing: 'Traitement en cours...',
    pleaseEnterValidAmount: 'Veuillez entrer un montant de rechargement valide',
    rechargeSuccess: 'Rechargement Réussi !',
    rechargeFailed: 'Échec du Rechargement',
    contractInitFailed: 'Échec de l\'Initialisation du Service de Contrat',
    userDataLoadFailed: 'Échec du Chargement des Données Utilisateur',
    insufficientFunds: 'Solde Insuffisant',
    userRejected: 'Utilisateur a Annulé l\'Opération',
    gasInsufficient: 'Frais de Gas Insuffisants',
    networkError: 'Erreur de Réseau',
    walletError: 'Problème de Connexion du Portefeuille',
    contractError: 'Échec de l\'Appel du Contrat',
    networkUnsupported: 'Réseau Actuel Non Supporté',
    unknownError: 'Erreur Inconnue Pendant le Rechargement',
    errorModal: {
      title: '⚠️ Échec du Rechargement',
      close: '×',
      suggestions: 'Suggestions de Solution :',
      debugInfo: 'Informations de Debug :',
      errorType: 'Type d\'Erreur',
      contract: 'Contrat',
      method: 'Méthode',
      timestamp: 'Horodatage',
      deviceType: 'Type d\'Appareil',
      platform: 'Plateforme',
      onlineStatus: 'Statut En Ligne',
      online: 'En Ligne',
      offline: 'Hors Ligne',
      mobile: 'Mobile',
      retry: 'Réessayer',
      showDebug: 'Afficher Debug',
      hideDebug: 'Masquer Debug',
      closeError: 'Fermer'
    },
    errorDetails: {
      networkError: 'Problème de connexion réseau, impossible de se connecter au réseau blockchain',
      walletError: 'Problème de connexion du portefeuille, vérifiez le statut du portefeuille',
      gasError: 'Frais de gas insuffisants ou solde de compte insuffisant',
      contractError: 'Échec de l\'appel du contrat, peut être un problème de contrat ou erreur de paramètres',
      networkUnsupported: 'Réseau actuel non supporté, passez au réseau BSC',
      userRejected: 'Vous avez annulé l\'opération de transaction',
      unknownError: 'Erreur inconnue pendant le rechargement'
    },
    suggestions: {
      network: [
        'Vérifiez que la connexion réseau est normale',
        'Vérifiez les paramètres VPN',
        'Essayez de changer de réseau',
        'Réessayez plus tard'
      ],
      wallet: [
        'Assurez-vous que MetaMask est installé et déverrouillé',
        'Vérifiez que le portefeuille est connecté au bon réseau',
        'Essayez de reconnecter le portefeuille',
        'Actualisez la page et réessayez'
      ],
      gas: [
        'Vérifiez que le solde BNB du compte est suffisant',
        'Essayez de réduire le montant de rechargement',
        'Vérifiez les paramètres des frais de gas',
        'Assurez-vous d\'avoir suffisamment de BNB pour payer les frais'
      ],
      networkUnsupported: [
        'Passez au réseau principal BSC (Chain ID: 56)',
        'Passez au réseau de test BSC (Chain ID: 97)',
        'Vérifiez les paramètres de réseau du portefeuille',
        'Assurez-vous que les paramètres de réseau sont corrects'
      ],
      default: [
        'Actualisez la page et réessayez',
        'Vérifiez le statut du portefeuille',
        'Contactez le support technique',
        'Vérifiez les logs d\'erreur de la console'
      ]
    }
  },

  // 交易详情
  transactionDetail: {
    title: 'Détails de la Transaction',
    transactionTime: 'Heure de la Transaction',
    serialNumber: 'Numéro Série',
    orderId: 'Numéro de Commande',
    recordNumber: 'Numéro d\'Enregistrement',
    walletAddress: 'Adresse du Portefeuille',
    transactionHash: 'Hash de la Transaction',
    defaultType: 'Retrait',
    defaultStatus: 'En Cours',
    addressCopied: 'Adresse Copiée',
    hashCopied: 'Hash Copié',
    noHashToCopy: 'Aucun Hash de Transaction à Copier',
    status: {
      pending: 'En Attente',
      processing: 'En Traitement',
      success: 'Succès',
      completed: 'Terminé',
      failed: 'Échec',
      cancelled: 'Annulé',
      timeout: 'Délai Dépassé',
      done: 'Terminé',
      ongoing: 'En Cours'
    }
  },

  // 钱包
  wallet: {
    connect: 'Connecter le Portefeuille',
    disconnect: 'Déconnecter',
    connected: 'Portefeuille Connecté',
    disconnected: 'Portefeuille Déconnecté',
    connectionFailed: 'Échec de la Connexion',
    pleaseConnect: 'Veuillez connecter le portefeuille d\'abord',
    addressCopied: 'Adresse Copiée',
    contractAddressCopied: 'Adresse du Contrat Copiée',
    copyFailed: 'Échec de la Copie',
    balance: 'Solde',
    available: 'Disponible',
    frozen: 'Gelé',
    total: 'Total',
    recharge: 'Recharger',
    withdraw: 'Retirer',
    transfer: 'Transférer',
    address: 'Adresse',
    amount: 'Montant',
    currency: 'Devise',
    fee: 'Frais',
    confirm: 'Confirmer la Transaction',
    bind: {
      title: 'Portefeuille Non Lié',
      subtitle: 'Portefeuille Non Connecté',
      description: 'Votre portefeuille n\'est pas lié à un compte utilisateur. Veuillez visiter notre site officiel d\'abord pour lier l\'adresse email.',
      visitWebsite: 'Visiter le Site Officiel',
      cancel: 'Annuler',
      checking: 'Vérification de la liaison du portefeuille...',
      notBound: 'Portefeuille non lié au compte utilisateur',
      checkFailed: 'Échec de la vérification du portefeuille',
      chainIdMissing: 'Impossible d\'obtenir l\'ID de chaîne du réseau, assurez-vous que le portefeuille est connecté et passé au bon réseau'
    }
  },

  // 用户认证
  auth: {
    login: 'Connexion',
    logout: 'Déconnexion',
    register: 'S\'inscrire',
    email: 'Email',
    password: 'Mot de Passe',
    confirmPassword: 'Confirmer le Mot de Passe',
    forgotPassword: 'Mot de Passe Oublié',
    rememberMe: 'Se Souvenir de Moi',
    loginSuccess: 'Connexion Réussie',
    loginFailed: 'Échec de la Connexion',
    logoutSuccess: 'Déconnexion Réussie',
    registerSuccess: 'Inscription Réussie',
    registerFailed: 'Échec de l\'Inscription'
  },

  // 用户资料
  profile: {
    title: 'Profil',
    nickname: 'Pseudonyme',
    phone: 'Téléphone',
    email: 'Email',
    country: 'Pays',
    avatar: 'Avatar',
    updateSuccess: 'Mise à Jour Réussie',
    updateFailed: 'Échec de la Mise à Jour'
  },

  // KYC认证
  kyc: {
    title: 'Vérification d\'Identité',
    status: {
      pending: 'En Attente de Révision',
      approved: 'Approuvé',
      rejected: 'Rejeté',
      null: 'Non Soumis'
    },
    documents: {
      documentPhoto: 'Photo du Document',
      portraitPhoto: 'Photo de Portrait',
      holdingDocumentPhoto: 'Photo Tenant le Document',
      addressProof: 'Preuve d\'Adresse'
    },
    submitSuccess: 'Soumission Réussie',
    submitFailed: 'Échec de la Soumission'
  },

  // 2FA认证
  totp: {
    title: 'Authentification à Deux Facteurs',
    setup: 'Configurer 2FA',
    verify: 'Vérifier 2FA',
    disable: 'Désactiver 2FA',
    code: 'Code de Vérification',
    qrCode: 'Code QR',
    secretKey: 'Clé Secrète',
    setupSuccess: 'Configuration Réussie',
    verifySuccess: 'Vérification Réussie',
    disableSuccess: 'Désactivation Réussie'
  },

  // 邀请
  invite: {
    title: 'Inviter des Amis',
    code: 'Code d\'Invitation',
    copyCode: 'Copier le Code d\'Invitation',
    bindCode: 'Lier le Code d\'Invitation',
    relations: 'Relations d\'Invitation',
    inviter: 'Invité',
    invitees: 'Invités',
    rewards: 'Récompenses',
    copySuccess: 'Code d\'Invitation Copié'
  },

  // 设置
  settings: {
    title: 'Paramètres',
    language: 'Langue',
    theme: 'Thème',
    notification: 'Notifications',
    security: 'Sécurité',
    about: 'À Propos',
    version: 'Version',
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions de Service',
    help: 'Centre d\'Aide',
    settings: 'Paramètres',
    termsOfService: 'Conditions de Service',
    liquidationAlertRepaymentRules: 'Règles d\'Alerte de Liquidation et de Remboursement',
    serviceAgreement: 'Accord de Service',
    inviter: 'Invité',
    liquidationAlert: 'Alerte de Liquidation',
    liquidationAlertReminder: 'Lorsque le taux de garantie atteint 85%, les utilisateurs recevront un rappel de marge supplémentaire par email.',
    liquidationAlertApproaching: 'Lorsque le taux de garantie atteint 88%, les utilisateurs recevront un rappel par email et popup sur la page personnelle, les informant qu\'ils approchent du taux de liquidation.',
    repaymentRules: 'Règles de Remboursement',
    fullRepaymentOnly: 'Seul le remboursement intégral est autorisé.',
    forcedLiquidation: 'Liquidation Forcée',
    forcedLiquidationDisbursement: 'Lors de l\'émission du prêt, geler d\'abord 2% du montant du prêt comme assurance de liquidation, distribuer les 98% restants d\'USDT au compte USDT.',
    forcedLiquidationRedemption: 'Seulement après que le prêt soit entièrement remboursé, le système retournera automatiquement la garantie VGAU correspondante au compte VGAU et remboursera l\'assurance de liquidation originale de 2% au compte USDT.',
    forcedLiquidationPlatformFee: 'Si la liquidation forcée est déclenchée, 2% de l\'assurance de liquidation deviendra les frais de liquidation de la plateforme ; si les fluctuations du marché causent la valeur des actifs garantis en dessous de la dette totale, l\'emprunteur doit compléter la dette restante immédiatement.',
    forcedLiquidationRemainingDebt: 'La plateforme supporte plusieurs commandes de prêt, chaque commande a un prix indépendant et un contrôle des risques, ne s\'interférant pas les unes avec les autres.',
    forcedLiquidationMultipleLoans: 'La plateforme supporte plusieurs commandes de prêt, chaque commande a un prix indépendant et un contrôle des risques, ne s\'interférant pas les unes avec les autres.',
    inviteDescription: 'Remplissez le code d\'invitation pour aider vos amis à compléter la tâche d\'invitation',
    submit: 'Soumettre',
    lastUpdated: 'Dernière Mise à Jour : 31 Août 2025',
    serviceAgreementText: 'Cet accord (ci-après dénommé "Accord") est établi par vous ("Utilisateur") et Verigold ("Plateforme") pour clarifier les termes et conditions pour l\'utilisateur d\'utiliser les services liés sur la plateforme. En accédant ou en utilisant tout service fourni par la plateforme, vous acceptez de respecter tous les termes de cet accord.',
    serviceContent: 'Contenu du Service',
    stakingReturnCalculation: '1. Stake VGAU : Les utilisateurs peuvent déposer des tokens VGAU sur la plateforme et obtenir un retour USDT basé sur la durée de stake choisie et le rendement annuel (APY). La méthode de calcul du retour de stake est la suivante :',
    fixedTermStakingReturn: '（1）Retour de Stake Fixe = Montant du Stake × Taux d\'Intérêt Annuel × Jours de Stake / 365',
    flexibleStakingReturn: '（2）Retour de Stake Flexible = Montant du Stake × Prix Actuel VGAU × Taux d\'Intérêt Annuel × Jours de Stake / 365',
    lendingServices: '2. Services de Prêt : Les utilisateurs peuvent utiliser des tokens VGAU comme garantie pour emprunter USDT. Dans le processus de prêt, les paramètres comme le taux de garantie, la ligne de marge supplémentaire et la ligne de liquidation seront ajustés dynamiquement basés sur les fluctuations de prix du marché.',
    redemptionServices: '3. Services de Rachat : Les utilisateurs peuvent racheter les actifs en stake ou empruntés à travers la fonction de rachat fournie par la plateforme. Le montant du rachat est calculé basé sur le taux de change en temps réel et les conditions de stake.',
    exchangeServices: '4. Services d\'Échange : Les utilisateurs peuvent échanger USDT contre des tokens VGAU dans la plateforme, ou échanger des tokens VGAU contre USDT.'
  },

  // 错误信息
  errors: {
    networkError: 'Erreur de réseau, vérifiez la connexion',
    serverError: 'Erreur du serveur, réessayez plus tard',
    unauthorized: 'Veuillez vous connecter d\'abord',
    forbidden: 'Permissions insuffisantes',
    notFound: 'Ressource non trouvée',
    requestFailed: 'Échec de la demande',
    invalidInput: 'Entrée invalide',
    fileTooLarge: 'Fichier trop volumineux',
    fileTypeNotSupported: 'Type de fichier non supporté'
  },

  // 成功信息
  success: {
    operationSuccess: 'Opération réussie',
    saveSuccess: 'Sauvegarde réussie',
    deleteSuccess: 'Suppression réussie',
    copySuccess: 'Copie réussie',
    uploadSuccess: 'Upload réussi'
  },

  // 表单验证
  validation: {
    required: 'Ce champ est obligatoire',
    email: 'Veuillez entrer une adresse email valide',
    phone: 'Veuillez entrer un numéro de téléphone valide',
    password: 'Le mot de passe doit contenir au moins 6 caractères',
    confirmPassword: 'Les mots de passe saisis ne correspondent pas',
    amount: 'Veuillez entrer un montant valide',
    address: 'Veuillez entrer une adresse valide',
    code: 'Code de vérification',
    emailCodePlaceholder: 'Veuillez entrer le code de vérification email',
    totpCodePlaceholder: 'Veuillez entrer le code de vérification TOTP',
    codePlaceholder: 'Veuillez entrer le code de vérification'
  },

  // 組件特定鍵值
  components: {
    // Exchange
    exchange: {
      title: 'Échange',
      brandTitle: 'VGAU',
      brandSubtitle: 'Or Numérique',
      brandDescription: 'Service d\'échange d\'or numérique sécurisé, transparent et fiable',
      rateText: '1 VGAU = Prix actuel de l\'or',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Entrez la quantité d\'échange',
      requiredUSDT: 'USDT Requis',
      exchanging: 'Échange en cours...',
      exchangeSuccess: 'Échange réussi',
      exchangeFailed: 'Échange échoué',
      confirmExchange: 'Confirmer l\'Échange'
    },

    // IncreaseCollateral
    increaseCollateral: {
      title: 'Augmenter la Valeur de Garantie',
      increaseCollateralAmount: 'Augmenter la Valeur de Garantie',
      currentCollateral: 'Valeur de Garantie (VGAU)',
      collateralAmount: 'Valeur de Garantie (VGAU)',
      insuranceFee: 'Frais d\'Assurance de Liquidation (USDT)',
      initialRatio: 'Taux de Stake Initial',
      initialCollateralRatio: 'Taux de Stake Initial',
      stakingRatio: 'Taux de Stake Actuel',
      stakingRatioAfter: 'Taux de Stake Après Augmentation',
      stakingRatioAfterIncrease: 'Taux de Stake Après Augmentation',
      increaseAmount: 'Valeur de l\'Augmentation',
      amountPlaceholder: 'Entrez le montant',
      availableAssets: 'Actifs Disponibles',
      max: 'Maximum',
      confirmOperation: 'Confirmer l\'Opération',
      confirm: 'Confirmer',
      warning: 'Si le taux de garantie n\'est pas 0% ou le remboursement intégral n\'est pas terminé, vos actifs de garantie ne peuvent pas être rachetés.',
      collateralRatioWarning: 'Si le taux de garantie n\'est pas 0% ou le remboursement intégral n\'est pas terminé, vos actifs de garantie ne peuvent pas être rachetés.',
      instruction: 'Assurez-vous que tous les remboursements sont terminés et que le taux de garantie est 0%. Le système retournera automatiquement vos actifs de garantie à l\'adresse de la carteira liée.',
      collateralRatioInstruction: 'Assurez-vous que tous les remboursements sont terminés et que le taux de garantie est 0%. Le système retournera automatiquement vos actifs de garantie à l\'adresse de la carteira liée.',
      repaying: 'Vous remboursez actuellement',
      repaymentAmount: 'Vous remboursez actuellement',
      repaymentAmountValue: '77.74 USDT',
      afterRepayment: 'Après achèvement du remboursement',
      repaymentAfter: 'Après achèvement du remboursement',
      willReturn: 'Retournera',
      repaymentResult: 'Retournera',
      repaymentResultRedeem: '100 VGAU',
      andRefund: 'et rembourser',
      repaymentResultRefund: '1.56 USDT',
      repaymentSuccess: 'Remboursement réussi',
      repaymentSuccessful: 'Remboursement réussi',
      willRedeem: 'Rachètera',
      successResult: 'Rachètera',
      successResultRedeem: '100 VGAU',
      successResultRefund: 'Rembourser 1.56 USDT',
      collateralIncreased: 'Valeur de garantie augmentée avec succès',
      increaseSuccess: 'Vous avez augmenté {amount}',
      newCollateralRatio: 'Le taux de stake après augmentation de la valeur de garantie est {ratio}',
      confirmButton: 'Confirmer'
    },

    // Redeem
    redeem: {
      title: 'Rachat',
      brandTitle: 'Verifood',
      brandSubtitle: '1g or = 1 token',
      brandDescription: 'Solution de numérisation d\'or physique basée sur la blockchain',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% Rendement Annuel',
      currency1: 'VGAU',
      currency2: 'USDT',
      redeemAmountPlaceholder: 'Entrez la quantité à racheter',
      requiredUSDT: 'USDT Requis',
      usdtTitle: 'USDT à échanger',
      usdtAmountPlaceholder: 'Montant',
      confirmRedeem: 'Confirmer le Rachat',
      successText: 'Échange réussi',
      completeText: 'Terminé',
      redeemAmount: 'Montant du Rachat',
      redeemTo: 'Racheter vers',
      boundWallet: 'Adresse de la Carteira Liée',
      dailyLimit: 'Limite maximale quotidienne de rachat',
      confirmRedeem: 'Confirmer le Rachat',
      redeeming: 'Rachat en cours...',
      redeemSuccess: 'Rachat réussi',
      redeemFailed: 'Rachat échoué'
    },

    // MyFinance
    myFinance: {
      title: 'Mes Finances',
      redemptionNotice: 'Les actifs sélectionnés seront rachetés immédiatement vers votre compte',
      asset: 'Actif',
      maturityYield: 'Rendement à l\'Échéance',
      startTime: 'Heure de Début',
      endTime: 'Heure de Fin',
      redeemable: 'Rachetable',
      staking: 'En Stake',
      allLoaded: 'Tout chargé',
      redeem: 'Racheter',
      redeemFeature: 'Fonctionnalité de rachat bientôt disponible',
      totalAssets: 'Total des Actifs',
      totalEarnings: 'Total des Gains',
      activeProducts: 'Produits Actifs',
      noActiveProducts: 'Aucun produit actif',
      viewDetails: 'Voir les Détails'
    },

    // ProductHelp
    productHelp: {
      title: 'Aide Produit',
      helpContent: 'Contenu d\'aide bientôt disponible...',
      contactSupport: 'Contacter le Support'
    },

    // ProductPurchase
    productPurchase: {
      productPurchase: 'Achat de Produit',
      productDetails: 'Détails du Produit',
      term: 'Durée',
      apy: 'Rendement Annuel',
      minAmount: 'Montant Minimum',
      maxAmount: 'Montant Maximum',
      riskLevel: 'Niveau de Risque',
      amount: 'Montant',
      enterStakingAmount: 'Entrez le montant',
      vgau: 'VGAU',
      max: 'Maximum',
      availableBalance: 'Disponible',
      balanceAmount: '0',
      transactionRules: 'Règles de Transaction',
      productRules: 'Règles du Produit',
      purchaseTime: 'Heure d\'Achat',
      purchaseTimeValue: '2025-07-18 14:00',
      expirationTime: 'Heure d\'Expiration',
      expirationTimeValue: '2025-07-29 08:00',
      estimatedInterest: 'Intérêts Estimés (USDT)',
      estimatedInterestValue: '--',
      requiresManualRedemption: 'Nécessite un rachat manuel',
      requiresManualRedemptionValue: '--',
      rewards: '1. Récompenses',
      rewardsDailyChange: 'Le rendement annuel du produit à terme que vous achetez peut changer quotidiennement.',
      rewardsStartCalculation: 'Les récompenses commenceront à être calculées le jour suivant l\'achat à 00:00 (UTC), et ne peuvent pas être rachetées pendant la période de stake.',
      rewardsAfterStaking: 'Après l\'expiration de la période de stake, vous devez convertir manuellement en stake flexible, et les rendements correspondants seront distribués au compte, et les rendements distribués peuvent être retirés immédiatement.',
      settlementIncome: 'Rendement de règlement = Actif d\'achat × Rendement annuel ÷ 365 × Durée fixe (précis aux décimales)',
      subscriptionAndRedemption: '2. Achat et Rachat',
      subscriptionAndRedemptionDaily: 'L\'achat et le rachat de produits de rendement fixe garanti sont ouverts quotidiennement de 00:10 UTC à 23:50 UTC.',
      earlyRedemption: '3. Rachat Anticipé',
      earlyRedemptionMyFinance: 'Pour le produit spécifié, vous pouvez racheter les actifs à tout moment dans "Mes Finances".',
      earlyRedemptionLoseIncome: 'Si vous rachetez anticipativement, vous perdrez toutes les récompenses distribuées pour ce produit.',
      earlyRedemptionBalanceCredit: 'Le solde total d\'actifs verrouillés pour ce produit, moins toutes les récompenses que vous avez reçues pendant cette période, sera crédité sur votre compte au comptant dans les 72 heures.',
      earlyRedemptionMarketFluctuations: 'En cas de fluctuations extrêmes du marché, de délais de réseau ou de trop de demandes de rachat, le rachat peut être retardé.',
      confirm: 'Confirmer',
      processing: 'Traitement en cours...',
      recordsFeature: 'Fonctionnalité d\'enregistrements bientôt disponible',
      amountOutOfRange: 'Montant hors plage (100-10,000 VGAU)',
      selectProduct: 'Sélectionnez un produit',
      orderCreateSuccess: 'Commande de stake créée avec succès !',
      orderCreateFailed: 'Échec de création de commande',
      productNotFound: 'Produit non trouvé',
      invalidAmount: 'Montant invalide',
      purchaseFeature: 'Fonctionnalité d\'achat bientôt disponible',
      purchaseSuccess: 'Achat réussi',
      purchaseFailed: 'Achat échoué'
    },

    // InfoPage
    infoPage: {
      title: 'Informations',
      infoContent: 'Contenu d\'informations...',
      moreInfo: 'Plus d\'Informations'
    },

    // NewLending
    newLending: {
      lending: 'Prêt',
      pledgedVGAUAssets: 'Les actifs VGAU engagés ne recevront pas de récompenses de protection du capital',
      collateralQuantity: 'Quantité de Garantie',
      enterCollateralAmount: 'Entrez la quantité de garantie',
      max: 'Maximum',
      availableAssets: 'Actifs Disponibles',
      availableToBorrow: 'Montant Disponible pour Emprunt',
      lendingAmount: 'Montant du Prêt',
      borrowRange: 'Plage d\'Emprunt',
      enterBorrowAmount: 'Entrez le montant de l\'emprunt',
      liquidationInsuranceFee: 'Frais d\'Assurance de Liquidation',
      initialCollateralRatio: 'Taux de Garantie Initial',
      additionalMargin: 'Marge Supplémentaire',
      forcedLiquidationCollateralRatio: 'Taux de Garantie de Liquidation Forcée',
      annualInterestRate: 'Taux d\'Intérêt Annuel',
      netAnnualizedInterestRate: 'Taux d\'Intérêt Annuel Net',
      estimatedHourlyInterestRate: 'Taux d\'Intérêt Horaire Estimé',
      liquidationReferencePrice: 'Prix de Référence de Liquidation (VGAU/USDT)',
      confirmLending: 'Confirmer le Prêt',
      pleaseEnterBorrowAmount: 'Entrez un montant d\'emprunt valide',
      lendingFeature: 'Fonctionnalité de prêt bientôt disponible',
      loanAmount: 'Montant du Prêt',
      collateralAmount: 'Montant de Garantie',
      interestRate: 'Taux d\'Intérêt',
      loanTerm: 'Durée du Prêt',
      confirmLoan: 'Confirmer le Prêt',
      applying: 'Application en cours...',
      loanSuccess: 'Demande de prêt réussie',
      loanFailed: 'Demande de prêt échouée'
    },

    // BorrowOrder
    borrowOrder: {
      title: 'Commande d\'Emprunt de Pièces',
      borrowOrder: 'Commande d\'Emprunt de Pièces',
      orderNumber: 'Numéro de Commande',
      borrowedUSDTArrival: 'USDT emprunté arrivera immédiatement aux fonds d\'emprunt pour retrait USDT',
      totalLiabilities: 'Total des Passifs (USDT)',
      collateralAmount: 'Quantité de Garantie (VGAU)',
      pledgeRatio: 'Taux d\'Engagement',
      netAnnualizedInterestRate: 'USDT à Rembourser',
      liquidationReferencePrice: 'Prix de Référence de Liquidation (VGAU/USDT)',
      increaseCollateralAmount: 'Augmenter la Valeur de Garantie',
      adjustPledgeRatio: 'Ajuster le Taux d\'Engagement',
      fullRepayment: 'Remboursement Intégral',
      allLoaded: 'Tout chargé',
      recordsFeature: 'Fonctionnalité d\'enregistrements bientôt disponible',
      adjustPledgeRatioFeature: 'Fonctionnalité de remboursement intégral bientôt disponible',
      orderStatus: 'Statut de la Commande',
      borrowAmount: 'Montant de l\'Emprunt',
      repayAmount: 'Montant du Remboursement',
      dueDate: 'Date d\'Échéance',
      actions: 'Actions',
      repay: 'Rembourser',
      extend: 'Prolonger'
    },

    // USDTWithdraw & VGAUWithdraw
    withdraw: {
      title: 'Retrait',
      withdrawAmount: 'Montant du Retrait',
      withdrawTo: 'Retirer vers',
      boundWallet: 'Adresse de la Carteira Liée',
      confirmWithdraw: 'Confirmer le Retrait',
      withdrawing: 'Retrait en cours...',
      withdrawSuccess: 'Retrait réussi',
      withdrawFailed: 'Retrait échoué'
    },

    // Exchange
    exchange: {
      title: 'Échange',
      brandTitle: 'Verifood',
      brandSubtitle: '1g or = 1 token',
      brandDescription: 'Solution de numérisation d\'or physique basée sur la blockchain',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% Rendement Annuel',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Entrez la quantité à échanger',
      requiredUSDT: 'USDT Requis',
      confirmExchange: 'Confirmer l\'Échange',
      exchangeFeature: 'Fonctionnalité d\'échange bientôt disponible',
      from: 'De',
      to: 'Vers',
      exchangeRate: 'Taux de Change',
      slippage: 'Glissement',
      exchanging: 'Échange en cours...',
      exchangeSuccess: 'Échange réussi',
      exchangeFailed: 'Échange échoué'
    },

    // Invitation
    invitation: {
      invitation: 'Invitation',
      invitationRewards: '1,580 points',
      invitationRewardsLabel: 'Récompenses d\'Invitation',
      numberOfInvitedPeople: '12 utilisateurs',
      numberOfInvitedPeopleLabel: 'Nombre d\'Invités',
      numberOfDirectPushPersonnel: '6 utilisateurs',
      numberOfDirectPushPersonnelLabel: 'Nombre de Push Direct',
      invitationLink: 'Lien d\'Invitation',
      copyLink: 'Copier le Lien',
      invitationRewardDetails: 'Détails des Récompenses d\'Invitation',
      id: 'ID',
      walletAddr: 'Adresse de la Carteira',
      type: 'Type',
      rewards: 'Récompenses (points)',
      allContentLoaded: 'Tout le contenu chargé',
      ruleDetails: 'Détails des Règles',
      successfullyReferUserThroughKYC: 'Référence avec succès utilisateur via KYC et obtention de points :',
      directReferral: 'Référence Directe',
      indirectReferral: 'Référence Indirecte',
      rewardsPerUser: '2 points/utilisateur',
      indirectRewardsPerUser: '0.2 points/utilisateur',
      pointsUnit: 'points/utilisateur',
      linkCopied: 'Lien d\'invitation copié !',
      invitationCode: 'Code d\'Invitation',
      copyCode: 'Copier le Code',
      inviteFriends: 'Inviter des Amis',
      referralRewards: 'Récompenses de Référence',
      myInvitations: 'Mes Invitations',
      bindSuccess: 'Code d\'invitation soumis avec succès !'
    },

    // PointsDetails
    pointsDetails: {
      pointsDetails: 'Détails des Points',
      totalPoints: 'Total des Points',
      all: 'Tous',
      staking: 'Stake',
      invite: 'Invitation',
      lending: 'Prêt',
      exchange: 'Échange',
      ecosystem: 'Écosystème',
      stakingRewards: 'Récompenses de Stake',
      invitation: 'Invitation',
      ecosystemParticipation: 'Participation à l\'Écosystème',
      lending: 'Prêt',
      exchangeVGT: 'Échanger VGT',
      allLoaded: 'Tout chargé',
      earnedPoints: 'Points Gagnés',
      spentPoints: 'Points Dépensés',
      pointsHistory: 'Historique des Points',
      noHistory: 'Aucun historique de points'
    },

    // Exchange
    exchange: {
      title: 'Échange',
      brandTitle: 'Verifood',
      brandSubtitle: '1g or = 1 token',
      brandDescription: 'Solution de numérisation d\'or physique basée sur la blockchain',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% Rendement Annuel',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Entrez la quantité à échanger',
      requiredUSDT: 'USDT Requis',
      confirmExchange: 'Confirmer l\'Échange',
      exchangeFeature: 'Fonctionnalité d\'échange bientôt disponible'
    }
  },

  // Financial Products
  financialProducts: 'Produits Financiers',
  returnsAndRisks: 'Retours et Risques',
  returnSources: 'Sources de Retour',
  whatAreFinancialProducts: 'Que sont les Produits Financiers ?',
  thisIsADigitalAssetAppreciationSchemeAnchoredToGold: 'Il s\'agit d\'un schéma d\'appréciation d\'actifs numériques ancré à l\'or.',
  whenUsersPurchaseAndHoldVGAUTokens: 'Lorsque les utilisateurs achètent et détiennent des tokens VGAU, ils représentent des dépôts d\'or physique équivalent, et la valeur des actifs fluctue avec les conditions du marché.',
  theyRepresentDepositsOfEquivalentPhysicalGold: 'Ils représentent des dépôts d\'or physique équivalent, et la valeur des actifs fluctue avec les conditions du marché.',
  andAssetValuesFluctuateWithMarketConditions: 'La valeur des actifs fluctue avec les conditions du marché.',
  inTheirAccounts: 'Dans leurs comptes,',
  usersCanParticipateInDifferentTermAndRuleBasedYieldSchemesWithVGAU: 'les utilisateurs peuvent utiliser VGAU pour participer à des schémas de rendement basés sur différentes durées et règles,',
  andTheSystemWillGenerateRewardsAccordingToTheRules: 'et le système générera des récompenses selon les règles.',
  rewardsInTheAccountNeedToBeClaimedManually: 'Les récompenses dans le compte doivent être réclamées manuellement.',
  rewardsInFinancialProductsAccumulateInRealTimeToMeetDifferentAssetManagementNeeds: 'Les récompenses dans les produits financiers s\'accumulent en temps réel pour répondre aux différents besoins de gestion d\'actifs.',
  advantages: 'Avantages',
  flexibleProductsAvailableForRedemption: 'Produits flexibles disponibles pour rachat à tout moment',
  usersCanSubscribeAndRedeemFlexibleProductsAtAnyTime: 'Les utilisateurs peuvent s\'abonner et racheter des produits flexibles à tout moment.',
  fixedTermProductsOfferHigherAPY: 'Les produits à terme fixe offrent un rendement annuel plus élevé',
  fixedTermProductsHaveFixedTermsButTheirAnnualizedYieldsAreTypicallyHigherThanFlexibleProducts: 'Les produits à terme fixe ont des termes fixes, mais leurs rendements annualisés sont généralement plus élevés que les produits flexibles.',
  manualRedemptionOfInterestEarnings: 'Rachat manuel des gains d\'intérêts',
  dailyUSDTEarningsWillAutomaticallyGoToTheWithdrawalBalanceWhichNeedsToBeManuallyWithdrawn: 'Les gains quotidiens USDT iront automatiquement au solde de retrait qui doit être retiré manuellement.',
  risks: 'Risques',
  veryLowRisk: 'Risque très faible',
  digitalAssetPricesMayFluctuateIfThereAreTooManyRedemptionRequestsItMayLeadToTemporarilyInsufficientAvailableRedemptionBalanceResultingInDelayedRedemptionRestAssuredYourAssetsAreAlwaysSafeAndSecure: 'Les prix des actifs numériques peuvent fluctuer. S\'il y a trop de demandes de rachat, cela peut conduire à un solde de rachat disponible temporairement insuffisant, résultant en un rachat retardé. Soyez assuré, vos actifs sont toujours sûrs et sécurisés.',
  eachOfYourTokensCorrespondsToPhysicalGoldHeldInOurAfricanMiningAreasAndAuditedByAuthoritativeInstitutions: 'Chacun de vos tokens (1 VGAU = 1g or physique) correspond à l\'or physique détenu dans nos zones minières africaines et audité par des institutions autorisées.',
  theStableReturnsYouEarnThroughStakingComeFromTheProjectTeamsActiveManagementAndOperationOfTheUnderlyingGoldAssets: 'Les retours stables que vous gagnez grâce au stake proviennent de la gestion active et de l\'exploitation des actifs d\'or sous-jacents par l\'équipe du projet.',
  confirm: 'Confirmer',

  // InfoPage
  glossary: 'Glossaire',
  repaymentRules: 'Règles de Remboursement',
  forcedLiquidationInsuranceFee: 'Frais d\'Assurance de Liquidation Forcée',
  forcedLiquidationInsuranceFeeDescription: 'Lors de l\'emprunt, la plateforme calculera des frais d\'assurance de liquidation forcée de 2% du montant maximum empruntable. Ces frais seront déduits du montant empruntable.',
  forcedLiquidationInsuranceFeeAfterRepayment: 'Après que l\'emprunteur ait complètement remboursé le prêt, la plateforme retournera les frais d\'assurance de liquidation forcée correspondants à son compte d\'emprunt USDT.',
  forcedLiquidationInsuranceFeeOnForcedLiquidation: 'Si une liquidation forcée se produit pour une commande d\'emprunt de crypto-monnaie, la plateforme facturera ces frais d\'assurance de liquidation forcée.',
  pledgeRateAnnotation: 'Annotation du Taux d\'Engagement',
  currentPledgeRate: 'Taux d\'Engagement Actuel',
  pledgeRateDescription: 'Le taux d\'engagement, ou LTV (Loan-to-Value), représente la proportion entre les actifs numériques empruntés et la valeur de garantie (calculée sur la base de la garantie). La valeur des actifs est calculée sur la base d\'indices de prix de différentes crypto-monnaies.',
  initialPledgeRate: 'Taux d\'Engagement Initial',
  initialPledgeRatePercentage: '78%',
  initialPledgeRateDescription: 'Le taux d\'engagement initial est la proportion initiale entre la valeur de garantie que vous devez fournir et le montant du prêt.',
  marginCall: 'Marge Supplémentaire',
  marginCallPercentage: '85%',
  marginCallDescription: 'Le taux d\'engagement de marge supplémentaire est la ligne d\'alerte lorsque le contrat de prêt s\'approche du taux d\'engagement de liquidation forcée.',
  forcedLiquidationPledgeRate: 'Taux d\'Engagement de Liquidation Forcée',
  forcedLiquidationPledgeRatePercentage: '91%',
  forcedLiquidationPledgeRateDescription: 'Si votre taux d\'engagement atteint le taux d\'engagement de liquidation forcée, le système exécutera immédiatement la liquidation forcée, utilisant vos actifs de garantie pour rembourser votre prêt du marché monétaire, et facturera des frais de liquidation forcée de 2% sur le montant du prêt.',
  netAnnualizedInterestRate: 'Taux d\'Intérêt Annuel Net',
  netAnnualizedInterestRateDescription: 'Les actifs de garantie continueront à recevoir des récompenses d\'intérêts annuels en temps réel, aidant à compenser le coût de l\'emprunt de crypto-monnaies. Taux d\'intérêt annuel net = Taux d\'intérêt annuel - (Taux d\'intérêt annuel en temps réel de la garantie / Taux d\'engagement initial)',
  annualInterestRate: 'Taux d\'Intérêt Annuel',
  annualInterestRateDescription: 'Les intérêts seront calculés en utilisant les intérêts composés. Les intérêts s\'accumulent à partir du début réussi de l\'emprunt de crypto-monnaies, calculés chaque minute. Si la durée de l\'emprunt est inférieure à une minute, elle sera également calculée comme une minute.',
  collateralRequiredForLending: 'La garantie requise pour l\'emprunt provient du compte VGAU à vue. Une fois convertie en garantie, cette partie ne produira plus de rendements à vue.',
  defaultInitialPledgeRate: 'Le taux d\'engagement initial par défaut est',
  defaultInitialPledgeRatePercentage: '78%',
  loanAmountDescription: '. Lors de la création d\'une commande de prêt, le taux d\'engagement peut être ajusté selon le montant du prêt.',
  forcedLiquidationInsuranceFeeOnForcedLiquidationDescription: 'Si la liquidation forcée est déclenchée, les frais d\'assurance de liquidation forcée de 2% deviendront la propriété de la plateforme comme frais de liquidation ; si les fluctuations extrêmes du marché causent la valeur des actifs de garantie en dessous de la dette totale, l\'emprunteur doit compléter le montant restant dû immédiatement. La plateforme supporte plusieurs commandes de prêt, chaque commande a un prix indépendant et un contrôle des risques, ne s\'interférant pas les unes avec les autres.',
  repaymentUsingAccountBalance: 'Remboursement utilisant le solde du compte : La garantie ne peut pas être rachetée avant le remboursement intégral. Les utilisateurs peuvent ajouter plus de VGAU pour réduire le taux d\'engagement et éviter la liquidation.',

  // USDTWithdraw
  usdtWithdraw: 'Retrait USDT',
  selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days: 'Les actifs sélectionnés seront entièrement rachetés vers votre carteira après T+1 jours.',
  totalRedemptionAmount: 'Montant Total de Rachat',
  minimum0: 'Minimum 0',
  usdtMax: 'USDT |Maximum',
  availableBalance: 'Solde Disponible',
  estimatedFee: 'Frais Estimés',
  withdrawTo: 'Retirer vers',
  boundWalletAddress: 'Adresse de la Carteira Liée',
  dailyMaximumRedemptionLimit: 'Limite maximale quotidienne de rachat : 5000000000 USDT',
  confirm: 'Confirmer',
  pleaseEnterWithdrawAmount: 'Entrez le montant du retrait',
  withdrawFeatureComingSoon: 'Fonctionnalité de retrait bientôt disponible',

  // VGAUWithdraw
  vgauWithdraw: 'Retrait VGAU',
  vgauMax: 'VGAU |Maximum',
  dailyMaximumRedemptionLimitVGAU: 'Limite maximale quotidienne de rachat : 5000000000 VGAU',

  // Language Names
  languageNames: {
    ar: 'اللغة العربية',
    en: 'English',
    fr: 'Français',
    zh: '繁體中文',
    pt: 'português'
  },

  // LanguageSwitcher
  switchedToFrench: 'Changé vers le Français',
  switchedToEnglish: 'Changé vers l\'Anglais'
}
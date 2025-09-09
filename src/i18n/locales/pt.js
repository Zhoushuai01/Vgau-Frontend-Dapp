export default {
  // 充值確認彈窗
  recharge: {
    modal: {
      title: 'Confirmar Recarga',
      content: 'Tem certeza de que deseja recarregar {amount} {symbol}?',
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    },
    loading: 'Recarregando...'
  },

  // 提現
  withdraw: {
    modal: {
      title: 'Confirmar Saque',
      content: 'Tem certeza de que deseja sacar {amount} {symbol}?',
      confirm: 'Confirmar',
      cancel: 'Cancelar'
    },
    loading: 'Sacando...'
  },

  // 通用UI元素
  common: {
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    add: 'Adicionar',
    search: 'Pesquisar',
    loading: 'Carregando...',
    noData: 'Nenhum Dado',
    noMoreData: 'Não Há Mais Dados',
    copy: 'Copiar',
    copied: 'Copiado',
    back: 'Voltar',
    next: 'Próximo',
    previous: 'Anterior',
    submit: 'Enviar',
    reset: 'Redefinir',
    close: 'Fechar',
    open: 'Abrir',
    refresh: 'Atualizar',
    retry: 'Tentar Novamente',
    success: 'Sucesso',
    error: 'Erro',
    warning: 'Aviso',
    info: 'Informação',
    amount: 'Valor',
    balance: 'Saldo',
    available: 'Disponível',
    currency: 'Moeda',
    confirmOperation: 'Confirmar Operação',
    processing: 'Processando...',
    operationSuccess: 'Operação Bem-sucedida',
    operationFailed: 'Operação Falhou',
    insufficientFunds: 'Saldo Insuficiente',
    userRejected: 'Usuário Cancelou Operação',
    gasInsufficient: 'Taxa de Gas Insuficiente',
    networkError: 'Erro de Rede',
    pleaseCheckConnection: 'Verifique a Conexão',
    pleaseEnterValidAmount: 'Digite um Valor Válido',
    pleaseEnterPositiveInteger: 'Digite um Número Inteiro Positivo'
  },

  // 兑换
  exchange: {
    exchangeSuccess: 'Troca Bem-sucedida',
    exchangeFailed: 'Troca Falhou'
  },

  // 导航
  navigation: {
    home: 'Início',
    defi: 'DeFi',
    ecology: 'Ecologia',
    person: 'Perfil',
    history: 'Histórico',
    settings: 'Configurações'
  },

  // 首页
  home: {
    title: 'VGAU Ouro Digital',
    subtitle: 'Plataforma de Ouro Digital Segura, Transparente e Confiável',
    tvl: 'Valor Total Bloqueado VGAU',
    exchange: 'Trocar USDT por VGAU',
    enterAmount: 'Digite o Valor da Troca',
    confirmOperation: 'Confirmar Operação',
    projectTitle: 'Livro de Ouro Africano',
    projectDesc: 'Um protocolo RWA que ancora ativos de ouro a tokens on-chain, fornecendo soluções seguras e transparentes para digitalização do ouro.',
    walletAddress: 'Endereço da Carteira:',
    contractAddress: 'Endereço do Contrato:',
    goldInventory: 'Estoque de Ouro',
    inventoryAmount: 'Quantidade do Estoque',
    dailyInventory: 'Quantidade Diária do Estoque',
    source: 'Fonte: Áreas de Mineração de Ouro Africano',
    certificate: 'Número do Certificado: AGL-2021-001',
    banner: {
      title1: 'Nova Era do Ouro Digital',
      title2: 'Proteção da Tecnologia Blockchain',
      title3: 'Alocação de Ativos Globais'
    },
    features: {
      audited: 'Auditado',
      custodian: 'Serviço de Custódia',
      details: 'Detalhes'
    },
    officialSite: 'Site Oficial VeriGold'
  },

  // DeFi页面
  defi: {
    title: 'Serviços DeFi',
    exchangeRate: 'Taxa de Câmbio',
    balance: 'Saldo',
    currentApr: 'Rendimento Anual Atual',
    pending: 'Pendente',
    claim: 'Reivindicar',
    deposit: 'Depositar',
    withdraw: 'Sacar',
    finance: 'Finanças',
    lending: 'Empréstimo',
    myFinance: 'Minhas Finanças',
    productPurchase: 'Compra de Produto',
    borrowOrder: 'Pedido de Empréstimo',
    newLending: 'Novo Empréstimo',
    tabs: {
      account: 'Conta',
      loans: 'Empréstimos',
      earn: 'Ganhar'
    },
    products: {
      huoqi: 'Finanças à Vista',
      dingqi: 'Finanças a Prazo',
      jiedai: 'Serviço de Empréstimo',
      licai: 'Produtos Financeiros',
      shengou: 'Comprar',
      shuhui: 'Resgatar',
      jiebi: 'Desbloquear',
      fengxian: 'Aviso de Risco'
    }
  },

  // 生态页面
  ecology: {
    title: 'Construção de Ecossistema',
    description: 'Construir um ecossistema completo de ouro digital'
  },

  // 个人中心
  person: {
    title: 'Perfil',
    walletAddress: 'Endereço da Carteira',
    walletAddressCopied: 'Endereço da Carteira Copiado',
    copyFailed: 'Falha ao Copiar',
    noWalletConnected: 'Carteira Não Conectada',
    connectWallet: 'Conectar Carteira',
    connectingWallet: 'Conectando Carteira...',
    walletConnected: 'Carteira Conectada com Sucesso',
    walletConnectionFailed: 'Falha na Conexão da Carteira',
    userRejectedConnection: 'Usuário Rejeitou Conexão',
    noWalletDetected: 'Nenhuma Carteira Detectada',
    assetOverview: 'Visão Geral dos Ativos',
    currentStakedAmount: 'Quantidade Atual em Stake',
    totalStakedRewards: 'Recompensas Totais em Stake',
    currentCollateral: 'Garantia Atual',
    remainingDebt: 'Dívida Restante',
    totalPoints: 'Pontos Totais',
    notificationCenter: 'Central de Notificações (Alertas de Liquidação)',
    liquidationAlert: 'Seus ativos estão próximos do limite de liquidação, complete em tempo hábil.',
    topUpNow: 'Completar Agora',
    moreSettings: 'Mais Configurações',
    menu: {
      details: 'Detalhes',
      exchange: 'Trocar',
      history: 'Histórico',
      invite: 'Convidar',
      points: 'Pontos',
      redeem: 'Resgatar',
      service: 'Atendimento',
      settings: 'Configurações',
      notice: 'Aviso'
    },
    logoutConfirm: {
      title: 'Confirmar Logout',
      content: 'Tem certeza de que deseja fazer logout da conta atual? Será necessário fazer login novamente após o logout.',
      confirm: 'Confirmar Logout',
      cancel: 'Cancelar'
    },
    logout: {
      button: 'Logout',
      loading: 'Fazendo Logout...',
      success: 'Logout Bem-sucedido',
      failed: 'Falha no Logout'
    },
    logoutErrors: {
      network: 'Erro de Conexão de Rede',
      auth: 'Erro de Autenticação',
      server: 'Erro do Servidor',
      timeout: 'Tempo Limite da Solicitação',
      unknown: 'Erro Desconhecido',
      details: 'Detalhes do Erro',
      retry: 'Tentar Novamente',
      close: 'Fechar',
      suggestions: 'Sugestões de Solução',
      errorTypes: {
        NETWORK: 'Erro de Rede',
        AUTH: 'Erro de Autenticação',
        SERVER: 'Erro do Servidor',
        TIMEOUT: 'Erro de Tempo Limite',
        UNKNOWN: 'Erro Desconhecido'
      }
    }
  },

  // 历史记录
  history: {
    title: 'Histórico',
    tabs: {
      account: 'Conta',
      loans: 'Empréstimos',
      earn: 'Ganhar'
    },
    filter: {
      all: 'Todos',
      vgau: 'VGAU',
      usdt: 'USDT'
    },
    transaction: {
      deposit: 'Depósito',
      withdraw: 'Saque',
      transfer: 'Transferência',
      swap: 'Troca',
      ongoing: 'Em Andamento',
      done: 'Concluído'
    },
    loadMore: 'Carregar Mais',
    noMoreData: 'Não Há Mais Dados',
    noTransactionsFound: 'Nenhum Registro de Transação',
    transactionHistoryFeature: 'Recurso de Histórico de Transações em Breve',
    loans: {
      stakeRedeem: 'Stake e Resgate',
      loanRecords: 'Registros de Empréstimo',
      rewardsHistory: 'Histórico de Recompensas',
      totalDebt: 'Dívida Total',
      totalDebtAmount: '121.221 USDT',
      collateralAmt: 'Quantidade de Garantia',
      collateralAmtValue: '221 VGAU',
      borrowedAmt: 'Quantidade Emprestada',
      borrowedAmtValue: '45.451115 USDT',
      riskWarning: 'Taxa de Garantia Baixa, Risco de Liquidação',
      all: 'Todos',
      loan: 'Empréstimo',
      repay: 'Pagamento',
      borrowing: 'Emprestando',
      ongoing: 'Em Andamento',
      borrowedAmount: 'Valor Emprestado',
      borrowedAmountValue: '45.451115 USDT',
      collateralAmount: 'Valor da Garantia',
      collateralAmountValue: '221 VGAU',
      stakingRate: 'Taxa de Stake',
      stakingRateValue: '80%',
      collateralVGAU: 'Garantia (VGAU)',
      collateralVGAUValue: '20',
      borrowedUSDT: 'Emprestado (USDT)',
      borrowedUSDTValue: '84.2255',
      interestRate: 'Taxa de Juros',
      interestRateValue: '5.2%',
      liquidationPrice: 'Preço de Liquidação',
      liquidationPriceValue: '$0.85',
      noMoreData: 'Não Há Mais Dados',
      completed: 'Concluído',
      details: 'Detalhes'
    },
    borrowingDetail: {
      title: 'Detalhes do Empréstimo',
      orderId: 'Pedido L-202503-0133',
      borrowingStatus: 'Emprestando',
      completedStatus: 'Concluído',
      collatRate: 'Taxa de Garantia',
      collateralVGAU: 'Garantia (VGAU)',
      netAPR: 'Rendimento Anual Líquido',
      liqPrice: 'Preço de Liquidação (VGAU/USDT)',
      addCollat: 'Adicionar Garantia',
      borrow: 'Emprestar',
      collateral: 'Garantia',
      noMoreData: 'Não Há Mais Dados'
    },
    earn: {
      filter: {
        all: 'Todos',
        staking: 'Em Stake',
        toClaim: 'Para Reivindicar',
        completed: 'Concluído'
      },
      status: {
        staking: 'Em Stake',
        toClaim: 'Para Reivindicar',
        completed: 'Concluído'
      },
      viewDetails: 'Ver Detalhes',
      noTransactionsFound: 'Nenhum Registro de Transação Financeira'
    },
    earnComingSoon: 'Conteúdo Financeiro em Breve'
  },

  // 质押详情
  stakingDetail: {
    title: 'Detalhes do Stake',
    days: 'Dias',
    staking: 'Em Stake',
    toClaim: 'Para Reivindicar',
    completed: 'Concluído',
    ongoing: 'Em Andamento',
    startTime: 'Hora de Início',
    endTime: 'Hora de Fim',
    order: 'Pedido',
    noMoreData: 'Não Há Mais Dados',
    actions: {
      stake: 'Stake',
      redeem: 'Resgatar'
    }
  },

  // 充值页面
  rechargePage: {
    usdtRecharge: 'Recarga USDT',
    vgauRecharge: 'Recarga VGAU',
    amount: 'Valor',
    minimumAmount: 'Mínimo 0',
    max: 'Máximo',
    availableBalance: 'Saldo Disponível',
    available: 'Disponível',
    confirm: 'Confirmar',
    confirmOperation: 'Confirmar Operação',
    processing: 'Processando...',
    pleaseEnterValidAmount: 'Digite um valor de recarga válido',
    rechargeSuccess: 'Recarga Bem-sucedida!',
    rechargeFailed: 'Falha na Recarga',
    contractInitFailed: 'Falha na Inicialização do Serviço de Contrato',
    userDataLoadFailed: 'Falha no Carregamento dos Dados do Usuário',
    insufficientFunds: 'Saldo Insuficiente',
    userRejected: 'Usuário Cancelou Operação',
    gasInsufficient: 'Taxa de Gas Insuficiente',
    networkError: 'Erro de Rede',
    walletError: 'Problema de Conexão da Carteira',
    contractError: 'Falha na Chamada do Contrato',
    networkUnsupported: 'Rede Atual Não Suportada',
    unknownError: 'Erro Desconhecido Durante a Recarga',
    errorModal: {
      title: '⚠️ Falha na Recarga',
      close: '×',
      suggestions: 'Sugestões de Solução:',
      debugInfo: 'Informações de Debug:',
      errorType: 'Tipo de Erro',
      contract: 'Contrato',
      method: 'Método',
      timestamp: 'Timestamp',
      deviceType: 'Tipo de Dispositivo',
      platform: 'Plataforma',
      onlineStatus: 'Status Online',
      online: 'Online',
      offline: 'Offline',
      mobile: 'Mobile',
      retry: 'Tentar Novamente',
      showDebug: 'Mostrar Debug',
      hideDebug: 'Ocultar Debug',
      closeError: 'Fechar'
    },
    errorDetails: {
      networkError: 'Problema de conexão de rede, não é possível conectar à rede blockchain',
      walletError: 'Problema de conexão da carteira, verifique o status da carteira',
      gasError: 'Taxa de gas insuficiente ou saldo da conta insuficiente',
      contractError: 'Falha na chamada do contrato, pode ser problema do contrato ou erro de parâmetros',
      networkUnsupported: 'Rede atual não suportada, mude para a rede BSC',
      userRejected: 'Você cancelou a operação de transação',
      unknownError: 'Erro desconhecido durante a recarga'
    },
    suggestions: {
      network: [
        'Verifique se a conexão de rede está normal',
        'Verifique as configurações de VPN',
        'Tente trocar de rede',
        'Tente novamente mais tarde'
      ],
      wallet: [
        'Certifique-se de que o MetaMask está instalado e desbloqueado',
        'Verifique se a carteira está conectada à rede correta',
        'Tente reconectar a carteira',
        'Atualize a página e tente novamente'
      ],
      gas: [
        'Verifique se o saldo BNB da conta é suficiente',
        'Tente reduzir o valor da recarga',
        'Verifique as configurações da taxa de gas',
        'Certifique-se de ter BNB suficiente para pagar as taxas'
      ],
      networkUnsupported: [
        'Mude para a rede principal BSC (Chain ID: 56)',
        'Mude para a rede de teste BSC (Chain ID: 97)',
        'Verifique as configurações de rede da carteira',
        'Certifique-se de que as configurações de rede estão corretas'
      ],
      default: [
        'Atualize a página e tente novamente',
        'Verifique o status da carteira',
        'Entre em contato com o suporte técnico',
        'Verifique os logs de erro do console'
      ]
    }
  },

  // 交易详情
  transactionDetail: {
    title: 'Detalhes da Transação',
    transactionTime: 'Hora da Transação',
    serialNumber: 'Número Serial',
    orderId: 'Número do Pedido',
    recordNumber: 'Número do Registro',
    walletAddress: 'Endereço da Carteira',
    transactionHash: 'Hash da Transação',
    defaultType: 'Saque',
    defaultStatus: 'Em Andamento',
    addressCopied: 'Endereço Copiado',
    hashCopied: 'Hash Copiado',
    noHashToCopy: 'Nenhum Hash de Transação para Copiar'
  },

  // 钱包
  wallet: {
    connect: 'Conectar Carteira',
    disconnect: 'Desconectar',
    connected: 'Carteira Conectada',
    disconnected: 'Carteira Desconectada',
    connectionFailed: 'Falha na Conexão',
    pleaseConnect: 'Conecte a carteira primeiro',
    addressCopied: 'Endereço Copiado',
    contractAddressCopied: 'Endereço do Contrato Copiado',
    copyFailed: 'Falha ao Copiar',
    balance: 'Saldo',
    available: 'Disponível',
    frozen: 'Congelado',
    total: 'Total',
    recharge: 'Recarregar',
    withdraw: 'Sacar',
    transfer: 'Transferir',
    address: 'Endereço',
    amount: 'Valor',
    currency: 'Moeda',
    fee: 'Taxa',
    confirm: 'Confirmar Transação',
    bind: {
      title: 'Carteira Não Vinculada',
      subtitle: 'Carteira Não Conectada',
      description: 'Sua carteira não está vinculada a uma conta de usuário. Visite nosso site oficial primeiro para vincular o endereço de email.',
      visitWebsite: 'Visitar Site Oficial',
      cancel: 'Cancelar',
      checking: 'Verificando vinculação da carteira...',
      notBound: 'Carteira não vinculada à conta de usuário',
      checkFailed: 'Falha na verificação da carteira',
      chainIdMissing: 'Não é possível obter o ID da cadeia da rede, certifique-se de que a carteira está conectada e mudou para a rede correta'
    }
  },

  // 用户认证
  auth: {
    login: 'Login',
    logout: 'Logout',
    register: 'Registrar',
    email: 'Email',
    password: 'Senha',
    confirmPassword: 'Confirmar Senha',
    forgotPassword: 'Esqueci a Senha',
    rememberMe: 'Lembrar de Mim',
    loginSuccess: 'Login Bem-sucedido',
    loginFailed: 'Falha no Login',
    logoutSuccess: 'Logout Bem-sucedido',
    registerSuccess: 'Registro Bem-sucedido',
    registerFailed: 'Falha no Registro'
  },

  // 用户资料
  profile: {
    title: 'Perfil',
    nickname: 'Apelido',
    phone: 'Telefone',
    email: 'Email',
    country: 'País',
    avatar: 'Avatar',
    updateSuccess: 'Atualização Bem-sucedida',
    updateFailed: 'Falha na Atualização'
  },

  // KYC认证
  kyc: {
    title: 'Verificação de Identidade',
    status: {
      pending: 'Pendente de Revisão',
      approved: 'Aprovado',
      rejected: 'Rejeitado',
      null: 'Não Enviado'
    },
    documents: {
      documentPhoto: 'Foto do Documento',
      portraitPhoto: 'Foto de Retrato',
      holdingDocumentPhoto: 'Foto Segurando Documento',
      addressProof: 'Comprovante de Endereço'
    },
    submitSuccess: 'Envio Bem-sucedido',
    submitFailed: 'Falha no Envio'
  },

  // 2FA认证
  totp: {
    title: 'Autenticação de Dois Fatores',
    setup: 'Configurar 2FA',
    verify: 'Verificar 2FA',
    disable: 'Desabilitar 2FA',
    code: 'Código de Verificação',
    qrCode: 'Código QR',
    secretKey: 'Chave Secreta',
    setupSuccess: 'Configuração Bem-sucedida',
    verifySuccess: 'Verificação Bem-sucedida',
    disableSuccess: 'Desabilitação Bem-sucedida'
  },

  // 邀请
  invite: {
    title: 'Convidar Amigos',
    code: 'Código de Convite',
    copyCode: 'Copiar Código de Convite',
    bindCode: 'Vincular Código de Convite',
    relations: 'Relações de Convite',
    inviter: 'Convidado',
    invitees: 'Convidados',
    rewards: 'Recompensas',
    copySuccess: 'Código de Convite Copiado'
  },

  // 设置
  settings: {
    title: 'Configurações',
    language: 'Idioma',
    theme: 'Tema',
    notification: 'Notificações',
    security: 'Segurança',
    about: 'Sobre',
    version: 'Versão',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    help: 'Central de Ajuda',
    settings: 'Configurações',
    termsOfService: 'Termos de Serviço',
    liquidationAlertRepaymentRules: 'Regras de Alerta de Liquidação e Pagamento',
    serviceAgreement: 'Acordo de Serviço',
    inviter: 'Convidado',
    liquidationAlert: 'Alerta de Liquidação',
    liquidationAlertReminder: 'Quando a taxa de garantia atingir 85%, os usuários receberão um lembrete de margem adicional por email.',
    liquidationAlertApproaching: 'Quando a taxa de garantia atingir 88%, os usuários receberão um lembrete por email e popup na página pessoal, informando que estão se aproximando da taxa de liquidação.',
    repaymentRules: 'Regras de Pagamento',
    fullRepaymentOnly: 'Apenas pagamento integral é permitido.',
    forcedLiquidation: 'Liquidação Forçada',
    forcedLiquidationDisbursement: 'Ao emitir empréstimo, primeiro congelar 2% do valor do empréstimo como seguro de liquidação, distribuir os 98% restantes de USDT para conta USDT.',
    forcedLiquidationRedemption: 'Apenas após o empréstimo ser totalmente pago, o sistema retornará automaticamente a garantia VGAU correspondente para conta VGAU e devolverá o seguro de liquidação original de 2% para conta USDT.',
    forcedLiquidationPlatformFee: 'Se liquidação forçada for acionada, 2% do seguro de liquidação se tornará taxa de liquidação da plataforma; se flutuações de mercado causarem valor dos ativos garantidos abaixo da dívida total, o mutuário deve completar a dívida restante imediatamente.',
    forcedLiquidationRemainingDebt: 'A plataforma suporta múltiplos pedidos de empréstimo, cada pedido tem precificação independente e controle de risco, não interferindo uns com os outros.',
    forcedLiquidationMultipleLoans: 'A plataforma suporta múltiplos pedidos de empréstimo, cada pedido tem precificação independente e controle de risco, não interferindo uns com os outros.',
    inviteDescription: 'Preencha o código de convite para ajudar seus amigos a completar a tarefa de convite',
    submit: 'Enviar',
    lastUpdated: 'Última Atualização: 31 de Agosto de 2025',
    serviceAgreementText: 'Este acordo (doravante referido como "Acordo") é estabelecido por você ("Usuário") e Verigold ("Plataforma") para esclarecer os termos e condições para o usuário usar os serviços relacionados na plataforma. Ao acessar ou usar qualquer serviço fornecido pela plataforma, você concorda em cumprir todos os termos deste acordo.',
    serviceContent: 'Conteúdo do Serviço',
    stakingReturnCalculation: '1. Stake VGAU: Usuários podem depositar tokens VGAU na plataforma e obter retorno USDT baseado no prazo de stake escolhido e rendimento anual (APY). Método de cálculo do retorno de stake é o seguinte:',
    fixedTermStakingReturn: '（1）Retorno de Stake Fixo = Valor do Stake × Taxa de Juros Anual × Dias de Stake / 365',
    flexibleStakingReturn: '（2）Retorno de Stake Flexível = Valor do Stake × Preço Atual VGAU × Taxa de Juros Anual × Dias de Stake / 365',
    lendingServices: '2. Serviços de Empréstimo: Usuários podem usar tokens VGAU como garantia para emprestar USDT. No processo de empréstimo, parâmetros como taxa de garantia, linha de margem adicional e linha de liquidação serão ajustados dinamicamente baseado em flutuações de preço de mercado.',
    redemptionServices: '3. Serviços de Resgate: Usuários podem resgatar ativos em stake ou emprestados através da função de resgate fornecida pela plataforma. Valor do resgate é calculado baseado na taxa de câmbio em tempo real e condições de stake.',
    exchangeServices: '4. Serviços de Troca: Usuários podem trocar USDT por tokens VGAU dentro da plataforma, ou trocar tokens VGAU por USDT.'
  },

  // 错误信息
  errors: {
    networkError: 'Erro de rede, verifique a conexão',
    serverError: 'Erro do servidor, tente novamente mais tarde',
    unauthorized: 'Faça login primeiro',
    forbidden: 'Permissões insuficientes',
    notFound: 'Recurso não encontrado',
    requestFailed: 'Falha na solicitação',
    invalidInput: 'Entrada inválida',
    fileTooLarge: 'Arquivo muito grande',
    fileTypeNotSupported: 'Tipo de arquivo não suportado'
  },

  // 成功信息
  success: {
    operationSuccess: 'Operação bem-sucedida',
    saveSuccess: 'Salvamento bem-sucedido',
    deleteSuccess: 'Exclusão bem-sucedida',
    copySuccess: 'Cópia bem-sucedida',
    uploadSuccess: 'Upload bem-sucedido'
  },

  // 表单验证
  validation: {
    required: 'Este campo é obrigatório',
    email: 'Digite um endereço de email válido',
    phone: 'Digite um número de telefone válido',
    password: 'A senha deve ter pelo menos 6 caracteres',
    confirmPassword: 'As senhas digitadas não coincidem',
    amount: 'Digite um valor válido',
    address: 'Digite um endereço válido'
  },

  // 組件特定鍵值
  components: {
    // Exchange
    exchange: {
      title: 'Troca',
      brandTitle: 'VGAU',
      brandSubtitle: 'Ouro Digital',
      brandDescription: 'Serviço de troca de ouro digital seguro, transparente e confiável',
      rateText: '1 VGAU = Preço atual do ouro',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Digite a quantidade de troca',
      requiredUSDT: 'USDT Necessário',
      exchanging: 'Trocando...',
      exchangeSuccess: 'Troca bem-sucedida',
      exchangeFailed: 'Troca falhou',
      confirmExchange: 'Confirmar Troca'
    },

    // IncreaseCollateral
    increaseCollateral: {
      title: 'Aumentar Valor da Garantia',
      increaseCollateralAmount: 'Aumentar Valor da Garantia',
      currentCollateral: 'Valor da Garantia (VGAU)',
      collateralAmount: 'Valor da Garantia (VGAU)',
      initialRatio: 'Taxa de Garantia Inicial',
      initialCollateralRatio: 'Taxa de Garantia Inicial',
      stakingRatio: 'Taxa de Stake',
      stakingRatioAfter: 'Taxa de Stake Após Aumento',
      stakingRatioAfterIncrease: 'Taxa de Stake Após Aumento',
      increaseAmount: 'Valor do Aumento',
      availableAssets: 'Ativos Disponíveis',
      max: 'Máximo',
      confirmOperation: 'Confirmar Operação',
      confirm: 'Confirmar',
      warning: 'Se a taxa de garantia não for 0% ou o pagamento integral não for concluído, seus ativos de garantia não podem ser resgatados.',
      collateralRatioWarning: 'Se a taxa de garantia não for 0% ou o pagamento integral não for concluído, seus ativos de garantia não podem ser resgatados.',
      instruction: 'Certifique-se de que todos os pagamentos foram concluídos e a taxa de garantia é 0%. O sistema retornará automaticamente seus ativos de garantia para o endereço da carteira vinculada.',
      collateralRatioInstruction: 'Certifique-se de que todos os pagamentos foram concluídos e a taxa de garantia é 0%. O sistema retornará automaticamente seus ativos de garantia para o endereço da carteira vinculada.',
      repaying: 'Você está pagando',
      repaymentAmount: 'Você está pagando',
      repaymentAmountValue: '77.74 USDT',
      afterRepayment: 'Após conclusão do pagamento',
      repaymentAfter: 'Após conclusão do pagamento',
      willReturn: 'Retornará',
      repaymentResult: 'Retornará',
      repaymentResultRedeem: '100 VGAU',
      andRefund: 'e reembolsar',
      repaymentResultRefund: '1.56 USDT',
      repaymentSuccess: 'Pagamento bem-sucedido',
      repaymentSuccessful: 'Pagamento bem-sucedido',
      willRedeem: 'Resgatará',
      successResult: 'Resgatará',
      successResultRedeem: '100 VGAU',
      successResultRefund: 'Reembolsar 1.56 USDT',
      collateralIncreased: 'Valor da garantia aumentado com sucesso',
      increaseSuccess: 'Você aumentou {amount}',
      newCollateralRatio: 'A taxa de stake após aumentar o valor da garantia é {ratio}',
      confirmButton: 'Confirmar'
    },

    // Redeem
    redeem: {
      title: 'Resgate',
      brandTitle: 'Verifood',
      brandSubtitle: '1g ouro = 1 token',
      brandDescription: 'Solução de digitalização de ouro físico baseada em blockchain',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% Rendimento Anual',
      currency1: 'VGAU',
      currency2: 'USDT',
      redeemAmountPlaceholder: 'Digite a quantidade a resgatar',
      requiredUSDT: 'USDT Necessário',
      usdtTitle: 'USDT para trocar',
      usdtAmountPlaceholder: 'Valor',
      confirmRedeem: 'Confirmar Resgate',
      successText: 'Troca bem-sucedida',
      completeText: 'Concluído',
      redeemAmount: 'Valor do Resgate',
      redeemTo: 'Resgatar para',
      boundWallet: 'Endereço da Carteira Vinculada',
      dailyLimit: 'Limite máximo diário de resgate',
      confirmRedeem: 'Confirmar Resgate',
      redeeming: 'Resgatando...',
      redeemSuccess: 'Resgate bem-sucedido',
      redeemFailed: 'Resgate falhou'
    },

    // MyFinance
    myFinance: {
      title: 'Minhas Finanças',
      redemptionNotice: 'Os ativos selecionados serão resgatados imediatamente para sua conta',
      asset: 'Ativo',
      maturityYield: 'Rendimento no Vencimento',
      startTime: 'Hora de Início',
      endTime: 'Hora de Fim',
      redeemable: 'Resgatável',
      staking: 'Em Stake',
      allLoaded: 'Tudo carregado',
      redeem: 'Resgatar',
      redeemFeature: 'Funcionalidade de resgate em breve',
      totalAssets: 'Total de Ativos',
      totalEarnings: 'Total de Ganhos',
      activeProducts: 'Produtos Ativos',
      noActiveProducts: 'Nenhum produto ativo',
      viewDetails: 'Ver Detalhes'
    },

    // ProductHelp
    productHelp: {
      title: 'Ajuda do Produto',
      helpContent: 'Conteúdo de ajuda em breve...',
      contactSupport: 'Contatar Suporte'
    },

    // ProductPurchase
    productPurchase: {
      productPurchase: 'Compra de Produto',
      productDetails: 'Detalhes do Produto',
      term: 'Prazo',
      apy: 'Rendimento Anual',
      minAmount: 'Valor Mínimo',
      maxAmount: 'Valor Máximo',
      riskLevel: 'Nível de Risco',
      amount: 'Valor',
      enterStakingAmount: 'Digite o valor',
      vgau: 'VGAU',
      max: 'Máximo',
      availableBalance: 'Disponível',
      balanceAmount: '0',
      transactionRules: 'Regras de Transação',
      productRules: 'Regras do Produto',
      purchaseTime: 'Hora da Compra',
      purchaseTimeValue: '2025-07-18 14:00',
      expirationTime: 'Hora de Expiração',
      expirationTimeValue: '2025-07-29 08:00',
      estimatedInterest: 'Juros Estimados (USDT)',
      estimatedInterestValue: '--',
      requiresManualRedemption: 'Requer resgate manual',
      requiresManualRedemptionValue: '--',
      rewards: '1. Recompensas',
      rewardsDailyChange: 'O rendimento anual do produto a prazo que você compra pode mudar diariamente.',
      rewardsStartCalculation: 'As recompensas começarão a ser calculadas no dia seguinte à compra às 00:00 (UTC), e não podem ser resgatadas durante o período de stake.',
      rewardsAfterStaking: 'Após o vencimento do período de stake, você precisa converter manualmente para stake flexível, e os rendimentos correspondentes serão distribuídos para a conta, e os rendimentos distribuídos podem ser sacados imediatamente.',
      settlementIncome: 'Rendimento de liquidação = Ativo de compra × Rendimento anual ÷ 365 × Prazo fixo (preciso para casas decimais)',
      subscriptionAndRedemption: '2. Compra e Resgate',
      subscriptionAndRedemptionDaily: 'Compra e resgate de produtos de rendimento fixo garantido estão abertos diariamente das 00:10 UTC às 23:50 UTC.',
      earlyRedemption: '3. Resgate Antecipado',
      earlyRedemptionMyFinance: 'Para o produto especificado, você pode resgatar ativos a qualquer momento em "Minhas Finanças".',
      earlyRedemptionLoseIncome: 'Se você resgatar antecipadamente, perderá todas as recompensas distribuídas para este produto.',
      earlyRedemptionBalanceCredit: 'O saldo total de ativos bloqueados para este produto, menos todas as recompensas que você recebeu durante este período, será creditado em sua conta à vista dentro de 72 horas.',
      earlyRedemptionMarketFluctuations: 'Em casos de flutuações extremas do mercado, atrasos de rede ou muitas solicitações de resgate, o resgate pode ser atrasado.',
      confirm: 'Confirmar',
      processing: 'Processando...',
      recordsFeature: 'Funcionalidade de registros em breve',
      amountOutOfRange: 'Valor fora do intervalo (100-10,000 VGAU)',
      selectProduct: 'Selecione um produto',
      orderCreateSuccess: 'Pedido de stake criado com sucesso!',
      orderCreateFailed: 'Falha ao criar pedido',
      productNotFound: 'Produto não encontrado',
      invalidAmount: 'Valor inválido',
      purchaseFeature: 'Funcionalidade de compra em breve',
      purchaseSuccess: 'Compra bem-sucedida',
      purchaseFailed: 'Compra falhou'
    },

    // InfoPage
    infoPage: {
      title: 'Informações',
      infoContent: 'Conteúdo de informações...',
      moreInfo: 'Mais Informações'
    },

    // NewLending
    newLending: {
      lending: 'Empréstimo',
      pledgedVGAUAssets: 'Ativos VGAU empenhados não receberão recompensas de proteção de capital',
      collateralQuantity: 'Quantidade de Garantia',
      enterCollateralAmount: 'Digite a quantidade de garantia',
      max: 'Máximo',
      availableAssets: 'Ativos Disponíveis',
      availableToBorrow: 'Valor Disponível para Empréstimo',
      lendingAmount: 'Valor do Empréstimo',
      borrowRange: 'Faixa de Empréstimo',
      enterBorrowAmount: 'Digite o valor do empréstimo',
      liquidationInsuranceFee: 'Taxa de Seguro de Liquidação',
      initialCollateralRatio: 'Taxa de Garantia Inicial',
      additionalMargin: 'Margem Adicional',
      forcedLiquidationCollateralRatio: 'Taxa de Garantia de Liquidação Forçada',
      annualInterestRate: 'Taxa de Juros Anual',
      netAnnualizedInterestRate: 'Taxa de Juros Anual Líquida',
      estimatedHourlyInterestRate: 'Taxa de Juros Horária Estimada',
      liquidationReferencePrice: 'Preço de Referência de Liquidação (VGAU/USDT)',
      confirmLending: 'Confirmar Empréstimo',
      pleaseEnterBorrowAmount: 'Digite um valor de empréstimo válido',
      lendingFeature: 'Funcionalidade de empréstimo em breve',
      loanAmount: 'Valor do Empréstimo',
      collateralAmount: 'Valor da Garantia',
      interestRate: 'Taxa de Juros',
      loanTerm: 'Prazo do Empréstimo',
      confirmLoan: 'Confirmar Empréstimo',
      applying: 'Aplicando...',
      loanSuccess: 'Aplicação de empréstimo bem-sucedida',
      loanFailed: 'Aplicação de empréstimo falhou'
    },

    // BorrowOrder
    borrowOrder: {
      title: 'Pedido de Empréstimo de Moedas',
      borrowOrder: 'Pedido de Empréstimo de Moedas',
      orderNumber: 'Número do Pedido',
      borrowedUSDTArrival: 'USDT emprestado chegará imediatamente aos fundos de empréstimo para saque USDT',
      totalLiabilities: 'Total de Passivos (USDT)',
      collateralAmount: 'Quantidade de Garantia (VGAU)',
      pledgeRatio: 'Taxa de Empenho',
      netAnnualizedInterestRate: 'Taxa de Juros Anual Líquida',
      liquidationReferencePrice: 'Preço de Referência de Liquidação (VGAU/USDT)',
      increaseCollateralAmount: 'Aumentar Valor da Garantia',
      adjustPledgeRatio: 'Ajustar Taxa de Empenho',
      allLoaded: 'Tudo carregado',
      recordsFeature: 'Funcionalidade de registros em breve',
      adjustPledgeRatioFeature: 'Funcionalidade de ajuste de taxa de empenho em breve',
      orderStatus: 'Status do Pedido',
      borrowAmount: 'Valor do Empréstimo',
      repayAmount: 'Valor do Pagamento',
      dueDate: 'Data de Vencimento',
      actions: 'Ações',
      repay: 'Pagar',
      extend: 'Estender'
    },

    // USDTWithdraw & VGAUWithdraw
    withdraw: {
      title: 'Saque',
      withdrawAmount: 'Valor do Saque',
      withdrawTo: 'Sacar para',
      boundWallet: 'Endereço da Carteira Vinculada',
      confirmWithdraw: 'Confirmar Saque',
      withdrawing: 'Sacando...',
      withdrawSuccess: 'Saque bem-sucedido',
      withdrawFailed: 'Saque falhou'
    },

    // Exchange
    exchange: {
      title: 'Troca',
      brandTitle: 'Verifood',
      brandSubtitle: '1g ouro = 1 token',
      brandDescription: 'Solução de digitalização de ouro físico baseada em blockchain',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% Rendimento Anual',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Digite a quantidade a trocar',
      requiredUSDT: 'USDT Necessário',
      confirmExchange: 'Confirmar Troca',
      exchangeFeature: 'Funcionalidade de troca em breve',
      from: 'De',
      to: 'Para',
      exchangeRate: 'Taxa de Câmbio',
      slippage: 'Deslizamento',
      exchanging: 'Trocando...',
      exchangeSuccess: 'Troca bem-sucedida',
      exchangeFailed: 'Troca falhou'
    },

    // Invitation
    invitation: {
      invitation: 'Convite',
      invitationRewards: '1,580 pontos',
      invitationRewardsLabel: 'Recompensas de Convite',
      numberOfInvitedPeople: '12 usuários',
      numberOfInvitedPeopleLabel: 'Número de Convidados',
      numberOfDirectPushPersonnel: '6 usuários',
      numberOfDirectPushPersonnelLabel: 'Número de Push Direto',
      invitationLink: 'Link de Convite',
      copyLink: 'Copiar Link',
      invitationRewardDetails: 'Detalhes das Recompensas de Convite',
      id: 'ID',
      walletAddr: 'Endereço da Carteira',
      type: 'Tipo',
      rewards: 'Recompensas (pontos)',
      allContentLoaded: 'Todo conteúdo carregado',
      ruleDetails: 'Detalhes das Regras',
      successfullyReferUserThroughKYC: 'Referiu com sucesso usuário através de KYC e obteve pontos:',
      directReferral: 'Referência Direta',
      indirectReferral: 'Referência Indireta',
      rewardsPerUser: '2 pontos/usuário',
      indirectRewardsPerUser: '0.2 pontos/usuário',
      linkCopied: 'Link de convite copiado!',
      invitationCode: 'Código de Convite',
      copyCode: 'Copiar Código',
      inviteFriends: 'Convidar Amigos',
      referralRewards: 'Recompensas de Referência',
      myInvitations: 'Meus Convites',
      bindSuccess: 'Código de convite enviado com sucesso!'
    },

    // PointsDetails
    pointsDetails: {
      pointsDetails: 'Detalhes dos Pontos',
      totalPoints: 'Total de Pontos',
      all: 'Todos',
      staking: 'Stake',
      invite: 'Convite',
      lending: 'Empréstimo',
      exchange: 'Troca',
      ecosystem: 'Ecossistema',
      stakingRewards: 'Recompensas de Stake',
      invitation: 'Convite',
      ecosystemParticipation: 'Participação no Ecossistema',
      lending: 'Empréstimo',
      exchangeVGT: 'Trocar VGT',
      allLoaded: 'Tudo carregado',
      earnedPoints: 'Pontos Ganhos',
      spentPoints: 'Pontos Gastos',
      pointsHistory: 'Histórico de Pontos',
      noHistory: 'Nenhum histórico de pontos'
    },

    // Exchange
    exchange: {
      title: 'Troca',
      brandTitle: 'Verifood',
      brandSubtitle: '1g ouro = 1 token',
      brandDescription: 'Solução de digitalização de ouro físico baseada em blockchain',
      rateText: '1 VGAU = 120 USDT',
      aprText: '15% Rendimento Anual',
      currency1: 'USDT',
      currency2: 'VGAU',
      exchangeAmountPlaceholder: 'Digite a quantidade a trocar',
      requiredUSDT: 'USDT Necessário',
      confirmExchange: 'Confirmar Troca',
      exchangeFeature: 'Funcionalidade de troca em breve'
    }
  },

  // Financial Products
  financialProducts: 'Produtos Financeiros',
  returnsAndRisks: 'Retornos e Riscos',
  returnSources: 'Fontes de Retorno',
  whatAreFinancialProducts: 'O que são Produtos Financeiros?',
  thisIsADigitalAssetAppreciationSchemeAnchoredToGold: 'Este é um esquema de valorização de ativos digitais ancorado ao ouro.',
  whenUsersPurchaseAndHoldVGAUTokens: 'Quando os usuários compram e mantêm tokens VGAU, eles representam depósitos de ouro físico equivalente, e o valor dos ativos flutua com as condições de mercado.',
  theyRepresentDepositsOfEquivalentPhysicalGold: 'Representam depósitos de ouro físico equivalente, e o valor dos ativos flutua com as condições de mercado.',
  andAssetValuesFluctuateWithMarketConditions: 'O valor dos ativos flutua com as condições de mercado.',
  inTheirAccounts: 'Em suas contas,',
  usersCanParticipateInDifferentTermAndRuleBasedYieldSchemesWithVGAU: 'os usuários podem usar VGAU para participar de esquemas de rendimento baseados em diferentes prazos e regras,',
  andTheSystemWillGenerateRewardsAccordingToTheRules: 'e o sistema gerará recompensas de acordo com as regras.',
  rewardsInTheAccountNeedToBeClaimedManually: 'As recompensas na conta precisam ser reivindicadas manualmente.',
  rewardsInFinancialProductsAccumulateInRealTimeToMeetDifferentAssetManagementNeeds: 'As recompensas nos produtos financeiros se acumulam em tempo real para atender às diferentes necessidades de gestão de ativos.',
  advantages: 'Vantagens',
  flexibleProductsAvailableForRedemption: 'Produtos flexíveis disponíveis para resgate a qualquer momento',
  usersCanSubscribeAndRedeemFlexibleProductsAtAnyTime: 'Os usuários podem se inscrever e resgatar produtos flexíveis a qualquer momento.',
  fixedTermProductsOfferHigherAPY: 'Produtos a prazo fixo oferecem maior rendimento anual',
  fixedTermProductsHaveFixedTermsButTheirAnnualizedYieldsAreTypicallyHigherThanFlexibleProducts: 'Produtos a prazo fixo têm prazos fixos, mas seus rendimentos anuais são tipicamente maiores que produtos flexíveis.',
  manualRedemptionOfInterestEarnings: 'Resgate manual de ganhos de juros',
  dailyUSDTEarningsWillAutomaticallyGoToTheWithdrawalBalanceWhichNeedsToBeManuallyWithdrawn: 'Os ganhos diários de USDT irão automaticamente para o saldo de saque que precisa ser sacado manualmente.',
  risks: 'Riscos',
  veryLowRisk: 'Risco muito baixo',
  digitalAssetPricesMayFluctuateIfThereAreTooManyRedemptionRequestsItMayLeadToTemporarilyInsufficientAvailableRedemptionBalanceResultingInDelayedRedemptionRestAssuredYourAssetsAreAlwaysSafeAndSecure: 'Os preços dos ativos digitais podem flutuar. Se houver muitas solicitações de resgate, pode levar a saldo de resgate disponível temporariamente insuficiente, resultando em resgate atrasado. Tenha certeza, seus ativos estão sempre seguros e protegidos.',
  eachOfYourTokensCorrespondsToPhysicalGoldHeldInOurAfricanMiningAreasAndAuditedByAuthoritativeInstitutions: 'Cada um de seus tokens (1 VGAU = 1g ouro físico) corresponde ao ouro físico mantido em nossas áreas de mineração africanas e auditado por instituições autorizadas.',
  theStableReturnsYouEarnThroughStakingComeFromTheProjectTeamsActiveManagementAndOperationOfTheUnderlyingGoldAssets: 'Os retornos estáveis que você ganha através do stake vêm da gestão ativa e operação dos ativos de ouro subjacentes pela equipe do projeto.',
  confirm: 'Confirmar',

  // InfoPage
  glossary: 'Glossário',
  repaymentRules: 'Regras de Pagamento',
  forcedLiquidationInsuranceFee: 'Taxa de Seguro de Liquidação Forçada',
  forcedLiquidationInsuranceFeeDescription: 'Ao emprestar, a plataforma calculará uma taxa de seguro de liquidação forçada de 2% do valor máximo emprestável. Esta taxa será deduzida do valor emprestável.',
  forcedLiquidationInsuranceFeeAfterRepayment: 'Após o mutuário pagar completamente o empréstimo, a plataforma retornará a taxa de seguro de liquidação forçada correspondente para sua conta de empréstimo USDT.',
  forcedLiquidationInsuranceFeeOnForcedLiquidation: 'Se ocorrer liquidação forçada de um pedido de empréstimo de criptomoeda, a plataforma cobrará esta taxa de seguro de liquidação forçada.',
  pledgeRateAnnotation: 'Anotação da Taxa de Empenho',
  currentPledgeRate: 'Taxa de Empenho Atual',
  pledgeRateDescription: 'Taxa de empenho, ou LTV (Loan-to-Value), representa a proporção entre ativos digitais emprestados e valor da garantia (calculado com base na garantia). O valor dos ativos é calculado com base em índices de preços de diferentes criptomoedas.',
  initialPledgeRate: 'Taxa de Empenho Inicial',
  initialPledgeRatePercentage: '78%',
  initialPledgeRateDescription: 'A taxa de empenho inicial é a proporção inicial entre o valor da garantia que você precisa fornecer e o valor do empréstimo.',
  marginCall: 'Margem Adicional',
  marginCallPercentage: '85%',
  marginCallDescription: 'A taxa de empenho de margem adicional é a linha de alerta quando o contrato de empréstimo se aproxima da taxa de empenho de liquidação forçada.',
  forcedLiquidationPledgeRate: 'Taxa de Empenho de Liquidação Forçada',
  forcedLiquidationPledgeRatePercentage: '91%',
  forcedLiquidationPledgeRateDescription: 'Se sua taxa de empenho atingir a taxa de empenho de liquidação forçada, o sistema executará imediatamente a liquidação forçada, usando seus ativos de garantia para pagar seu empréstimo do mercado monetário, e cobrará uma taxa de liquidação forçada de 2% sobre o valor do empréstimo.',
  netAnnualizedInterestRate: 'Taxa de Juros Anual Líquida',
  netAnnualizedInterestRateDescription: 'Os ativos de garantia continuarão a receber recompensas de juros anuais em tempo real, ajudando a compensar o custo do empréstimo de criptomoedas. Taxa de juros anual líquida = Taxa de juros anual - (Taxa de juros anual em tempo real da garantia / Taxa de empenho inicial)',
  annualInterestRate: 'Taxa de Juros Anual',
  annualInterestRateDescription: 'Os juros serão calculados usando juros compostos. Os juros se acumulam a partir do início bem-sucedido do empréstimo de criptomoedas, calculados a cada minuto. Se o prazo do empréstimo for menor que um minuto, também será calculado como um minuto.',
  collateralRequiredForLending: 'A garantia necessária para empréstimo vem da conta VGAU à vista. Uma vez convertida em garantia, esta parte não produzirá mais rendimentos à vista.',
  defaultInitialPledgeRate: 'A taxa de empenho inicial padrão é',
  defaultInitialPledgeRatePercentage: '78%',
  loanAmountDescription: '. Ao criar um pedido de empréstimo, a taxa de empenho pode ser ajustada de acordo com o valor do empréstimo.',
  forcedLiquidationInsuranceFeeOnForcedLiquidationDescription: 'Se a liquidação forçada for acionada, a taxa de seguro de liquidação forçada de 2% se tornará propriedade da plataforma como taxa de liquidação; se as flutuações extremas do mercado causarem o valor dos ativos de garantia abaixo da dívida total, o mutuário deve completar o valor restante devido imediatamente. A plataforma suporta múltiplos pedidos de empréstimo, cada pedido tem precificação independente e controle de risco, não interferindo uns com os outros.',
  repaymentUsingAccountBalance: 'Pagamento usando saldo da conta: A garantia não pode ser resgatada antes do pagamento integral. Os usuários podem adicionar mais VGAU para reduzir a taxa de empenho e evitar liquidação.',

  // USDTWithdraw
  usdtWithdraw: 'Saque USDT',
  selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days: 'Os ativos selecionados serão totalmente resgatados para sua carteira após T+1 dias.',
  totalRedemptionAmount: 'Valor Total de Resgate',
  minimum0: 'Mínimo 0',
  usdtMax: 'USDT |Máximo',
  availableBalance: 'Saldo Disponível',
  estimatedFee: 'Taxa Estimada',
  withdrawTo: 'Sacar para',
  boundWalletAddress: 'Endereço da Carteira Vinculada',
  dailyMaximumRedemptionLimit: 'Limite máximo diário de resgate: 5000000000 USDT',
  confirm: 'Confirmar',
  pleaseEnterWithdrawAmount: 'Digite o valor do saque',
  withdrawFeatureComingSoon: 'Funcionalidade de saque em breve',

  // VGAUWithdraw
  vgauWithdraw: 'Saque VGAU',
  vgauMax: 'VGAU |Máximo',
  dailyMaximumRedemptionLimitVGAU: 'Limite máximo diário de resgate: 5000000000 VGAU',

  // Language Names
  languageNames: {
    ar: 'اللغة العربية',
    en: 'English',
    fr: 'Français',
    zh: '繁體中文',
    pt: 'português'
  },

  // LanguageSwitcher
  switchedToPortuguese: 'Mudou para Português',
  switchedToEnglish: 'Mudou para Inglês'
}
// VGAU合约配置
export const CONTRACTS = {
  // BSC测试网配置
  BSC_TESTNET: {
    VGAU_TOKEN: {
      address: '0x2799cF234C62f9ACee0C0eE2A75A709F29Cc687e',
      name: 'VGAUToken'
    },
    VGAU_EXCHANGE: {
      address: '0x043f1cE5ebE0238606e24e1C4fC433334F8Ed938',
      name: 'VGAUExchange'
    },
    VGAU_PLATFORM_RECHARGE: {
      address: '0x222794B80425954A1EE94DB0241D8f2b5b368a81',
      name: 'VGAUPlatformRecharge'
    },
    VGAU_ACCESS_CONTROL: {
      address: '0x6D34076cEd015521Decc988cdfEe13C53DbCD510',
      name: 'VGAUAccessControl'
    },
    VGAU_USER_KYC_MANAGER: {
      address: '0x2b8A7b547a020dE614ea63Fd2978A0c9E2f17b43',
      name: 'VGAUUserKycManager'
    },
    BEP20_USDT: {
      address: '0xf6307065A593840680765889Fc16461bC7781231',
      name: 'BEP20USDT'
    }
  },
  
  // BSC主网配置
  BSC_MAINNET: {
    VGAU_TOKEN: {
      address: '0x1234567890abcdef1234567890abcdef12345678', // 替换为实际的VGAU代币合约地址
      name: 'VGAUToken'
    },
    VGAU_EXCHANGE: {
      address: '0xabcdef1234567890abcdef1234567890abcdef12', // 替换为实际的兑换合约地址
      name: 'VGAUExchange'
    },
    VGAU_PLATFORM_RECHARGE: {
      address: '0x7890abcdef1234567890abcdef1234567890abcd', // 替换为实际的平台充值合约地址
      name: 'VGAUPlatformRecharge'
    },
    VGAU_ACCESS_CONTROL: {
      address: '0x4567890abcdef1234567890abcdef1234567890ab', // 替换为实际的访问控制合约地址
      name: 'VGAUAccessControl'
    },
    VGAU_USER_KYC_MANAGER: {
      address: '0xdef1234567890abcdef1234567890abcdef12345', // 替换为实际的KYC管理合约地址
      name: 'VGAUUserKycManager'
    }
  }
}

// 网络配置
export const NETWORKS = {
  BSC_MAINNET: {
    chainId: 56,
    name: 'BSC Mainnet',
    rpcUrl: 'https://bsc-dataseed1.binance.org/',
    explorer: 'https://bscscan.com/',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    }
  },
  BSC_TESTNET: {
    chainId: 97,
    name: 'BSC Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    explorer: 'https://testnet.bscscan.com/',
    nativeCurrency: {
      name: 'tBNB',
      symbol: 'tBNB',
      decimals: 18
    }
  }
}

// 获取当前网络配置
export function getCurrentNetwork() {
  // 这里可以根据实际需求动态获取当前网络
  // 默认返回测试网配置
  return NETWORKS.BSC_TESTNET
}

// 获取合约配置
export function getContractConfig(contractName) {
  const currentNetwork = getCurrentNetwork()
  const networkKey = currentNetwork.chainId === 56 ? 'BSC_MAINNET' : 'BSC_TESTNET'
  return CONTRACTS[networkKey][contractName]
}

// 获取所有合约配置
export function getAllContracts() {
  const currentNetwork = getCurrentNetwork()
  const networkKey = currentNetwork.chainId === 56 ? 'BSC_MAINNET' : 'BSC_TESTNET'
  return CONTRACTS[networkKey]
} 
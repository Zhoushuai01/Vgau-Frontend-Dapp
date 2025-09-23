// VGAU合约配置
export const CONTRACTS = {
  // BSC测试网配置
  BSC_TESTNET: {
    VGAU_TOKEN: {
      address: '0x75579C9FB3A30e7c3CaBB5c74E4A6c0DB1e2054d',
      name: 'VGAUToken'
    },
    VGAU_EXCHANGE: {
      address: '0xbEe820f5ACA3a90f21af24a6573F69E3D3232609',
      name: 'VGAUExchange'
    },
    VGAU_PLATFORM_RECHARGE: {
      address: '0xFb015C1e853a66a7713e7C750C2fc4451405601b',
      name: 'VGAUPlatformRecharge'
    },
    VGAU_ACCESS_CONTROL: {
      address: '0x1b514B0eB5614E4D3d71c235aa733B23b21E0359',
      name: 'VGAUAccessControl'
    },
    VGAU_USER_KYC_MANAGER: {
      address: '0x4772F321A71e70060ceB5C1Ce924DAfA4Ad42B8E',
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

// 网络配置 - 只保留必要信息，RPC由用户钱包管理
export const NETWORKS = {
  BSC_MAINNET: {
    chainId: 56,
    name: 'BSC Mainnet',
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
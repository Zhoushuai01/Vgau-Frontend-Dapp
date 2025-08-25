// ABI 加载器
import VGAUTokenABI from '../vgau-contracts_bsc-testnet_20250820/abi/VGAUToken.sol/VGAUToken.json'
import VGAUExchangeABI from '../vgau-contracts_bsc-testnet_20250820/abi/VGAUExchange.sol/VGAUExchange.json'
import VGAUPlatformRechargeABI from '../vgau-contracts_bsc-testnet_20250820/abi/VGAUPlatformRecharge.sol/VGAUPlatformRecharge.json'
import VGAUAccessControlABI from '../vgau-contracts_bsc-testnet_20250820/abi/VGAUAccessControl.sol/VGAUAccessControl.json'
import VGAUUserKycManagerABI from '../vgau-contracts_bsc-testnet_20250820/abi/VGAUUserKycManager.sol/VGAUUserKycManager.json'

// ABI 映射表
const ABI_MAP = {
  'VGAUToken': VGAUTokenABI.abi,
  'VGAUExchange': VGAUExchangeABI.abi,
  'VGAUPlatformRecharge': VGAUPlatformRechargeABI.abi,
  'VGAUAccessControl': VGAUAccessControlABI.abi,
  'VGAUUserKycManager': VGAUUserKycManagerABI.abi,
  'BEP20USDT': [
    // 基本的 ERC20/BEP20 接口
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{"name": "", "type": "string"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{"name": "", "type": "string"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{"name": "", "type": "uint8"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{"name": "_owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "balance", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {"name": "_to", "type": "address"},
        {"name": "_value", "type": "uint256"}
      ],
      "name": "transfer",
      "outputs": [{"name": "", "type": "bool"}],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {"name": "_owner", "type": "address"},
        {"name": "_spender", "type": "address"}
      ],
      "name": "allowance",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {"name": "_spender", "type": "address"},
        {"name": "_value", "type": "uint256"}
      ],
      "name": "approve",
      "outputs": [{"name": "", "type": "bool"}],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {"name": "_from", "type": "address"},
        {"name": "_to", "type": "address"},
        {"name": "_value", "type": "uint256"}
      ],
      "name": "transferFrom",
      "outputs": [{"name": "", "type": "bool"}],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}

/**
 * 获取合约ABI
 * @param {string} contractName - 合约名称
 * @returns {Array|null} - 合约ABI数组，如果不存在则返回null
 */
export function getContractABI(contractName) {
  return ABI_MAP[contractName] || null
}

/**
 * 获取所有可用的合约名称
 * @returns {Array} - 合约名称数组
 */
export function getAvailableContracts() {
  return Object.keys(ABI_MAP)
}

/**
 * 检查合约ABI是否存在
 * @param {string} contractName - 合约名称
 * @returns {boolean} - 是否存在
 */
export function hasContractABI(contractName) {
  return ABI_MAP.hasOwnProperty(contractName)
}

export default {
  getContractABI,
  getAvailableContracts,
  hasContractABI
} 
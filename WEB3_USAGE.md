# Web3.js 集成使用说明

## 概述

本项目已成功集成 Web3.js，用于与区块链网络进行交互。主要功能包括：

- 钱包连接（支持 MetaMask）
- 合约交互
- 代币余额查询
- 交易发送
- 网络切换

## 文件结构

```
src/
├── utils/
│   ├── web3.js          # Web3 核心服务
│   └── vgauService.js   # VGAU 业务逻辑服务
├── config/
│   └── contracts.js     # 合约配置
└── pages/
    └── Home.vue         # 已集成 Web3 的首页
```

## 主要功能

### 1. Web3 服务 (web3.js)

#### 初始化
```javascript
import web3Service from '../utils/web3.js'

// 初始化 Web3
await web3Service.init()
```

#### 连接钱包
```javascript
const result = await web3Service.connectWallet()
if (result.success) {
  console.log('连接成功:', result.account)
}
```

#### 获取余额
```javascript
const balance = await web3Service.getBalance()
console.log('余额:', balance.eth, 'ETH')
```

#### 加载合约
```javascript
const contract = await web3Service.loadContract(
  contractAddress,
  abi,
  'ContractName'
)
```

#### 调用合约方法
```javascript
// 只读方法
const result = await web3Service.callContractMethod(
  'ContractName',
  'methodName',
  ...args
)

// 需要签名的方法
const transaction = await web3Service.sendTransaction(
  'ContractName',
  'methodName',
  options,
  ...args
)
```

### 2. VGAU 服务 (vgauService.js)

#### 初始化
```javascript
import vgauService from '../utils/vgauService.js'

await vgauService.init()
```

#### 获取 VGAU 信息
```javascript
const info = await vgauService.getVGAUInfo()
console.log('代币信息:', info)
```

#### 获取用户余额
```javascript
const balance = await vgauService.getVGAUBalance()
console.log('VGAU 余额:', balance.vgau)
```

#### 获取平台数据
```javascript
const stats = await vgauService.getPlatformStats()
console.log('平台数据:', stats)
```

#### 兑换操作
```javascript
// USDT 兑换 VGAU
const tx = await vgauService.exchangeUSDTToVGAU(100)

// VGAU 兑换 USDT
const tx = await vgauService.exchangeVGAUToUSDT(10)
```

### 3. 合约配置 (contracts.js)

#### 网络配置
```javascript
import { NETWORKS, getCurrentNetwork } from '../config/contracts.js'

const network = getCurrentNetwork()
console.log('当前网络:', network.name)
```

#### 合约配置
```javascript
import { getContractConfig } from '../config/contracts.js'

const vgauToken = getContractConfig('VGAU_TOKEN')
console.log('VGAU 代币合约:', vgauToken.address)
```

## 在 Vue 组件中使用

### 基本用法
```vue
<template>
  <view>
    <button @click="connectWallet">
      {{ walletConnected ? '已连接' : '连接钱包' }}
    </button>
    <text v-if="walletConnected">
      地址: {{ currentAccount }}
      余额: {{ accountBalance }} ETH
    </text>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import web3Service from '../utils/web3.js'
import vgauService from '../utils/vgauService.js'

const walletConnected = ref(false)
const currentAccount = ref('')
const accountBalance = ref('0')

const connectWallet = async () => {
  const result = await web3Service.connectWallet()
  if (result.success) {
    walletConnected.value = true
    currentAccount.value = result.account
    
    const balance = await web3Service.getBalance()
    accountBalance.value = balance.eth
  }
}

onMounted(async () => {
  await vgauService.init()
})
</script>
```

## 配置说明

### 1. 合约地址配置

在 `src/config/contracts.js` 中配置实际的合约地址：

```javascript
export const CONTRACTS = {
  BSC_TESTNET: {
    VGAU_TOKEN: {
      address: '0x实际的合约地址',
      name: 'VGAUToken'
    },
    // ... 其他合约
  }
}
```

### 2. ABI 配置

在 `src/utils/vgauService.js` 中的 `getContractABI` 方法中导入实际的 ABI：

```javascript
async getContractABI(contractName) {
  // 导入实际的 ABI 文件
  if (contractName === 'VGAUToken') {
    return VGAUTokenABI.abi
  }
  // ... 其他合约
}
```

### 3. 网络配置

支持的网络：
- BSC 主网 (Chain ID: 56)
- BSC 测试网 (Chain ID: 97)

## 错误处理

所有 Web3 操作都包含错误处理：

```javascript
try {
  const result = await web3Service.connectWallet()
  // 处理成功情况
} catch (error) {
  console.error('操作失败:', error)
  // 显示错误信息给用户
}
```

## 注意事项

1. **MetaMask 要求**: 用户需要安装 MetaMask 钱包
2. **网络支持**: 确保用户连接到支持的网络（BSC 主网或测试网）
3. **Gas 费用**: 交易需要支付 Gas 费用
4. **错误处理**: 所有区块链操作都应该有适当的错误处理
5. **用户体验**: 长时间操作应该显示加载状态

## 开发建议

1. **测试环境**: 开发时使用 BSC 测试网
2. **错误日志**: 保留详细的错误日志用于调试
3. **用户反馈**: 为用户提供清晰的操作反馈
4. **安全性**: 验证所有用户输入和合约调用

## 更新日志

- 2024-01-XX: 初始集成 Web3.js
- 添加钱包连接功能
- 添加合约交互功能
- 添加 VGAU 业务逻辑 
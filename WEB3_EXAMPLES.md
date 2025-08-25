# Web3.js 使用示例

## 快速开始

### 1. 基本设置

```javascript
// 在 Vue 组件中导入 Web3 服务
import web3Service from '../utils/web3.js'
import vgauService from '../utils/vgauService.js'

// 初始化服务
onMounted(async () => {
  await vgauService.init()
})
```

### 2. 钱包连接

```javascript
const connectWallet = async () => {
  try {
    const result = await web3Service.connectWallet()
    
    if (result.success) {
      console.log('钱包连接成功:', result.account)
      // 更新UI状态
      walletConnected.value = true
      currentAccount.value = result.account
    } else {
      console.error('连接失败:', result.error)
    }
  } catch (error) {
    console.error('连接错误:', error)
  }
}
```

### 3. 获取余额

```javascript
// 获取 BNB 余额
const getBNBBalance = async () => {
  try {
    const balance = await web3Service.getBalance()
    console.log('BNB 余额:', balance.eth)
    return balance.eth
  } catch (error) {
    console.error('获取余额失败:', error)
  }
}

// 获取 VGAU 余额
const getVGAUBalance = async () => {
  try {
    const balance = await vgauService.getVGAUBalance()
    console.log('VGAU 余额:', balance.vgau)
    return balance.vgau
  } catch (error) {
    console.error('获取 VGAU 余额失败:', error)
  }
}
```

### 4. 获取平台数据

```javascript
const getPlatformData = async () => {
  try {
    const stats = await vgauService.getPlatformStats()
    console.log('平台数据:', stats)
    
    // 更新UI
    tvlData.value = stats.tvl
    vgauPrice.value = stats.price
    aprData.value = stats.apr
  } catch (error) {
    console.error('获取平台数据失败:', error)
  }
}
```

### 5. 代币兑换

```javascript
// USDT 兑换 VGAU
const exchangeUSDTToVGAU = async (amount) => {
  try {
    uni.showLoading({ title: '交易中...' })
    
    const transaction = await vgauService.exchangeUSDTToVGAU(amount)
    
    console.log('交易成功:', transaction)
    uni.showToast({
      title: '兑换成功',
      icon: 'success'
    })
  } catch (error) {
    console.error('兑换失败:', error)
    uni.showToast({
      title: '兑换失败',
      icon: 'error'
    })
  } finally {
    uni.hideLoading()
  }
}

// VGAU 兑换 USDT
const exchangeVGAUToUSDT = async (amount) => {
  try {
    uni.showLoading({ title: '交易中...' })
    
    const transaction = await vgauService.exchangeVGAUToUSDT(amount)
    
    console.log('交易成功:', transaction)
    uni.showToast({
      title: '兑换成功',
      icon: 'success'
    })
  } catch (error) {
    console.error('兑换失败:', error)
    uni.showToast({
      title: '兑换失败',
      icon: 'error'
    })
  } finally {
    uni.hideLoading()
  }
}
```

## 完整组件示例

```vue
<template>
  <view class="web3-demo">
    <!-- 钱包状态 -->
    <view class="wallet-status">
      <text class="status-text">
        {{ walletConnected ? '已连接' : '未连接' }}
      </text>
      <text v-if="walletConnected" class="account-text">
        {{ currentAccount }}
      </text>
    </view>

    <!-- 余额显示 -->
    <view v-if="walletConnected" class="balance-section">
      <view class="balance-item">
        <text class="label">BNB 余额:</text>
        <text class="value">{{ bnbBalance }} BNB</text>
      </view>
      <view class="balance-item">
        <text class="label">VGAU 余额:</text>
        <text class="value">{{ vgauBalance }} VGAU</text>
      </view>
    </view>

    <!-- 平台数据 -->
    <view class="platform-data">
      <view class="data-item">
        <text class="label">TVL:</text>
        <text class="value">{{ tvlData }} USDT</text>
      </view>
      <view class="data-item">
        <text class="label">VGAU 价格:</text>
        <text class="value">{{ vgauPrice }} USDT</text>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="actions">
      <button 
        @click="connectWallet" 
        :disabled="walletConnected"
        class="btn primary"
      >
        {{ walletConnected ? '已连接' : '连接钱包' }}
      </button>
      
      <button 
        @click="refreshData" 
        :disabled="!walletConnected"
        class="btn secondary"
      >
        刷新数据
      </button>
    </view>

    <!-- 兑换功能 -->
    <view v-if="walletConnected" class="exchange-section">
      <input 
        v-model="exchangeAmount" 
        placeholder="输入兑换金额"
        class="exchange-input"
      />
      <view class="exchange-buttons">
        <button @click="exchangeUSDTToVGAU" class="btn exchange">
          USDT → VGAU
        </button>
        <button @click="exchangeVGAUToUSDT" class="btn exchange">
          VGAU → USDT
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import web3Service from '../utils/web3.js'
import vgauService from '../utils/vgauService.js'

// 响应式数据
const walletConnected = ref(false)
const currentAccount = ref('')
const bnbBalance = ref('0')
const vgauBalance = ref('0')
const tvlData = ref('0')
const vgauPrice = ref('0')
const exchangeAmount = ref('')

// 连接钱包
const connectWallet = async () => {
  try {
    const result = await web3Service.connectWallet()
    
    if (result.success) {
      walletConnected.value = true
      currentAccount.value = result.account
      
      // 获取初始数据
      await refreshData()
    }
  } catch (error) {
    console.error('连接失败:', error)
  }
}

// 刷新数据
const refreshData = async () => {
  try {
    // 获取余额
    const bnbResult = await web3Service.getBalance()
    if (bnbResult) {
      bnbBalance.value = parseFloat(bnbResult.eth).toFixed(4)
    }
    
    const vgauResult = await vgauService.getVGAUBalance()
    if (vgauResult) {
      vgauBalance.value = parseFloat(vgauResult.vgau).toFixed(4)
    }
    
    // 获取平台数据
    const stats = await vgauService.getPlatformStats()
    if (stats) {
      tvlData.value = parseFloat(stats.tvl).toLocaleString()
      vgauPrice.value = parseFloat(stats.price).toFixed(4)
    }
  } catch (error) {
    console.error('刷新数据失败:', error)
  }
}

// 兑换功能
const exchangeUSDTToVGAU = async () => {
  if (!exchangeAmount.value) {
    uni.showToast({ title: '请输入金额', icon: 'none' })
    return
  }
  
  try {
    await vgauService.exchangeUSDTToVGAU(parseFloat(exchangeAmount.value))
    uni.showToast({ title: '兑换成功', icon: 'success' })
    await refreshData()
  } catch (error) {
    uni.showToast({ title: '兑换失败', icon: 'error' })
  }
}

const exchangeVGAUToUSDT = async () => {
  if (!exchangeAmount.value) {
    uni.showToast({ title: '请输入金额', icon: 'none' })
    return
  }
  
  try {
    await vgauService.exchangeVGAUToUSDT(parseFloat(exchangeAmount.value))
    uni.showToast({ title: '兑换成功', icon: 'success' })
    await refreshData()
  } catch (error) {
    uni.showToast({ title: '兑换失败', icon: 'error' })
  }
}

// 初始化
onMounted(async () => {
  await vgauService.init()
})
</script>

<style lang="scss" scoped>
.web3-demo {
  padding: 20rpx;
  background: #0A0A0A;
  min-height: 100vh;
}

.wallet-status {
  text-align: center;
  margin-bottom: 32rpx;
}

.status-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.account-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8rpx;
  display: block;
}

.balance-section,
.platform-data {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
}

.balance-item,
.data-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 28rpx;
}

.value {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.btn {
  flex: 1;
  padding: 20rpx;
  border-radius: 12rpx;
  border: none;
  font-size: 28rpx;
  font-weight: 500;
}

.btn.primary {
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  color: #000000;
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.exchange-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  padding: 24rpx;
}

.exchange-input {
  width: 100%;
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 12rpx;
  color: #FFFFFF;
  font-size: 28rpx;
  margin-bottom: 16rpx;
}

.exchange-buttons {
  display: flex;
  gap: 16rpx;
}

.btn.exchange {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
}
</style>
```

## 错误处理最佳实践

```javascript
// 统一的错误处理函数
const handleWeb3Error = (error, operation) => {
  console.error(`${operation} 失败:`, error)
  
  let message = '操作失败'
  
  if (error.code === 4001) {
    message = '用户拒绝了操作'
  } else if (error.code === -32603) {
    message = '网络错误，请检查网络连接'
  } else if (error.message.includes('insufficient funds')) {
    message = '余额不足'
  } else if (error.message.includes('user rejected')) {
    message = '用户取消了操作'
  }
  
  uni.showToast({
    title: message,
    icon: 'error',
    duration: 3000
  })
}

// 使用示例
const safeConnectWallet = async () => {
  try {
    const result = await web3Service.connectWallet()
    // 处理成功情况
  } catch (error) {
    handleWeb3Error(error, '连接钱包')
  }
}
```

## 网络切换处理

```javascript
// 监听网络变化
const handleNetworkChange = async (chainId) => {
  console.log('网络变化:', chainId)
  
  // 检查是否支持的网络
  const supported = await web3Service.checkNetwork([56, 97])
  
  if (!supported.isSupported) {
    uni.showModal({
      title: '网络不支持',
      content: '请切换到 BSC 主网或测试网',
      showCancel: false
    })
  }
}

// 切换网络
const switchToBSC = async () => {
  try {
    await web3Service.switchNetwork(97) // BSC 测试网
    console.log('网络切换成功')
  } catch (error) {
    console.error('网络切换失败:', error)
  }
}
```

## 性能优化建议

1. **缓存合约实例**: 避免重复创建合约实例
2. **批量查询**: 使用 Promise.all 并行查询多个数据
3. **错误重试**: 对网络错误实现重试机制
4. **数据缓存**: 缓存不经常变化的数据（如合约地址）

```javascript
// 批量查询示例
const loadAllData = async () => {
  try {
    const [balance, vgauBalance, stats] = await Promise.all([
      web3Service.getBalance(),
      vgauService.getVGAUBalance(),
      vgauService.getPlatformStats()
    ])
    
    // 更新所有数据
    updateUI({ balance, vgauBalance, stats })
  } catch (error) {
    console.error('批量查询失败:', error)
  }
}
``` 
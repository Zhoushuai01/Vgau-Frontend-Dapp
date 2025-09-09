<template>
  <view class="wallet-test">
    <view class="header">
      <text class="title">钱包连接测试</text>
    </view>
    
    <view class="content">
      <!-- 连接状态 -->
      <view class="status-section">
        <text class="section-title">连接状态</text>
        <view class="status-item">
          <text class="label">钱包连接:</text>
          <text class="value" :class="{ connected: isConnected, disconnected: !isConnected }">
            {{ isConnected ? '已连接' : '未连接' }}
          </text>
        </view>
        <view class="status-item">
          <text class="label">钱包地址:</text>
          <text class="value">{{ walletAddress || '无' }}</text>
        </view>
      </view>
      
      <!-- 操作按钮 -->
      <view class="actions-section">
        <text class="section-title">操作</text>
        <view class="button-group">
          <button class="btn primary" @click="handleConnect" :disabled="isConnected">
            连接钱包
          </button>
          <button class="btn danger" @click="handleDisconnect" :disabled="!isConnected">
            断开连接
          </button>
          <button class="btn secondary" @click="checkStatus">
            检查状态
          </button>
        </view>
      </view>
      
      <!-- 日志区域 -->
      <view class="log-section">
        <text class="section-title">操作日志</text>
        <view class="log-content">
          <text v-for="(log, index) in logs" :key="index" class="log-item">
            {{ log }}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  connectWallet, 
  disconnectWallet, 
  isWalletDisconnected,
  checkWalletConnection 
} from '@/utils/walletService.js'

// 响应式数据
const isConnected = ref(false)
const walletAddress = ref('')
const logs = ref([])

// 添加日志
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.unshift(`[${timestamp}] ${message}`)
  if (logs.value.length > 20) {
    logs.value.pop()
  }
}

// 连接钱包
const handleConnect = async () => {
  try {
    addLog('开始连接钱包...')
    
    const result = await connectWallet()
    
    if (result) {
      isConnected.value = true
      walletAddress.value = result
      addLog(`钱包连接成功: ${result}`)
      
      uni.showToast({
        title: '连接成功',
        icon: 'success'
      })
    } else {
      addLog('钱包连接失败')
      uni.showToast({
        title: '连接失败',
        icon: 'error'
      })
    }
  } catch (error) {
    addLog(`连接错误: ${error.message}`)
    uni.showToast({
      title: '连接错误',
      icon: 'error'
    })
  }
}

// 断开连接
const handleDisconnect = async () => {
  try {
    addLog('开始断开连接...')
    
    const result = await disconnectWallet()
    
    if (result.success) {
      isConnected.value = false
      walletAddress.value = ''
      addLog('钱包断开连接成功')
      
      uni.showToast({
        title: '断开成功',
        icon: 'success'
      })
    } else {
      addLog(`断开连接失败: ${result.message}`)
      uni.showToast({
        title: '断开失败',
        icon: 'error'
      })
    }
  } catch (error) {
    addLog(`断开连接错误: ${error.message}`)
    uni.showToast({
      title: '断开错误',
      icon: 'error'
    })
  }
}

// 检查状态
const checkStatus = async () => {
  try {
    addLog('检查钱包状态...')
    
    // 检查是否断开连接
    const isDisconnected = isWalletDisconnected()
    addLog(`断开连接状态: ${isDisconnected}`)
    
    // 检查钱包连接
    const address = await checkWalletConnection()
    addLog(`钱包地址: ${address || '无'}`)
    
    // 更新状态
    isConnected.value = !isDisconnected && !!address
    walletAddress.value = address || ''
    
    addLog(`最终连接状态: ${isConnected.value ? '已连接' : '未连接'}`)
  } catch (error) {
    addLog(`检查状态错误: ${error.message}`)
  }
}

// 页面加载时检查状态
onMounted(() => {
  addLog('页面加载完成，检查初始状态...')
  checkStatus()
})
</script>

<style lang="scss" scoped>
.wallet-test {
  min-height: 100vh;
  background-color: #0A0A0A;
  color: #FFFFFF;
  padding: 32rpx;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
}

.title {
  font-size: 36rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.status-section,
.actions-section,
.log-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  padding: 32rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 24rpx;
  display: block;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

.value {
  font-size: 24rpx;
  color: #FFFFFF;
}

.value.connected {
  color: #4CAF50;
}

.value.disconnected {
  color: #FF6B6B;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.btn {
  height: 80rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.primary {
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  color: #000000;
}

.btn.danger {
  background: #FF6B6B;
  color: #FFFFFF;
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #FFFFFF;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.log-content {
  max-height: 400rpx;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8rpx;
  padding: 16rpx;
}

.log-item {
  display: block;
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8rpx;
  font-family: monospace;
  line-height: 1.4;
}
</style>
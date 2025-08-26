<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="nav-bar">
        <view class="back-button" @click="goBack">
          <image class="back-icon" src="/static/back.png" mode="aspectFit" />
        </view>
                 <view class="page-title">
           <text class="title-text">Transaction Detail</text>
         </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
                    <!-- 交易信息卡片 -->
        <view class="transaction-card">
          <view class="transaction-header">
            <view class="left-section">
                             <view class="type-row">
                 <text class="transaction-type">{{ transactionData.type }}</text>
                 <text class="status-text" :class="{ done: transactionData.status === 'Done' }">{{ transactionData.status }}</text>
               </view>
              <view class="amount-row">
                <text class="transaction-amount" :class="transactionData.amountClass">{{ transactionData.amount }}</text>
                                 <text class="order-number">Order {{ transactionData.orderNumber }}</text>
              </view>
            </view>
          </view>

                 <!-- 交易详情列表 -->
         <view class="detail-list">
                       <view class="detail-item">
              <text class="detail-label">Transaction Time</text>
              <text class="detail-value">{{ transactionData.date }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Serial Number</text>
              <text class="detail-value">{{ transactionData.serialNumber }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Order ID</text>
              <text class="detail-value">{{ transactionData.orderId }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Record Number</text>
              <text class="detail-value">{{ transactionData.recordNumber }}</text>
            </view>
         </view>
      </view>

      <!-- 钱包信息 -->
      <view class="wallet-info">
                           <view class="info-item">
            <text class="info-label">Wallet Address</text>
            <view class="info-value-container">
              <text class="info-value">{{ transactionData.walletAddress }}</text>
              <view class="copy-icon" @click="copyAddress">
                <image src="/static/fuzhi.png" mode="aspectFit" class="copy-image" />
              </view>
            </view>
          </view>
          <view class="info-item">
            <text class="info-label">Transaction Hash</text>
            <view class="info-value-container">
              <text class="info-value">{{ transactionData.transactionHash || '--' }}</text>
              <view class="copy-icon" @click="copyHash">
                <image src="/static/fuzhi.png" mode="aspectFit" class="copy-image" />
              </view>
            </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 交易详情数据
const transactionData = ref({
  type: 'Withdraw',
  amount: '-5,000 VGAU',
  amountClass: 'negative',
  status: 'Ongoing',
  date: '2024-01-15 14:30',
  orderNumber: 'L-202503-0133',
  serialNumber: 'TX202401150001',
  orderId: 'ORD202401150001',
  recordNumber: '842,255',
  walletAddress: '0x7eCfbF2D6DEa2371ea8f237c056B024dA4Bc87af',
  transactionHash: '--'
})

// 页面加载时获取传递的数据
onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  
  if (options.transaction) {
    try {
      const transaction = JSON.parse(decodeURIComponent(options.transaction))
      transactionData.value = {
        type: transaction.type || 'Withdraw',
        amount: transaction.amount || '-5,000 VGAU',
        amountClass: transaction.amountClass || 'negative',
        status: transaction.status || 'Ongoing',
        date: transaction.date || '2024-01-15 14:30',
        orderNumber: transaction.orderNumber || 'L-202503-0133',
        serialNumber: transaction.serialNumber || 'TX202401150001',
        orderId: transaction.orderId || 'ORD202401150001',
        recordNumber: transaction.recordNumber || '842,255',
        walletAddress: transaction.walletAddress || '0x7eCfbF2D6DEa2371ea8f237c056B024dA4Bc87af',
        transactionHash: transaction.transactionHash || '--'
      }
    } catch (error) {
      console.log('解析交易数据失败，使用默认数据')
    }
  }
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 复制地址
const copyAddress = () => {
  const address = transactionData.value.walletAddress
  uni.setClipboardData({
    data: address,
    success: () => {
      uni.showToast({
        title: 'Address Copied',
        icon: 'success',
        duration: 1000
      })
    }
  })
}

// 复制哈希
const copyHash = () => {
  const hash = transactionData.value.transactionHash
  if (hash && hash !== '--' && hash !== '') {
    uni.setClipboardData({
      data: hash,
      success: () => {
        uni.showToast({
          title: 'Hash Copied',
          icon: 'success',
          duration: 1000
        })
      }
    })
  } else {
    uni.showToast({
      title: 'No Transaction Hash',
      icon: 'none',
      duration: 1000
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #0A0A0A;
}

.nav-bar {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 48rpx;
  padding-top: var(--status-bar-height, 0px);
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.title-text {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32rpx;
  padding-top: 120rpx;
}

.type-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.status-text.done {
  color: rgba(255, 255, 255, 0.5);
}

/* 交易信息卡片 */
.transaction-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
}

.transaction-header {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.left-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.transaction-type {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.amount-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-amount {
  font-size: 32rpx;
  font-weight: 400;
}

.transaction-amount.negative {
  color: #FF5D5D;
}

.transaction-amount.positive {
  color: #00CC66;
}

.order-number {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 交易详情列表 */
.detail-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.detail-value {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 钱包信息 */
.wallet-info {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.info-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.info-value-container {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.info-value {
  flex: 1;
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  word-break: break-all;
}

.copy-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  cursor: pointer;
}

.copy-image {
  width: 40rpx;
  height: 40rpx;
}
</style> 
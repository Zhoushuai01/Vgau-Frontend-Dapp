<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="nav-bar">
        <view class="back-button" @click="goBack">
          <image class="back-icon" src="/static/back.png" mode="aspectFit" />
        </view>
                 <view class="page-title">
           <text class="title-text">{{ t('transactionDetail.title') }}</text>
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
                 <text class="status-text" :class="{ done: isSuccessStatus(transactionData.status) }">{{ getStatusText(transactionData.status) }}</text>
               </view>
              <view class="amount-row">
                <text class="transaction-amount" :class="transactionData.amountClass">{{ transactionData.amount }}</text>
              </view>
            </view>
          </view>

                 <!-- 交易详情列表 -->
         <view class="detail-list">
                       <view class="detail-item">
              <text class="detail-label">{{ t('transactionDetail.transactionTime') }}</text>
              <text class="detail-value">{{ formatDateTime(transactionData.createdAt || transactionData.rawData?.createTime || transactionData.rawData?.updateTime) }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ t('transactionDetail.orderId') }}</text>
              <text class="detail-value order-id">{{ transactionData.orderId }}</text>
            </view>
         </view>
      </view>

      <!-- 钱包信息 -->
      <view class="wallet-info">
                           <view class="info-item">
            <text class="info-label">{{ t('transactionDetail.walletAddress') }}</text>
            <view class="info-value-container">
              <text class="info-value">{{ formatShortAddress(transactionData.fromAddress || transactionData.rawData?.targetWalletAddress) }}</text>
              <view class="copy-icon" @click="copyAddress">
                <image src="/static/fuzhi.png" mode="aspectFit" class="copy-image" />
              </view>
            </view>
          </view>
          <view class="info-item">
            <text class="info-label">{{ t('transactionDetail.transactionHash') }}</text>
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
import { useI18n } from 'vue-i18n'
import { formatShortAddress } from '@/utils/addressUtils'

const { t } = useI18n()

// 交易详情数据
const transactionData = ref({
  type: t('transactionDetail.defaultType'),
  amount: '-5,000 VGAU',
  amountClass: 'negative',
  status: t('transactionDetail.defaultStatus'),
  createdAt: '',
  orderId: 'ORD202401150001',
  fromAddress: '0x7eCfbF2D6DEa2371ea8f237c056B024dA4Bc87af',
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
      transactionData.value = { ...transactionData.value, ...transaction }
    } catch (error) {
      console.error('解析交易数据失败:', error)
    }
  }
})

// 格式化日期时间
const formatDateTime = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
      console.warn('Invalid date string:', dateString)
      return dateString // 返回原始字符串
    }
    
    // 格式化为中文日期时间，显示到秒
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // 使用24小时制
    })
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString // 返回原始字符串
  }
}

// 获取状态文本
const getStatusText = (status) => {
  if (!status) return ''
  
  const statusMap = {
    'PENDING': t('transactionDetail.status.pending'),
    'PROCESSING': t('transactionDetail.status.processing'),
    'SUCCESS': t('transactionDetail.status.success'),
    'COMPLETED': t('transactionDetail.status.completed'),
    'FAILED': t('transactionDetail.status.failed'),
    'CANCELLED': t('transactionDetail.status.cancelled'),
    'TIMEOUT': t('transactionDetail.status.timeout'),
    'SUBMITTED': t('transactionDetail.status.processing'),
    'Done': t('transactionDetail.status.done'),
    'Ongoing': t('transactionDetail.status.ongoing')
  }
  
  // 如果状态已经翻译过（包含中文字符），直接返回
  if (/[\u4e00-\u9fa5]/.test(status)) {
    return status
  }
  
  return statusMap[status] || status
}

// 判断是否为成功状态
const isSuccessStatus = (status) => {
  const successStatuses = ['SUCCESS', 'COMPLETED', 'Done', '已完成', '成功']
  return successStatuses.includes(status)
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 复制钱包地址
const copyAddress = () => {
  const address = transactionData.value.fromAddress || transactionData.value.rawData?.targetWalletAddress
  if (address) {
    uni.setClipboardData({
      data: address,
      success: () => {
        uni.showToast({
          title: t('transactionDetail.addressCopied'),
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
}

// 复制交易哈希
const copyHash = () => {
  if (transactionData.value.transactionHash && transactionData.value.transactionHash !== '--') {
    uni.setClipboardData({
      data: transactionData.value.transactionHash,
      success: () => {
        uni.showToast({
          title: t('transactionDetail.hashCopied'),
          icon: 'success',
          duration: 2000
        })
      }
    })
  } else {
    uni.showToast({
      title: t('transactionDetail.noHashToCopy'),
      icon: 'none',
      duration: 2000
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

.detail-value.order-id {
  font-size: 28rpx;
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
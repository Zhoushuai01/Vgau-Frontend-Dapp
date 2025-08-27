<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('history.borrowingDetail.title') }}</text>
      </view>
    </view>

    <!-- 借贷状态指示器 -->
    <view class="status-indicator">
      <view class="status-left">
        <text class="status-text" :class="{ 'completed': orderStatus === 'completed' }">{{ orderStatus === 'completed' ? t('history.borrowingDetail.completedStatus') : t('history.borrowingDetail.borrowingStatus') }}</text>
      </view>
      <view class="order-id">
        <text class="order-text">{{ t('history.borrowingDetail.orderId') }}</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 借贷概览信息 -->
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.collatRate') }}</text>
        <text class="detail-value">80%</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.collateralVGAU') }}</text>
        <text class="detail-value">1,700</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.netAPR') }}</text>
        <text class="detail-value">84.2255</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.liqPrice') }}</text>
        <text class="detail-value">84.2255</text>
      </view>

      <!-- 交易历史列表 -->
      <view class="transaction-list">
        <view class="transaction-item" v-for="(transaction, index) in transactions" :key="index">
          <view class="transaction-left">
            <text class="transaction-action">{{ transaction.action }}</text>
            <text class="transaction-date">{{ transaction.date }}</text>
          </view>
          <view class="transaction-right">
            <text class="transaction-amount" :class="transaction.amountClass">
              {{ transaction.amount }}
            </text>
          </view>
        </view>
      </view>

      <!-- 底部提示 -->
      <view class="footer-hint">
        <text class="hint-text">{{ t('history.borrowingDetail.noMoreData') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 订单状态 - 根据路由参数或页面来源动态设置
const orderStatus = ref('borrowing') // 默认为 'borrowing'

// 在页面加载时检查来源并设置状态
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  
  // 从页面参数获取状态，或者根据其他条件判断
  if (options.status) {
    orderStatus.value = options.status
  } else if (options.type === 'completed' || options.completed === 'true') {
    orderStatus.value = 'completed'
  }
})



// 交易数据
const transactions = ref([
  {
    action: t('history.borrowingDetail.addCollat'),
    date: '2025-01-15 14:32',
    amount: '-500 VGAU',
    amountClass: 'negative'
  },
  {
    action: t('history.borrowingDetail.addCollat'),
    date: '2025-01-15 14:32',
    amount: '-500 VGAU',
    amountClass: 'negative'
  },
  {
    action: t('history.borrowingDetail.addCollat'),
    date: '2025-01-15 14:32',
    amount: '-200 VGAU',
    amountClass: 'negative'
  },
  {
    action: t('history.borrowingDetail.borrow'),
    date: '2025-01-15 14:32',
    amount: '+500 USDT',
    amountClass: 'positive'
  },
  {
    action: t('history.borrowingDetail.collateral'),
    date: '2025-01-15 14:32',
    amount: '-500 VGAU',
    amountClass: 'negative'
  }
])

// 返回上一页
const goBack = () => {
  uni.navigateBack()
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
  display: flex;
  align-items: center;
  height: 88rpx;
  padding-left: 32rpx;
  padding-right: 32rpx;
  background-color: #0A0A0A;
  border-bottom: 1rpx solid #1A1A1A;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  margin-right: 24rpx;
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
  font-weight: 600;
}

.order-id {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.order-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 借贷状态指示器 */
.status-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  padding-top: 120rpx;
}

.status-left {
  display: flex;
  align-items: center;
}

.status-text {
  font-size: 32rpx;
  color: #FF6B6B;
  font-weight: 500;
}

.status-text.completed {
  color: #00CC66;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32rpx;
}



.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8rpx;
  padding: 16rpx 0;
}

.detail-item:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.detail-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 交易历史列表 */
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
}

.transaction-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.transaction-action {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.transaction-date {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.transaction-right {
  display: flex;
  align-items: center;
}

.transaction-amount {
  font-size: 32rpx;
  font-weight: 600;
}

.transaction-amount.positive {
  color: #00CC66;
}

.transaction-amount.negative {
  color: #FF6B6B;
}

/* 底部提示 */
.footer-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 32rpx 0;
}

.hint-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}
</style> 
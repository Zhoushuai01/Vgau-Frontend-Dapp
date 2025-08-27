<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ $t('stakingDetail.title') }}</text>
      </view>
    </view>

    <!-- 顶部概览卡片 -->
    <view class="summary-card">
      <view class="summary-top">
        <text class="days">{{ daysLabel }}{{ $t('stakingDetail.days') }}</text>
        <text class="status-text single">{{ currentStatusLabel }}</text>
      </view>
      <view class="summary-mid">
        <text class="apy">APY {{ apy }}%</text>
        <text class="order">{{ $t('stakingDetail.order') }} {{ orderId }}</text>
      </view>
      <view class="summary-bottom">
        <view class="row">
          <text class="label">{{ $t('stakingDetail.startTime') }}</text>
          <text class="value">{{ startDate }}</text>
        </view>
        <view class="row">
          <text class="label">{{ $t('stakingDetail.endTime') }}</text>
          <text class="value">{{ endDate }}</text>
        </view>
      </view>
    </view>

    <!-- 记录列表 -->
    <view class="list">
      <view class="list-item" v-for="(item, idx) in filteredRecords" :key="idx">
        <view class="left">
          <text class="action" :class="{ redeem: item.type === 'redeem', stake: item.type === 'stake' }">{{ item.action }}</text>
          <text class="sub">{{ item.time }}\n{{ item.subId }}</text>
        </view>
        <view class="right">
          <text class="duration">{{ item.duration }}</text>
          <text class="amount" :class="item.amountClass">{{ item.amount }}</text>
        </view>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="footer-hint">
      <text class="hint-text">{{ $t('stakingDetail.noMoreData') }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const daysLabel = ref('10')
const apy = ref('5')
const orderId = ref('L-202503-013')
const startDate = ref('2025-07-15')
const endDate = ref('2025-07-25')
// 页面来源状态：staking | toClaim | completed
const activeStatus = ref('staking')

// 本地化的当前状态标签
const currentStatusLabel = computed(() => {
  if (activeStatus.value === 'staking') return t('stakingDetail.staking')
  if (activeStatus.value === 'toClaim') return t('stakingDetail.toClaim')
  return t('stakingDetail.completed')
})

// 所有记录数据
const allRecords = ref([
  { type: 'redeem', action: t('stakingDetail.actions.redeem'), time: '2025-01-15 14:32', subId: '訂單 L-202503-0133', duration: '10天', amount: '+500 USDT', amountClass: 'positive', status: 'staking' },
  { type: 'redeem', action: t('stakingDetail.actions.redeem'), time: '2025-01-15 14:32', subId: '訂單 L-202503-0133', duration: '10天', amount: '+500 VGAU', amountClass: 'positive', status: 'staking' },
  { type: 'stake', action: t('stakingDetail.actions.stake'), time: '2025-01-15 14:32', subId: '訂單 L-202503-0133', duration: '10天', amount: '+500 VGAU', amountClass: 'negative', status: 'staking' },
  { type: 'stake', action: t('stakingDetail.actions.stake'), time: '2025-01-16 10:15', subId: '訂單 L-202503-0134', duration: '15天', amount: '+300 VGAU', amountClass: 'negative', status: 'toClaim' },
  { type: 'redeem', action: t('stakingDetail.actions.redeem'), time: '2025-01-17 16:20', subId: '訂單 L-202503-0135', duration: '20天', amount: '+800 USDT', amountClass: 'positive', status: 'toClaim' }
])

// 根据当前状态过滤记录（保持原有按状态过滤）
const filteredRecords = computed(() => {
  return allRecords.value.filter(item => item.status === activeStatus.value)
})

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage?.options || {}

  if (options.days) daysLabel.value = options.days
  if (options.apy) apy.value = options.apy
  if (options.orderId) orderId.value = options.orderId
  if (options.start) startDate.value = options.start
  if (options.end) endDate.value = options.end
  if (options.status) activeStatus.value = options.status
})

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

/* 顶部概览卡片 */
.summary-card {
  margin: 120rpx 24rpx 24rpx;
  background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  border: 1rpx solid rgba(255, 255, 255, 0.12);
  border-radius: 16rpx;
  overflow: hidden;
}

.summary-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx;
}

.days {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.status-text {
  font-size: 26rpx;
  color: rgba(255,255,255,0.8);
  font-weight: 500;
}
.status-text.single {
  color: #FFFFFF;
}

.summary-mid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24rpx 16rpx;
}

.apy {
  font-size: 28rpx;
  color: #FFFFFF;
}

.order {
  font-size: 24rpx;
  color: rgba(255,255,255,0.8);
}

.summary-bottom {
  border-top: 1rpx solid rgba(255,255,255,0.08);
  padding: 16rpx 24rpx;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8rpx 0;
}

.label {
  font-size: 26rpx;
  color: rgba(255,255,255,0.7);
}

.value {
  font-size: 26rpx;
  color: #FFFFFF;
}

/* 列表 */
.list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding: 0 24rpx;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.action {
  font-size: 28rpx;
  color: #FFFFFF;
}
.action.redeem { color: #FFFFFF; }
.action.stake { color: #FFFFFF; }

.sub {
  font-size: 22rpx;
  color: rgba(255,255,255,0.5);
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}

.duration {
  font-size: 24rpx;
  color: rgba(255,255,255,0.7);
}

.amount {
  font-size: 28rpx;
  font-weight: 600;
}
.amount.positive { color: #00CC66; }
.amount.negative { color: #FF6B6B; }

/* 底部提示 */
.footer-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24rpx;
  padding: 24rpx 0 48rpx;
}

.hint-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}
</style>
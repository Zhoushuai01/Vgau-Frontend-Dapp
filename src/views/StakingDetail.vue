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
import i18n from '@/i18n/i18n.js'

const { t } = useI18n()

const daysLabel = ref('')
const apy = ref('')
const orderId = ref('')
const startDate = ref('')
const endDate = ref('')
// 页面来源状态：staking | toClaim | completed
const activeStatus = ref('staking')

// 本地化的当前状态标签
const currentStatusLabel = computed(() => {
  const statusMap = {
    'staking': t('stakingDetail.staking'),
    'toClaim': t('stakingDetail.toClaim'),
    'completed': t('stakingDetail.completed'),
    'active': t('stakingDetail.active'),
    'pending': t('stakingDetail.pending'),
    'cancelled': t('stakingDetail.cancelled'),
    'redeemed': t('stakingDetail.redeemed'),
    'ongoing': t('stakingDetail.ongoing'),
    // 添加大写状态支持
    'STAKING': t('stakingDetail.staking'),
    'TO_CLAIM': t('stakingDetail.toClaim'),
    'COMPLETED': t('stakingDetail.completed'),
    'ACTIVE': t('stakingDetail.active'),
    'PENDING': t('stakingDetail.pending'),
    'CANCELLED': t('stakingDetail.cancelled'),
    'REDEEMED': t('stakingDetail.redeemed'),
    'ONGOING': t('stakingDetail.ongoing')
  }
  
  const translatedStatus = statusMap[activeStatus.value]
  if (translatedStatus) {
    return translatedStatus
  }
  
  // 如果状态不在映射表中，尝试转换为小写再查找
  const lowerStatus = activeStatus.value?.toLowerCase()
  const lowerTranslatedStatus = statusMap[lowerStatus]
  if (lowerTranslatedStatus) {
    return lowerTranslatedStatus
  }
  
  // 最后回退到显示原始状态
  console.warn('未找到状态翻译:', activeStatus.value)
  return activeStatus.value
})

// 所有记录数据
const allRecords = ref([])

// 根据当前状态过滤记录（保持原有按状态过滤）
const filteredRecords = computed(() => {
  return allRecords.value.filter(item => item.status === activeStatus.value)
})

onMounted(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage?.options || {}

  console.log('🔍 质押详情页面参数:', options)

  // 处理天数 - 优先使用lockDays
  if (options.lockDays) {
    daysLabel.value = options.lockDays
    console.log('✅ 使用lockDays:', options.lockDays)
  } else if (options.days) {
    daysLabel.value = options.days
    console.log('✅ 使用days:', options.days)
  } else {
    console.warn('⚠️ 没有找到天数字段')
  }

  // 处理APY - 优先使用annualRate，后端返回的annualRate已经是百分数形式
  if (options.annualRate) {
    const annualRateValue = parseFloat(options.annualRate)
    // annualRate后端返回的是百分数形式（如100.00），直接使用
    apy.value = isNaN(annualRateValue) ? '0' : annualRateValue.toFixed(2)
    console.log('✅ 使用annualRate:', options.annualRate, '转换后:', apy.value + '%')
  } else if (options.apy) {
    const apyValue = parseFloat(options.apy)
    // apy可能已经是百分数形式，需要判断
    if (apyValue > 1) {
      // 如果大于1，说明已经是百分数形式，直接使用
      apy.value = isNaN(apyValue) ? '0' : apyValue.toFixed(2)
    } else {
      // 如果小于等于1，说明是小数形式，需要转换为百分数
      apy.value = isNaN(apyValue) ? '0' : (apyValue * 100).toFixed(2)
    }
    console.log('✅ 使用apy:', options.apy, '转换后:', apy.value + '%')
  } else {
    console.warn('⚠️ 没有找到APY字段')
  }

  // 处理订单ID
  if (options.orderId) {
    orderId.value = options.orderId
    console.log('✅ 订单ID:', options.orderId)
  } else {
    console.warn('⚠️ 没有找到订单ID')
  }

  // 处理开始时间 - 优先使用createTime，精确到秒
  if (options.createTime) {
    startDate.value = formatTimeToSecond(options.createTime)
    console.log('✅ 使用createTime:', options.createTime, '转换后:', startDate.value)
  } else if (options.start) {
    startDate.value = formatTimeToSecond(options.start)
    console.log('✅ 使用start:', options.start, '转换后:', startDate.value)
  } else {
    console.warn('⚠️ 没有找到开始时间字段')
  }

  // 处理结束时间 - 优先使用endTime，精确到秒
  if (options.endTime) {
    endDate.value = formatTimeToSecond(options.endTime)
    console.log('✅ 使用endTime:', options.endTime, '转换后:', endDate.value)
  } else if (options.end) {
    endDate.value = formatTimeToSecond(options.end)
    console.log('✅ 使用end:', options.end, '转换后:', endDate.value)
  } else {
    console.warn('⚠️ 没有找到结束时间字段')
  }

  // 处理状态
  if (options.status) {
    activeStatus.value = options.status
    console.log('✅ 状态:', options.status, '翻译后:', currentStatusLabel.value)
  } else if (options.completed === 'true') {
    activeStatus.value = 'completed'
    console.log('✅ 完成状态:', options.completed, '翻译后:', currentStatusLabel.value)
  } else {
    console.warn('⚠️ 没有找到状态字段')
  }

  console.log('✅ 质押详情数据初始化完成:', {
    days: daysLabel.value,
    apy: apy.value,
    orderId: orderId.value,
    startDate: startDate.value,
    endDate: endDate.value,
    status: activeStatus.value,
    translatedStatus: currentStatusLabel.value,
    currentLocale: i18n.global.locale.value
  })
})

// 格式化时间到秒
const formatTimeToSecond = (timeString) => {
  if (!timeString) return ''
  
  try {
    const date = new Date(timeString)
    if (isNaN(date.getTime())) return timeString
    
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('时间格式化错误:', error)
    return timeString
  }
}

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
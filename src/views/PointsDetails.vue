<template>
  <view class="points-details-container">
    <!-- 页面标题和返回按钮 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <view class="back-icon">
          <image src="/static/back.png" class="back-arrow" />
        </view>
      </view>
      <text class="title-text">{{ t('components.pointsDetails.pointsDetails') }}</text>
    </view>

    <!-- 总积分卡片 -->
    <view class="total-points-card">
      <view class="points-info">
        <text class="points-label">{{ t('components.pointsDetails.totalPoints') }}</text>
        <text class="points-value">123.156</text>
      </view>
    </view>

    <!-- 筛选标签 -->
    <scroll-view class="filter-tabs" scroll-x="true" show-scrollbar="false" enhanced="true">
      <view class="tabs-container">
        <view class="tab-item" :class="{ active: activeTab === 'all' }" @click="setActiveTab('all')">
          <text class="tab-text">{{ t('components.pointsDetails.all') }}</text>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'staking' }" @click="setActiveTab('staking')">
          <text class="tab-text">{{ t('components.pointsDetails.staking') }}</text>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'invite' }" @click="setActiveTab('invite')">
          <text class="tab-text">{{ t('components.pointsDetails.invite') }}</text>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'lending' }" @click="setActiveTab('lending')">
          <text class="tab-text">{{ t('components.pointsDetails.lending') }}</text>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'exchange' }" @click="setActiveTab('exchange')">
          <text class="tab-text">{{ t('components.pointsDetails.exchange') }}</text>
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'ecosystem' }" @click="setActiveTab('ecosystem')">
          <text class="tab-text">{{ t('components.pointsDetails.ecosystem') }}</text>
        </view> 
      </view>
    </scroll-view>

    <!-- 积分明细列表 -->
    <view class="points-list">
      <view class="points-item" v-for="(item, index) in filteredPointsList" :key="index">
        <view class="item-content">
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-time">{{ item.time }}</text>
          </view>
          <text class="item-points">{{ item.points }}</text>
        </view>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="bottom-tip">
      <text class="tip-text">{{ t('components.pointsDetails.allLoaded') }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 当前激活的标签
const activeTab = ref('all')

// 积分明细数据
const pointsList = ref([
  {
    title: t('components.pointsDetails.stakingRewards'),
    time: '2025-07-01 10:30',
    points: '1.3',
    type: 'staking'
  },
  {
    title: t('components.pointsDetails.invitation'),
    time: '2025-07-01 10:30',
    points: '0.5',
    type: 'invite'
  },
  {
    title: t('components.pointsDetails.ecosystemParticipation'),
    time: '2025-07-01 10:30',
    points: '0.3',
    type: 'ecosystem'
  },
  {
    title: t('components.pointsDetails.lending'),
    time: '2025-07-01 10:30',
    points: '2',
    type: 'lending'
  },
  {
    title: t('components.pointsDetails.exchangeVGT'),
    time: '2025-07-01 10:30',
    points: '3.6',
    type: 'exchange'
  }
])

// 计算属性：根据筛选条件过滤积分明细
const filteredPointsList = computed(() => {
  if (activeTab.value === 'all') {
    return pointsList.value
  }
  return pointsList.value.filter(item => item.type === activeTab.value)
})

// 设置活动标签
const setActiveTab = (tab) => {
  activeTab.value = tab
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style scoped>
/* 防止页面滑动 */
page {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}              
.points-details-container {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

/* 页面头部 */
.page-header {
  padding: 48rpx 32rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #0A0A0A;
}

.title-text {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 400;
  line-height: 1.56;
  flex: 1;
  text-align: center;
}

/* 总积分卡片 */
.total-points-card {
  margin: 140rpx 32rpx 0;
  padding: 26rpx 46rpx;
  background-color: #1A1A1A;
  border-radius: 16rpx;
  position: relative;
  height: 232rpx;
  display: flex;
  align-items: center;
}

.points-info {
  display: flex;
  flex-direction: column;
  gap: 13rpx;
}

.points-label {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 2;
}

.points-value {
  color: #FFFFFF;
  font-size: 64rpx;
  font-weight: 400;
  line-height: 0.625;
}

/* 筛选标签 */
.filter-tabs {
  padding: 20rpx 40rpx;
  margin-top: 20rpx;
  width: 100%;
}

.tabs-container {
  display: flex;
  gap: 24rpx;
  white-space: nowrap;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: 1400rpx;
  padding-right: 40rpx;
}

.tab-item {
  padding: 16rpx 32rpx;
  background-color: #2A2A2A;
  border-radius: 16rpx;
  min-width: 150rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tab-item.active {
  background: linear-gradient(90deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
}

.tab-text {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
}

.tab-item.active .tab-text {
  color: #000000;
}

/* All标签特殊宽度 */
.tab-item:first-child {
  min-width: 80rpx;
}

/* 积分明细列表 */
.points-list {
  flex: 1;
  padding: 40rpx 40rpx 0;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.points-item {
  background-color: #1E1E1E;
  border-radius: 16rpx;
  padding: 32rpx;
  height: 160rpx;
  display: flex;
  align-items: center;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.item-title {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.item-time {
  color: #9CA3AF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

.item-points {
  color: #FFFFFF;
  font-size: 40rpx;
  font-weight: 400;
  line-height: 1.4;
}

/* 底部提示 */
.bottom-tip {
  display: flex;
  justify-content: center;
  padding: 34rpx 0;
}

.tip-text {
  color: rgba(156, 163, 175, 0.6);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

/* 返回按钮 */
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  width: 40rpx;
  height: 40rpx;
}
</style> 
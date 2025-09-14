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
        <text class="points-value">{{ totalPoints }}</text>
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
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text class="loading-text">{{ t('common.loading') || '加载中...' }}</text>
      </view>
      
      <!-- 积分明细项 -->
      <view v-else class="points-item" v-for="(item, index) in filteredPointsList" :key="index">
        <view class="item-content">
          <view class="item-info">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-time">{{ item.time }}</text>
          </view>
          <text class="item-points">{{ item.points }}</text>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="!loading && filteredPointsList.length === 0" class="empty-container">
        <text class="empty-text">{{ t('common.noData') || '暂无数据' }}</text>
      </view>
    </view>

    <!-- 底部提示 -->
    <view class="bottom-tip">
      <text class="tip-text">{{ t('components.pointsDetails.allLoaded') }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { pointsAPI } from '@/api/apiService.js'

const { t } = useI18n()

// 当前激活的标签
const activeTab = ref('all')

// 加载状态
const loading = ref(false)

// 总积分
const totalPoints = ref('0.000')

// 积分明细数据
const pointsList = ref([])

// 标签类型映射
const tabTypeMapping = {
  'staking': 'staking',    // 质押
  'invite': 'invite',      // 邀请
  'lending': 'lending',    // 借贷
  'exchange': 'exchange',  // 兑换
  'ecosystem': 'ecosystem' // 生态
}

// 根据业务类型获取前端分类
const getTypeFromBusinessType = (businessType) => {
  const typeMapping = {
    'STAKE_CREATE': 'staking',        // 质押
    'USER_INVITE_BIND': 'invite',     // 邀请
    'LOAN_REPAY': 'lending',          // 借贷
    'EXCHANGE': 'exchange',           // 兑换
    'ECOSYSTEM': 'ecosystem'          // 生态
  }
  return typeMapping[businessType] || 'other'
}

// 格式化时间，精确到秒
const formatTime = (timeString) => {
  if (!timeString) return ''
  
  try {
    const date = new Date(timeString)
    if (isNaN(date.getTime())) return timeString
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  } catch (error) {
    console.error('时间格式化错误:', error)
    return timeString
  }
}

// 计算属性：根据筛选条件过滤积分明细
const filteredPointsList = computed(() => {
  // 如果当前是"全部"标签，返回所有数据
  if (activeTab.value === 'all') {
    return pointsList.value
  }
  // 对于分类标签，使用客户端过滤
  return pointsList.value.filter(item => item.type === activeTab.value)
})

// 获取积分详情数据
const fetchPointsDetails = async () => {
  try {
    loading.value = true
    console.log('🔍 开始获取积分详情...')
    
    const response = await pointsAPI.getMy()
    console.log('📊 积分详情响应:', response)
    
    if (response && response.data) {
      // 更新总积分
      totalPoints.value = response.data.currentPoints || '0.000'
      
      // 更新积分明细列表 - 根据API文档，数据在 data.records 中
      if (response.data.records && Array.isArray(response.data.records)) {
        pointsList.value = response.data.records.map(item => ({
          title: item.reason || item.operationDescription || '积分操作',
          time: formatTime(item.createdAt || item.time || ''),
          points: (item.signedPointsChange > 0 ? '+' : '') + item.pointsAmount,
          type: getTypeFromBusinessType(item.businessType) || 'other'
        }))
        console.log('📊 处理后的积分记录:', pointsList.value)
      } else if (response.data.pointsList && Array.isArray(response.data.pointsList)) {
        // 兼容旧的数据结构
        pointsList.value = response.data.pointsList.map(item => ({
          title: item.title || item.description || '积分操作',
          time: formatTime(item.time || item.createdAt || ''),
          points: item.points || item.amount || '0',
          type: item.type || 'other'
        }))
      }
    }
    
    console.log('✅ 积分详情获取成功:', {
      totalPoints: totalPoints.value,
      pointsCount: pointsList.value.length
    })
    
  } catch (error) {
    console.error('❌ 获取积分详情失败:', error)
    
    // 显示错误提示
    uni.showToast({
      title: t('common.loadFailed') || '加载失败',
      icon: 'none',
      duration: 2000
    })
    
    // 使用空数据作为降级处理
    pointsList.value = []
  } finally {
    loading.value = false
  }
}

// 获取积分记录数据
const fetchPointsRecords = async () => {
  try {
    loading.value = true
    console.log('🔍 开始获取积分记录...')
    
    const response = await pointsAPI.getMyRecords()
    console.log('📊 积分记录响应:', response)
    
    if (response && response.data) {
      // 更新积分明细列表 - 根据API文档，数据在 data.records 中
      if (response.data.records && Array.isArray(response.data.records)) {
        pointsList.value = response.data.records.map(item => ({
          title: item.reason || item.operationDescription || '积分操作',
          time: formatTime(item.createdAt || item.time || ''),
          points: (item.signedPointsChange > 0 ? '+' : '') + item.pointsAmount,
          type: getTypeFromBusinessType(item.businessType) || 'other'
        }))
        console.log('📊 处理后的积分记录:', pointsList.value)
      } else if (response.data.pointsList && Array.isArray(response.data.pointsList)) {
        // 兼容旧的数据结构
        pointsList.value = response.data.pointsList.map(item => ({
          title: item.title || item.description || '积分操作',
          time: formatTime(item.time || item.createdAt || ''),
          points: item.points || item.amount || '0',
          type: item.type || 'other'
        }))
      }
    }
    
    console.log('✅ 积分记录获取成功:', {
      pointsCount: pointsList.value.length
    })
    
    // 如果没有数据，记录日志
    if (pointsList.value.length === 0) {
      console.log('📝 没有积分记录数据')
    }
    
  } catch (error) {
    console.error('❌ 获取积分记录失败:', error)
    
    // 显示错误提示
    uni.showToast({
      title: t('common.loadFailed') || '加载失败',
      icon: 'none',
      duration: 2000
    })
    
    // 添加测试数据作为降级处理
    pointsList.value = [
      {
        title: '测试数据',
        time: new Date().toISOString(),
        points: '+1.000',
        type: 'other'
      }
    ]
  } finally {
    loading.value = false
  }
}


// 设置活动标签
const setActiveTab = (tab) => {
  // 如果点击的是当前已激活的标签，不需要重新加载
  if (activeTab.value === tab) {
    console.log('🔄 点击了当前已激活的标签，跳过重新加载')
    return
  }
  
  console.log('🔄 切换标签:', activeTab.value, '->', tab)
  activeTab.value = tab
  
  // 标签切换时不需要重新加载数据，使用客户端过滤
  console.log('📋 使用客户端过滤，当前数据量:', pointsList.value.length)
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 页面加载时获取数据
onMounted(async () => {
  // 先获取积分详情（包含总积分）
  await fetchPointsDetails()
  // 然后获取积分记录（包含全部数据）
  await fetchPointsRecords()
})
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

/* 加载状态 */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80rpx 0;
}

.loading-text {
  color: #9CA3AF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

/* 空状态 */
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80rpx 0;
}

.empty-text {
  color: #9CA3AF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
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
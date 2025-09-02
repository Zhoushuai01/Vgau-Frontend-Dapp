<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('components.myFinance.title') }}</text>
      </view>
      <view class="history-button" @click="viewHistory">
        <image class="history-icon" src="/static/history.png" mode="aspectFit" />
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 赎回说明 -->
      <view class="redemption-notice">
        <text class="notice-text">{{ t('components.myFinance.redemptionNotice') }}</text>
      </view>
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 质押订单列表 -->
      <view v-else-if="stakeOrders.length > 0">
        <view 
          v-for="(order, index) in stakeOrders" 
          :key="index" 
          class="asset-card"
        >
          <view class="asset-info">
            <view class="info-row">
              <text class="info-label">{{ t('components.myFinance.asset') }}</text>
              <text class="info-value">{{ order.totalStakeAmount || '0' }} VGAU</text>
            </view>
            <view class="info-row">
              <text class="info-label">{{ t('components.myFinance.maturityYield') }}</text>
              <text class="info-value">{{ order.totalInterestEarned || '0' }} USDT</text>
            </view>
            <view class="info-row">
              <text class="info-label">{{ t('components.myFinance.startTime') }}</text>
              <text class="info-value">{{ formatTime(order.firstStakeTime) }}</text>
            </view>
            <view class="info-row">
              <text class="info-label">{{ t('components.myFinance.endTime') }}</text>
              <text class="info-value">{{ formatTime(order.lastStakeTime) }}</text>
            </view>

          </view>
          <view 
            class="status-button" 
            :class="getStatusClass(order)"
            @click="getOrderStatus(order) === 'redeemable' ? handleRedeem(order) : null"
          >
            <text class="status-text">{{ getStatusText(order) }}</text>
          </view>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-else class="empty-state">
        <text class="empty-text">暂无质押订单</text>
      </view>

      <!-- 底部状态 -->
      <view class="loading-status">
        <text class="loading-text">{{ t('components.myFinance.allLoaded') }}</text>
      </view>
    </view>


  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { stakeAPI } from '@/api/apiService.js'

const { t } = useI18n()

// 响应式数据
const stakeOrders = ref([])
const loading = ref(false)

// 获取质押订单列表
const fetchStakeOrders = async () => {
  loading.value = true
  try {
    const response = await stakeAPI.getOrders()
    console.log('质押订单列表:', response)
    
    // 如果接口没有数据，使用测试数据
    let ordersData = []
    if (response && response.data) {
      ordersData = response.data
    } else {
      // 测试数据 - 包含已到期和未到期的订单
      ordersData = [
        {
          id: 1,
          firstStakeTime: '2025-01-15T10:30:00Z',
          lastStakeTime: '2025-02-15T10:30:00Z',
          totalStakeAmount: '100',
          totalInterestEarned: '5.5',
          status: 'staking'
        },
        {
          id: 2,
          firstStakeTime: '2025-01-20T14:20:00Z',
          lastStakeTime: '2024-12-20T14:20:00Z', // 已过期的订单
          totalStakeAmount: '200',
          totalInterestEarned: '12.0',
          status: 'staking'
        }
      ]
    }
    
    // 处理每个订单的字段映射
    stakeOrders.value = ordersData.map(order => {
      console.log('处理订单:', order)
      const mappedOrder = {
        ...order,
        // 确保字段映射正确
        firstStakeTime: order.firstStakeTime || order.startTime || '',
        lastStakeTime: order.lastStakeTime || order.endTime || '',
        totalStakeAmount: order.totalStakeAmount || order.stakeAmount || '0',
        totalInterestEarned: order.totalInterestEarned || order.interestEarned || '0'
      }
      console.log('映射后的订单:', mappedOrder)
      return mappedOrder
    })
    console.log('最终订单列表:', stakeOrders.value)
  } catch (error) {
    console.error('获取质押订单失败:', error)
    uni.showToast({
      title: '获取数据失败',
      icon: 'none',
      duration: 2000
    })
  } finally {
    loading.value = false
  }
}

// 格式化时间
const formatTime = (timeStr) => {
  if (!timeStr) {
    return '暂无'
  }
  try {
    const date = new Date(timeStr)
    if (isNaN(date.getTime())) {
      return timeStr
    }
    return date.toLocaleDateString('zh-CN')
  } catch (error) {
    console.error('时间格式化错误:', error)
    return timeStr || '暂无'
  }
}

// 检查订单是否到期
const isOrderExpired = (lastStakeTime) => {
  if (!lastStakeTime) return false
  try {
    const endDate = new Date(lastStakeTime)
    const now = new Date()
    return endDate <= now
  } catch (error) {
    console.error('检查订单到期时间错误:', error)
    return false
  }
}

// 获取订单实际状态
const getOrderStatus = (order) => {
  // 如果订单已到期，状态为可赎回
  if (isOrderExpired(order.lastStakeTime)) {
    return 'redeemable'
  }
  // 否则使用原始状态
  return order.status || 'staking'
}

// 获取状态样式类
const getStatusClass = (order) => {
  const status = getOrderStatus(order)
  switch (status) {
    case 'redeemable':
      return 'redeemable-btn'
    case 'staking':
      return 'staking-btn'
    case 'completed':
      return 'completed-btn'
    default:
      return 'staking-btn'
  }
}

// 获取状态文本
const getStatusText = (order) => {
  const status = getOrderStatus(order)
  switch (status) {
    case 'redeemable':
      return t('components.myFinance.redeemable')
    case 'staking':
      return t('components.myFinance.staking')
    case 'completed':
      return '已完成'
    default:
      return t('components.myFinance.staking')
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 查看历史记录
const viewHistory = () => {
  uni.navigateTo({
    url: '/views/History'
  })
}

// 赎回质押订单
const handleRedeem = async (order) => {
  // 检查订单是否可赎回
  if (!isOrderExpired(order.lastStakeTime)) {
    uni.showToast({
      title: '订单尚未到期，无法赎回',
      icon: 'none',
      duration: 2000
    })
    return
  }

  // 确认赎回
  uni.showModal({
    title: '确认赎回',
    content: `确定要赎回 ${order.totalStakeAmount} VGAU 吗？赎回后将获得 ${order.totalInterestEarned} USDT 收益。`,
    confirmText: '确认赎回',
    cancelText: '取消',
    success: async (res) => {
      if (res.confirm) {
        await redeemOrder(order)
      }
    }
  })
}

// 执行赎回操作
const redeemOrder = async (order) => {
  try {
    // 显示加载提示
    uni.showLoading({
      title: '赎回中...',
      mask: true
    })

    console.log('开始赎回订单:', order.id)
    const response = await stakeAPI.redeemOrder(order.id)
    console.log('赎回响应:', response)

    // 隐藏加载提示
    uni.hideLoading()

    if (response && response.success) {
      uni.showToast({
        title: '赎回成功',
        icon: 'success',
        duration: 2000
      })
      
      // 刷新订单列表
      await fetchStakeOrders()
    } else {
      throw new Error(response?.message || '赎回失败')
    }
  } catch (error) {
    console.error('赎回订单失败:', error)
    uni.hideLoading()
    uni.showToast({
      title: error.message || '赎回失败，请稍后重试',
      icon: 'none',
      duration: 3000
    })
  }
}



// 页面加载时获取数据
onMounted(() => {
  fetchStakeOrders()
})
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
  padding-top: var(--status-bar-height, 0px);
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
  font-weight: 400;
}

.history-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  margin-left: 24rpx;
}

.history-icon {
  width: 48rpx;
  height: 48rpx;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  padding-top: 120rpx;
  padding-bottom: 24rpx;
}

/* 赎回说明 */
.redemption-notice {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.notice-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 资产卡片 */
.asset-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
}

.asset-info {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.info-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 状态按钮 */
.status-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-radius: 12rpx;
  width: 100%;
}

.redeemable-btn {
  background: #FFFFFF;
  cursor: pointer;
  transition: all 0.3s ease;
}

.redeemable-btn:active {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(0.98);
}

.staking-btn {
  background: rgba(255, 255, 255, 0.1);
}

.completed-btn {
  background: rgba(0, 255, 0, 0.2);
}

.status-text {
  font-size: 28rpx;
  font-weight: 500;
}

.redeemable-btn .status-text {
  color: #000000;
}

.staking-btn .status-text {
  color: #FFFFFF;
}

.completed-btn .status-text {
  color: #00FF00;
}

/* 加载状态 */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.loading-status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
}

.loading-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 空状态 */
.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}


</style> 
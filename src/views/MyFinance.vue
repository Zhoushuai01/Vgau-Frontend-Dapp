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
        <text class="loading-text">{{ t('components.myFinance.loading') }}</text>
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
              <text class="info-value">{{ formatTime(order.createTime) }}</text>
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
        <text class="empty-text">{{ t('components.myFinance.noOrders') }}</text>
      </view>

      <!-- 底部状态 -->
      <view class="loading-status">
        <text class="loading-text">{{ t('components.myFinance.allLoaded') }}</text>
      </view>
    </view>

    <!-- 赎回确认弹窗 -->
    <view class="redeem-confirm-modal" v-if="showRedeemConfirmModal" @click="closeRedeemConfirmModal">
      <view class="modal-overlay"></view>
      <view class="modal-content" @click.stop>
        <!-- 弹窗头部 -->
        <view class="modal-header">
          <text class="modal-title">{{ t('components.myFinance.redeemConfirm.title') }}</text>
        </view>
        
        <!-- 弹窗内容 -->
        <view class="modal-body">
          <view class="redeem-info">
            <text class="info-text">{{ t('components.myFinance.redeemConfirm.content', { amount: selectedRedeemOrder?.totalStakeAmount || '0' }) }}</text>
          </view>
          
          <view class="redeem-details">
            <view class="detail-item">
              <text class="detail-label">{{ t('components.myFinance.redeemConfirm.principal') }}:</text>
              <text class="detail-value">{{ selectedRedeemOrder?.totalStakeAmount || '0' }} {{ t('components.myFinance.redeemConfirm.currency.vgau') }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ t('components.myFinance.redeemConfirm.interest') }}:</text>
              <text class="detail-value">{{ selectedRedeemOrder?.totalInterestEarned || '0' }} {{ t('components.myFinance.redeemConfirm.currency.usdt') }}</text>
            </view>
          </view>
          
        </view>
        
        <!-- 弹窗按钮 -->
        <view class="modal-actions">
          <view class="action-btn cancel-btn" @click="closeRedeemConfirmModal">
            <text class="btn-text">{{ t('components.myFinance.redeemConfirm.cancel') }}</text>
          </view>
          <view class="action-btn confirm-btn" @click="confirmRedeem">
            <text class="btn-text">{{ t('components.myFinance.redeemConfirm.confirm') }}</text>
          </view>
        </view>
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

// 赎回确认弹窗
const showRedeemConfirmModal = ref(false)
const selectedRedeemOrder = ref(null)

// 获取质押订单列表
const fetchStakeOrders = async () => {
  loading.value = true
  try {
    const response = await stakeAPI.getOrders()
    console.log('🔍 后端API响应详情:', {
      success: response?.success,
      message: response?.message,
      data: response?.data,
      hasData: !!response?.data,
      dataLength: response?.data?.length || 0,
      firstOrder: response?.data?.[0] || null
    })
    
    // 如果接口没有数据，使用测试数据
    let ordersData = []
    if (response && response.data && response.data.length > 0) {
      ordersData = response.data
      console.log('✅ 使用后端数据，订单数量:', ordersData.length)
    } else {
      console.log('⚠️ 后端无数据，使用测试数据')
      // 测试数据 - 包含已到期和未到期的订单
      ordersData = [
        // 示例数据已移除，将从 API 获取真实数据
      ]
    }
    
    // 处理每个订单的字段映射
    stakeOrders.value = ordersData.map((order, index) => {
      console.log(`📋 处理订单 ${index + 1}:`, {
        原始订单ID: order.id,
        订单ID类型: typeof order.id,
        订单状态: order.status,
        质押金额: order.stakeAmount || order.totalStakeAmount,
        完整订单数据: order
      })
      
      const mappedOrder = {
        ...order,
        // 确保字段映射正确
        createTime: order.createTime || order.firstStakeTime || order.startTime || '',
        lastStakeTime: order.lastStakeTime || order.endTime || '',
        totalStakeAmount: order.totalStakeAmount || order.stakeAmount || '0',
        totalInterestEarned: order.totalInterestEarned || order.interestEarned || '0'
      }
      
      console.log(`✅ 映射后的订单 ${index + 1}:`, {
        最终订单ID: mappedOrder.id,
        订单ID类型: typeof mappedOrder.id,
        订单状态: mappedOrder.status,
        质押金额: mappedOrder.totalStakeAmount
      })
      
      return mappedOrder
    })
    console.log('最终订单列表:', stakeOrders.value)
  } catch (error) {
    console.error('获取质押订单失败:', error)
    uni.showToast({
      title: t('components.myFinance.dataLoadFailed'),
      icon: 'none',
      duration: 2000
    })
  } finally {
    loading.value = false
  }
}

// 格式化时间，精确到秒
const formatTime = (timeStr) => {
  if (!timeStr) {
    return '暂无'
  }
  try {
    const date = new Date(timeStr)
    if (isNaN(date.getTime())) {
      return timeStr
    }
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
      title: t('components.myFinance.orderNotExpired'),
      icon: 'none',
      duration: 2000
    })
    return
  }

  // 显示自定义赎回确认弹窗
  showRedeemConfirmModal.value = true
  selectedRedeemOrder.value = order
}

// 执行赎回操作
const redeemOrder = async (order) => {
  try {
    // 显示加载提示
    uni.showLoading({
      title: t('components.myFinance.redeemConfirm.confirm') + '...',
      mask: true
    })

    console.log('开始赎回订单:', {
      orderId: order.id,
      stakeAmount: order.totalStakeAmount,
      interestEarned: order.totalInterestEarned,
      apiEndpoint: `/api/stake/orders/${order.id}/redeem`
    })
    
    // 调用赎回API接口 /api/stake/orders/{orderId}/redeem
    const response = await stakeAPI.redeemOrder(order.id)
    console.log('赎回API响应:', {
      status: response?.status,
      success: response?.success,
      code: response?.code,
      message: response?.message,
      data: response?.data
    })

    // 隐藏加载提示
    uni.hideLoading()

    // 检查响应结果
    if (response && (response.success || response.code === 200 || response.status === 'success')) {
      uni.showToast({
        title: t('components.myFinance.redeemSuccess'),
        icon: 'success',
        duration: 2000
      })
      
      // 刷新订单列表
      await fetchStakeOrders()
    } else {
      // 处理不同的响应格式
      const errorMessage = response?.message || response?.error || t('components.myFinance.redeemFailed')
      throw new Error(errorMessage)
    }
  } catch (error) {
    console.error('赎回订单失败:', error)
    uni.hideLoading()
    
    // 根据错误类型显示不同的提示
    let errorMessage = t('components.myFinance.redeemFailedRetry')
    
    if (error.message) {
      if (error.message.includes('network') || error.message.includes('timeout')) {
        errorMessage = t('components.myFinance.networkError')
      } else if (error.message.includes('unauthorized') || error.message.includes('401')) {
        errorMessage = t('components.myFinance.loginExpired')
      } else if (error.message.includes('forbidden') || error.message.includes('403')) {
        errorMessage = t('components.myFinance.noPermission')
      } else if (error.message.includes('not found') || error.message.includes('404')) {
        errorMessage = t('components.myFinance.orderNotFound')
      } else {
        errorMessage = error.message
      }
    }
    
    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 3000
    })
  }
}



// 关闭赎回确认弹窗
const closeRedeemConfirmModal = () => {
  showRedeemConfirmModal.value = false
  selectedRedeemOrder.value = null
}

// 确认赎回
const confirmRedeem = async () => {
  if (selectedRedeemOrder.value) {
    await redeemOrder(selectedRedeemOrder.value)
    closeRedeemConfirmModal()
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

/* 赎回确认弹窗样式 */
.redeem-confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 600rpx;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20px);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx 32rpx 24rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
}


.modal-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 600;
  text-align: center;
}

.modal-body {
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.redeem-info {
  text-align: center;
}

.info-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
  line-height: 1.5;
}

.redeem-details {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.detail-value {
  font-size: 26rpx;
  color: #FFFFFF;
  font-weight: 500;
}


.modal-actions {
  display: flex;
  gap: 16rpx;
  padding: 24rpx 32rpx 32rpx;
  border-top: 1rpx solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.confirm-btn {
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  box-shadow: inset 0px 4rpx 0px 0px rgba(255, 255, 255, 0.25), inset 0px -2rpx 0px 0px rgba(218, 118, 52, 1);
}

.btn-text {
  font-size: 28rpx;
  font-weight: 500;
  text-align: center;
}

.cancel-btn .btn-text {
  color: #FFFFFF;
}

.confirm-btn .btn-text {
  color: #000000;
}

</style> 
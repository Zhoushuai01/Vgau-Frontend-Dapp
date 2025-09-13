<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ $t('components.borrowOrder.title') }}</text>
      </view>
      <view class="header-buttons">
        <view class="header-button" @click="showRecords">
          <image class="header-icon" src="/static/history.png" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 通知消息 -->
      <view class="notification-section">
        <text class="notification-text">{{ $t('components.borrowOrder.borrowedUSDTArrival') }}</text>
      </view>

      <!-- 总负债区域 -->
      <view class="total-liabilities-section">
        <view class="liabilities-card">
          <text class="liabilities-label">{{ $t('components.borrowOrder.totalLiabilities') }}</text>
          <text class="liabilities-value">{{ formatTotalLiabilities(totalLiabilities) }}</text>
        </view>
      </view>


      <!-- 加载状态 -->
      <view v-if="loading" class="loading-section">
        <text class="loading-text">{{ $t('common.loading') || '加载中...' }}</text>
      </view>

      <!-- 错误状态 -->
      <view v-else-if="error" class="error-section">
        <text class="error-text">{{ error }}</text>
        <view class="retry-button" @click="fetchLoanOrders">
          <text class="retry-text">{{ $t('common.retry') || '重试' }}</text>
        </view>
      </view>

      <!-- 空数据状态 -->
      <view v-else-if="orders.length === 0" class="empty-section">
        <text class="empty-text">{{ $t('common.noData') || '暂无订单数据' }}</text>
      </view>

      <!-- 抵押项目列表 -->
      <view v-else class="collateral-list">
        <view 
          v-for="order in orders" 
          :key="order.id" 
          class="collateral-card"
        >
          <view class="order-number">
            <text class="order-number-label">{{ $t('components.borrowOrder.orderNumber') }}</text>
            <text class="order-number-value">{{ order.orderNumber }}</text>
          </view>
          
          <view class="collateral-header">
            <text class="collateral-title">{{ $t('components.borrowOrder.collateralAmount') }}</text>
            <text class="collateral-amount">{{ order.collateralAmount }}</text>
          </view>
          
          <view class="collateral-details">
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.borrowOrder.pledgeRatio') }}</text>
              <text class="detail-value">{{ order.ltvRatio }}%</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.borrowOrder.netAnnualizedInterestRate') }}</text>
              <text class="detail-value">{{ formatDebtUsdt(order.totalDebtUsdt) }} USDT</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.borrowOrder.liquidationReferencePrice') }}</text>
              <text class="detail-value">{{ formatLiquidationPrice(order.liquidationReferencePrice) }}</text>
            </view>
          </view>
          
          <view class="action-buttons">
            <view class="action-btn" @click="increaseCollateral(order)">
              <text class="btn-text">{{ $t('components.borrowOrder.increaseCollateralAmount') }}</text>
            </view>
            <view class="action-btn" @click="repay(order)">
              <text class="btn-text">{{ $t('components.borrowOrder.fullRepayment') }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部加载完成提示 -->
      <view class="footer-section">
        <text class="footer-text">{{ $t('components.borrowOrder.allLoaded') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { loanAPI } from '@/api/apiService.js'

const { t, locale } = useI18n()

// 响应式数据
const showRecordsData = ref(false)
const orders = ref([])
const loading = ref(false)
const error = ref(null)

// 总负债数据
const totalLiabilities = ref('0')

// 格式化总负债显示
const formatTotalLiabilities = (value) => {
  if (!value || value === null || value === undefined) {
    return '0'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '0'
  }
  
  // 先格式化为4位小数，然后去除末尾的零
  return parseFloat(num.toFixed(4)).toString()
}

// 格式化需还USDT，保留小数点后四位，舍弃多余的零
const formatDebtUsdt = (value) => {
  if (!value || value === null || value === undefined) {
    return '--'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '--'
  }
  
  // 先格式化为4位小数，然后去除末尾的零
  return parseFloat(num.toFixed(4)).toString()
}

// 格式化清算参考价格
const formatLiquidationPrice = (value) => {
  if (!value || value === null || value === undefined) {
    return '--'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '--'
  }
  
  // 保留适当的小数位数，根据数值大小决定
  if (num >= 1000) {
    return num.toFixed(2)
  } else if (num >= 1) {
    return num.toFixed(4)
  } else {
    return num.toFixed(6)
  }
}


// 获取总负债数据
const fetchLoanSummary = async () => {
  try {
    console.log('📡 开始获取总负债数据...')
    const response = await loanAPI.getSummary()
    
    console.log('✅ 总负债数据获取成功:', response)
    
    if (response && response.success && response.data) {
      totalLiabilities.value = response.data.totalActiveDebt || '0'
      console.log('💰 总负债金额:', totalLiabilities.value)
    } else {
      console.warn('⚠️ 总负债数据格式异常:', response)
      totalLiabilities.value = '0'
    }
  } catch (err) {
    console.error('❌ 获取总负债失败:', err)
    totalLiabilities.value = '0'
  }
}

// 获取借贷订单数据
const fetchLoanOrders = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('📡 开始获取借贷订单数据...')
    const response = await loanAPI.getOrders()
    
    console.log('✅ 借贷订单数据获取成功')
    
    if (response && response.success && response.data) {
      
      // 检查data是否为数组，如果不是则尝试获取各种可能的字段
      let dataArray = []
      if (Array.isArray(response.data)) {
        dataArray = response.data
      } else if (response.data.records && Array.isArray(response.data.records)) {
        dataArray = response.data.records
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        dataArray = response.data.orders
      } else if (response.data.list && Array.isArray(response.data.list)) {
        dataArray = response.data.list
      } else {
        console.warn('⚠️ 无法找到订单数组，data结构:', Object.keys(response.data))
        
        // 如果data不是数组，但包含订单信息，将其作为单个订单处理
        if (response.data && typeof response.data === 'object') {
          dataArray = [response.data]
        } else {
          dataArray = []
        }
      }
      
      // 映射API返回的字段到前端使用的字段
      orders.value = dataArray.map((item, index) => ({
        id: item.id || index + 1,
        orderNumber: item.orderNumber, // 订单号
        collateralAmount: item.collateralAmount, // 抵押品数量（VGAU）
        ltvRatio: item.ltvRatioAsPercentage, // 质押比率 - 使用API返回的ltvRatioAsPercentage
        borrowAmount: item.borrowAmount || 0, // 借款金额
        interestRate: item.annualRateAsPercentage || 0, // 年化利率 - 使用API返回的annualRateAsPercentage
        totalDebtUsdt: item.totalDebtUsdt || null, // 需还USDT - 使用API返回的totalDebtUsdt
        liquidationReferencePrice: item.liquidationReferencePrice || null, // 清算参考价格 - 使用API返回的liquidationReferencePrice
        status: item.status || 'active',
        statusDescription: item.statusDescription || null, // 状态描述 - 使用API返回的statusDescription
        finalStatus: item.finalStatus || false // 最终状态 - 使用API返回的finalStatus
      }))
      
      console.log('📊 订单数据加载完成，共', orders.value.length, '个订单')
    } else {
      console.warn('⚠️ API返回数据格式异常:', response)
      orders.value = []
    }
  } catch (err) {
    console.error('❌ 获取借贷订单失败:', err)
    error.value = err.message || '获取订单数据失败'
    orders.value = []
    
    // 显示错误提示
    uni.showToast({
      title: error.value,
      icon: 'none',
      duration: 3000
    })
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(async () => {
  await Promise.all([
    fetchLoanSummary(),
    fetchLoanOrders()
  ])
})

// 调试国际化 - 验证翻译是否正常工作
console.log('Current locale:', locale.value)
console.log('BorrowOrder translations:', {
  title: t('components.borrowOrder.title'),
  totalLiabilities: t('components.borrowOrder.totalLiabilities'),
  collateralAmount: t('components.borrowOrder.collateralAmount')
})

// 显示记录
const showRecords = () => {
  uni.showToast({
    title: t('components.borrowOrder.recordsFeature'),
    icon: 'none',
    duration: 2000
  })
}

// 增加抵押金额
const increaseCollateral = (order) => {
  if (!order || !order.orderNumber) {
    uni.showToast({
      title: '订单信息不完整',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  uni.navigateTo({
    url: `/views/IncreaseCollateral?orderNumber=${order.orderNumber}`
  })
}

// 调整质押比率
const adjustPledgeRatio = () => {
  uni.showToast({
    title: t('components.borrowOrder.adjustPledgeRatioFeature'),
    icon: 'none',
    duration: 2000
  })
}

// 全额还款
const repay = async (order) => {
  if (!order || !order.orderNumber) {
    uni.showToast({
      title: '订单信息不完整',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  try {
    console.log('📡 开始全额还款...')
    
    const requestData = {
      orderNumber: order.orderNumber,
      confirmRepayment: true
    }
    
    console.log('📤 还款请求数据:', requestData)
    
    const response = await loanAPI.repay(requestData)
    console.log('✅ 全额还款成功:', response)
    
    if (response && response.success) {
      uni.showToast({
        title: '还款成功',
        icon: 'success',
        duration: 2000
      })
      
      // 刷新订单列表
      await fetchLoanOrders()
    } else {
      throw new Error(response?.message || '还款失败')
    }
  } catch (error) {
    console.error('❌ 全额还款失败:', error)
    uni.showToast({
      title: error.message || '还款失败',
      icon: 'none',
      duration: 3000
    })
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
/* 全局背景色 */
:deep(body), :deep(html) {
  background-color: #0A0A0A !important;
}

.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
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

.header-buttons {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.header-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
}

.header-icon {
  width: 48rpx;
  height: 48rpx;
}


/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
  padding-top: 120rpx;
}

/* 通知消息区域 */
.notification-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.notification-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  line-height: 1.5;
}

/* 总负债区域 */
.total-liabilities-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}


.liabilities-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx;
}

.liabilities-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  margin-bottom: 16rpx;
}

.liabilities-value {
  font-size: 48rpx;
  color: #FFA500;
  font-weight: 600;
}

/* 抵押项目列表 */
.collateral-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.collateral-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx;
}

.order-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.order-number-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.order-number-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
  text-align: right;
}

.collateral-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.collateral-title {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.collateral-amount {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.collateral-details {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 32rpx;
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
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
  text-align: right;
}

.detail-value.positive {
  color: #4CAF50;
}

.detail-value.negative {
  color: #FF5722;
}

.action-buttons {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  background: transparent;
  border: 1rpx solid #FFFFFF;
  border-radius: 12rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.btn-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 加载状态 */
.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80rpx 0;
}

.loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* 错误状态 */
.error-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80rpx 32rpx;
  gap: 32rpx;
}

.error-text {
  font-size: 28rpx;
  color: #FF5722;
  font-weight: 400;
  text-align: center;
}

/* 空数据状态 */
.empty-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.retry-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx 32rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 12rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:active {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(0.98);
}

.retry-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 底部区域 */
.footer-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding: 32rpx 0;
}

.footer-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 自定义Toast样式 */
:deep(.uni-toast) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  color: #FFFFFF !important;
  font-size: 24rpx;
  padding: 20rpx 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
}

:deep(.uni-toast__content) {
  color: #FFFFFF !important;
  background: transparent !important;
  font-size: 24rpx;
}
</style> 
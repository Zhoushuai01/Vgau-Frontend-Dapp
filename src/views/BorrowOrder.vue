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
        <view class="retry-button" @click="fetchLoanSummary">
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

    <!-- 还款确认弹窗 -->
    <view v-if="showRepayModal" class="modal-overlay" @click="closeRepayModal">
      <view class="modal-container" @click.stop>
        <view class="modal-header">
          <text class="modal-title">{{ $t('components.borrowOrder.repayModal.title') }}</text>
        </view>
        <view class="modal-content">
          <text class="modal-text">{{ repayModalContent }}</text>
        </view>
        <view class="modal-actions">
          <view class="modal-btn cancel-btn" @click="closeRepayModal">
            <text class="btn-text">{{ $t('components.borrowOrder.repayModal.cancel') }}</text>
          </view>
          <view class="modal-btn confirm-btn" @click="confirmRepay" :class="{ 'loading': repayLoading }">
            <text v-if="!repayLoading" class="btn-text">{{ $t('components.borrowOrder.repayModal.confirm') }}</text>
            <text v-else class="btn-text">{{ $t('components.borrowOrder.repayModal.loading') }}</text>
          </view>
        </view>
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

// 还款确认弹窗相关数据
const showRepayModal = ref(false)
const repayLoading = ref(false)
const currentRepayOrder = ref(null)

// 总负债数据
const totalLiabilities = ref('0')

// 当前VGAU价格
const currentVgauPrice = ref(0)

// 还款确认弹窗内容
const repayModalContent = computed(() => {
  if (!currentRepayOrder.value) return ''
  
  const order = currentRepayOrder.value
  const orderNumber = order.orderNumber || ''
  const amount = formatDebtUsdt(order.totalDebtUsdt)
  
  // 如果有具体金额，显示带金额的文本
  if (amount && amount !== '--') {
    return t('components.borrowOrder.repayModal.contentWithAmount', {
      orderNumber: orderNumber,
      amount: amount
    })
  } else {
    // 否则显示简单文本
    return t('components.borrowOrder.repayModal.content', {
      orderNumber: orderNumber
    })
  }
})

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

// 获取需还USDT金额（使用totalRepayAmount）
const getTotalDebtUsdt = (order) => {
  try {
    // 优先使用API返回的totalRepayAmount
    if (order.totalRepayAmount !== undefined && order.totalRepayAmount !== null) {
      return parseFloat(order.totalRepayAmount)
    }
    
    // 其次使用totalDebtUsdt
    if (order.totalDebtUsdt !== undefined && order.totalDebtUsdt !== null) {
      return parseFloat(order.totalDebtUsdt)
    }
    
    // 最后使用loanAmount作为降级处理
    return parseFloat(order.loanAmount || 0)
  } catch (error) {
    console.error('获取需还USDT失败:', error)
    return parseFloat(order.loanAmount || 0)
  }
}

// 获取清算参考价格（使用currentVgauPrice）
const getLiquidationReferencePrice = (order) => {
  try {
    // 优先使用API返回的liquidationReferencePrice
    if (order.liquidationReferencePrice !== undefined && order.liquidationReferencePrice !== null) {
      return parseFloat(order.liquidationReferencePrice)
    }
    
    // 其次使用订单中的currentVgauPrice
    if (order.currentVgauPrice !== undefined && order.currentVgauPrice !== null) {
      return parseFloat(order.currentVgauPrice)
    }
    
    // 最后使用从summary接口获取的全局currentVgauPrice
    return currentVgauPrice.value || 0
  } catch (error) {
    console.error('获取清算参考价格失败:', error)
    return currentVgauPrice.value || 0
  }
}

// 处理订单数据的通用函数
const processOrdersData = (dataArray) => {
  // 只显示状态为active的订单，过滤掉已完成的订单
  orders.value = dataArray
    .filter(item => {
      // 只显示状态为active的订单，过滤掉completed、cancelled、liquidated等状态
      const status = item.status || item.orderStatus || item.state
      return status === 'active' || status === 'ACTIVE'
    })
    .map((item, index) => {
      // 获取需还USDT和清算参考价格
      const totalDebtUsdt = getTotalDebtUsdt(item)
      const liquidationReferencePrice = getLiquidationReferencePrice(item)
      
      return {
        id: item.id || index + 1,
        orderNumber: item.orderNumber, // 订单号
        collateralAmount: item.collateralAmount, // 抵押品数量（VGAU）
        ltvRatio: item.currentLtvRatioAsPercentage || item.ltvRatioAsPercentage, // 当前质押比率
        borrowAmount: item.loanAmount || 0, // 借款金额
        interestRate: item.annualRateAsPercentage || 0, // 年化利率
        totalDebtUsdt: totalDebtUsdt, // 需还USDT
        liquidationReferencePrice: liquidationReferencePrice, // 清算参考价格
        status: item.status || 'active',
        statusDescription: item.statusDescription || null, // 状态描述
        finalStatus: item.finalStatus || false, // 最终状态
        // 新增字段
        ltvRatioAfterAddingCollateral: item.ltvRatioAfterAddingCollateralAsPercentage || null, // 增加抵押金额后的质押率
        insuranceFeeAmount: item.insuranceFeeAmount || 0, // 强平保险费
        actualReceiveAmount: item.actualReceiveAmount || 0 // 实际到账金额
      }
    })
  
  console.log('📊 订单数据加载完成，共', orders.value.length, '个订单')
  console.log('📊 订单详情:', orders.value)
}


// 获取总负债数据和订单数据
const fetchLoanSummary = async () => {
  try {
    loading.value = true
    error.value = null
    
    console.log('📡 开始获取总负债和订单数据...')
    const response = await loanAPI.getSummary()
    
    console.log('✅ 总负债数据获取成功:', response)
    
    if (response && response.success && response.data) {
      // 处理总负债数据
      totalLiabilities.value = response.data.totalActiveDebt || '0'
      currentVgauPrice.value = parseFloat(response.data.currentVgauPrice || 0)
      console.log('💰 总负债金额:', totalLiabilities.value)
      console.log('💰 当前VGAU价格:', currentVgauPrice.value)
      
      // 处理订单数据
      if (response.data.recentOrders && Array.isArray(response.data.recentOrders)) {
        console.log('📋 从summary接口获取到订单数据:', response.data.recentOrders)
        processOrdersData(response.data.recentOrders)
      } else {
        console.log('📋 summary接口没有返回订单数据')
        orders.value = []
      }
    } else {
      console.warn('⚠️ 总负债数据格式异常:', response)
      totalLiabilities.value = '0'
      currentVgauPrice.value = 0
      orders.value = []
      error.value = '获取数据失败'
    }
  } catch (err) {
    console.error('❌ 获取总负债失败:', err)
    totalLiabilities.value = '0'
    orders.value = []
    error.value = err.message || '获取数据失败'
    
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
      
      // 使用通用函数处理订单数据
      processOrdersData(dataArray)
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
  // 只调用 summary 接口获取数据
  await fetchLoanSummary()
})

// 调试国际化 - 验证翻译是否正常工作
console.log('Current locale:', locale.value)
console.log('BorrowOrder translations:', {
  title: t('components.borrowOrder.title'),
  totalLiabilities: t('components.borrowOrder.totalLiabilities'),
  collateralAmount: t('components.borrowOrder.collateralAmount')
})

// 显示记录 - 跳转到历史记录页面
const showRecords = () => {
  console.log('🔍 点击历史记录按钮，准备跳转到历史记录页面')
  uni.navigateTo({
    url: '/views/History'
  })
}

// 增加抵押金额
const increaseCollateral = (order) => {
  console.log('🔍 点击增加抵押金额，订单信息:', {
    order: order,
    orderNumber: order?.orderNumber,
    status: order?.status,
    statusType: typeof order?.status
  })
  
  if (!order || !order.orderNumber) {
    console.error('❌ 订单信息不完整')
    uni.showToast({
      title: '订单信息不完整',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  // 检查订单状态是否为active（支持大小写）
  const status = order.status || order.orderStatus || order.state
  if (status !== 'active' && status !== 'ACTIVE') {
    console.warn('⚠️ 订单状态不是active:', status)
    uni.showToast({
      title: '只有进行中的订单才能增加抵押品',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  console.log('✅ 订单状态检查通过，准备跳转到增加抵押品页面')
  
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

// 全额还款 - 显示确认弹窗
const repay = (order) => {
  if (!order || !order.orderNumber) {
    uni.showToast({
      title: '订单信息不完整',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  // 检查订单状态是否为active（支持大小写）
  const status = order.status || order.orderStatus || order.state
  if (status !== 'active' && status !== 'ACTIVE') {
    uni.showToast({
      title: '只有进行中的订单才能还款',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  // 设置当前还款订单并显示确认弹窗
  currentRepayOrder.value = order
  showRepayModal.value = true
}

// 确认还款
const confirmRepay = async () => {
  if (!currentRepayOrder.value) return
  
  try {
    repayLoading.value = true
    console.log('📡 开始全额还款...')
    
    const requestData = {
      orderNumber: currentRepayOrder.value.orderNumber,
      confirmRepayment: true
    }
    
    console.log('📤 还款请求数据:', requestData)
    
    const response = await loanAPI.repay(requestData)
    console.log('✅ 全额还款成功:', response)
    
    if (response && response.success) {
      uni.showToast({
        title: t('components.borrowOrder.repayModal.success'),
        icon: 'success',
        duration: 2000
      })
      
      // 关闭弹窗
      closeRepayModal()
      
      // 刷新订单列表和总负债数据
      await fetchLoanSummary()
    } else {
      throw new Error(response?.message || t('components.borrowOrder.repayModal.failed'))
    }
  } catch (error) {
    console.error('❌ 全额还款失败:', error)
    uni.showToast({
      title: error.message || t('components.borrowOrder.repayModal.failed'),
      icon: 'none',
      duration: 3000
    })
  } finally {
    repayLoading.value = false
  }
}

// 关闭还款确认弹窗
const closeRepayModal = () => {
  showRepayModal.value = false
  currentRepayOrder.value = null
  repayLoading.value = false
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
  cursor: pointer;
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

/* 还款确认弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10rpx);
}

.modal-container {
  width: 600rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 24rpx;
  overflow: hidden;
  backdrop-filter: blur(20rpx);
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 40rpx 40rpx 24rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
}

.modal-title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 600;
  text-align: center;
}

.modal-content {
  padding: 32rpx 40rpx;
}

.modal-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-align: center;
  white-space: pre-line;
}

.modal-actions {
  display: flex;
  gap: 24rpx;
  padding: 24rpx 40rpx 40rpx;
}

.modal-btn {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: transparent;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.cancel-btn:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.confirm-btn {
  background: linear-gradient(135deg, #FFA500, #FF8C00);
  border: 1rpx solid #FFA500;
}

.confirm-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}

.confirm-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.confirm-btn.loading:active {
  transform: none;
}

.modal-btn .btn-text {
  font-size: 28rpx;
  font-weight: 500;
}

.cancel-btn .btn-text {
  color: rgba(255, 255, 255, 0.8);
}

.confirm-btn .btn-text {
  color: #FFFFFF;
}
</style> 
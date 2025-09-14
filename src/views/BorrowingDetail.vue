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
    </view>
    
    <!-- 订单号 -->
    <view class="order-number-section">
      <text class="order-text">{{ t('history.borrowingDetail.orderId') }}: {{ orderDetail.orderNumber || orderNumber }}</text>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text class="loading-text">{{ t('common.loading') || '加载中...' }}</text>
      </view>
      
      <!-- 错误状态 -->
      <view v-else-if="error" class="error-container">
        <text class="error-text">{{ error }}</text>
        <button class="retry-button" @click="fetchOrderDetail">{{ t('common.retry') || '重试' }}</button>
      </view>
      
      <!-- 正常内容 -->
      <template v-else>
        <!-- 借贷概览信息 -->
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.collatRate') }}</text>
        <text class="detail-value">{{ orderDetail.currentLtvRatio ? orderDetail.currentLtvRatio.toFixed(2) + '%' : '--' }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.collateralVGAU') }}</text>
        <text class="detail-value">{{ orderDetail.collateralAmount !== undefined && orderDetail.collateralAmount !== null ? orderDetail.collateralAmount.toLocaleString() : '--' }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.netAPR') }}</text>
        <text class="detail-value">{{ orderDetail.annualRateAsPercentage ? parseFloat(orderDetail.annualRateAsPercentage.toFixed(4)).toString() + '%' : '--' }}</text>
      </view>
      <view class="detail-item">
        <text class="detail-label">{{ t('history.borrowingDetail.liqPrice') }}</text>
        <text class="detail-value">{{ orderDetail.liquidationReferencePrice !== undefined && orderDetail.liquidationReferencePrice !== null ? orderDetail.liquidationReferencePrice.toFixed(4) : '--' }}</text>
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
      </template>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import apiService from '@/api/apiService.js'

const { t } = useI18n()

// 订单状态 - 根据路由参数或页面来源动态设置
const orderStatus = ref('borrowing') // 默认为 'borrowing'
const orderNumber = ref('') // 订单号
const loading = ref(false) // 加载状态
const error = ref(null) // 错误信息

// 订单详情数据
const orderDetail = ref({
  orderNumber: '',
  status: '',
  currentLtvRatio: 0,
  collateralAmount: 0,
  liquidationReferencePrice: 0,
  totalDebtUsdt: 0,
  annualRateAsPercentage: 0,
  currentVgauPrice: 0,
  riskLevel: '',
  riskMessage: '',
  createTime: '',
  loanTime: ''
})

// 在页面加载时检查来源并设置状态
onMounted(async () => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  
  console.log('📋 页面参数:', options)
  
  // 处理从 History.vue 传递的 order 参数
  if (options.order) {
    try {
      const orderData = JSON.parse(decodeURIComponent(options.order))
      console.log('📋 解析的订单数据:', orderData)
      
      if (orderData.orderNumber) {
        orderNumber.value = orderData.orderNumber
      }
      
      if (orderData.status) {
        orderStatus.value = orderData.status === 'COMPLETED' ? 'completed' : 'borrowing'
      }
      
      // 如果有订单数据，先填充基本信息，然后获取完整详情
      if (orderData.currentLtvRatio) {
        orderDetail.value.currentLtvRatio = orderData.currentLtvRatio
      }
      if (orderData.collateralAmount) {
        orderDetail.value.collateralAmount = orderData.collateralAmount
      }
    } catch (error) {
      console.error('❌ 解析订单数据失败:', error)
    }
  }
  
  // 处理单独的 orderNumber 参数
  if (options.orderNumber) {
    orderNumber.value = options.orderNumber
  }
  
  // 处理状态参数
  if (options.status) {
    orderStatus.value = options.status
  } else if (options.type === 'completed' || options.completed === 'true') {
    orderStatus.value = 'completed'
  }
  
  // 如果有订单号，获取订单详情
  if (orderNumber.value) {
    await fetchOrderDetail()
  } else {
    console.warn('⚠️ 没有订单号，无法获取订单详情')
    // 如果没有订单号，尝试获取订单列表来测试 API 连接
    await testApiConnection()
  }
})

// 获取订单详情
const fetchOrderDetail = async () => {
  if (!orderNumber.value) {
    console.warn('⚠️ 订单号为空，无法获取订单详情')
    return
  }
  
  try {
    loading.value = true
    error.value = null
    
    console.log('📡 开始获取订单详情，订单号:', orderNumber.value)
    console.log('📡 API 端点:', `${apiService.baseURL}/loan/orders/${orderNumber.value}`)
    
    const response = await apiService.loan.getOrderDetail(orderNumber.value)
    
    console.log('✅ 订单详情获取成功:', response)
    console.log('✅ 响应状态:', response?.success)
    console.log('✅ 响应数据:', response?.data)
    
    if (response && response.success && response.data) {
      const data = response.data
      
      console.log('✅ 抵押品数据:', {
        collateralAmount: data.collateralAmount,
        collateralAmountStandard: data.collateralAmountStandard,
        collateralAmountInStandardUnit: data.collateralAmountInStandardUnit
      })
      console.log('✅ 清算价格:', data.liquidationReferencePrice)
      console.log('✅ 年化收益率数据:', {
        annualRateAtCreation: data.annualRateAtCreation,
        annualRateAtCreationType: typeof data.annualRateAtCreation,
        annualRateAsPercentage: data.annualRateAsPercentage,
        convertedRate: data.annualRateAtCreation ? 
          (typeof data.annualRateAtCreation === 'string' ? parseFloat(data.annualRateAtCreation) * 100 : data.annualRateAtCreation * 100) : 
          (data.annualRateAsPercentage || 0)
      })
      
      // 更新订单详情数据
      orderDetail.value = {
        orderNumber: data.orderNumber || '',
        status: data.status || '',
        currentLtvRatio: data.currentLtvRatioAsPercentage || data.currentLtvRatio || 0,
        collateralAmount: data.collateralAmount || 
                         data.collateralAmountStandard || 
                         data.collateralAmountInStandardUnit || 
                         (data.collateralAmount && typeof data.collateralAmount === 'number' && data.collateralAmount > 0 ? data.collateralAmount / 1e18 : 0) ||
                         (data.totalCollateralAmount ? data.totalCollateralAmount : 0),
        liquidationReferencePrice: data.liquidationReferencePrice !== undefined && data.liquidationReferencePrice !== null ? 
          (typeof data.liquidationReferencePrice === 'string' ? parseFloat(data.liquidationReferencePrice) : data.liquidationReferencePrice) : 0,
        totalDebtUsdt: data.totalDebtUsdt || 0,
        annualRateAsPercentage: data.annualRateAtCreation ? 
          (typeof data.annualRateAtCreation === 'string' ? parseFloat(data.annualRateAtCreation) * 100 : data.annualRateAtCreation * 100) : 
          (data.annualRateAsPercentage || 0),
        currentVgauPrice: data.currentVgauPrice || 0,
        riskLevel: data.riskLevel || '',
        riskMessage: data.riskMessage || '',
        createTime: data.createTime || '',
        loanTime: data.loanTime || ''
      }
      
      // 根据订单状态更新显示状态
      if (data.status === 'COMPLETED' || data.finalStatus) {
        orderStatus.value = 'completed'
      } else if (data.status === 'ACTIVE') {
        orderStatus.value = 'borrowing'
      } else {
        orderStatus.value = data.status?.toLowerCase() || 'borrowing'
      }
      
      console.log('📊 订单详情数据更新完成，抵押品数量:', orderDetail.value.collateralAmount)
      
      // 生成交易历史
      generateTransactionHistory()
    } else {
      console.warn('⚠️ API返回数据格式异常:', response)
      error.value = '获取订单详情失败'
    }
  } catch (err) {
    console.error('❌ 获取订单详情失败:', err)
    error.value = err.message || '获取订单详情失败'
    
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

// 测试 API 连接
const testApiConnection = async () => {
  try {
    console.log('🔍 测试 API 连接...')
    const response = await apiService.loan.getOrders()
    console.log('✅ API 连接测试成功:', response)
    
    if (response && response.success && response.data) {
      console.log('📊 订单列表数据:', response.data)
      // 如果有订单，使用第一个订单的详情
      let orders = []
      if (Array.isArray(response.data)) {
        orders = response.data
      } else if (response.data.records && Array.isArray(response.data.records)) {
        orders = response.data.records
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        orders = response.data.orders
      } else if (response.data.list && Array.isArray(response.data.list)) {
        orders = response.data.list
      }
      
      if (orders.length > 0) {
        const firstOrder = orders[0]
        console.log('📋 使用第一个订单:', firstOrder)
        orderNumber.value = firstOrder.orderNumber
        await fetchOrderDetail()
      } else {
        console.warn('⚠️ 没有找到任何订单')
      }
    }
  } catch (error) {
    console.error('❌ API 连接测试失败:', error)
    error.value = 'API 连接失败: ' + (error.message || '未知错误')
  }
}

// 交易数据
const transactions = ref([])

// 生成交易历史数据
const generateTransactionHistory = () => {
  if (!orderDetail.value.orderNumber) {
    transactions.value = []
    return
  }
  
  const history = []
  
  // 如果有创建时间，添加初始抵押记录
  if (orderDetail.value.createTime) {
    history.push({
      action: t('history.borrowingDetail.collateral'),
      date: formatDate(orderDetail.value.createTime),
      amount: `-${formatAmount(orderDetail.value.collateralAmount)} VGAU`,
      amountClass: 'negative'
    })
  }
  
  // 如果有放款时间，添加借款记录
  if (orderDetail.value.loanTime) {
    history.push({
      action: t('history.borrowingDetail.borrow'),
      date: formatDate(orderDetail.value.loanTime),
      amount: `+${formatAmount(orderDetail.value.totalDebtUsdt)} USDT`,
      amountClass: 'positive'
    })
  }
  
  // 移除订单完成记录 - 不再显示完成的记录
  
  transactions.value = history
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day} ${hours}:${minutes}`
  } catch (error) {
    console.error('日期格式化错误:', error)
    return dateString
  }
}

// 格式化金额，保留小数点后四位，多的零清零
const formatAmount = (amount) => {
  if (amount === undefined || amount === null || amount === 0) return '0'
  
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '0'
  
  // 保留4位小数，然后去掉末尾的零
  return num.toFixed(4).replace(/\.?0+$/, '')
}

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
  justify-content: flex-start;
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

/* 订单号部分 */
.order-number-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16rpx 32rpx;
  padding-bottom: 24rpx;
}

.order-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
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

.transaction-amount.completed {
  color: #00CC66;
}

/* 加载状态 */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.loading-text {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* 错误状态 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 32rpx;
  gap: 32rpx;
}

.error-text {
  font-size: 32rpx;
  color: #FF6B6B;
  font-weight: 400;
  text-align: center;
}

.retry-button {
  background: #00CC66;
  color: #FFFFFF;
  border: none;
  border-radius: 16rpx;
  padding: 24rpx 48rpx;
  font-size: 32rpx;
  font-weight: 500;
}

.retry-button:active {
  background: #00B359;
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
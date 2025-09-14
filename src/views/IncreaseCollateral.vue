<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('components.increaseCollateral.increaseCollateralAmount') }}</text>
      </view>
      <view class="header-buttons">
        <view class="header-button" @click="showHelp">
          <image class="header-icon" src="/static/DiFi/xiangqing.png" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 当前抵押信息 -->
        <view class="current-collateral-section">
          <view class="collateral-info-card">
            <view class="info-header">
              <text class="info-title">{{ t('components.increaseCollateral.collateralAmount') }}</text>
              <text class="info-value">{{ orderData.collateralAmount }} VGAU</text>
            </view>
            <view class="info-details">
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.insuranceFee') }}</text>
                <text class="detail-value">{{ formatInsuranceFee(orderData.insuranceFee) }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.initialCollateralRatio') }}</text>
                <text class="detail-value">{{ orderData.ltvRatio }}%</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.stakingRatio') }}</text>
                <text class="detail-value">{{ formatCurrentLtvRatio(orderData.currentStakingRatio) }}</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.stakingRatioAfterIncrease') }}</text>
                <text class="detail-value">{{ formatCurrentLtvRatio(orderData.newLtvRatioAfterAdditional) }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 增加抵押金额输入区域 -->
        <view class="increase-amount-section">
          <text class="section-label">{{ t('components.increaseCollateral.increaseAmount') }}</text>
          <view class="amount-input-container">
            <input class="amount-input" 
                   type="number" 
                   :placeholder="t('components.increaseCollateral.amountPlaceholder')" 
                   v-model="increaseAmount"
                   :adjust-position="false" />
            <view class="input-suffix">
              <text class="currency-text">VGAU</text>
              <view class="vertical-divider"></view>
              <text class="max-text" @click="setMaxAmount">{{ t('components.increaseCollateral.max') }}</text>
            </view>
          </view>
          <view class="available-balance-container">
            <text class="available-balance">{{ t('components.increaseCollateral.availableAssets') }}</text>
            <text class="balance-amount">{{ vgauAvailableBalance }} VGAU</text>
          </view>
        </view>

        <!-- 底部间距区域 -->
        <view class="bottom-spacing"></view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" @click="handleConfirm">
          <text class="confirm-text">{{ t('components.increaseCollateral.confirmOperation') }}</text>
        </view>
      </view>
    </view>
  </view>

  <!-- 确认弹窗 -->
  <view v-if="showConfirmModal" class="modal-overlay" @click="showConfirmModal = false">
    <view class="modal-content" @click.stop>
             <view class="modal-text">
         <text class="success-title" v-html="formattedIncreaseSuccess"></text>
         <text class="success-description" v-html="formattedNewCollateralRatio"></text>
       </view>
      <view class="modal-btn" @click="confirmModalAction">
                 <text class="modal-btn-text">{{ t('components.increaseCollateral.confirmButton') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { userFundsAPI, loanAPI } from '@/api/apiService'

const { t } = useI18n()

// 增加金额
const increaseAmount = ref('')

// 弹窗显示数据
const increasedAmount = ref('0VGAU') // 增加的金额，例如 '77VGAU'
const newCollateralRatio = ref('0%') // 增加抵押后的质押率，例如 '65%'

// VGAU 可用余额
const vgauAvailableBalance = ref('0')

// 订单数据
const orderData = ref({
  collateralAmount: '0', // 抵押金额
  ltvRatio: 0, // 初始质押率
  insuranceFee: '--', // 强平保险费
  currentStakingRatio: '--', // 当前质押率
  increaseAmount: '--', // 增加抵押金额（后端暂无数据）
  newLtvRatioAfterAdditional: '--' // 增加抵押金额后的质押率
})

// 计算属性：格式化增加成功消息，高亮金额和VGAU
const formattedIncreaseSuccess = computed(() => {
  const amount = increasedAmount.value.replace('VGAU', '')
  return t('components.increaseCollateral.increaseSuccess', { 
    amount: `<span class="highlight-orange">${amount}VGAU</span>` 
  })
})

// 计算属性：格式化新质押率消息，高亮比率
const formattedNewCollateralRatio = computed(() => {
  const ratio = newCollateralRatio.value
  return t('components.increaseCollateral.newCollateralRatio', { 
    ratio: `<span class="highlight-white">${ratio}</span>` 
  })
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 格式化强平保险费显示
const formatInsuranceFee = (value) => {
  if (!value || value === '--' || value === null || value === undefined) {
    return '--'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '--'
  }
  
  // 先格式化为4位小数，然后去除末尾的零
  return parseFloat(num.toFixed(4)).toString()
}

// 格式化当前质押率显示
const formatCurrentLtvRatio = (value) => {
  if (!value || value === '--' || value === null || value === undefined) {
    return '--'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '--'
  }
  
  // 转换为百分比并格式化
  const percentage = (num * 100).toFixed(2)
  return parseFloat(percentage).toString() + '%'
}

// 显示帮助
const showHelp = () => {
  uni.showToast({
    title: t('components.productHelp.helpContent'),
    icon: 'none',
    duration: 2000
  })
}

// 设置最大金额
const setMaxAmount = () => {
  increaseAmount.value = vgauAvailableBalance.value
}

// 加载用户资金余额
const loadUserBalances = async () => {
  try {
    console.log('🔄 加载用户资金余额...')
    const response = await userFundsAPI.getBalances()
    console.log('✅ 用户资金余额响应:', response)
    
    if (response && response.data) {
      // 查找 VGAU 的可用余额
      const vgauBalance = response.data.find(balance => balance.currency === 'VGAU')
      if (vgauBalance && vgauBalance.availableAmount) {
        vgauAvailableBalance.value = vgauBalance.availableAmount
        console.log('✅ VGAU 可用余额:', vgauAvailableBalance.value)
      } else {
        console.log('⚠️ 未找到 VGAU 余额信息')
        vgauAvailableBalance.value = '0'
      }
    }
  } catch (error) {
    console.error('❌ 加载用户资金余额失败:', error)
    vgauAvailableBalance.value = '0'
  }
}

// 加载订单数据
const loadOrderData = async () => {
  try {
    console.log('🔄 加载订单数据...')
    
    let order = null
    
    if (currentOrderNumber.value) {
      // 如果有特定订单号，获取该订单的详情
      console.log('📋 获取特定订单详情:', currentOrderNumber.value)
      const response = await loanAPI.getOrderDetail(currentOrderNumber.value)
      if (response && response.success && response.data) {
        order = response.data
        console.log('✅ 特定订单数据获取成功:', order)
      }
    } else {
      // 如果没有特定订单号，获取订单列表并使用第一个
      const response = await loanAPI.getOrders()
      console.log('✅ 订单数据响应:', response)
      
      if (response && response.data) {
        // 获取订单列表
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
          order = orders[0]
          currentOrderNumber.value = order.orderNumber // 保存订单号
        }
      }
    }
    
    if (order) {
      orderData.value = {
        collateralAmount: order.collateralAmount || '0',
        ltvRatio: order.ltvRatioAsPercentage || 0,
        insuranceFee: order.insuranceFeeAmount || '--', // 强平保险费
        currentStakingRatio: order.currentLtvRatio || '--', // 当前质押率
        increaseAmount: '--', // 后端暂无数据
        newLtvRatioAfterAdditional: order.ltvRatioAfterAddingCollateral || order.newLtvRatioAfterAdditional || '--' // 增加抵押金额后的质押率
      }
      console.log('✅ 订单数据加载完成:', orderData.value)
      console.log('📋 当前订单号:', currentOrderNumber.value)
    } else {
      console.log('⚠️ 未找到订单数据')
    }
  } catch (error) {
    console.error('❌ 加载订单数据失败:', error)
  }
}

// 显示确认弹窗
const showConfirmModal = ref(false)

// 当前订单号
const currentOrderNumber = ref('')

// 增加抵押金额API调用
const addCollateral = async () => {
  try {
    console.log('📡 开始增加抵押金额...')
    
    if (!currentOrderNumber.value) {
      throw new Error('无法获取订单号')
    }
    
    // 确保金额是有效的数字
    const amount = parseFloat(increaseAmount.value)
    if (isNaN(amount) || amount <= 0) {
      throw new Error('请输入有效的增加金额')
    }
    
    const requestData = {
      orderNumber: currentOrderNumber.value,
      additionalCollateralAmount: amount
    }
    
    console.log('📤 请求数据:', requestData)
    
    const response = await loanAPI.addCollateral(requestData)
    console.log('✅ 增加抵押金额成功:', response)
    
    if (response && response.success) {
      // 设置成功后的数据
      increasedAmount.value = `${increaseAmount.value}VGAU`
      newCollateralRatio.value = response.data?.newLtvRatio || '65%'
      
      // 显示确认弹窗
      showConfirmModal.value = true
    } else {
      throw new Error(response?.message || '增加抵押金额失败')
    }
  } catch (error) {
    console.error('❌ 增加抵押金额API调用失败:', error)
    throw error
  }
}

// 处理确认
const handleConfirm = async () => {
  if (!increaseAmount.value || parseFloat(increaseAmount.value) <= 0) {
    uni.showToast({
      title: t('common.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  // 检查是否为正整数
  const amount = parseFloat(increaseAmount.value)
  if (!Number.isInteger(amount) || amount <= 0) {
    uni.showToast({
      title: t('common.pleaseEnterPositiveInteger'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  try {
    // 调用增加抵押金额API
    await addCollateral()
  } catch (error) {
    console.error('❌ 增加抵押金额失败:', error)
    uni.showToast({
      title: error.message || '操作失败',
      icon: 'none',
      duration: 3000
    })
  }
}

// 确认弹窗确认操作
const confirmModalAction = () => {
  // 关闭弹窗
  showConfirmModal.value = false
  
  // 返回上一页
  uni.navigateBack()
}

// 页面加载时获取用户余额和订单数据
onMounted(() => {
  // 从URL参数获取订单号
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options || {}
  
  if (options.orderNumber) {
    currentOrderNumber.value = options.orderNumber
    console.log('📋 从URL参数获取订单号:', currentOrderNumber.value)
  }
  
  loadUserBalances()
  loadOrderData()
})
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

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 当前抵押信息区域 */
.current-collateral-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.collateral-info-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.info-title {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.info-value {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.info-details {
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

/* 增加金额输入区域 */
.increase-amount-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.section-label {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-bottom: 16rpx;
}

.amount-input-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 8rpx;
}

.amount-input {
  flex: 1;
  font-size: 28rpx;
  color: #FFFFFF;
  background: transparent;
  border: none;
  outline: none;
}

.amount-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-suffix {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.currency-text {
  font-size: 28rpx;
  color: #FFA500;
  font-weight: 500;
}

.vertical-divider {
  width: 1rpx;
  height: 28rpx;
  background: #FFA500;
  margin: 0 4rpx;
}

.max-text {
  font-size: 28rpx;
  color: #FFA500;
  font-weight: 500;
  cursor: pointer;
}

.divider {
  width: 100%;
  height: 2rpx;
  background: #1A1A1A;
  margin-bottom: 12rpx;
}

.available-balance-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.available-balance {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: right;
}

/* 底部间距区域 */
.bottom-spacing {
  margin-bottom: 600rpx;
}

/* 确认按钮区域 */
.confirm-section {
  margin-top: auto;
  margin-bottom: 80rpx;
}

.confirm-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn:active {
  transform: scale(0.98);
}

.confirm-text {
  font-size: 32rpx;
  color: #000000;
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

/* 模态对话框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #1A1A1A;
  border-radius: 24rpx;
  padding: 80rpx 32rpx;
  margin: 0 48rpx;
  max-width: 600rpx;
  width: 100%;
}

.modal-text {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 48rpx;
  justify-content: center;
  align-items: center;
}

.warning-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
  line-height: 1.5;
}

.instruction-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 400;
  line-height: 1.5;
}

.success-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: bold;
  text-align: center;
}

.success-title .highlight-orange {
  color: #E78B1B; /* 匹配图片中的橙色 */
}

.success-description {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.success-description .highlight-white {
  color: #FFFFFF;
  font-weight: bold;
}

.repayment-amount {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.repayment-after {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.repayment-result {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
}

.white-text {
  color: #FFFFFF;
  font-weight: 400;
}

.success-amount {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.success-result {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
}

.highlight {
  color: #FFA500;
  font-weight: 600;
}

.modal-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(90deg, #E78B1B 0%, #FFC069 100%); /* 渐变色 */
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal-btn-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 600;
}
</style> 
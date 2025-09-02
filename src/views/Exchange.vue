<template>
  <view class="exchange-container">
    <!-- 页面标题和返回按钮 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <view class="back-icon">
          <image src="/static/back.png" class="back-arrow" />
        </view>
      </view>
      <text class="title-text">{{ t('components.exchange.title') }}</text>
    </view>

    <!-- 品牌信息区域 -->
    <view class="brand-section">
      <view class="brand-info">
        <text class="brand-title">{{ t('components.exchange.brandTitle') }}</text>
        <text class="brand-subtitle">{{ t('components.exchange.brandSubtitle') }}</text>
        <text class="brand-description">{{ t('components.exchange.brandDescription') }}</text>
      </view>
      
      <!-- 兑换比率信息 -->
      <view class="rate-info">
        <view class="rate-info-content">
          <text class="rate-text">{{ t('components.exchange.rateText') }}</text>
        </view>
        <!-- 分隔线 -->
        <view class="divider-line"></view>
      </view>
    </view>

    <!-- 兑换输入区域 -->
    <view class="exchange-section">
      <!-- 币种选择 -->
      <view class="currency-selector">
        <text class="currency-text">{{ t('components.exchange.currency1') }}</text>
        <view class="exchange-icon">
          <text class="arrow-icon">→</text>
        </view>
        <text class="currency-text">{{ t('components.exchange.currency2') }}</text>
      </view>

      <!-- 输入框 -->
      <view class="input-container">
        <view class="input-field">
          <input 
            class="input-text" 
            type="number" 
            v-model="exchangeAmount"
            :placeholder="t('components.exchange.exchangeAmountPlaceholder')"
            placeholder-class="placeholder-text"
            :adjust-position="false"
            :hold-keyboard="true"
            :cursor-spacing="200"
          />
          <text class="currency-label">{{ t('components.exchange.currency2') }}</text>
        </view>
      </view>

      <!-- 所需USDT显示 -->
      <view class="required-info">
        <text class="required-label">{{ t('components.exchange.requiredUSDT') }}</text>
        <text class="required-value">{{ requiredUSDT }}</text>
      </view>
    </view>
    
    <!-- 确认兑换按钮 -->
    <view class="confirm-btn" :class="{ 'loading': isLoading }" @click="confirmExchange">
      <text class="confirm-text">{{ isLoading ? getLoadingTitle() : t('components.exchange.confirmExchange') }}</text>
    </view>
  </view>
  

</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n/i18n.js'
import contractExchange from '@/utils/contractExchange.js'

const { t } = useI18n()
// 获取加载弹窗的纯文字标题（避免显示键值对）
const getLoadingTitle = () => {
  try {
    const locale = i18n.global.locale?.value || 'en'
    return locale.startsWith('zh') ? '正在兌換...' : 'Exchanging...'
  } catch (e) {
    return 'Exchanging...'
  }
}

// 兑换数量
const exchangeAmount = ref('')
const isLoading = ref(false)
const currentPrice = ref(120) // 默认价格，将从合约获取

// 计算所需USDT
const requiredUSDT = ref('0')

// 计算所需USDT的函数
const calculateRequiredUSDT = async () => {
  if (!exchangeAmount.value || isNaN(exchangeAmount.value)) {
    requiredUSDT.value = '0'
    return
  }
  
  try {
    const amount = parseFloat(exchangeAmount.value)
    console.log('🔍 计算所需USDT:', amount)
    
    const result = await contractExchange.getRequiredUSDT(amount)
    
    console.log('📊 计算结果:', result)
    // 直接使用数字值，保留两位小数
    requiredUSDT.value = result.formatted.toFixed(2)
  } catch (error) {
    console.error('计算所需USDT失败:', error)
    requiredUSDT.value = '0'
  }
}

// 获取最新价格
const getLatestPrice = async () => {
  try {
    const price = await contractExchange.getLatestGoldPrice()
    // 黄金价格通常有8位小数
    currentPrice.value = parseFloat(price) / Math.pow(10, 8)
    console.log('获取到最新黄金价格:', currentPrice.value)
  } catch (error) {
    console.error('获取价格失败:', error)
    currentPrice.value = 120
  }
}

// 确认兑换
const confirmExchange = async () => {
  if (!exchangeAmount.value || parseFloat(exchangeAmount.value) <= 0) {
    uni.showToast({
      title: i18n.global.t('common.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }

  if (isLoading.value) {
    return
  }

  try {
    isLoading.value = true
    
    // 显示加载提示（使用纯文字，避免键值对显示）
    uni.showLoading({
      title: getLoadingTitle(),
      mask: true
    })

    console.log('🚀 开始USDT兑换VGAU流程...')
    console.log('兑换数量:', exchangeAmount.value, 'VGAU')

    // 调用合约兑换
    const result = await contractExchange.exchangeUsdtToVgau(exchangeAmount.value)
    
    // 隐藏加载提示
    uni.hideLoading()

    console.log('✅ 兑换成功:', result)

    // 显示成功提示
    uni.showToast({
      title: i18n.global.t('components.exchange.exchangeSuccess'),
      icon: 'success',
      duration: 3000
    })

    // 清空输入框
    exchangeAmount.value = ''

    // 可以在这里添加跳转到成功页面或其他逻辑
    setTimeout(() => {
      uni.navigateBack()
    }, 2000)

  } catch (error) {
    console.error('❌ 兑换失败:', error)
    
    // 隐藏加载提示
    uni.hideLoading()
    
    // 显示错误信息
    let errorMessage = i18n.global.t('components.exchange.exchangeFailed')
    
    if (error.errorType === 'KYC_REQUIRED') {
      errorMessage = error.message
    } else if (error.message) {
      if (error.message.includes('余额不足')) {
        errorMessage = error.message
      } else if (error.message.includes('用户取消') || error.message.includes('User rejected')) {
        errorMessage = i18n.global.t('common.userRejected')
      } else if (error.message.includes('网络')) {
        errorMessage = i18n.global.t('common.networkError')
      } else if (error.message.includes('Gas')) {
        errorMessage = i18n.global.t('common.gasInsufficient')
      }
    }

    uni.showModal({
      title: i18n.global.t('common.error'),
      content: errorMessage,
      showCancel: false,
      confirmText: i18n.global.t('common.confirm')
    })
  } finally {
    isLoading.value = false
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 监听兑换数量变化，自动计算所需USDT
watch(exchangeAmount, () => {
  calculateRequiredUSDT()
}, { immediate: false })

// 页面加载时获取最新价格
onMounted(async () => {
  try {
    await getLatestPrice()
  } catch (error) {
    console.error('初始化价格失败:', error)
  }
})
</script>

<style scoped>
.exchange-container {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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

/* 品牌信息区域 */
.brand-section {
  margin: 140rpx 32rpx 0;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.brand-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.brand-title {
  color: #FFFFFF;
  font-size: 72rpx;
  font-weight: 400;
  line-height: 1.11;
  text-align: center;
}

.brand-subtitle {
  color: #FFFFFF;
  font-size: 48rpx;
  font-weight: 400;
  line-height: 1;
  text-align: center;
}

.brand-description {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
  text-align: center;
  max-width: 564rpx;
}

/* 兑换比率信息 */
.rate-info {
  display: flex;
  flex-direction: column;
  padding: 40rpx 0;
}

.rate-info-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rate-text {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 400;
  line-height: 1.56;
}



/* 分隔线 */
.divider-line {
  height: 1rpx;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 40rpx 0 0 0;
}

/* 兑换输入区域 */
.exchange-section {
  margin: 48rpx 32rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  flex: 1;
}

/* 币种选择器 */
.currency-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64rpx;
  padding: 16rpx 0;
}

.currency-text {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.exchange-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  color: #E78B1B;
  font-size: 32rpx;
  font-weight: bold;
}

/* 输入框 */
.input-container {
  margin: 2rpx 0;
}

.input-field {
  position: relative;
  background-color: #181818;
  border: 1rpx solid #222222;
  border-radius: 16rpx;
  padding: 34rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.2);
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.input-text {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  /* 移动端输入优化 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.currency-label {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

/* 确认兑换按钮 */
.confirm-btn {
  background: linear-gradient(90deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
  border-radius: 16rpx;
  padding: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 32rpx 120rpx;
  transition: all 0.3s ease;
}

.confirm-btn.loading {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.6) 0%, rgba(255, 165, 0, 0.6) 100%);
  pointer-events: none;
}

.confirm-text {
  color: #000000;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
}

/* 所需USDT信息 */
.required-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rpx 0;
  margin-top: -8rpx;
}

.required-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.required-value {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .brand-title {
    font-size: 64rpx;
  }
  
  .brand-subtitle {
    font-size: 40rpx;
  }
  
  .rate-text {
    font-size: 32rpx;
  }
}

/* 小屏幕适配 */
@media (max-width: 600rpx) {
  .page-header {
    padding: 20rpx 24rpx 8rpx;
  }
  
  .title-text {
    font-size: 32rpx;
  }
  
  .brand-section {
    margin: 120rpx 24rpx 0;
  }
  
  .exchange-section {
    margin: 48rpx 24rpx;
  }
  
  .currency-selector {
    gap: 48rpx;
  }
  
  .input-field {
    padding: 24rpx;
  }
  
  .confirm-btn {
    padding: 24rpx;
  }
}
</style>
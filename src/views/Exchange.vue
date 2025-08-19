<template>
  <view class="exchange-container">
    <!-- 页面标题和返回按钮 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <view class="back-icon">
          <image src="/static/back.png" class="back-arrow" />
        </view>
      </view>
      <text class="title-text">Exchange</text>
    </view>

    <!-- 品牌信息区域 -->
    <view class="brand-section">
      <view class="brand-info">
        <text class="brand-title">Verifood</text>
        <text class="brand-subtitle">1g Gold = 1 Token</text>
        <text class="brand-description">Blockchain-based physical gold digitalization solution</text>
      </view>
      
      <!-- 兑换比率信息 -->
      <view class="rate-info">
        <view class="rate-info-content">
          <text class="rate-text">1 VGAU = 120 USDT</text>
          <text class="apr-text">15% APR</text>
        </view>
        <!-- 分隔线 -->
        <view class="divider-line"></view>
      </view>
    </view>

    <!-- 兑换输入区域 -->
    <view class="exchange-section">
      <!-- 币种选择 -->
      <view class="currency-selector">
        <text class="currency-text">USDT</text>
                 <view class="exchange-icon">
           <image src="/static/zhuanhuan.png" class="icon-img" />
         </view>
        <text class="currency-text">VGAU</text>
      </view>

      <!-- 输入框 -->
      <view class="input-container">
        <view class="input-field">
          <input 
            class="input-text" 
            type="number" 
            v-model="exchangeAmount"
            placeholder="Enter the quantity to be redeemed"
            placeholder-class="placeholder-text"
            :adjust-position="false"
            :hold-keyboard="true"
            :cursor-spacing="200"
          />
          <text class="currency-label">VGAU</text>
        </view>
      </view>

      <!-- 所需USDT显示 -->
      <view class="required-info">
        <text class="required-label">Required USDT</text>
        <text class="required-value">{{ requiredUSDT }}</text>
      </view>
    </view>
    
    <!-- 确认兑换按钮 -->
    <view class="confirm-btn" @click="confirmExchange">
      <text class="confirm-text">Confirm Exchange</text>
    </view>
  </view>
  

</template>

<script setup>
import { ref, computed } from 'vue'

// 兑换数量
const exchangeAmount = ref('')

// 计算所需USDT
const requiredUSDT = computed(() => {
  if (!exchangeAmount.value || isNaN(exchangeAmount.value)) {
    return '0'
  }
  const amount = parseFloat(exchangeAmount.value)
  return (amount * 120).toFixed(2)
})

// 确认兑换
const confirmExchange = () => {
  if (!exchangeAmount.value || parseFloat(exchangeAmount.value) <= 0) {
    uni.showToast({
      title: 'Please enter a valid amount',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  uni.showToast({
    title: 'Exchange confirmed!',
    icon: 'success',
    duration: 2000
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}
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

.apr-text {
  color: #E78B1B;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
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

.icon-img {
  width: 48rpx;
  height: 48rpx;
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
  
  .apr-text {
    font-size: 28rpx;
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
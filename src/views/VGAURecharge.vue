<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="back-btn" @click="goBack">
          <image class="back-icon" src="/static/back.png" mode="aspectFit"></image>
        </view>
                 <view class="title-container">
           <view class="vgau-icon">
             <image class="vgau-logo" src="/static/VGAU.png" mode="aspectFit"></image>
           </view>
           <view class="title">VGAU Recharge</view>
         </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 数量输入区域 -->
        <view class="amount-section">
          <view class="section-title">Amount</view>
          <view class="input-container">
            <view class="input-field">
              <input 
                class="amount-input" 
                type="number" 
                placeholder="Minimum 0" 
                v-model="amount"
                @input="handleAmountInput"
              />
              <view class="currency-label">VGAU |Max</view>
            </view>
            <view class="divider"></view>
            <view class="redeemable-info">
              <text class="redeemable-label">Redeemable</text>
              <text class="redeemable-amount">48,456,156 VGAU</text>
            </view>
          </view>
        </view>

        <!-- 赎回至区域 -->
        <view class="redeem-to-section">
          <view class="section-header">
            <text class="section-title">Redeem To</text>
            <text class="wallet-label">Bound Wallet Address</text>
          </view>
          <text class="daily-limit">Daily Maximum Redemption Limit: 5000000000 VGAU</text>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" @click="confirmRecharge">
          <text class="confirm-text">Confirm Operation</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  
  // 响应式数据
  const amount = ref('')
  
  // 返回上一页
  const goBack = () => {
    uni.navigateBack()
  }
  
  // 处理金额输入
  const handleAmountInput = (e) => {
    amount.value = e.detail.value
  }
  
  // 确认充值
  const confirmRecharge = () => {
    if (!amount.value || parseFloat(amount.value) <= 0) {
      uni.showToast({
        title: 'Please enter a valid amount',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    uni.showToast({
      title: `Recharge ${amount.value} VGAU Successfully`,
      icon: 'success',
      duration: 2000
    })
    
    // 延迟返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 2000)
  }
</script>

<style lang="scss" scoped>
/* 全局样式 */
.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  background: #0A0A0A;
  padding-top: calc(var(--status-bar-height, 0px) + 20rpx);
}

.header-content {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 32rpx;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.title-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.vgau-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vgau-logo {
  width: 48rpx;
  height: 48rpx;
}

.title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
}

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
}

/* 数量输入区域 */
.amount-section {
  margin-bottom: 32rpx;
}

.section-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-bottom: 40rpx;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.input-field {
  position: relative;
  height: 112rpx;
  background: #1A1A1A;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
}

.amount-input {
  flex: 1;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.2);
  font-size: 32rpx;
  height: 100%;
}

.currency-label {
  font-size: 32rpx;
  color: #FFA500;
  font-weight: 400;
  margin-left: 32rpx;
}

.divider {
  width: 100%;
  height: 2rpx;
  background: #1A1A1A;
}

.redeemable-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
}

.redeemable-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.redeemable-amount {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: right;
}

/* 赎回至区域 */
.redeem-to-section {
  margin-bottom: 600rpx;  
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.wallet-label {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  text-align: right;
}

.daily-limit {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 确认按钮区域 */
.confirm-section {
  margin-bottom: 24rpx;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 80rpx 24rpx 0 24rpx;
  }
  
  .section-title {
    margin-bottom: 48rpx;
  }
}
</style> 
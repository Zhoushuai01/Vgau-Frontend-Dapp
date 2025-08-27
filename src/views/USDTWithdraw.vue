<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <image class="title-icon" src="/static/USDT.png" mode="aspectFit" />
        <text class="title-text">{{ t('usdtWithdraw') }}</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 赎回说明 -->
      <view class="redeem-notice">
        <text class="notice-text">{{ t('selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days') }}</text>
      </view>
      
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 数量输入区域 -->
        <view class="input-section">
          <view class="input-label">
            <text class="label-text">{{ t('totalRedemptionAmount') }}</text>
          </view>
          
          <view class="input-container">
            <view class="input-field">
              <view class="input-border">
                <view class="input-left">
                  <input 
                    class="input-field-text" 
                    type="number" 
                    :placeholder="t('minimum0')" 
                    placeholder-style="color: rgba(255, 255, 255, 0.2); font-size: 32rpx;"
                    v-model="inputAmount"
                  />
                </view>
                <view class="input-currency">
                  <text class="currency-text">{{ t('usdtMax') }}</text>
                </view>
              </view>
            </view>
            
            <view class="balance-info">
              <view class="balance-label">
                <text class="balance-text">{{ t('availableBalance') }}</text>
              </view>
              <view class="balance-amount">
                <text class="amount-text">111.41 USDT</text>
              </view>
            </view>
            
            <view class="fee-info">
              <view class="fee-label">
                <text class="fee-text">{{ t('estimatedFee') }}</text>
              </view>
              <view class="fee-amount">
                <text class="fee-amount-text">0.001 USDT</text>
              </view>
            </view>
            
            <view class="divider"></view>
          </view>
        </view>

        <!-- 提现至区域 -->
        <view class="withdraw-section">
          <view class="withdraw-content">
            <view class="withdraw-label">
              <text class="withdraw-text">{{ t('withdrawTo') }}</text>
            </view>
            <view class="wallet-info">
              <text class="wallet-text">{{ t('boundWalletAddress') }}</text>
            </view>
          </view>
          <view class="daily-limit-section">
            <text class="daily-limit-text">{{ t('dailyMaximumRedemptionLimit') }}</text>
          </view>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-button" @click="handleConfirm">
          <text class="confirm-text">{{ t('confirm') }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 输入金额
const inputAmount = ref('')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 确认操作
const handleConfirm = () => {
  if (!inputAmount.value) {
    uni.showToast({
      title: t('pleaseEnterWithdrawAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  uni.showToast({
    title: t('withdrawFeatureComingSoon'),
    icon: 'none',
    duration: 2000
  })
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
  overflow-x: hidden;
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
  padding: 0 32rpx;
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
  gap: 16rpx;
}

.title-icon {
  width: 48rpx;
  height: 48rpx;
}

.title-text {
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
  padding-top: calc(88rpx + 24rpx);
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
}

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
}

/* 赎回说明 */
.redeem-notice {
  display: flex;
  align-items: center;
  height: 40rpx;
  margin-top: 32rpx;
  margin-bottom: 32rpx;
}

.notice-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 输入区域 */
.input-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 48rpx;
}

.input-label {
  display: flex;
  align-items: center;
  height: 40rpx;
  margin-bottom: 16rpx;
}

.label-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.input-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-border {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112rpx;
  background-color: #1A1A1A;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  padding: 0 32rpx;
}

.input-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.input-field-text {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.input-currency {
  display: flex;
  align-items: center;
}

.currency-text {
  font-size: 32rpx;
  color: #FFA500;
  font-weight: 400;
}

.balance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40rpx;
}

.balance-label {
  display: flex;
  align-items: center;
}

.balance-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  display: flex;
  align-items: center;
}

.amount-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.fee-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32rpx;
  margin-top: 8rpx;
}

.fee-label {
  display: flex;
  align-items: center;
}

.fee-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.fee-amount {
  display: flex;
  align-items: center;
}

.fee-amount-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.divider {
  width: 100%;
  height: 2rpx;
  background-color: #1A1A1A;
}

/* 提现至区域 */
.withdraw-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 600rpx;
}

.withdraw-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 168rpx;
}

.withdraw-label {
  display: flex;
  align-items: center;
}

.withdraw-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.wallet-info {
  display: flex;
  align-items: center;
}

.wallet-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  text-align: right;
}

.daily-limit-section {
  display: flex;
  align-items: center;
  height: 40rpx;
  margin-top: 8rpx;
}

.daily-limit-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 确认按钮区域 */
.confirm-section {
  margin-bottom: 24rpx;
}

.confirm-button {
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

.confirm-button:active {
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

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 80rpx 24rpx 0 24rpx;
  }
  
  .input-label {
    margin-bottom: 48rpx;
  }
}
</style> 
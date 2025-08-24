<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">Lending</text>
      </view>
      <view class="history-button">
        <image class="history-icon" src="/static/history.png" mode="aspectFit" />
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
             <!-- 提示信息 -->
       <view class="notice-section">
         <view class="notice-content">
           <view class="info-button" @click="goToInfoPage">
             <text class="info-icon">!</text>
           </view>
           <text class="notice-text">Pledged VGAU assets will not receive capital protection rewards</text>
         </view>
       </view>

      <!-- 借贷参数区域 -->
      <!-- 借贷参数区域 -->
      <view class="parameters-section">
                 <view class="parameter-item">
           <text class="parameter-label">Collateral Quantity</text>
          <view class="input-container">
            <input class="amount-input" 
                   type="number" 
                   placeholder="Enter amount" 
                   v-model="collateralAmount"
                   :adjust-position="false" />
            <view class="input-suffix">
              <text class="currency-text">VGAU</text>
              <view class="divider"></view>
              <text class="max-text" @click="setMaxCollateral">MAX</text>
            </view>
          </view>
                     <view class="available-balance">
             <text class="balance-label">Available Assets</text>
             <text class="balance-amount">48,456,156 VGAU</text>
           </view>
        </view>

                 <view class="parameter-item">
           <text class="parameter-label">Available to Borrow</text>
          <view class="input-container">
            <input class="amount-input" 
                   type="number" 
                   placeholder="Enter amount" 
                   v-model="borrowAmount"
                   :adjust-position="false" />
                         <view class="input-suffix">
               <text class="currency-text-white">USDT</text>
             </view>
                     </view>
         </view>
      </view>

             <!-- 借贷详情区域 -->
       <view class="details-section">
         <!-- 第一部分：抵押和清算相关比率 -->
         <view class="details-part">
           <view class="detail-item">
             <text class="detail-label">Liquidation Insurance Fee</text>
             <text class="detail-value">--</text>
           </view>
           
           <view class="detail-item">
             <text class="detail-label">Initial Collateral Ratio</text>
             <text class="detail-value">78%</text>
           </view>
           
           <view class="detail-item">
             <text class="detail-label">Additional Margin</text>
             <text class="detail-value">85%</text>
           </view>
           
           <view class="detail-item">
             <text class="detail-label">Forced Liquidation Collateral Ratio</text>
             <text class="detail-value">91%</text>
           </view>
         </view>
         
         <!-- 分割线 -->
         <view class="divider-line"></view>
         
         <!-- 第二部分：利率和参考价格 -->
         <view class="details-part">
           <view class="detail-item">
             <text class="detail-label">Annual Interest Rate</text>
             <text class="detail-value">8.18%</text>
           </view>
           
           <view class="detail-item">
             <text class="detail-label">Net Annualized Interest Rate</text>
             <text class="detail-value">0.00%</text>
           </view>
           
           <view class="detail-item">
             <text class="detail-label">Estimated Hourly Interest Rate</text>
             <text class="detail-value">--</text>
           </view>
           
           <view class="detail-item">
             <text class="detail-label">Liquidation Reference Price (VGAU/USDT)</text>
             <text class="detail-value">0 兑</text>
           </view>
         </view>
       </view>

             <!-- 确认按钮 -->
       <view class="confirm-section">
         <view class="confirm-btn" @click="handleConfirm">
           <text class="confirm-text">Confirm Lending</text>
         </view>
       </view>
     </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 借贷金额
const collateralAmount = ref('')
const borrowAmount = ref('')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到信息页面
const goToInfoPage = () => {
  uni.navigateTo({
    url: '/views/InfoPage'
  })
}



// 设置最大抵押金额
const setMaxCollateral = () => {
  collateralAmount.value = '48456156'
}

// 设置最大借贷金额
const setMaxBorrow = () => {
  borrowAmount.value = '32304'
}

// 处理确认
const handleConfirm = () => {
  if (!collateralAmount.value || !borrowAmount.value) {
    uni.showToast({
      title: 'Please enter valid amounts',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  uni.showToast({
    title: 'Lending confirmed successfully',
    icon: 'success',
    duration: 2000
  })
  
  setTimeout(() => {
    uni.navigateBack()
  }, 2000)
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

.history-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
}

.history-icon {
  width: 48rpx;
  height: 48rpx;
}

.page-title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-text {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 提示信息区域 */
.notice-section {
  margin-bottom: 16rpx;
}

.notice-content {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.info-button {
  width: 32rpx;
  height: 32rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.info-button:active {
  transform: scale(0.95);
}

.info-icon {
  font-size: 20rpx;
  color: #000000;
  font-weight: bold;
}

.notice-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.4;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32rpx;
  gap: 32rpx;
  padding-top: 120rpx;
}



/* 借贷参数区域 */
.parameters-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.parameter-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.parameter-label {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.input-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
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

.currency-text-white {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.divider {
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

.available-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

/* 借贷详情区域 */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.details-part {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.divider-line {
  height: 1rpx;
  background: rgba(255, 255, 255, 0.1);
  margin: 8rpx 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  text-align: right;
}

/* 确认按钮区域 */
.confirm-section {
  padding: 32rpx 0;
  margin-top: auto;
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
  font-weight: 500;
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
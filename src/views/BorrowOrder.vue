<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">Borrow Order</text>
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
        <text class="notification-text">Borrowed USDT will immediately arrive in USDT withdrawal's borrowed funds</text>
      </view>

      <!-- 总负债区域 -->
      <view class="total-liabilities-section">
        <view class="liabilities-card">
          <text class="liabilities-label">Total Liabilities (USDT)</text>
          <text class="liabilities-value">512.16516151</text>
        </view>
      </view>

      <!-- 抵押项目列表 -->
      <view class="collateral-list">
        <!-- 第一个抵押项目 -->
        <view class="collateral-card">
          <view class="collateral-header">
            <text class="collateral-title">Collateral Amount (VGAU)</text>
            <text class="collateral-amount">100</text>
          </view>
          
          <view class="collateral-details">
            <view class="detail-item">
              <text class="detail-label">Pledge Ratio</text>
              <text class="detail-value">80%</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Net Annualized Interest Rate</text>
              <text class="detail-value positive">20.24%</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Liquidation Reference Price (VGAU/USDT)</text>
              <text class="detail-value">84.225</text>
            </view>
          </view>
          
          <view class="action-buttons">
            <view class="action-btn" @click="increaseCollateral">
              <text class="btn-text">Increase Collateral Amount</text>
            </view>
            <view class="action-btn" @click="adjustPledgeRatio">
              <text class="btn-text">Adjust Pledge Ratio</text>
            </view>
          </view>
        </view>

        <!-- 第二个抵押项目 -->
        <view class="collateral-card">
          <view class="collateral-header">
            <text class="collateral-title">Collateral Amount (VGAU)</text>
            <text class="collateral-amount">100</text>
          </view>
          
          <view class="collateral-details">
            <view class="detail-item">
              <text class="detail-label">Pledge Ratio</text>
              <text class="detail-value">30%</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Net Annualized Interest Rate</text>
              <text class="detail-value negative">-2.24%</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Liquidation Reference Price (VGAU/USDT)</text>
              <text class="detail-value">84.225</text>
            </view>
          </view>
          
          <view class="action-buttons">
            <view class="action-btn" @click="increaseCollateral">
              <text class="btn-text">Increase Collateral Amount</text>
            </view>
            <view class="action-btn" @click="adjustPledgeRatio">
              <text class="btn-text">Adjust Pledge Ratio</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部加载完成提示 -->
      <view class="footer-section">
        <text class="footer-text">All loaded</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 显示记录
const showRecords = () => {
  uni.showToast({
    title: 'Records feature coming soon',
    icon: 'none',
    duration: 2000
  })
}

// 增加抵押金额
const increaseCollateral = () => {
  // 跳转到增加抵押金额页面
  uni.navigateTo({
    url: '/views/IncreaseCollateral'
  })
}

// 调整抵押率
const adjustPledgeRatio = () => {
  uni.showToast({
    title: 'Adjust pledge ratio feature coming soon',
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
<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">My Finance</text>
      </view>
      <view class="history-button" @click="viewHistory">
        <image class="history-icon" src="/static/history.png" mode="aspectFit" />
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 赎回说明 -->
      <view class="redemption-notice">
        <text class="notice-text">Selected assets will be immediately redeemed to your account</text>
      </view>

      <!-- 可赎回资产卡片 -->
      <view class="asset-card">
        <view class="asset-info">
          <view class="info-row">
            <text class="info-label">Asset</text>
            <text class="info-value">2 VGAU</text>
          </view>
          <view class="info-row">
            <text class="info-label">Maturity Yield</text>
            <text class="info-value">1 USDT</text>
          </view>
          <view class="info-row">
            <text class="info-label">Start Time</text>
            <text class="info-value">2025-07-16</text>
          </view>
          <view class="info-row">
            <text class="info-label">End Time</text>
            <text class="info-value">2025-07-18</text>
          </view>
        </view>
        <view class="status-button redeemable-btn">
          <text class="status-text">Redeemable</text>
        </view>
      </view>

      <!-- 质押中资产卡片 -->
      <view class="asset-card">
        <view class="asset-info">
          <view class="info-row">
            <text class="info-label">Asset</text>
            <text class="info-value">2 VGAU</text>
          </view>
          <view class="info-row">
            <text class="info-label">Maturity Yield</text>
            <text class="info-value">1 USDT</text>
          </view>
          <view class="info-row">
            <text class="info-label">Start Time</text>
            <text class="info-value">2025-07-16</text>
          </view>
          <view class="info-row">
            <text class="info-label">End Time</text>
            <text class="info-value">2025-07-18</text>
          </view>
        </view>
        <view class="status-button staking-btn">
          <text class="status-text">Staking</text>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-status">
        <text class="loading-text">All loaded</text>
      </view>
    </view>

    <!-- 底部赎回按钮 -->
    <view class="bottom-button-section">
      <view class="redeem-button" @click="handleRedeem">
        <text class="redeem-text">Redeem</text>
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

// 查看历史记录
const viewHistory = () => {
  uni.showToast({
    title: 'History feature coming soon',
    icon: 'none',
    duration: 2000
  })
}

// 处理赎回
const handleRedeem = () => {
  uni.showToast({
    title: 'Redeem feature coming soon',
    icon: 'none',
    duration: 2000
  })
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

.history-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  margin-left: 24rpx;
}

.history-icon {
  width: 48rpx;
  height: 48rpx;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  padding-top: 120rpx;
  padding-bottom: 120rpx;
}

/* 赎回说明 */
.redemption-notice {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.notice-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 资产卡片 */
.asset-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 40rpx;
  margin-bottom: 24rpx;
}

.asset-info {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 32rpx;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.info-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 状态按钮 */
.status-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-radius: 12rpx;
  width: 100%;
}

.redeemable-btn {
  background: #FFFFFF;
}

.staking-btn {
  background: rgba(255, 255, 255, 0.1);
}

.status-text {
  font-size: 28rpx;
  font-weight: 500;
}

.redeemable-btn .status-text {
  color: #000000;
}

.staking-btn .status-text {
  color: #FFFFFF;
}

/* 加载状态 */
.loading-status {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
}

.loading-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 底部赎回按钮 */
.bottom-button-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 24rpx;
  background-color: #0A0A0A;
  border-top: 1rpx solid #1A1A1A;
}

.redeem-button {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.redeem-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 500;
}
</style> 
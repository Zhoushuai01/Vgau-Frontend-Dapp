<template>
  <view class="content">
    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 顶部轮播图区域 -->
      <view class="hero-section">
        <view class="hero-image">
          <view class="banner-placeholder">
            <text class="banner-text">VGAU Ecosystem Banner</text>
          </view>
          <view class="hero-overlay">
            <text class="hero-title">VGAU Ecosystem</text>
            <text class="hero-subtitle">Building a comprehensive DeFi ecosystem</text>
          </view>
        </view>
        <view class="carousel-dots">
          <view class="dot active"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
      </view>

      <!-- 横向游戏图标区域 -->
      <view class="horizontal-games">
        <view class="game-item">
          <view class="game-icon">
            <text class="game-icon-text">🎮</text>
          </view>
          <text class="game-label">Eco Mini Game</text>
        </view>
        <view class="game-item">
          <view class="game-icon">
            <text class="game-icon-text">🏆</text>
          </view>
          <text class="game-label">Eco Mini Game</text>
        </view>
        <view class="game-item">
          <view class="game-icon">
            <text class="game-icon-text">🌟</text>
          </view>
          <text class="game-label">Eco Mini Game</text>
        </view>
        <view class="game-item">
          <view class="game-icon">
            <text class="game-icon-text">💎</text>
          </view>
          <text class="game-label">Eco Mini Game</text>
        </view>
      </view>

      <!-- 垂直游戏列表区域 -->
      <view class="vertical-games">
        <view class="game-row">
          <view class="game-icon-small">
            <text class="game-icon-text-small">🚀</text>
          </view>
          <view class="game-info">
            <text class="game-title">Eco Mini Games</text>
            <text class="game-description">Description</text>
          </view>
          <view class="game-arrow">▶</view>
        </view>
        
        <view class="game-row">
          <view class="game-icon-small">
            <text class="game-icon-text-small">🎯</text>
          </view>
          <view class="game-info">
            <text class="game-title">Eco Mini Games</text>
            <text class="game-description">Description</text>
          </view>
          <view class="game-arrow">▶</view>
        </view>
        
        <view class="game-row">
          <view class="game-icon-small">
            <text class="game-icon-text-small">🎲</text>
          </view>
          <view class="game-info">
            <text class="game-title">Eco Mini Games</text>
            <text class="game-description">Description</text>
          </view>
          <view class="game-arrow">▶</view>
        </view>
        
        <view class="game-row">
          <view class="game-icon-small">
            <text class="game-icon-text-small">🎪</text>
          </view>
          <view class="game-info">
            <text class="game-title">Eco Mini Games</text>
            <text class="game-description">Description</text>
          </view>
          <view class="game-arrow">▶</view>
        </view>
        
        <view class="game-row">
          <view class="game-icon-small">
            <text class="game-icon-text-small">🎨</text>
          </view>
          <view class="game-info">
            <text class="game-title">Eco Mini Games</text>
            <text class="game-description">Description</text>
          </view>
          <view class="game-arrow">▶</view>
        </view>
        
        <view class="game-row">
          <view class="game-icon-small placeholder">
            <text class="game-icon-text-small">?</text>
          </view>
          <view class="game-info">
            <text class="game-title">Eco Mini Games</text>
            <text class="game-description">Description</text>
          </view>
          <view class="game-arrow">▶</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Ecology页面加载完成')
})
</script>

<style lang="scss" scoped>
/* 全局背景色 */
:deep(body), :deep(html) {
  background-color: #0A0A0A !important;
}

/* 全局Toast样式覆盖 */
:deep(.uni-toast),
:deep(.uni-toast__content),
:deep(.uni-toast--center),
:deep(.uni-toast--top),
:deep(.uni-toast--bottom) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32rpx;
  background-color: #0A0A0A;
}

/* 顶部轮播图区域 */
.hero-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 40rpx;
}

.hero-image {
  position: relative;
  width: 100%;
  height: 352rpx;
  border-radius: 16rpx;
  overflow: hidden;
  margin-bottom: 24rpx;
}

.banner-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-text {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.6);
  font-family: Inter, sans-serif;
  text-align: center;
}

.banner-img {
  width: 100%;
  height: 100%;
}

.hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx 32rpx;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.hero-title {
  font-size: 48rpx;
  font-weight: 700;
  color: #FFFFFF;
  font-family: Inter, sans-serif;
}

.hero-subtitle {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter, sans-serif;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 16rpx;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #FFFFFF;
  transform: scale(1.2);
}

/* 横向游戏图标区域 */
.horizontal-games {
  display: flex;
  gap: 24rpx;
  margin-bottom: 40rpx;
  overflow-x: auto;
  padding: 0 0 16rpx 0;
}

.game-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
}

.game-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-icon-text {
  font-size: 48rpx;
  color: #FFFFFF;
}

.game-icon image {
  width: 100%;
  height: 100%;
}

.game-label {
  font-size: 24rpx;
  color: #FFFFFF;
  font-family: Inter, sans-serif;
  text-align: center;
  max-width: 120rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 垂直游戏列表区域 */
.vertical-games {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.game-row {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #1A1A1A;
}

.game-row:last-child {
  border-bottom: none;
}

.game-icon-small {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #1A1A1A;
  margin-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-icon-text-small {
  font-size: 32rpx;
  color: #FFFFFF;
}

.game-icon-small image {
  width: 100%;
  height: 100%;
}

.game-icon-small.placeholder {
  background-color: #222222;
}

.game-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.game-title {
  font-size: 30rpx;
  color: #FFFFFF;
  font-family: Inter, sans-serif;
  font-weight: 400;
}

.game-description {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
  font-family: Inter, sans-serif;
}

.game-arrow {
  width: 32rpx;
  height: 32rpx;
  background-color: #1A1A1A;
  border-radius: 4rpx;
  margin-left: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 20rpx;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 0 24rpx;
  }
  
  .hero-title {
    font-size: 40rpx;
  }
  
  .hero-subtitle {
    font-size: 24rpx;
  }
  
  .game-icon {
    width: 100rpx;
    height: 100rpx;
  }
  
  .game-icon-small {
    width: 80rpx;
    height: 80rpx;
  }
}
</style> 
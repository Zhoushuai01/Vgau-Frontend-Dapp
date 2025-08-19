<template>
  <view class="content">


    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 页面标题区域 -->
      <view class="page-header">
        <text class="main-title">VGAU Ecosystem</text>
        <text class="sub-title">Building a comprehensive DeFi ecosystem for gold digitization</text>
      </view>

      <!-- 生态系统卡片区域 -->
      <view class="ecosystem-section">
        <!-- 核心协议卡片 -->
        <view class="ecosystem-card core-protocol">
          <view class="card-header">
            <view class="card-icon">🔗</view>
            <text class="card-title">Core Protocol</text>
          </view>
          <text class="card-desc">VGAU token and gold backing mechanism</text>
          <view class="card-features">
            <view class="feature-item">
              <text class="feature-text">• Gold-backed tokens</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Transparent auditing</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Regulatory compliance</text>
            </view>
          </view>
        </view>

        <!-- DeFi服务卡片 -->
        <view class="ecosystem-card defi-services">
          <view class="card-header">
            <view class="card-icon">💰</view>
            <text class="card-title">DeFi Services</text>
          </view>
          <text class="card-desc">Comprehensive financial services built on VGAU</text>
          <view class="card-features">
            <view class="feature-item">
              <text class="feature-text">• Yield farming</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Liquidity pools</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Lending protocols</text>
            </view>
          </view>
        </view>

        <!-- 合作伙伴卡片 -->
        <view class="ecosystem-card partnerships">
          <view class="card-header">
            <view class="card-icon">🤝</view>
            <text class="card-title">Partnerships</text>
          </view>
          <text class="card-desc">Strategic alliances with industry leaders</text>
          <view class="card-features">
            <view class="feature-item">
              <text class="feature-text">• Mining companies</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Financial institutions</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Technology providers</text>
            </view>
          </view>
        </view>

        <!-- 治理代币卡片 -->
        <view class="ecosystem-card governance">
          <view class="card-header">
            <view class="card-icon">🏛️</view>
            <text class="card-title">Governance</text>
          </view>
          <text class="card-desc">Community-driven decision making</text>
          <view class="card-features">
            <view class="feature-item">
              <text class="feature-text">• DAO voting</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Proposal system</text>
            </view>
            <view class="feature-item">
              <text class="feature-text">• Treasury management</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 统计数据区域 -->
      <view class="stats-section">
        <view class="stats-title">
          <text class="stats-main-title">Ecosystem Metrics</text>
        </view>
        <view class="stats-grid">
          <view class="stat-item">
            <text class="stat-number">$50M+</text>
            <text class="stat-label">Total Value Locked</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">10K+</text>
            <text class="stat-label">Active Users</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">25+</text>
            <text class="stat-label">Partners</text>
          </view>
          <view class="stat-item">
            <text class="stat-number">5+</text>
            <text class="stat-label">Blockchains</text>
          </view>
        </view>
      </view>

      <!-- 路线图区域 -->
      <view class="roadmap-section">
        <view class="roadmap-title">
          <text class="roadmap-main-title">Development Roadmap</text>
        </view>
        <view class="roadmap-timeline">
          <view class="timeline-item completed">
            <view class="timeline-dot"></view>
            <view class="timeline-content">
              <text class="timeline-phase">Phase 1</text>
              <text class="timeline-title">Core Protocol Launch</text>
              <text class="timeline-desc">VGAU token launch and gold backing mechanism</text>
              <text class="timeline-status">Completed</text>
            </view>
          </view>
          <view class="timeline-item active">
            <view class="timeline-dot"></view>
            <view class="timeline-content">
              <text class="timeline-phase">Phase 2</text>
              <text class="timeline-title">DeFi Services</text>
              <text class="timeline-desc">Yield farming and liquidity pools</text>
              <text class="timeline-status">In Progress</text>
            </view>
          </view>
          <view class="timeline-item">
            <view class="timeline-dot"></view>
            <view class="timeline-content">
              <text class="timeline-phase">Phase 3</text>
              <text class="timeline-title">Cross-chain Expansion</text>
              <text class="timeline-desc">Multi-blockchain support</text>
              <text class="timeline-status">Planned</text>
            </view>
          </view>
          <view class="timeline-item">
            <view class="timeline-dot"></view>
            <view class="timeline-content">
              <text class="timeline-phase">Phase 4</text>
              <text class="timeline-title">Institutional Adoption</text>
              <text class="timeline-desc">Enterprise solutions and partnerships</text>
              <text class="timeline-status">Planned</text>
            </view>
          </view>
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
}



.main-content {
  display: flex;
  flex-direction: column;
  padding: 0 32rpx 40rpx 32rpx;
  min-height: 100vh;
  background-color: #0A0A0A;
}

/* 页面标题区域 */
.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60rpx;
}

.main-title {
  font-size: 64rpx;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 24rpx;
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sub-title {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  max-width: 600rpx;
}

/* 生态系统卡片区域 */
.ecosystem-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 60rpx;
}

.ecosystem-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 24rpx;
  padding: 40rpx;
  transition: all 0.3s ease;
}

.ecosystem-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-4rpx);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.card-icon {
  font-size: 48rpx;
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.1);
  border-radius: 16rpx;
}

.card-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.card-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 32rpx;
}

.card-features {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.feature-item {
  display: flex;
  align-items: center;
}

.feature-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

/* 统计数据区域 */
.stats-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 60rpx;
}

.stats-title {
  text-align: center;
  margin-bottom: 40rpx;
}

.stats-main-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.stats-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 32rpx;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 200rpx;
}

.stat-number {
  font-size: 48rpx;
  font-weight: 700;
  color: #FFD700;
  margin-bottom: 16rpx;
}

.stat-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
}

/* 路线图区域 */
.roadmap-section {
  display: flex;
  flex-direction: column;
}

.roadmap-title {
  text-align: center;
  margin-bottom: 40rpx;
}

.roadmap-main-title {
  font-size: 48rpx;
  font-weight: 600;
  color: #FFFFFF;
}

.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
  position: relative;
}

.timeline-dot {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #FFD700;
  flex-shrink: 0;
  margin-top: 8rpx;
}

.timeline-item.completed .timeline-dot {
  background: #00CC66;
}

.timeline-item.active .timeline-dot {
  background: #FFD700;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.timeline-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.timeline-phase {
  font-size: 24rpx;
  color: #FFD700;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.timeline-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.timeline-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.timeline-status {
  font-size: 20rpx;
  color: #00CC66;
  font-weight: 500;
  padding: 8rpx 16rpx;
  background: rgba(0, 204, 102, 0.1);
  border-radius: 12rpx;
  align-self: flex-start;
}

.timeline-item.completed .timeline-status {
  color: #00CC66;
}

.timeline-item.active .timeline-status {
  color: #FFD700;
  background: rgba(255, 215, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-title {
    font-size: 48rpx;
  }
  
  .sub-title {
    font-size: 28rpx;
  }
  
  .ecosystem-card {
    padding: 32rpx 24rpx;
  }
  
  .stats-grid {
    gap: 24rpx;
  }
  
  .stat-item {
    min-width: 160rpx;
  }
}
</style> 
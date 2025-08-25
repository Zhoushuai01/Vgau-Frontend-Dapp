<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">Financial Products</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 标签页切换 -->
      <view class="tab-section">
        <view class="tab-container">
          <view class="tab-item" :class="{ active: currentTab === 'profit-risk' }" @click="switchTab('profit-risk')">
            <text class="tab-text">Returns & Risks</text>
            <view class="tab-line" v-if="currentTab === 'profit-risk'"></view>
          </view>
          <view class="tab-item" :class="{ active: currentTab === 'profit-source' }" @click="switchTab('profit-source')">
            <text class="tab-text">Return Sources</text>
            <view class="tab-line" v-if="currentTab === 'profit-source'"></view>
          </view>
        </view>
      </view>

      <!-- 收益与风险内容 -->
      <view v-if="currentTab === 'profit-risk'">
        <!-- 产品介绍 -->
        <view class="product-intro">
                  <text class="intro-text">
          What are financial products?
          This is a digital asset appreciation scheme anchored to gold. When users purchase and hold VGAU Tokens, they represent deposits of equivalent physical gold, and asset values fluctuate with market conditions.
          In their accounts, users can participate in different term and rule-based yield schemes with VGAU, and the system will generate rewards according to the rules. Rewards in the account need to be claimed manually.
          Rewards in financial products accumulate in real-time to meet different asset management needs.
        </text>
        </view>
                 <!-- 优势部分 -->
         <view class="advantages-section">
           <view class="section-header">
             <view class="advantage-icon">
               <image class="icon-image" src="/static/DiFi/youshi.png" mode="aspectFit" />
             </view>
             <text class="section-title">Advantages</text>
           </view>

           <view class="advantages-list">
             <!-- 优势1 -->
             <view class="advantage-item">
               <view class="advantage-card">
                 <view class="advantage-content">
                   <view class="advantage-icon-container">
                     <image class="advantage-icon-image" src="/static/DiFi/huoqi.png" mode="aspectFit" />
                   </view>
                   <view class="advantage-text">
                     <text class="advantage-title">Flexible Products Available for Redemption</text>
                     <text class="advantage-desc">Users can subscribe and redeem flexible products at any time.</text>
                   </view>
                 </view>
               </view>
             </view>

             <!-- 优势2 -->
             <view class="advantage-item">
               <view class="advantage-card">
                 <view class="advantage-content">
                   <view class="advantage-icon-container">
                     <image class="advantage-icon-image" src="/static/DiFi/dingqi.png" mode="aspectFit" />
                   </view>
                   <view class="advantage-text">
                     <text class="advantage-title">Fixed-term Products Offer Higher APY</text>
                     <text class="advantage-desc">Fixed-term products have fixed terms, but their annualized yields are typically higher than flexible products.</text>
                   </view>
                 </view>
               </view>
             </view>

             <!-- 优势3 -->
             <view class="advantage-item">
               <view class="advantage-card">
                 <view class="advantage-content">
                   <view class="advantage-icon-container">
                     <image class="advantage-icon-image" src="/static/DiFi/shuhui.png" mode="aspectFit" />
                   </view>
                   <view class="advantage-text">
                     <text class="advantage-title">Manual Redemption of Interest Earnings</text>
                     <text class="advantage-desc">Daily USDT earnings will automatically go to the withdrawal balance, which needs to be manually withdrawn.</text>
                   </view>
                 </view>
               </view>
             </view>
           </view>
         </view>

                 <!-- 风险部分 -->
         <view class="risk-section">
           <view class="section-header">
             <view class="risk-icon">
               <image class="icon-image" src="/static/DiFi/fengxian.png" mode="aspectFit" />
             </view>
             <text class="section-title">Risks</text>
           </view>

           <view class="risk-item">
             <view class="risk-card">
               <view class="risk-content">
                 <view class="risk-icon-container">
                   <image class="advantage-icon-image" src="/static/DiFi/fengxain2.png" mode="aspectFit" />
                 </view>
                 <view class="risk-text">
                   <text class="risk-title">Very Low Risk</text>
                   <text class="risk-desc">Digital asset prices may fluctuate. If there are too many redemption requests, it may lead to temporarily insufficient available redemption balance, resulting in delayed redemption. Rest assured, your assets are always safe and secure.</text>
                 </view>
               </view>
             </view>
           </view>
         </view>
       </view>

       <!-- 收益来源内容 -->
       <view v-if="currentTab === 'profit-source'" class="profit-source-section">
         <text class="source-content-text">
           Each of your tokens (1 VGAU = 1g physical gold) corresponds to
           the physical gold held in our African mining areas and audited by
           authoritative institutions. The stable returns you earn through
           staking come from the project team's active management and
           operation of the underlying gold assets.
         </text>
       </view>

       <!-- 确认按钮 -->
       <view v-if="currentTab === 'profit-risk'" class="confirm-section">
         <view class="confirm-btn" @click="handleConfirm">
           <text class="confirm-text">Confirm</text>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 当前选中的标签页
const currentTab = ref('profit-risk')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 切换标签页
const switchTab = (tab) => {
  currentTab.value = tab
}

// 处理确认
const handleConfirm = () => {
  uni.navigateBack()
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

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
  padding-top: 120rpx;
}

/* 产品介绍 */
.product-intro {
  margin-bottom: 32rpx;
}

.intro-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  line-height: 1.7;
  text-align: left;
}

/* 标签页切换 */
.tab-section {
  margin-bottom: 32rpx;
  margin-top: 16rpx;
}

.tab-container {
  display: flex;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16rpx 32rpx;
  position: relative;
}

.tab-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-bottom: 8rpx;
}

.tab-item.active .tab-text {
  color: #FFA700;
}

.tab-line {
  width: 160rpx;
  height: 2rpx;
  background: #E78B1B;
  position: absolute;
  bottom: -1rpx;
}

/* 优势部分 */
.advantages-section {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.advantage-icon, .risk-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
}

.icon-image {
  width: 48rpx;
  height: 48rpx;
}

.section-title {
  font-size: 40rpx;
  color: #FFA700;
  font-weight: 400;
}

.advantages-list {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.advantage-item {
  width: 100%;
}

.advantage-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 34rpx;
}

.advantage-content {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.advantage-icon-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}



.advantage-icon-image {
  width: 64rpx;
  height: 64rpx;
}

.advantage-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.advantage-title {
  font-size: 32rpx;
  color: #FFA700;
  font-weight: 400;
}

.advantage-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  line-height: 1.4;
}

/* 风险部分 */
.risk-section {
  margin-bottom: 48rpx;
}

.risk-item {
  width: 100%;
}

.risk-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 34rpx;
}

.risk-content {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.risk-icon-container {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}



.risk-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.risk-title {
  font-size: 32rpx;
  color: #FFA700;
  font-weight: 400;
}

.risk-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  line-height: 1.4;
}

/* 收益来源部分 */
.profit-source-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 48rpx;
}

.source-content-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  line-height: 1.6;
  text-align: left;
}

/* 确认按钮区域 */
.confirm-section {
  margin-top: auto;
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
</style> 
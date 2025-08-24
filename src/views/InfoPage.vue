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
          <view class="tab-item" :class="{ active: activeTab === 'glossary' }" @click="switchTab('glossary')">
            <text class="tab-text">Glossary</text>
          </view>
          <view class="tab-item" :class="{ active: activeTab === 'rules' }" @click="switchTab('rules')">
            <text class="tab-text">Repayment Rules</text>
          </view>
        </view>
      </view>

      <!-- 名词解释内容 -->
      <view class="content-section" v-if="activeTab === 'glossary'">
        <!-- 强平保险费 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">Forced Liquidation Insurance Fee</text>
          </view>
          <view class="item-content">
            <text class="content-text">When borrowing, the platform will calculate a forced liquidation insurance fee of 2% of the maximum borrowable amount based on the initial pledge rate. This fee will be deducted from the borrowable amount.</text>
            <text class="content-text">After the borrower fully repays the loan, the platform will refund the corresponding forced liquidation insurance fee to their USDT lending account.</text>
            <text class="content-text">If a crypto borrowing order undergoes forced liquidation, the platform will charge this forced liquidation insurance fee.</text>
          </view>
        </view>

        <!-- 质押率注释 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">Pledge Rate Annotation</text>
          </view>
          <view class="item-content">
                         <view class="sub-item">
               <text class="sub-title">Current Pledge Rate</text>
               <text class="content-text">Pledge rate, or LTV (Loan-to-Value), represents the ratio between the borrowed digital assets and the value of the collateral (calculated based on the collateral). Asset value is calculated based on price indices of different cryptocurrencies.</text>
             </view>
             <view class="sub-item">
               <text class="sub-title">Initial Pledge Rate <text class="percentage">78%</text></text>
               <text class="content-text">Initial pledge rate is the initial ratio between the value of the collateral you need to provide and your loan amount.</text>
             </view>
             <view class="sub-item">
               <text class="sub-title">Margin Call <text class="percentage">85%</text></text>
               <text class="content-text">Margin call pledge rate is the warning line when the loan contract approaches the forced liquidation pledge rate.</text>
             </view>
             <view class="sub-item">
               <text class="sub-title">Forced Liquidation Pledge Rate <text class="percentage">91%</text></text>
               <text class="content-text">If your pledge rate reaches the forced liquidation pledge rate, the system will immediately execute forced liquidation, using your collateral assets to repay your money market loan, and will charge a 2% forced liquidation fee on the loan amount.</text>
             </view>
          </view>
        </view>

        <!-- 净年化利率 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">Net Annualized Interest Rate</text>
          </view>
          <view class="item-content">
            <text class="content-text">Collateral assets will continue to earn real-time annualized interest rewards, helping to offset crypto borrowing costs. Net Annualized Interest Rate = Annual Interest Rate - (Real-time Annual Interest Rate of Collateral / Initial Pledge Rate)</text>
          </view>
        </view>

        <!-- 年利率 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">Annual Interest Rate</text>
          </view>
          <view class="item-content">
            <text class="content-text">Interest will be calculated using compound interest. Interest accrues from the successful borrowing of crypto, calculated once per minute. If the borrowing duration is less than one minute, it will also be calculated as one minute.</text>
          </view>
        </view>
      </view>

                           <!-- 还款规则内容 -->
        <view class="content-section" v-if="activeTab === 'rules'">
          <view class="info-item">
            <view class="item-content">
                           <text class="content-text">The collateral required for lending originates from the VGAU current account. Once transferred as collateral, this portion will no longer generate current income.</text>
              <text class="content-text">The default initial pledge rate is <text class="percentage">78%</text>. When creating a loan order, the pledge rate can be adjusted based on the loan amount.</text>
              <text class="content-text">When disbursing the loan, <text class="percentage">2%</text> of the loan amount is first frozen as a forced liquidation insurance fee, and the remaining <text class="percentage">98%</text> USDT is issued to the USDT account.</text>
              <text class="content-text">Only after the loan order is fully repaid, the system will automatically redeem the corresponding VGAU collateral to the VGAU account, and refund the original <text class="percentage">2%</text> forced liquidation insurance fee for that order to the USDT account.</text>
              <text class="content-text">If forced liquidation is triggered, the <text class="percentage">2%</text> forced liquidation insurance fee belongs to the platform as a liquidation fee; if the value of the collateral assets falls below the total debt due to drastic market fluctuations, the borrower must immediately make up the remaining outstanding amount. The platform supports multiple loan orders, each independently priced and risk-controlled, without mutual influence.</text>
              <text class="content-text">Repayment using account balance: Collateral cannot be redeemed before full repayment. Users can add more VGAU to reduce the pledge rate and avoid liquidation.</text>
           </view>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 当前激活的标签页
const activeTab = ref('glossary')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 切换标签页
const switchTab = (tab) => {
  activeTab.value = tab
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

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32rpx;
  padding-top: 120rpx;
}

/* 标签页区域 */
.tab-section {
  margin-bottom: 32rpx;
}

.tab-container {
  display: flex;
  background: transparent;
  border-radius: 0;
  padding: 0;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20rpx 0;
  border-radius: 0;
  transition: all 0.3s ease;
  position: relative;
}

.tab-item.active {
  background: transparent;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120rpx;
  height: 4rpx;
  background: #FFA500;
  border-radius: 2rpx;
}

.tab-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  transition: all 0.3s ease;
}

.tab-item.active .tab-text {
  color: #FFFFFF;
  font-weight: 500;
}

/* 内容区域 */
.content-section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.info-item {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 24rpx 0;
}

.item-header {
  margin-bottom: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  text-align: center;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.content-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  line-height: 1.5;
}

.sub-item {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  padding: 16rpx 0;
  background: transparent;
  border-radius: 0;
}

.sub-title {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.percentage {
  color: #FFA500;
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
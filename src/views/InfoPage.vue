<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('financialProducts') }}</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 标签页切换 -->
      <view class="tab-section">
        <view class="tab-container">
          <view class="tab-item" :class="{ active: activeTab === 'glossary' }" @click="switchTab('glossary')">
            <text class="tab-text">{{ t('glossary') }}</text>
          </view>
          <view class="tab-item" :class="{ active: activeTab === 'rules' }" @click="switchTab('rules')">
            <text class="tab-text">{{ t('repaymentRules') }}</text>
          </view>
        </view>
      </view>

      <!-- 名词解释内容 -->
      <view class="content-section" v-if="activeTab === 'glossary'">
        <!-- 强平保险费 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">{{ t('forcedLiquidationInsuranceFee') }}</text>
          </view>
          <view class="item-content">
            <text class="content-text">{{ t('forcedLiquidationInsuranceFeeDescription') }}</text>
            <text class="content-text">{{ t('forcedLiquidationInsuranceFeeAfterRepayment') }}</text>
            <text class="content-text">{{ t('forcedLiquidationInsuranceFeeOnForcedLiquidation') }}</text>
          </view>
        </view>

        <!-- 质押率注释 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">{{ t('pledgeRateAnnotation') }}</text>
          </view>
          <view class="item-content">
                         <view class="sub-item">
               <text class="sub-title">{{ t('currentPledgeRate') }}</text>
               <text class="content-text">{{ t('pledgeRateDescription') }}</text>
             </view>
             <view class="sub-item">
               <text class="sub-title">{{ t('initialPledgeRate') }} <text class="percentage">{{ t('initialPledgeRatePercentage') }}</text></text>
               <text class="content-text">{{ t('initialPledgeRateDescription') }}</text>
             </view>
             <view class="sub-item">
               <text class="sub-title">{{ t('marginCall') }} <text class="percentage">{{ t('marginCallPercentage') }}</text></text>
               <text class="content-text">{{ t('marginCallDescription') }}</text>
             </view>
             <view class="sub-item">
               <text class="sub-title">{{ t('forcedLiquidationPledgeRate') }} <text class="percentage">{{ t('forcedLiquidationPledgeRatePercentage') }}</text></text>
               <text class="content-text">{{ t('forcedLiquidationPledgeRateDescription') }}</text>
             </view>
          </view>
        </view>

        <!-- 净年化利率 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">{{ t('netAnnualizedInterestRate') }}</text>
          </view>
          <view class="item-content">
            <text class="content-text">{{ t('netAnnualizedInterestRateDescription') }}</text>
          </view>
        </view>

        <!-- 年利率 -->
        <view class="info-item">
          <view class="item-header">
            <text class="item-title">{{ t('annualInterestRate') }}</text>
          </view>
          <view class="item-content">
            <text class="content-text">{{ t('annualInterestRateDescription') }}</text>
          </view>
        </view>
      </view>

                           <!-- 还款规则内容 -->
        <view class="content-section" v-if="activeTab === 'rules'">
          <view class="info-item">
            <view class="item-content">
                           <text class="content-text">{{ t('collateralRequiredForLending') }}</text>
              <text class="content-text">{{ t('defaultInitialPledgeRate') }} <text class="percentage">{{ t('defaultInitialPledgeRatePercentage') }}</text></text>
              <text class="content-text">{{ t('loanAmountDescription') }}</text>
              <text class="content-text">{{ t('forcedLiquidationInsuranceFeeDescription') }}</text>
              <text class="content-text">{{ t('forcedLiquidationInsuranceFeeAfterRepayment') }}</text>
              <text class="content-text">{{ t('forcedLiquidationInsuranceFeeOnForcedLiquidation') }}</text>
              <text class="content-text">{{ t('forcedLiquidationInsuranceFeeOnForcedLiquidationDescription') }}</text>
              <text class="content-text">{{ t('repaymentUsingAccountBalance') }}</text>
           </view>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 当前激活的标签页
const activeTab = ref('glossary')

// 切换标签页
const switchTab = (tab) => {
  activeTab.value = tab
}

// 返回上一页
const goBack = () => {
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
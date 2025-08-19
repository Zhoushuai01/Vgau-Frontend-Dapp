<template>
  <view class="settings-container">
    <!-- 页面头部 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <view class="back-icon">
          <image src="/static/back.png" class="back-arrow" />
        </view>
      </view>
             <text class="title-text">{{ 
         showServiceAgreement ? 'Terms of Service' : 
         showLiquidationRules ? 'Liquidation Alert & Repayment Rules' : 
         'Settings' 
       }}</text>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 设置选项列表 -->
      <view v-if="!showInviterSection && !showServiceAgreement && !showLiquidationRules" class="settings-list">
        <!-- 服务协议 -->
        <view class="settings-item" @click="goToServiceAgreement">
          <view class="item-content">
            <view class="item-icon">
              <view class="icon-wrapper">
                <image src="/static/Person/xieyi.png" class="agreement-icon" />
              </view>
            </view>
            <text class="item-text">Service Agreement</text>
          </view>
        </view>

        <!-- 清算预警与还款规则 -->
        <view class="settings-item" @click="goToLiquidationRules">
          <view class="item-content">
            <view class="item-icon">
              <view class="icon-wrapper">
                <image src="/static/Person/Details.png" class="details-icon" />
              </view>
            </view>
            <text class="item-text">Liquidation Alert & Repayment Rules</text>
          </view>
        </view>

        <!-- 邀请人 -->
        <view class="settings-item" @click="goToInviter">
          <view class="item-content">
            <view class="item-icon">
              <view class="icon-wrapper">
                <image src="/static/Person/inviter.png" class="inviter-icon" />
              </view>
            </view>
            <text class="item-text">Inviter</text>
          </view>
        </view>
      </view>

      <!-- 清算预警与还款规则区域 -->
      <view v-if="showLiquidationRules" class="liquidation-rules-section">
        <view class="rules-header">
          <view class="rules-title">Liquidation Alert</view>
          <view class="rules-content">
            <text class="rules-text">
              When the collateral ratio reaches 85%, users will be notified via email for margin call reminders.
              When the collateral ratio reaches 88%, users will be notified via email and personal page popup to alert them that they are approaching the liquidation collateral ratio.
            </text>
          </view>
        </view>
        
        <view class="rules-section">
          <view class="section-title">Repayment Rules</view>
          <view class="section-content">
            <text class="section-text">Only full repayment is allowed.</text>
          </view>
        </view>
        
        <view class="rules-section">
          <view class="section-title">Forced Liquidation</view>
          <view class="section-content">
            <text class="section-text">
              When disbursing loans, 2% of the loan amount is first frozen as liquidation insurance, with the remaining 98% USDT distributed to the USDT account.

              Only after the loan is fully repaid, the system automatically redeems the corresponding VGAU collateral to the VGAU account and returns the original 2% liquidation insurance for that loan to the USDT account.

              If forced liquidation is triggered, the 2% liquidation insurance becomes the platform's liquidation fee; if market volatility causes the collateral asset value to be less than the total debt, the borrower must immediately make up the remaining debt. The platform supports multiple loan orders, with each order independently priced and risk-controlled without mutual interference.
            </text>
          </view>
        </view>
      </view>

      <!-- 邀请人信息区域 -->
      <view v-if="showInviterSection" class="inviter-section">
        <view class="inviter-title">Inviter</view>
        
        <view class="invite-input-container">
          <input 
            class="invite-input"
            v-model="inviteCode"
            placeholder="Enter invite code"
            placeholder-class="invite-placeholder"
            type="text"
          />
        </view>
        
        <view class="invite-description">
          <text class="description-text">Fill in the invite code to help your friends complete the invitation task</text>
        </view>
        
        <view class="submit-btn" @click="submitInviteCode">
          <text class="submit-text">Submit</text>
        </view>
      </view>

             <!-- 服务协议区域 -->
       <view v-if="showServiceAgreement" class="service-agreement-section">
         <view class="agreement-header">
           <view class="agreement-title">Terms of Service</view>
           <view class="agreement-date">Last updated: August 31, 2025</view>
         </view>
         
         <view class="agreement-content">
           <text class="agreement-text">
             This agreement (hereinafter referred to as the "Agreement") is jointly established by you (the "User") and Verigold (the "Platform") to clarify the terms and conditions for users to use related services on the platform. By accessing or using any services provided by the platform, you agree to comply with all terms of this Agreement.
           </text>
         </view>
         
         <view class="agreement-section">
           <view class="section-title">Service Content</view>
                       <view class="section-content">
              <view class="section-paragraph">
                <text class="section-text">1. VGAU Staking: Users can deposit VGAU tokens into the platform and earn USDT returns based on the selected staking period and annual percentage yield (APY). The staking return calculation method is as follows:</text>
                <text class="section-text">(1) Fixed-term staking return = Staking amount × Annual interest rate × Staking days / 365</text>
                <text class="section-text">(2) Flexible staking return = Staking amount × Current VGAU price × Annual interest rate × Staking days / 365</text>
              </view>
              
              <view class="section-paragraph">
                <text class="section-text">2. Lending Services: Users can use VGAU tokens as collateral to borrow USDT. During the lending process, parameters such as collateral ratio, margin call line, and liquidation line will be dynamically adjusted based on market price fluctuations.</text>
              </view>
              
              <view class="section-paragraph">
                <text class="section-text">3. Redemption Services: Users can redeem staked or borrowed assets through the redemption function provided by the platform. The redemption amount is calculated based on real-time exchange rates and staking conditions.</text>
              </view>
              
              <view class="section-paragraph">
                <text class="section-text">4. Exchange Services: Users can exchange USDT for VGAU tokens or exchange VGAU tokens for USDT within the platform.</text>
              </view>
            </view>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const showInviterSection = ref(false)
const showServiceAgreement = ref(false)
const showLiquidationRules = ref(false)
const inviteCode = ref('')

// 返回上一页
const goBack = () => {
  if (showInviterSection.value) {
    showInviterSection.value = false
  } else if (showServiceAgreement.value) {
    showServiceAgreement.value = false
  } else if (showLiquidationRules.value) {
    showLiquidationRules.value = false
  } else {
    uni.navigateBack()
  }
}

// 跳转到服务协议页面
const goToServiceAgreement = () => {
  showServiceAgreement.value = true
}

// 跳转到清算规则页面
const goToLiquidationRules = () => {
  showLiquidationRules.value = true
}

// 显示邀请人信息
const goToInviter = () => {
  showInviterSection.value = true
}

// 提交邀请码
const submitInviteCode = () => {
  if (!inviteCode.value.trim()) {
    uni.showToast({
      title: 'Please enter invite code',
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  uni.showToast({
    title: 'Invite code submitted!',
    icon: 'success',
    duration: 2000
  })
  
  // 清空输入框
  inviteCode.value = ''
}
</script>

<style scoped>
.settings-container {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
}

/* 页面头部 */
.page-header {
  padding: 48rpx 32rpx 20rpx;
  display: flex;
  align-items: center;
  gap: 24rpx;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #0A0A0A;
}

.title-text {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 400;
  line-height: 1.56;
  flex: 1;
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* 返回按钮 */
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  width: 40rpx;
  height: 40rpx;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  padding-top: 140rpx;
  display: flex;
  flex-direction: column;
}

/* 设置列表 */
.settings-list {
  margin: 0 32rpx;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

/* 设置项 */
.settings-item {
  background-color: #1A1A1A;
  border-radius: 16rpx;
  height: 144rpx;
  display: flex;
  align-items: center;
  padding: 0 40rpx;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 40rpx;
  width: 100%;
}

.item-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-wrapper {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-text {
  color: #F0F0F0;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
}

/* 服务协议图标 */
.agreement-icon {
  width: 36rpx;
  height: 36rpx;
  display: block;
}

/* 详情图标 */
.details-icon {
  width: 48rpx;
  height: 48rpx;
  display: block;
}

/* 邀请人图标 */
.inviter-icon {
  width: 40rpx;
  height: 40rpx;
  display: block;
}

/* 邀请人信息区域 */
.inviter-section {
  margin: 0 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.inviter-title {
  color: #F0F0F0;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.invite-input-container {
  background-color: #1A1A1A;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  padding: 16rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
}

.invite-input {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.invite-placeholder {
  color: rgba(255, 255, 255, 0.2);
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.invite-description {
  margin-top: 8rpx;
}

.description-text {
  color: rgba(240, 240, 240, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 2;
}

.submit-btn {
  background: linear-gradient(90deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
}

.submit-text {
  color: #000000;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
}

/* 服务协议区域 */
.service-agreement-section {
  margin: 0 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  background-color: #1A1A1A;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-top: 20rpx;
  margin-bottom: 120rpx;
}

.agreement-header {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.agreement-title {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.agreement-date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1;
}

.agreement-content {
  margin-top: 16rpx;
}

.agreement-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.6;
  text-align: justify;
}

.agreement-section {
  margin-top: 24rpx;
}

.section-title {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.section-content {
  margin-top: 8rpx;
}

.section-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-line;
}

.section-text::before {
  content: "";
  display: block;
  margin-bottom: 16rpx;
}

.section-paragraph {
  margin-bottom: 24rpx;
}

.section-paragraph:last-child {
  margin-bottom: 0;
}

/* 清算预警与还款规则区域 */
.liquidation-rules-section {
  margin: 0 32rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  background-color: #1A1A1A;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-top: 20rpx;
  margin-bottom: 120rpx;
}

.rules-header {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.rules-title {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.rules-content {
  margin-top: 8rpx;
}

.rules-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-line;
}

.rules-section {
  margin-top: 24rpx;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .settings-list {
    margin: 0 24rpx;
  }
  
  .settings-item {
    padding: 0 32rpx;
    height: 120rpx;
  }
  
  .item-content {
    gap: 32rpx;
  }
  
  .item-text {
    font-size: 28rpx;
  }
}

/* 小屏幕适配 */
@media (max-width: 600rpx) {
  .page-header {
    padding: 20rpx 24rpx 8rpx;
  }
  
  .title-text {
    font-size: 32rpx;
  }
  
  .main-content {
    padding-top: 80rpx;
  }
  
  .settings-list {
    margin: 0 16rpx;
    gap: 12rpx;
  }
  
  .settings-item {
    padding: 0 24rpx;
    height: 100rpx;
  }
  
  .item-content {
    gap: 24rpx;
  }
  
  .item-icon {
    width: 40rpx;
    height: 40rpx;
  }
  
  .icon-wrapper {
    width: 32rpx;
    height: 32rpx;
  }
  
  .item-text {
    font-size: 26rpx;
  }
}
</style> 
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
         showServiceAgreement ? t('settings.termsOfService') : 
         showLiquidationRules ? t('settings.liquidationAlertRepaymentRules') : 
         t('settings.settings') 
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
            <text class="item-text">{{ t('settings.serviceAgreement') }}</text>
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
            <text class="item-text">{{ t('settings.liquidationAlertRepaymentRules') }}</text>
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
            <text class="item-text">{{ t('settings.inviter') }}</text>
          </view>
        </view>
      </view>

      <!-- 清算预警与还款规则区域 -->
      <view v-if="showLiquidationRules" class="liquidation-rules-section">
        <view class="rules-header">
          <view class="rules-title">{{ t('settings.liquidationAlert') }}</view>
          <view class="rules-content">
            <text class="rules-text">
              {{ t('settings.liquidationAlertReminder') }}
              {{ t('settings.liquidationAlertApproaching') }}
            </text>
          </view>
        </view>
        
        <view class="rules-section">
          <view class="section-title">{{ t('settings.repaymentRules') }}</view>
          <view class="section-content">
            <text class="section-text">{{ t('settings.fullRepaymentOnly') }}</text>
          </view>
        </view>
        
        <view class="rules-section">
          <view class="section-title">{{ t('settings.forcedLiquidation') }}</view>
          <view class="section-content">
            <text class="section-text">
              {{ t('settings.forcedLiquidationDisbursement') }}

              {{ t('settings.forcedLiquidationRedemption') }}

              {{ t('settings.forcedLiquidationPlatformFee') }}
              {{ t('settings.forcedLiquidationRemainingDebt') }}
              {{ t('settings.forcedLiquidationMultipleLoans') }}
            </text>
          </view>
        </view>
      </view>

      <!-- 邀请人信息区域 -->
      <view v-if="showInviterSection" class="inviter-section">
        <view class="inviter-title">{{ t('settings.inviter') }}</view>
        
        <view class="invite-input-container">
          <input 
            class="invite-input"
            v-model="inviteCode"
            :placeholder="t('settings.inviteCodePlaceholder')"
            placeholder-class="invite-placeholder"
            type="text"
          />
        </view>
        
        <view class="invite-description">
          <text class="description-text">{{ t('settings.inviteDescription') }}</text>
        </view>
        
        <view class="submit-btn" @click="bindInviteCode">
          <text class="submit-text">{{ t('settings.submit') }}</text>
        </view>
      </view>

             <!-- 服务协议区域 -->
       <view v-if="showServiceAgreement" class="service-agreement-section">
         <view class="agreement-header">
           <view class="agreement-title">{{ t('settings.termsOfService') }}</view>
           <view class="agreement-date">{{ t('settings.lastUpdated') }}</view>
         </view>
         
         <view class="agreement-content">
           <text class="agreement-text">
             {{ t('settings.serviceAgreementText') }}
           </text>
         </view>
         
         <view class="agreement-section">
           <view class="section-title">{{ t('settings.serviceContent') }}</view>
                       <view class="section-content">
              <view class="section-paragraph">
                <text class="section-text">{{ t('settings.stakingReturnCalculation') }}</text>
                <text class="section-text">{{ t('settings.fixedTermStakingReturn') }}</text>
                <text class="section-text">{{ t('settings.flexibleStakingReturn') }}</text>
              </view>
              
              <view class="section-paragraph">
                <text class="section-text">{{ t('settings.lendingServices') }}</text>
              </view>
              
              <view class="section-paragraph">
                <text class="section-text">{{ t('settings.redemptionServices') }}</text>
              </view>
              
              <view class="section-paragraph">
                <text class="section-text">{{ t('settings.exchangeServices') }}</text>
              </view>
            </view>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { inviteAPI } from '@/api/apiService.js'

const { t } = useI18n()

// 响应式数据
const showServiceAgreement = ref(false)
const showLiquidationRules = ref(false)
const showInviterSection = ref(false)
const inviteCode = ref('')

// 返回上一页
const goBack = () => {
  if (showServiceAgreement.value || showLiquidationRules.value || showInviterSection.value) {
    // 如果在子页面，返回主设置页面
    showServiceAgreement.value = false
    showLiquidationRules.value = false
    showInviterSection.value = false
  } else {
    // 如果在主设置页面，返回上一页
    uni.navigateBack()
  }
}

// 前往服务协议
const goToServiceAgreement = () => {
  showServiceAgreement.value = true
}

// 前往清算规则
const goToLiquidationRules = () => {
  showLiquidationRules.value = true
}

// 前往邀请人
const goToInviter = () => {
  showInviterSection.value = true
}

// 绑定邀请码
const bindInviteCode = async () => {
  if (!inviteCode.value.trim()) {
    uni.showToast({
      title: t('common.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  try {
    console.log('🔗 开始绑定邀请码:', inviteCode.value)
    
    // 调用邀请绑定API
    const response = await inviteAPI.bind(inviteCode.value.trim())
    console.log('📊 邀请绑定响应:', response)
    
    if (response && response.success) {
      uni.showToast({
        title: t('components.invitation.bindSuccess'),
        icon: 'success',
        duration: 2000
      })
      
      // 清空输入
      inviteCode.value = ''
      
      // 延迟返回上一页
      setTimeout(() => {
        goBack()
      }, 1500)
    } else {
      throw new Error(response?.message || '绑定失败')
    }
    
  } catch (error) {
    console.error('❌ 绑定邀请码失败:', error)
    
    // 显示错误提示
    uni.showToast({
      title: error.message || t('common.operationFailed') || '操作失败',
      icon: 'none',
      duration: 2000
    })
  }
}

// 清除设置页面数据
const clearSettingsData = () => {
  console.log('🧹 清除设置页面数据...')
  
  // 清除邀请码输入
  inviteCode.value = ''
  
  // 重置页面状态
  showServiceAgreement.value = false
  showLiquidationRules.value = false
  showInviterSection.value = false
  
  console.log('✅ 设置页面数据已清除')
}

// 页面加载时设置事件监听
onMounted(() => {
  // 监听钱包断开事件
  uni.$on('walletDisconnected', (data) => {
    console.log('📡 设置页面收到钱包断开事件:', data)
    if (data.clearUserData || data.clearAssetsData) {
      clearSettingsData()
    }
  })
})

// 页面卸载时清理事件监听
onUnmounted(() => {
  // 清理事件监听
  uni.$off('walletDisconnected')
})
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
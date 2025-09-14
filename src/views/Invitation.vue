<template>
  <view class="invitation-container">
    <!-- 页面标题和返回按钮 -->
    <view class="page-header">
      <view class="back-button" @click="goBack">
        <view class="back-icon">
          <image src="/static/back.png" class="back-arrow" />
        </view>
      </view>
      <text class="title-text">{{ t('components.invitation.invitation') }}</text>
    </view>

         <!-- 邀请奖励卡片 -->
     <view class="reward-card">
       <view class="reward-info">
         <text class="reward-value">{{ totalPoints.toLocaleString() }} {{ t('common.points') }}</text>
         <text class="reward-label">{{ t('components.invitation.invitationRewardsLabel') }}</text>
       </view>
     </view>

         <!-- 用户统计 -->
     <view class="stats-section">
       <view class="stat-card">
         <text class="stat-value">{{ invitedUsers }} {{ t('common.users') }}</text>
         <text class="stat-label">{{ t('components.invitation.numberOfInvitedPeopleLabel') }}</text>
       </view>
       <view class="stat-card">
         <text class="stat-value">{{ directPushUsers }} {{ t('common.users') }}</text>
         <text class="stat-label">{{ t('components.invitation.numberOfDirectPushPersonnelLabel') }}</text>
       </view>
     </view>

    <!-- 邀请链接 -->
    <view class="invite-link-card">
      <view class="link-info">
        <text class="link-label">{{ t('components.invitation.invitationLink') }}</text>
        <text v-if="loading" class="link-url loading-text">加载中...</text>
        <text v-else class="link-url">{{ inviteLink }}</text>
      </view>
      <view class="copy-btn" @click="copyInviteLink" :class="{ 'disabled': loading || !inviteLink }">
        <text class="copy-text">{{ t('common.copy') }}</text>
      </view>
    </view>

    <!-- 邀请奖励详情 -->
    <view class="details-card">
             <view class="details-header">
         <text class="details-title">{{ t('components.invitation.invitationRewardDetails') }}</text>
         <view class="details-icon" @click="openRuleModal">
           <image src="/static/Person/Details.png" class="icon-img" />
         </view>
       </view>

      <!-- 表格头部 -->
      <view class="table-header">
        <text class="header-id">{{ t('components.invitation.id') }}</text>
        <text class="header-wallet">{{ t('components.invitation.walletAddr') }}</text>
        <text class="header-type">{{ t('components.invitation.type') }}</text>
        <text class="header-rewards">{{ t('components.invitation.rewards') }}</text>
      </view>

      <!-- 表格内容 -->
      <view class="table-content">
        <view v-if="invitationList.length === 0" class="empty-data">
          <text class="empty-text">{{ t('common.noData') }}</text>
        </view>
        <view v-else class="table-row" v-for="(item, index) in invitationList" :key="index">
          <text class="row-id">{{ item.id }}</text>
          <text class="row-wallet">{{ formatShortAddress(item.wallet) }}</text>
          <text class="row-type">{{ item.type }}</text>
          <text class="row-rewards">{{ item.rewards }}</text>
        </view>
      </view>

             <!-- 底部提示 -->
       <view class="bottom-tip">
         <text class="tip-text">{{ t('components.invitation.allContentLoaded') }}</text>
       </view>
     </view>
   </view>

   <!-- 规则详情弹窗 -->
   <view class="rule-modal-overlay" v-if="showRuleModal" @click="closeRuleModal">
     <view class="rule-modal-content" @click.stop>
       <view class="rule-modal-header">
         <text class="rule-modal-title">{{ t('components.invitation.ruleDetails') }}</text>
         <view class="rule-close-button" @click="closeRuleModal">
           <text class="rule-close-icon">×</text>
         </view>
       </view>
       
       <view class="rule-modal-body">
         <text class="rule-content">
           {{ t('components.invitation.successfullyReferUserThroughKYC') }}
         </text>
          <view class="rule-list">
            <text class="rule-item">{{ t('components.invitation.directReferral') }}--1 {{ t('components.invitation.pointsUnit') }}</text>
            <text class="rule-item">{{ t('components.invitation.indirectReferral') }}--0.2 {{ t('components.invitation.pointsUnit') }}</text>
          </view>
       </view>
     </view>
   </view>
 </template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatShortAddress } from '@/utils/addressUtils'
import { inviteAPI } from '@/api/apiService.js'

const { t } = useI18n()

// 响应式数据
const inviteLink = ref('')
const inviteCode = ref('')
const showRuleModal = ref(false)
const loading = ref(false)

// 统计数据
const totalPoints = ref(0)
const invitedUsers = ref(0)
const directPushUsers = ref(0)

// 邀请列表数据
const invitationList = ref([])

// 获取我的邀请码
const fetchMyInviteCode = async () => {
  loading.value = true
  try {
    const response = await inviteAPI.getMyCode()
    console.log('我的邀请码响应:', response)
    
    if (response && response.data && response.data.inviteCode) {
      inviteCode.value = response.data.inviteCode
      // 生成邀请链接
      inviteLink.value = `https://verigold.ai/register?inviter=${inviteCode.value}`
    } else {
      // 如果接口没有数据，使用测试数据
      inviteCode.value = 'ABC123'
      inviteLink.value = `https://verigold.ai/register?inviter=${inviteCode.value}`
    }
  } catch (error) {
    console.error('获取邀请码失败:', error)
    // 使用测试数据作为后备
    inviteCode.value = 'ABC123'
    inviteLink.value = `https://verigold.ai/register?inviter=${inviteCode.value}`
    uni.showToast({
      title: '获取邀请码失败',
      icon: 'none',
      duration: 2000
    })
  } finally {
    loading.value = false
  }
}

// 获取统计数据
const fetchStatistics = async () => {
  try {
    // 这里可以调用相应的API接口获取统计数据
    // 例如：const response = await inviteAPI.getStatistics()
    // totalPoints.value = response.data.totalPoints
    // invitedUsers.value = response.data.invitedUsers
    // directPushUsers.value = response.data.directPushUsers
    
    // 目前使用默认值，后续可以替换为API调用
    console.log('获取统计数据...')
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

// 获取邀请列表
const fetchInvitationList = async () => {
  try {
    const response = await inviteAPI.getMyDownline()
    console.log('邀请列表响应:', response)
    
    if (response && response.data && Array.isArray(response.data)) {
      // 处理API返回的数据，转换为前端需要的格式
      invitationList.value = response.data.map((item, index) => ({
        id: item.id || (index + 1).toString().padStart(3, '0'),
        wallet: item.walletAddress || item.wallet || '',
        type: item.type === 'direct' ? t('components.invitation.directReferral') : t('components.invitation.indirectReferral'),
        rewards: item.rewards || item.points || '0'
      }))
    } else {
      // 如果接口没有数据，使用空数组
      invitationList.value = []
    }
  } catch (error) {
    console.error('获取邀请列表失败:', error)
    // 使用空数组作为后备
    invitationList.value = []
    uni.showToast({
      title: '获取邀请列表失败',
      icon: 'none',
      duration: 2000
    })
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 复制邀请链接
const copyInviteLink = () => {
  if (loading.value || !inviteLink.value) {
    uni.showToast({
      title: '邀请链接未准备好',
      icon: 'none',
      duration: 2000
    })
    return
  }

  uni.setClipboardData({
    data: inviteLink.value,
    success: () => {
      uni.showToast({
        title: t('components.invitation.linkCopied'),
        icon: 'success',
        duration: 2000
      })
    },
    fail: () => {
      uni.showToast({
        title: '复制失败',
        icon: 'none',
        duration: 2000
      })
    }
  })
}

// 打开规则弹窗
const openRuleModal = () => {
  showRuleModal.value = true
}

// 关闭规则弹窗
const closeRuleModal = () => {
  showRuleModal.value = false
}

// 页面加载时获取邀请码、统计数据和邀请列表
onMounted(() => {
  fetchMyInviteCode()
  fetchStatistics()
  fetchInvitationList()
})
</script>

<style scoped>
.invitation-container {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
  position: relative;
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
}

/* 返回按钮 */
.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  cursor: pointer;
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
  gap: 24rpx;
}

/* 邀请奖励卡片 */
.reward-card {
  margin: 140rpx 32rpx 0;
  padding: 26rpx 46rpx;
  background-color: #1A1A1A;
  border-radius: 16rpx;
  position: relative;
  height: 232rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reward-info {
  display: flex;
  flex-direction: column;
  gap: 13rpx;
}

.reward-value {
  color: #FFFFFF;
  font-size: 48rpx;
  font-weight: 400;
  line-height: 1.33;
}

.reward-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}



/* 用户统计 */
.stats-section {
  display: flex;
  gap: 16rpx;
  padding: 0 32rpx;
  margin-top: 24rpx;
}

.stat-card {
  flex: 1;
  padding: 32rpx;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.stat-value {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 400;
  line-height: 1.56;
}

.stat-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

/* 邀请链接 */
.invite-link-card {
  margin: 24rpx 32rpx;
  padding: 32rpx;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  flex: 1;
}

.link-label {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.link-url {
  color: rgba(255, 255, 255, 0.5);
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.copy-btn {
  padding: 12rpx 24rpx;
  background-color: transparent;
  border-radius: 8rpx;
  flex-shrink: 0;
  cursor: pointer;
}

.copy-text {
  color: #E78B1B;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.loading-text {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}

.copy-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.copy-btn.disabled .copy-text {
  color: rgba(231, 139, 27, 0.5);
}

/* 邀请奖励详情 */
.details-card {
  margin: 24rpx 32rpx;
  padding: 32rpx;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.details-title {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.details-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-img {
  width: 32rpx;
  height: 32rpx;
}

/* 表格头部 */
.table-header {
  display: flex;
  padding: 16rpx 0;
  border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16rpx;
}

.header-id {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.5;
  width: 80rpx;
  flex-shrink: 0;
}

.header-wallet {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
  text-align: center;
}

.header-type {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.5;
  width: 120rpx;
  text-align: center;
  flex-shrink: 0;
}

.header-rewards {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.5;
  width: 180rpx;
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 表格内容 */
.table-content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.table-row {
  display: flex;
  padding: 16rpx 0;
  border-bottom: 2rpx solid rgba(255, 255, 255, 0.05);
}

.row-id {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.71;
  width: 80rpx;
  flex-shrink: 0;
}

.row-wallet {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.71;
  flex: 1;
  text-align: center;
}

.row-type {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.71;
  width: 120rpx;
  text-align: center;
  flex-shrink: 0;
}

.row-rewards {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.71;
  width: 180rpx;
  text-align: right;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空数据显示 */
.empty-data {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60rpx 0;
}

.empty-text {
  color: rgba(255, 255, 255, 0.3);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

/* 底部提示 */
.bottom-tip {
  display: flex;
  justify-content: center;
  padding: 34rpx 0;
}

.tip-text {
  color: rgba(255, 255, 255, 0.2);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.33;
}



/* 响应式设计 */
@media (max-width: 750rpx) {
  .stats-section {
    flex-direction: column;
    gap: 16rpx;
  }
  
  .invite-link-card {
    flex-direction: column;
    gap: 16rpx;
    align-items: flex-start;
  }
  
  .copy-btn {
    align-self: flex-end;
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
  
  .reward-card {
    margin: 120rpx 24rpx 0;
    padding: 20rpx 32rpx;
    height: 180rpx;
  }
  
  .reward-value {
    font-size: 40rpx;
  }
  
  .stats-section {
    padding: 0 24rpx;
  }
  
  .invite-link-card {
    margin: 24rpx;
    padding: 24rpx;
  }
  
     .details-card {
     margin: 24rpx;
     padding: 24rpx;
   }
 }

 /* 规则详情弹窗样式 */
 .rule-modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: rgba(0, 0, 0, 0.8);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 2000;
 }

 .rule-modal-content {
   width: 714rpx;
   height: 476rpx;
   background-color: rgba(255, 255, 255, 0.2);
   border-radius: 40rpx;
   overflow: hidden;
   position: relative;
   backdrop-filter: blur(20px);
   border: 2rpx solid rgba(255, 255, 255, 0.2);
 }

 .rule-modal-header {
   padding: 40rpx;
   display: flex;
   justify-content: space-between;
   align-items: center;
   border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
 }

 .rule-modal-title {
   color: #FFFFFF;
   font-size: 40rpx;
   font-weight: 400;
   line-height: 1;
   text-align: center;
   flex: 1;
 }

 .rule-close-button {
   width: 48rpx;
   height: 48rpx;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
 }

 .rule-close-icon {
   color: #FFFFFF;
   font-size: 48rpx;
   font-weight: 400;
   line-height: 1;
 }

 .rule-modal-body {
   padding: 40rpx;
   display: flex;
   flex-direction: column;
   gap: 40rpx;
 }

 .rule-content {
   color: #FFFFFF;
   font-size: 28rpx;
   font-weight: 400;
   line-height: 1.43;
   text-align: left;
 }

 .rule-list {
   display: flex;
   flex-direction: column;
   gap: 20rpx;
 }

 .rule-item {
   color: #FFFFFF;
   font-size: 28rpx;
   font-weight: 400;
   line-height: 1.43;
   text-align: left;
 }
</style> 
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
import { ref, onMounted, onUnmounted } from 'vue'
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

// 初始化邀请码和链接
const initInviteData = () => {
  // 检查钱包连接状态
  const isWalletConnected = checkWalletConnection()
  
  if (isWalletConnected) {
    // 钱包已连接，使用静态邀请码
    inviteCode.value = 'ABC123'
    inviteLink.value = `https://verigold.ai/register?inviter=${inviteCode.value}`
  } else {
    // 钱包未连接，清空邀请码和链接
    inviteCode.value = ''
    inviteLink.value = ''
  }
  
  loading.value = false
}

// 检查钱包连接状态
const checkWalletConnection = () => {
  // 检查是否被手动断开
  const isManuallyDisconnected = localStorage.getItem('walletManuallyDisconnected') === 'true'
  
  // 如果被手动断开，直接返回false
  if (isManuallyDisconnected) {
    console.log('⚠️ 检测到钱包被手动断开，跳过API调用')
    return false
  }
  
  // 检查localStorage中的连接状态
  const isWalletConnected = localStorage.getItem('walletConnected') === 'true'
  
  // 检查web3Service状态（如果可用）
  const hasWeb3Service = typeof window !== 'undefined' && window.web3Service
  const isWeb3Connected = hasWeb3Service && window.web3Service.isConnected && window.web3Service.currentAccount
  
  // 检查ethereum provider状态
  const hasEthereum = typeof window.ethereum !== 'undefined'
  const hasSelectedAccount = hasEthereum && window.ethereum.selectedAddress
  
  // 只要web3Service连接或ethereum有选中账户就认为已连接
  const isConnected = isWeb3Connected || hasSelectedAccount
  
  console.log('🔍 邀请页面钱包连接状态检查:', {
    isWalletConnected,
    isManuallyDisconnected,
    isWeb3Connected,
    hasSelectedAccount,
    isConnected
  })
  
  return isConnected
}

// 获取统计数据
const fetchStatistics = async () => {
  try {
    console.log('🔍 邀请页面开始获取统计数据...')
    
    // 检查钱包连接状态，如果未连接则不获取数据
    const isWalletConnected = checkWalletConnection()
    console.log('🔍 邀请页面钱包连接状态:', isWalletConnected)
    
    if (!isWalletConnected) {
      console.log('⚠️ 钱包未连接，跳过获取邀请统计数据')
      // 使用默认值
      totalPoints.value = 0
      invitedUsers.value = 0
      directPushUsers.value = 0
      invitationList.value = []
      // 清空邀请链接
      inviteLink.value = ''
      return
    }
    
    console.log('🔍 开始调用邀请统计API...')
    const response = await inviteAPI.getMyStats()
    console.log('🔍 邀请统计API响应:', response)
    
    if (response && response.data) {
      const data = response.data
      
      // 设置统计数据
      totalPoints.value = data.totalPoints || 0
      invitedUsers.value = data.totalInvitedUsers || 0
      directPushUsers.value = data.directInvitedUsers || 0
      
      // 设置邀请链接
      if (data.inviteLink) {
        inviteLink.value = data.inviteLink
      }
      
      // 处理邀请奖励详情
      if (data.rewardDetails && Array.isArray(data.rewardDetails)) {
        console.log('🔍 邀请奖励详情原始数据:', data.rewardDetails)
        
        // 测试映射是否工作
        console.log('🔍 测试映射功能:')
        console.log('🔍 测试"完成质押赎回获得积分"映射:', t('components.invitation.rewardTypeMapping.完成质押赎回获得积分'))
        console.log('🔍 测试"质押"映射:', t('components.invitation.rewardTypeMapping.质押'))
        console.log('🔍 测试"staking"映射:', t('components.invitation.rewardTypeMapping.staking'))
        console.log('🔍 测试"间推"映射:', t('components.invitation.rewardTypeMapping.间推'))
        console.log('🔍 测试"直推"映射:', t('components.invitation.rewardTypeMapping.直推'))
        
        invitationList.value = data.rewardDetails.map((item, index) => {
          console.log(`🔍 处理第${index + 1}条记录:`, {
            reason: item.reason,
            rewardType: item.rewardType,
            businessType: item.businessType,
            points: item.points
          })
          
          let finalType = ''
          
          // 检查所有字段是否包含多语言键
          const allFields = [item.reason, item.rewardType, item.businessType]
          const fieldNames = ['reason', 'rewardType', 'businessType']
          
          console.log(`🔍 检查所有字段的多语言键:`)
          for (let i = 0; i < allFields.length; i++) {
            const field = allFields[i]
            const fieldName = fieldNames[i]
            if (field && field.startsWith('components.')) {
              console.log(`🔍 字段 ${fieldName} 包含多语言键: "${field}"`)
              const translation = t(field)
              console.log(`🔍 翻译结果: "${field}" -> "${translation}"`)
              if (translation && translation !== field) {
                finalType = translation
                console.log(`🔍 使用字段 ${fieldName} 的翻译结果: "${finalType}"`)
                break
              }
            }
          }
          
          // 如果没有找到有效的多语言键，检查是否包含 rewardTy
          if (!finalType) {
            for (let i = 0; i < allFields.length; i++) {
              const field = allFields[i]
              const fieldName = fieldNames[i]
              if (field && field.includes('rewardTy')) {
                console.log(`🔍 字段 ${fieldName} 包含 rewardTy: "${field}"`)
                // 尝试多种补全方式
                const possibleKeys = [
                  field.replace('rewardTy', 'rewardTypeMapping'),
                  field.replace('rewardTy', 'rewardType'),
                  'components.invitation.rewardTypeMapping'
                ]
                
                for (const key of possibleKeys) {
                  const translation = t(key)
                  console.log(`🔍 尝试键 "${key}" -> "${translation}"`)
                  if (translation && translation !== key) {
                    finalType = translation
                    console.log(`🔍 使用补全键的翻译结果: "${finalType}"`)
                    break
                  }
                }
                if (finalType) break
              }
            }
          }
          
          // 如果还是没有找到，使用映射逻辑
          if (!finalType) {
            console.log(`🔍 开始映射逻辑处理...`)
            
            // 优先处理 rewardType 字段（后端主要返回这个字段）
            if (item.rewardType) {
              const rewardTypeMapping = t(`components.invitation.rewardTypeMapping.${item.rewardType}`)
              console.log(`🔍 rewardType映射结果: "${item.rewardType}" -> "${rewardTypeMapping}"`)
              if (rewardTypeMapping && rewardTypeMapping !== `components.invitation.rewardTypeMapping.${item.rewardType}`) {
                finalType = rewardTypeMapping
                console.log(`🔍 使用rewardType映射结果: "${finalType}"`)
              }
            }
            
            // 如果rewardType映射失败，尝试reason字段
            if (!finalType && item.reason) {
              const reasonMapping = t(`components.invitation.rewardTypeMapping.${item.reason}`)
              console.log(`🔍 reason映射结果: "${item.reason}" -> "${reasonMapping}"`)
              if (reasonMapping && reasonMapping !== `components.invitation.rewardTypeMapping.${item.reason}`) {
                finalType = reasonMapping
                console.log(`🔍 使用reason映射结果: "${finalType}"`)
              }
            }
            
            // 如果映射都失败，使用原始值
            if (!finalType) {
              finalType = item.rewardType || item.reason || item.businessType || ''
              console.log(`🔍 使用原始值: "${finalType}"`)
            }
          }
          
          // 如果最终类型仍然是键值对，使用默认值
          if (!finalType || finalType.startsWith('components.') || finalType.includes('rewardTy')) {
            console.log(`🔍 最终类型无效，使用默认值: "${finalType}"`)
            // 根据业务类型设置默认值
            if (item.businessType === 'STAKE_CREATE' || item.businessType === 'STAKE_REDEEM') {
              finalType = t('components.invitation.rewardTypeMapping.质押')
            } else if (item.businessType === 'USER_INVITE_BIND') {
              // 检查是否是直推还是间推
              if (item.reason && (item.reason.includes('直推') || item.reason.includes('direct'))) {
                finalType = t('components.invitation.rewardTypeMapping.直推')
              } else if (item.reason && (item.reason.includes('間接') || item.reason.includes('间接') || item.reason.includes('indirect'))) {
                finalType = t('components.invitation.rewardTypeMapping.间推')
              } else {
                finalType = t('components.invitation.rewardTypeMapping.直推') // 默认直推
              }
            } else {
              finalType = '其他' // 默认值
            }
            console.log(`🔍 使用默认值: "${finalType}"`)
          }
          
          console.log(`🔍 最终类型: "${finalType}"`)
          
          return {
            id: item.invitedUserId || (index + 1).toString().padStart(3, '0'),
            wallet: item.walletAddress || '',
            type: finalType,
            rewards: item.points || '0'
          }
        })
        console.log('🔍 处理后的邀请列表:', invitationList.value)
      }
      
      console.log('统计数据更新完成:', {
        totalPoints: totalPoints.value,
        invitedUsers: invitedUsers.value,
        directPushUsers: directPushUsers.value,
        invitationListLength: invitationList.value.length
      })
    } else {
      console.log('API返回数据为空，使用默认值')
      // 使用默认值
      totalPoints.value = 0
      invitedUsers.value = 0
      directPushUsers.value = 0
      invitationList.value = []
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
    
    // 使用默认值作为后备
    totalPoints.value = 0
    invitedUsers.value = 0
    directPushUsers.value = 0
    invitationList.value = []
    
    uni.showToast({
      title: '获取统计数据失败',
      icon: 'none',
      duration: 2000
    })
  }
}

// 初始化邀请列表（已合并到fetchStatistics中）
const initInvitationList = () => {
  // 邀请列表现在通过fetchStatistics获取
  invitationList.value = []
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

// 清除邀请页面数据
const clearInvitationData = () => {
  console.log('🧹 清除邀请页面数据...')
  
  // 清除统计数据
  totalPoints.value = 0
  invitedUsers.value = 0
  directPushUsers.value = 0
  
  // 清除邀请列表
  invitationList.value = []
  
  // 清除邀请链接
  inviteLink.value = ''
  
  console.log('✅ 邀请页面数据已清除')
}

// 页面加载时初始化数据
onMounted(() => {
  console.log('🔍 邀请页面已挂载，开始初始化...')
  initInviteData()
  
  // 检查钱包连接状态
  const isWalletConnected = checkWalletConnection()
  console.log('🔍 邀请页面挂载时钱包连接状态:', isWalletConnected)
  
  // 只有在钱包连接时才检查登录状态并获取数据
  if (isWalletConnected) {
    console.log('🔍 钱包已连接，检查用户登录状态...')
    
    setTimeout(async () => {
      try {
        console.log('🔍 检查用户登录状态...')
        const { checkUserLoginStatus } = await import('@/utils/walletService.js')
        const loginStatus = await checkUserLoginStatus()
        
        if (loginStatus.isLoggedIn && loginStatus.userData) {
          console.log('✅ 检测到用户已登录，自动加载邀请数据')
          fetchStatistics() // 这个函数现在会获取所有数据包括邀请列表
        } else {
          console.log('⏳ 用户未登录，等待用户登录事件以加载邀请数据...')
        }
      } catch (error) {
        console.error('❌ 检查用户登录状态失败:', error)
        console.log('⏳ 等待用户登录事件以加载邀请数据...')
      }
    }, 500)
  } else {
    console.log('🔍 钱包未连接，跳过数据获取')
  }
  
  // 监听用户登录事件（而不是钱包连接事件）
  uni.$on('userLoggedIn', async (data) => {
    console.log('📡 邀请页面收到用户登录事件:', data)
    console.log('🔍 邀请页面用户登录事件详情:', {
      data,
      web3Service: window.web3Service ? {
        isConnected: window.web3Service.isConnected,
        currentAccount: window.web3Service.currentAccount
      } : 'web3Service not available',
      ethereum: window.ethereum ? {
        selectedAddress: window.ethereum.selectedAddress
      } : 'ethereum not available'
    })
    
    // 重新检查钱包连接状态
    const isConnected = checkWalletConnection()
    console.log('🔍 邀请页面钱包连接检查结果:', isConnected)
    
    if (isConnected) {
      console.log('✅ 邀请页面开始获取统计数据...')
      await fetchStatistics()
    } else {
      console.log('❌ 邀请页面钱包连接检查失败，跳过API调用')
    }
  })
  
  // 监听钱包连接事件（仅更新连接状态，不调用需要认证的API）
  uni.$on('walletConnected', async (data) => {
    console.log('📡 邀请页面收到钱包连接事件:', data)
    // 重新检查钱包连接状态
    const isConnected = checkWalletConnection()
    console.log('🔍 邀请页面钱包连接检查结果:', isConnected)
    // 注意：这里不调用需要认证的API，等待用户登录事件
    console.log('✅ 邀请页面钱包连接状态已更新，等待用户登录...')
  })
  
  // 监听钱包断开事件
  uni.$on('walletDisconnected', (data) => {
    console.log('📡 邀请页面收到钱包断开事件:', data)
    if (data.clearUserData || data.clearAssetsData) {
      clearInvitationData()
    }
  })
  
  // 监听钱包地址变化事件
  uni.$on('walletAddressChanged', async (data) => {
    console.log('📡 邀请页面收到钱包地址变化事件:', data)
    if (data.newAddress) {
      console.log('🔄 邀请页面钱包地址已变化，重新获取数据...')
      
      // 通知API服务重置认证状态
      try {
        const { default: apiService } = await import('@/api/apiService.js')
        apiService.resetAuthState()
        console.log('✅ 邀请页面API服务认证状态已重置')
      } catch (error) {
        console.warn('⚠️ 邀请页面重置API服务认证状态失败:', error)
      }
      
      // 重新获取邀请统计数据
      try {
        await fetchStatistics()
        console.log('✅ 邀请页面新地址数据获取完成')
      } catch (error) {
        console.error('❌ 邀请页面获取新地址数据失败:', error)
      }
    }
  })
})

// 页面卸载时清理事件监听
onUnmounted(() => {
  // 清理事件监听
  uni.$off('walletConnected')
  uni.$off('walletDisconnected')
  uni.$off('walletAddressChanged')
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
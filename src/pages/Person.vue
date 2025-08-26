<template>
  <view class="person-container">
    <!-- 顶部标题栏 - 固定在顶部 -->
    <view class="header">
      <text class="header-title">{{ $t('person.title') }}</text>
      <view class="header-actions">
        <view class="header-btn" @click="goToHistory">
          <image src="/static/Person/History.png" class="header-icon" />
        </view>
        <view class="header-btn">
          <image src="/static/Person/Service.png" class="header-icon" />
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 用户信息卡片 -->
      <view class="user-card">
        <view class="user-info">
          <view class="avatar">
            <image src="/static/logo.png" class="avatar-img" />
          </view>
          <view class="user-details">
            <text class="username">{{ userInfo.username }}</text>
            <text class="user-id">{{ userInfo.userId }}</text>
          </view>
        </view>
        
        <!-- 钱包地址 -->
        <view class="wallet-section">
          <view class="wallet-info">
            <text class="wallet-label">{{ $t('person.walletAddress') }}</text>
            <text class="wallet-address">{{ walletAddress }}</text>
          </view>
          <view class="copy-btn" @click="copyWalletAddress">
            <image src="/static/fuzhi.png" class="copy-icon" />
          </view>
        </view>
        

      </view>

      <!-- 快捷操作按钮 -->
      <view class="quick-actions">
        <view class="action-item" @click="goToExchange">
          <view class="action-icon exchange-icon">
            <image src="/static/Person/Exchange.png" class="action-icon-img" />
          </view>
          <text class="action-label">{{ $t('person.menu.exchange') }}</text>
        </view>
        
        <view class="action-item" @click="goToRedeem">
          <view class="action-icon redeem-icon">
            <image src="/static/Person/Redeem.png" class="action-icon-img" />
          </view>
          <text class="action-label">{{ $t('person.menu.redeem') }}</text>
        </view>
        
        <view class="action-item" @click="goToInvitation">
          <view class="action-icon invite-icon">
            <image src="/static/Person/Invite.png" class="action-icon-img" />
          </view>
          <text class="action-label">{{ $t('person.menu.invite') }}</text>
        </view>
        
        <view class="action-item" @click="goToPointsDetails">
          <view class="action-icon points-icon">
            <image src="/static/Person/Points.png" class="action-icon-img" />
          </view>
          <text class="action-label">{{ $t('person.menu.points') }}</text>
        </view>
      </view>

      <!-- 资产概览标题 -->
      <view class="section-title">
        <text class="title-text">{{ $t('person.assetOverview') }}</text>
      </view>

      <!-- 资产数据卡片 -->
              <view class="assets-grid">
          <view class="asset-card">
            <text class="asset-label">{{ $t('person.currentStakedAmount') }}</text>
            <text class="asset-unit">VGAU</text>
            <text class="asset-value">{{ assets.stakedVGAU }}</text>
          </view>
          
          <view class="asset-card">
            <text class="asset-label">{{ $t('person.totalStakedRewards') }}</text>
            <text class="asset-unit">USDT</text>
            <text class="asset-value">{{ assets.stakingYield }}</text>
          </view>
          
          <view class="asset-card">
            <text class="asset-label">{{ $t('person.currentCollateral') }}</text>
            <text class="asset-unit">VGAU</text>
            <text class="asset-value">{{ assets.collateralVGAU }}</text>
          </view>
          
          <view class="asset-card">
            <text class="asset-label">{{ $t('person.remainingDebt') }}</text>
            <text class="asset-unit">USDT</text>
            <text class="asset-value">{{ assets.remainingDebt }}</text>
          </view>
        </view>

      <!-- 累计积分 -->
      <view class="points-section">
        <text class="points-label">{{ $t('person.totalPoints') }}</text>
        <text class="points-value">{{ points }}</text>
      </view>

      <!-- 通知中心 -->
      <view class="notification-card">
        <view class="notification-header">
          <view class="notification-icon">
            <image src="/static/Person/Notice.png" class="icon-img" />
          </view>
          <text class="notification-title">{{ $t('person.notificationCenter') }}</text>
        </view>
        
        <view class="notification-content">
          <text class="notification-text">{{ $t('person.liquidationAlert') }}</text>
        </view>
        
        <view class="notification-divider"></view>
        
        <view class="notification-action">
          <button class="action-button">{{ $t('person.topUpNow') }}</button>
        </view>
      </view>

      <!-- 更多设置 -->
      <view class="more-settings" >
        <view class="settings-left"@click="goToSettings">
          <image src="/static/Person/More-Settings.png" class="settings-btn-icon" @error="onImageError" />
            <text class="settings-text">{{ $t('person.moreSettings') }}</text>
        </view>
      </view>
    </view>


  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 响应式数据
const walletAddress = ref('0x7e0fbF2D6DEa2371ea8f237c056B024dA4Bc87af')

const userInfo = reactive({
  username: 'User123',
  userId: '4561235154511515241'
})

const assets = reactive({
  stakedVGAU: '12,456',
  stakingYield: '+123,456',
  collateralVGAU: '456',
  remainingDebt: '123'
})

const points = ref('235')

// 复制钱包地址
const copyWalletAddress = () => {
  // #ifdef H5
  // H5环境使用navigator.clipboard
  if (navigator.clipboard) {
    navigator.clipboard.writeText(walletAddress.value).then(() => {
      showToast(t('person.walletAddressCopied'))
    }).catch(() => {
      fallbackCopy()
    })
  } else {
    fallbackCopy()
  }
  // #endif
  
  // #ifdef APP-PLUS
  // APP环境使用uni.setClipboardData
  uni.setClipboardData({
    data: walletAddress.value,
    success: () => {
      showToast(t('person.walletAddressCopied'))
    },
    fail: () => {
      showToast(t('person.copyFailed'))
    }
  })
  // #endif
  
  // #ifdef MP
  // 小程序环境使用uni.setClipboardData
  uni.setClipboardData({
    data: walletAddress.value,
    success: () => {
      showToast('Wallet address copied!')
    },
    fail: () => {
      showToast('Copy failed')
    }
  })
  // #endif
}

// 备用复制方法
const fallbackCopy = () => {
  const textArea = document.createElement('textarea')
  textArea.value = walletAddress.value
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
    showToast('Wallet address copied!')
  } catch (err) {
    showToast('Copy failed')
  }
  document.body.removeChild(textArea)
}

// 显示提示信息
const showToast = (message) => {
  uni.showToast({
    title: message,
    icon: 'success',
    duration: 2000
  })
}

// 获取用户信息 - 以后可以对接接口
const getUserInfo = async () => {
  try {
    // 这里可以调用API获取用户信息
    // const response = await $api.getUserInfo()
    // Object.assign(userInfo, response.data)
    console.log('获取用户信息')
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// 获取资产信息 - 以后可以对接接口
const getAssetsInfo = async () => {
  try {
    // 这里可以调用API获取资产信息
    // const response = await $api.getAssetsInfo()
    // Object.assign(assets, response.data)
    console.log('获取资产信息')
  } catch (error) {
    console.error('获取资产信息失败:', error)
  }
}

// 图片加载错误处理
const onImageError = (e) => {
  console.error('图片加载失败:', e)
  // 可以设置备用图片或显示文字
}

// 跳转到积分明细页面
const goToPointsDetails = () => {
  uni.navigateTo({
    url: '/views/PointsDetails'
  })
}

// 跳转到邀请页面
const goToInvitation = () => {
  uni.navigateTo({
    url: '/views/Invitation'
  })
}

// 跳转到兑换页面
const goToExchange = () => {
  uni.navigateTo({
    url: '/views/Exchange'
  })
}

// 跳转到赎回页面
const goToRedeem = () => {
  uni.navigateTo({
    url: '/views/Redeem'
  })
}

// 跳转到历史记录页面
const goToHistory = () => {
  uni.navigateTo({
    url: '/views/History'
  })
}

// 跳转到设置页面
const goToSettings = () => {
  uni.navigateTo({
    url: '/views/Settings'
  })
}

// 页面加载时获取数据
onMounted(() => {
  getUserInfo()
  getAssetsInfo()
})
</script>

<style scoped>
.person-container {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 顶部标题栏 - 固定在顶部 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28rpx 32rpx 12rpx;
  background-color: #0A0A0A;
  height: 80rpx;
}

.header-title {
  color: #FFFFFF;
  font-size: 40rpx;
  font-weight: 400;
  line-height: 1.4;
}

.header-actions {
  display: flex;
  gap: 16rpx;
}

.header-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon {
  width: 32rpx;
  height: 32rpx;
}



/* 主要内容区域 */
.main-content {
  flex: 1;
  padding-top: 140rpx; /* 为固定头部留出空间 */
  padding-bottom: 40rpx; /* 添加底部间距 */
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

/* 用户信息卡片 */
.user-card {
  margin: 0 32rpx;
  padding: 20rpx 24rpx;
  background-color: rgba(29, 29, 29, 0.8);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  position: relative;
  min-height: 280rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16rpx;
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 16rpx;
  background-color: #D9D9D9;
  margin-right: 34rpx;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  flex: 1;
}

.username {
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 1.5;
}

.user-id {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.21;
}

/* 钱包地址 */
.wallet-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 16rpx;
  margin-top: 16rpx;
}

.wallet-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  flex: 1;
}

.wallet-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.33;
}

.wallet-address {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
  word-break: break-all;
}

.copy-btn {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.copy-icon {
  width: 32rpx;
  height: 32rpx;
}



/* 快捷操作按钮 */
.quick-actions {
  display: flex;
  justify-content: space-around;
  padding: 0 32rpx;
  margin-top: 24rpx;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
  flex: 1;
}

.action-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-icon-img {
  width: 72rpx;
  height: 72rpx;
}

.action-label {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.21;
  text-align: center;
}

/* 资产概览标题 */
.section-title {
  padding: 0 32rpx;
  margin-top: 24rpx;
}

.title-text {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 400;
  line-height: 1.56;
}

/* 资产数据卡片 */
.assets-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  padding: 0 24rpx;
  margin-top: 20rpx;
}

.asset-card {
  height: 160rpx;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx 32rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8rpx;
}

.asset-value {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
}

.asset-unit {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.43;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.asset-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 1.43;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 累计积分 */
.points-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24rpx;
  padding: 24rpx 58rpx;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
}

.points-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

.points-value {
  color: #FFFFFF;
  font-size: 40rpx;
  font-weight: 400;
  line-height: 1.4;
}

/* 通知中心 */
.notification-card {
  margin: 24rpx;
  padding: 24rpx;
  background-color: rgba(29, 29, 29, 0.8);
  border-radius: 16rpx;
}

.notification-header {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-bottom: 20rpx;
}

.notification-icon {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  width: 32rpx;
  height: 32rpx;
}

.notification-title {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

.notification-content {
  margin-bottom: 16rpx;
}

.notification-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}

.notification-divider {
  height: 2rpx;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 16rpx 0;
}

.notification-action {
  display: flex;
  justify-content: center;
}

.action-button {
  background: linear-gradient(90deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
  border: none;
  border-radius: 16rpx;
  padding: 15rpx 78rpx;
  color: #000000;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.21;
}

/* 更多设置 */
.more-settings {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 24rpx;
  padding: 20rpx 0;
  margin-bottom: 60rpx; /* 添加底部间距，确保设置选项可见 */
}

.settings-left {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.settings-btn-icon {
  width: 48rpx;
  height: 48rpx;
  display: block;
  flex-shrink: 0;
}

.settings-text {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.43;
}



/* 响应式设计 */
@media (max-width: 750rpx) {
  .assets-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24rpx;
  }
  
  .quick-actions {
    flex-wrap: wrap;
    gap: 32rpx;
  }
  
  .action-item {
    flex: 0 0 calc(50% - 16rpx);
  }
}

/* 小屏幕适配 */
@media (max-width: 600rpx) {
  .header {
    padding: 20rpx 24rpx 8rpx;
    height: 60rpx;
  }
  
  .header-title {
    font-size: 32rpx;
  }
  
  .main-content {
    padding-top: 80rpx;
    gap: 24rpx;
  }
  
  .user-card {
    margin: 0 24rpx;
    padding: 20rpx 16rpx;
  }
  
  .quick-actions {
    padding: 0 24rpx;
  }
  
  .assets-grid {
    padding: 0 24rpx;
    gap: 20rpx;
  }
  
  .asset-card {
    padding: 20rpx 24rpx;
    height: 140rpx;
  }
  
  .notification-card {
    margin: 24rpx;
    padding: 24rpx;
  }
}
</style> 
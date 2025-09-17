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
          <view class="user-details">
            <text class="username">{{ userInfo.nickname }}</text>
            <text class="user-id">{{ userInfo.userId }}</text>
          </view>
        </view>
        
        <!-- 钱包地址 -->
        <view class="wallet-section">
          <view class="wallet-info">
            <text class="wallet-label">{{ $t('person.walletAddress') }}</text>
            <text class="wallet-address" v-if="walletAddress">{{ formatShortAddress(walletAddress) }}</text>
            <text class="wallet-address no-wallet" v-else>{{ $t('person.noWalletConnected') }}</text>
          </view>
          <view class="copy-btn" @click="copyWalletAddress" v-if="walletAddress">
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

      <!-- 通知中心 - 暂时隐藏 -->
      <!-- <view class="notification-card">
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
      </view> -->

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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatShortAddress } from '@/utils/addressUtils'
import { authAPI, stakeAPI, loanAPI, pointsAPI } from '@/api/apiService.js'
import web3Service from '@/utils/web3.js'

const { t, locale } = useI18n()

// 响应式数据
const walletAddress = ref('')
const walletConnected = ref(false)

const userInfo = reactive({
  nickname: '',
  userId: ''
})

const assets = reactive({
  stakedVGAU: '0',
  stakingYield: '0',
  collateralVGAU: '0',
  remainingDebt: '0'
})

const points = ref('0')

// 手动连接功能已移除（仅显示已连接地址）

// 设置钱包事件监听
const setupWalletEventListeners = () => {
  if (typeof window.ethereum !== 'undefined') {
    // 监听账户变化
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('🔄 钱包账户已切换:', accounts)
      // 使用web3Service获取当前账户，保持与Home.vue一致
      if (web3Service.isConnected && web3Service.currentAccount) {
        walletAddress.value = web3Service.currentAccount
        walletConnected.value = true
        console.log('✅ 更新钱包地址:', web3Service.currentAccount)
      } else {
        walletAddress.value = ''
        walletConnected.value = false
        console.log('⚠️ 钱包已断开连接')
      }
    })
    
    // 监听网络变化
    window.ethereum.on('chainChanged', (chainId) => {
      console.log('🔄 网络已切换:', chainId)
      // 可以在这里添加网络切换的处理逻辑
    })
  }
}

// 定期检查钱包连接状态
let walletCheckInterval = null

const startWalletStatusCheck = () => {
  // 每5秒检查一次钱包连接状态
  walletCheckInterval = setInterval(async () => {
    try {
      const wasConnected = walletConnected.value
      const wasAddress = walletAddress.value
      
      // 检查web3Service状态
      if (web3Service.isConnected && web3Service.currentAccount) {
        if (!wasConnected || wasAddress !== web3Service.currentAccount) {
          walletAddress.value = web3Service.currentAccount
          walletConnected.value = true
          console.log('🔄 定期检查: 钱包状态更新', {
            wasConnected,
            nowConnected: true,
            address: web3Service.currentAccount
          })
        }
      } else {
        if (wasConnected) {
          walletAddress.value = ''
          walletConnected.value = false
          console.log('🔄 定期检查: 钱包已断开连接')
        }
      }
    } catch (error) {
      console.error('定期检查钱包状态失败:', error)
    }
  }, 5000) // 每5秒检查一次
}

const stopWalletStatusCheck = () => {
  if (walletCheckInterval) {
    clearInterval(walletCheckInterval)
    walletCheckInterval = null
  }
}

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

// 获取连接的钱包地址
const getConnectedWalletAddress = async () => {
  try {
    console.log('🔍 获取连接的钱包地址...')
    
    // 确保web3Service已初始化
    if (!web3Service.web3) {
      await web3Service.init()
    }
    
    // 使用web3Service获取当前账户，与Home.vue保持一致
    if (web3Service.isConnected && web3Service.currentAccount) {
      walletAddress.value = web3Service.currentAccount
      walletConnected.value = true
      console.log('✅ 获取到钱包地址:', web3Service.currentAccount)
    } else {
      console.log('⚠️ 未检测到连接的钱包')
      walletAddress.value = ''
      walletConnected.value = false
    }
  } catch (error) {
    console.error('获取钱包地址失败:', error)
    walletAddress.value = ''
    walletConnected.value = false
  }
}

// 获取用户信息 - 调用 /api/auth/me 接口
const getUserInfo = async () => {
  try {
    console.log('🔍 开始获取用户信息...')
    const response = await authAPI.getMe()
    
    if (response && response.success && response.data) {
      console.log('✅ 获取到用户信息:', response.data)
      // 根据接口返回的字段名更新用户信息
      userInfo.nickname = response.data.nickname || ''
      userInfo.userId = response.data.id ? response.data.id.toString() : ''
      console.log('✅ 用户信息已更新:', userInfo)
    } else {
      console.log('❌ 获取用户信息失败或用户未登录')
      // 保持默认空值
      userInfo.nickname = ''
      userInfo.userId = ''
    }
  } catch (error) {
    console.error('❌ 获取用户信息失败:', error)
    // 保持默认空值
    userInfo.nickname = ''
    userInfo.userId = ''
  }
}

// 获取资产信息 - 调用API获取质押、借贷和积分数据
const getAssetsInfo = async () => {
  try {
    console.log('📊 开始获取资产信息...')
    
    // 并行调用质押统计、借贷汇总和积分详情接口
    const [stakeResponse, loanResponse, pointsResponse] = await Promise.allSettled([
      stakeAPI.getStatistics(),
      loanAPI.getSummary(),
      pointsAPI.getMy()
    ])
    
    // 处理质押统计数据
    if (stakeResponse.status === 'fulfilled' && stakeResponse.value?.success) {
      const stakeData = stakeResponse.value.data
      console.log('✅ 质押统计数据:', stakeData)
      
      // 更新当前质押数量
      if (stakeData.totalStakeAmount !== undefined) {
        assets.stakedVGAU = formatNumber(stakeData.totalStakeAmount)
      } else {
        assets.stakedVGAU = '0'
      }
      
      // 更新总质押奖励
      if (stakeData.totalInterestEarned !== undefined) {
        assets.stakingYield = formatNumber(stakeData.totalInterestEarned)
      } else {
        assets.stakingYield = '0'
      }
    } else {
      console.warn('⚠️ 质押统计接口调用失败:', stakeResponse.reason)
      // 接口失败时保持默认值 0
      assets.stakedVGAU = '0'
      assets.stakingYield = '0'
    }
    
    // 处理借贷汇总数据
    if (loanResponse.status === 'fulfilled' && loanResponse.value?.success) {
      const loanData = loanResponse.value.data
      console.log('✅ 借贷汇总数据:', loanData)
      
      // 更新当前抵押品数量
      if (loanData.totalActiveCollateral !== undefined) {
        assets.collateralVGAU = formatNumber(loanData.totalActiveCollateral)
      } else {
        assets.collateralVGAU = '0'
      }
    } else {
      console.warn('⚠️ 借贷汇总接口调用失败:', loanResponse.reason)
      // 接口失败时保持默认值 0
      assets.collateralVGAU = '0'
    }
    
    // 处理积分统计数据
    if (pointsResponse.status === 'fulfilled' && pointsResponse.value?.success) {
      const pointsData = pointsResponse.value.data
      console.log('✅ 积分统计数据:', pointsData)
      
      // 更新总积分 - 使用currentPoints字段
      if (pointsData.currentPoints !== undefined) {
        points.value = formatNumber(pointsData.currentPoints)
      } else {
        points.value = '0'
      }
    } else {
      console.warn('⚠️ 积分统计接口调用失败:', pointsResponse.reason)
      // 接口失败时保持默认值 0
      points.value = '0'
    }
    
    console.log('📊 资产信息更新完成:', { assets, points: points.value })
  } catch (error) {
    console.error('❌ 获取资产信息失败:', error)
    
    // 发生异常时重置为默认值
    assets.stakedVGAU = '0'
    assets.stakingYield = '0'
    assets.collateralVGAU = '0'
    points.value = '0'
    
    // 不显示错误提示，静默处理
    console.log('📊 使用默认值显示资产信息')
  }
}

// 格式化数字显示
const formatNumber = (value) => {
  if (value === null || value === undefined) {
    return '0'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '0'
  }
  
  // 如果数字很大，使用千分位分隔符
  if (num >= 1000) {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
  }
  
  // 保留2位小数，然后抹除后面的0
  return parseFloat(num.toFixed(2)).toString()
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
onMounted(async () => {
  await getConnectedWalletAddress()
  
  // 设置事件监听（无论是否连接都设置，以便监听连接状态变化）
  setupWalletEventListeners()
  
  // 启动定期检查钱包状态
  startWalletStatusCheck()
  
  getUserInfo()
  getAssetsInfo()
  
})

// 页面卸载时清理定时器
onUnmounted(() => {
  stopWalletStatusCheck()
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
  min-height: 80rpx;
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
  align-items: center;
}


/* 响应式设计 - 小屏幕适配 */
@media screen and (max-width: 750rpx) {
  .header {
    padding: 24rpx 24rpx 12rpx;
  }
  
  .header-title {
    font-size: 36rpx;
  }
  
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

/* 头像样式已移除 */

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

/* 未连接钱包时的地址显示 */
.wallet-address.no-wallet {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
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
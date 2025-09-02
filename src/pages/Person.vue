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
        <view class="header-btn logout-btn" @click="handleLogout">
          <text class="logout-text">{{ t('person.logout.button') }}</text>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 用户信息卡片 -->
      <view class="user-card">
        <view class="user-info">
          <view class="user-details">
            <text class="username">{{ userInfo.username }}</text>
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

    <!-- 登出确认弹窗 -->
    <view v-if="showLogoutConfirmModal" class="modal-overlay" @click="showLogoutConfirmModal = false">
      <view class="modal-content" @click.stop>
        <view class="modal-text">
          <text class="logout-title">{{ t('person.logoutConfirm.title') }}</text>
          <text class="logout-desc">{{ t('person.logoutConfirm.content') }}</text>
        </view>
        <view class="modal-actions">
          <view class="modal-btn outline" @click="showLogoutConfirmModal = false">{{ t('person.logoutConfirm.cancel') }}</view>
          <view class="modal-btn solid" @click="confirmLogout">{{ t('person.logoutConfirm.confirm') }}</view>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { formatShortAddress } from '@/utils/addressUtils'
import { authAPI } from '@/api/apiService.js'
import { checkWalletConnection } from '@/utils/walletService.js'

const { t, locale } = useI18n()

// 响应式数据
const walletAddress = ref('')

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
const showLogoutConfirmModal = ref(false)

// 手动连接功能已移除（仅显示已连接地址）

// 设置钱包事件监听
const setupWalletEventListeners = () => {
  if (typeof window.ethereum !== 'undefined') {
    // 监听账户变化
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log('🔄 钱包账户已切换:', accounts)
      if (accounts.length > 0) {
        walletAddress.value = accounts[0]
        console.log('✅ 更新钱包地址:', accounts[0])
      } else {
        walletAddress.value = ''
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
    const connectedAddress = await checkWalletConnection()
    
    if (connectedAddress) {
      walletAddress.value = connectedAddress
      console.log('✅ 获取到钱包地址:', connectedAddress)
    } else {
      console.log('⚠️ 未检测到连接的钱包')
      walletAddress.value = ''
    }
  } catch (error) {
    console.error('获取钱包地址失败:', error)
    walletAddress.value = ''
  }
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

// 处理登出
const handleLogout = async () => {
  try {
    // 显示自定义确认弹窗
    showLogoutConfirmModal.value = true
  } catch (error) {
    console.error('登出确认失败:', error)
  }
}

// 确认登出
const confirmLogout = async () => {
  try {
    // 关闭弹窗
    showLogoutConfirmModal.value = false
    // 执行登出
    await performLogout()
  } catch (error) {
    console.error('确认登出失败:', error)
  }
}

// 执行登出
const performLogout = async () => {
  try {
    console.log('🚀 开始执行登出流程...')
    
    // 显示加载提示
    uni.showLoading({
      title: t('person.logout.loading')
    })

    // 检查网络连接
    const networkStatus = await checkNetworkStatus()
    if (!networkStatus.isConnected) {
      throw new Error('NETWORK_ERROR: 网络连接失败')
    }

    // 检查用户登录状态
    const loginStatus = await checkCurrentLoginStatus()
    if (!loginStatus.isLoggedIn) {
      console.log('⚠️ 用户未登录，直接清除本地数据')
      clearUserData()
      uni.hideLoading()
      uni.showToast({
        title: '用户未登录，已清除本地数据',
        icon: 'success',
        duration: 1000
      })
      uni.reLaunch({ url: '/pages/Home' })
      return
    }

    console.log('📡 调用登出接口...')
    
    // 调用登出接口
    const response = await authAPI.logout()
    
    console.log('📡 登出接口响应:', response)

    // 隐藏加载提示
    uni.hideLoading()

    if (response && response.success) {
      console.log('✅ 登出接口调用成功')
      
      // 登出成功
      uni.showToast({
        title: t('person.logout.success'),
        icon: 'success',
        duration: 1000
      })

      // 清除本地用户数据
      clearUserData()

      // 立即跳转到首页
      uni.reLaunch({
        url: '/pages/Home'
      })
    } else {
      // 登出失败 - 分析失败原因
      const failureReason = analyzeLogoutFailure(response)
      throw new Error(failureReason)
    }
  } catch (error) {
    console.error('❌ 登出失败:', error)
    
    // 隐藏加载提示
    uni.hideLoading()
    
    // 分析错误原因并显示详细错误信息
    const errorInfo = analyzeError(error)
    showDetailedError(errorInfo)
  }
}

// 检查网络状态
const checkNetworkStatus = async () => {
  try {
    console.log('🌐 开始检测网络状态...')
    
    // 尝试发送一个简单的请求来检测网络
    const testResponse = await uni.request({
      url: '/api/health',
      method: 'GET',
      timeout: 5000
    })
    
    console.log('✅ 网络检测成功:', testResponse)
    
    return {
      isConnected: true,
      status: 'connected',
      responseTime: Date.now(),
      statusCode: testResponse.statusCode
    }
  } catch (error) {
    console.log('❌ 网络检测失败:', error)
    
    // 尝试备用网络检测方法
    try {
      const backupResponse = await uni.request({
        url: 'https://httpbin.org/get',
        method: 'GET',
        timeout: 3000
      })
      
      console.log('✅ 备用网络检测成功:', backupResponse)
      
      return {
        isConnected: true,
        status: 'connected_via_backup',
        responseTime: Date.now(),
        statusCode: backupResponse.statusCode
      }
    } catch (backupError) {
      console.log('❌ 备用网络检测也失败:', backupError)
      
      return {
        isConnected: false,
        status: 'disconnected',
        error: error.message,
        backupError: backupError.message
      }
    }
  }
}

// 检查当前登录状态
const checkCurrentLoginStatus = async () => {
  try {
    const response = await authAPI.getMe()
    return {
      isLoggedIn: response && response.success,
      userData: response?.data || null
    }
  } catch (error) {
    console.log('🔍 检查登录状态失败:', error)
    return {
      isLoggedIn: false,
      userData: null,
      error: error.message
    }
  }
}

// 分析登出失败原因
const analyzeLogoutFailure = (response) => {
  console.log('🔍 分析登出失败原因:', response)
  
  if (!response) {
    return 'RESPONSE_MISSING: 接口返回数据为空'
  }
  
  if (response.statusCode) {
    switch (response.statusCode) {
      case 401:
        return 'UNAUTHORIZED: 用户未授权或token已过期'
      case 403:
        return 'FORBIDDEN: 权限不足'
      case 404:
        return 'NOT_FOUND: 登出接口不存在'
      case 500:
        return 'SERVER_ERROR: 服务器内部错误'
      case 502:
        return 'BAD_GATEWAY: 网关错误'
      case 503:
        return 'SERVICE_UNAVAILABLE: 服务不可用'
      case 504:
        return 'GATEWAY_TIMEOUT: 网关超时'
      default:
        return `HTTP_ERROR_${response.statusCode}: ${response.statusText || '未知错误'}`
    }
  }
  
  if (response.error) {
    return `API_ERROR: ${response.error}`
  }
  
  if (response.message) {
    return `MESSAGE: ${response.message}`
  }
  
  return 'UNKNOWN_ERROR: 未知错误'
}

// 分析错误详情
const analyzeError = (error) => {
  console.log('🔍 分析错误详情:', error)
  
  const errorInfo = {
    type: 'UNKNOWN',
    message: error.message || '未知错误',
    details: {},
    suggestions: []
  }
  
  // 根据错误类型分类
  if (error.message) {
    if (error.message.includes('NETWORK_ERROR')) {
      errorInfo.type = 'NETWORK'
      errorInfo.suggestions = [
        '检查网络连接',
        '检查VPN设置',
        '稍后重试'
      ]
    } else if (error.message.includes('UNAUTHORIZED')) {
      errorInfo.type = 'AUTH'
      errorInfo.suggestions = [
        '重新登录',
        '检查token是否过期',
        '清除浏览器缓存'
      ]
    } else if (error.message.includes('SERVER_ERROR')) {
      errorInfo.type = 'SERVER'
      errorInfo.suggestions = [
        '服务器维护中，请稍后重试',
        '联系客服',
        '检查服务状态'
      ]
    } else if (error.message.includes('TIMEOUT')) {
      errorInfo.type = 'TIMEOUT'
      errorInfo.suggestions = [
        '网络较慢，请稍后重试',
        '检查网络连接',
        '尝试切换网络'
      ]
    }
  }
  
  // 添加错误详情
  if (error.response) {
    errorInfo.details.response = {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data
    }
  }
  
  if (error.request) {
    errorInfo.details.request = {
      method: error.request.method,
      url: error.request.url,
      headers: error.request.headers
    }
  }
  
  return errorInfo
}

// 显示详细错误信息
const showDetailedError = (errorInfo) => {
  console.log('📋 显示详细错误信息:', errorInfo)
  
  // 记录错误日志
  logLogoutError(errorInfo)
  
  // 构建错误详情文本
  let errorContent = `错误类型: ${errorInfo.type}\n错误信息: ${errorInfo.message}`
  
  if (errorInfo.suggestions.length > 0) {
    errorContent += '\n\n建议解决方案:\n' + errorInfo.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')
  }
  
  // 显示详细错误对话框
  uni.showModal({
    title: '登出失败 - 错误详情',
    content: errorContent,
    confirmText: '重试',
    cancelText: '关闭',
    success: (res) => {
      if (res.confirm) {
        // 用户选择重试
        console.log('🔄 用户选择重试登出')
        performLogout()
      }
    }
  })
}

// 记录登出错误日志
const logLogoutError = (errorInfo) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    type: 'LOGOUT_ERROR',
    errorInfo: errorInfo,
    userAgent: navigator.userAgent,
    url: window.location.href,
    timestamp: Date.now()
  }
  
  console.log('📝 登出错误日志:', errorLog)
  
  // 保存到本地存储，方便调试
  try {
    const existingLogs = JSON.parse(localStorage.getItem('logout_error_logs') || '[]')
    existingLogs.push(errorLog)
    
    // 只保留最近10条错误日志
    if (existingLogs.length > 10) {
      existingLogs.splice(0, existingLogs.length - 10)
    }
    
    localStorage.setItem('logout_error_logs', JSON.stringify(existingLogs))
    console.log('💾 错误日志已保存到本地存储')
  } catch (error) {
    console.error('保存错误日志失败:', error)
  }
  
  // 可以在这里添加发送错误日志到服务器的逻辑
  // sendErrorLogToServer(errorLog)
}

// 清除用户数据
const clearUserData = () => {
  // 清除本地存储的用户数据
  if (typeof window !== 'undefined') {
    // 清除 localStorage 中的用户相关数据
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('user') || key.includes('auth') || key.includes('login'))) {
        keysToRemove.push(key)
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    // 清除 sessionStorage 中的用户相关数据
    const sessionKeysToRemove = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key && (key.includes('user') || key.includes('auth') || key.includes('login'))) {
        sessionKeysToRemove.push(key)
      }
    }
    
    sessionKeysToRemove.forEach(key => {
      sessionStorage.removeItem(key)
    })
  }
  
  // 重置页面数据
  Object.assign(userInfo, {
    username: '',
    userId: ''
  })
  
  Object.assign(assets, {
    stakedVGAU: '0',
    stakingYield: '0',
    collateralVGAU: '0',
    remainingDebt: '0'
  })
  
  points.value = '0'
  walletAddress.value = ''
}

// 页面加载时获取数据
onMounted(async () => {
  await getConnectedWalletAddress()
  
  // 如果钱包已连接，设置事件监听
  if (walletAddress.value) {
    setupWalletEventListeners()
  }
  
  getUserInfo()
  getAssetsInfo()
  
  // 开发环境下显示调试信息
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 开发环境 - 登出错误日志查看工具已启用')
    console.log('📋 查看登出错误日志: window.viewLogoutErrorLogs()')
    
    // 添加全局调试方法
    if (typeof window !== 'undefined') {
      window.viewLogoutErrorLogs = () => {
        try {
          const logs = JSON.parse(localStorage.getItem('logout_error_logs') || '[]')
          console.log('📋 登出错误日志:', logs)
          
          if (logs.length === 0) {
            console.log('✅ 暂无登出错误日志')
          } else {
            console.log(`📊 共 ${logs.length} 条错误日志`)
            logs.forEach((log, index) => {
              console.log(`--- 错误日志 ${index + 1} ---`)
              console.log('时间:', log.timestamp)
              console.log('类型:', log.errorInfo.type)
              console.log('错误:', log.errorInfo.message)
              console.log('建议:', log.errorInfo.suggestions)
            })
          }
        } catch (error) {
          console.error('查看错误日志失败:', error)
        }
      }
      
      window.clearLogoutErrorLogs = () => {
        try {
          localStorage.removeItem('logout_error_logs')
          console.log('🗑️ 登出错误日志已清除')
        } catch (error) {
          console.error('清除错误日志失败:', error)
        }
      }
    }
  }
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

.logout-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20rpx;
  padding: 8rpx 16rpx;
  min-width: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.logout-btn:active {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(0.95);
}

.logout-text {
  color: #FFFFFF;
  font-size: 24rpx;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

/* 响应式设计 - 小屏幕适配 */
@media screen and (max-width: 750rpx) {
  .header {
    padding: 24rpx 24rpx 12rpx;
  }
  
  .header-title {
    font-size: 36rpx;
  }
  
  .logout-btn {
    padding: 6rpx 12rpx;
    min-width: 70rpx;
    background-color: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.25);
  }
  
  .logout-text {
    font-size: 22rpx;
  }
}

/* 登出确认弹窗样式（参考USDTRecharge.vue） */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #1A1A1A;
  border-radius: 24rpx;
  padding: 80rpx 32rpx;
  margin: 0 48rpx;
  max-width: 600rpx;
  width: 100%;
}

.modal-text {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 48rpx;
  height: 240rpx;
  justify-content: center;
  align-items: center;
}

.logout-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5;
}

.logout-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  transition: all 0.2s ease;
  cursor: pointer;
}

.modal-btn.solid {
  background: linear-gradient(90deg, #FEDA78 0%, #B07920 100%);
  color: #000;
  font-weight: 500;
}

.modal-btn.outline {
  background: transparent;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

.modal-btn:active {
  transform: scale(0.98);
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
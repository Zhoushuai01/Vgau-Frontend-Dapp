<template>
  <view class="content">
    <!-- 自定义顶部栏 -->
    <view class="custom-header">
      <view class="header-content">
        <!-- 左侧Logo -->
        <view class="logo-container">
          <image class="logo" src="/static/k1.png" mode="aspectFit" />
        </view>
        
        <!-- 中间标题 -->
        <view class="title-container">
          <text class="page-title"></text>
        </view>
        
        <!-- 右侧钱包连接和语言选择 -->
        <view class="right-controls">
          <view class="connect-wallet-btn" @click="connectWallet">
            <text class="btn-text">Connect Wallet</text>
          </view>
          <view class="language-container">
            <view class="language-btn" @click="toggleLanguageDropdown">
              <image class="language-icon" src="/static/language.png" mode="aspectFit" />
            </view>
            <!-- 语言选择下拉框 -->
            <view class="language-dropdown" v-if="showLanguageDropdown">
              <!-- 语言选项 -->
              <view class="dropdown-item" @click="selectLanguage('ar')">
                <text class="language-text">اللغة العربية</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('en')">
                <text class="language-text">English</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('fr')">
                <text class="language-text">Français</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('zh')">
                <text class="language-text">繁體中文</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('pt')">
                <text class="language-text">português</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 轮播图区域 -->
      <view class="banner-section">
        <swiper class="banner-swiper" 
                :indicator-dots="false" 
                :autoplay="true" 
                :interval="3000" 
                :duration="500"
                :circular="true"
                @change="onSwiperChange">
          <swiper-item v-for="(banner, index) in banners" :key="index">
            <image class="banner-image" :src="banner" mode="aspectFill" />
          </swiper-item>
        </swiper>
        <!-- 轮播指示器 -->
        <view class="banner-indicators">
          <view v-for="(banner, index) in banners" 
                :key="index" 
                class="indicator" 
                :class="{ active: currentBannerIndex === index }">
          </view>
        </view>
      </view>

      <!-- TVL数据区域 -->
      <view class="tvl-section">
        <view class="tvl-number">561,103</view>
        <view class="tvl-label">Total TVL of VGAU</view>
        <view class="tvl-details">
          <view class="tvl-item">
            <text class="tvl-text">1 VGAU=123.4561 USDT</text>
          </view>
          <view class="tvl-apr">
            <text class="apr-text">1% APR</text>
          </view>
        </view>
      </view>

      <!-- 兑换功能区域 -->
      <view class="exchange-section">
        <view class="exchange-title">USDT to VGAU</view>
        <view class="exchange-input">
          <input class="input-field" placeholder="Enter exchange amount" />
          <view class="currency-label">VGAU</view>
        </view>
        <view class="confirm-button">
          <text class="button-text">Confirm Operation</text>
        </view>
      </view>

      <!-- 项目介绍区域 -->
      <view class="project-section">
        <view class="project-title">Afrigold Ledger</view>
        <view class="project-desc">
          An RWA protocol that anchors gold assets with on-chain tokens, providing secure and transparent gold digitization solutions.
        </view>
        <view class="contract-info">
          <text class="contract-label">Contract address:</text>
          <text class="contract-address">{{ contractAddress.substring(0, 2) }}...</text>
          <image class="copy-icon" src="/static/fuzhi.png" mode="aspectFit" @click="copyContractAddress" />
        </view>
        <view class="project-badges">
          <view class="badge">
            <image class="badge-icon" src="/static/Home/Audited.png" mode="aspectFit" />
            <text class="badge-text">Audited</text>
          </view>
          <view class="badge">
            <image class="badge-icon" src="/static/Home/Custodian.png" mode="aspectFit" />
            <text class="badge-text">Custodian</text>
          </view>
          <view class="badge">
            <image class="badge-icon" src="/static/Home/Details.png" mode="aspectFit" />
            <text class="badge-text">Details</text>
          </view>
        </view>
      </view>

      <!-- 黄金库存区域 -->
      <view class="inventory-section">
        <view class="inventory-header">
          <image class="gold-icon" src="/static/Home/Gold.png" mode="aspectFit" />
          <text class="inventory-title">Gold Inventory</text>
        </view>
        <view class="inventory-amount">
          <text class="amount-number">5,611,036g</text>
          <text class="amount-label">Inventory Amount</text>
        </view>
        <view class="daily-inventory">
          <text class="daily-label">Daily Inventory Amount</text>
          <scroll-view class="daily-scroll" scroll-x="true" show-scrollbar="false">
            <view class="daily-data">
              <view class="daily-item">
                <text class="daily-date">2025-12-02</text>
                <text class="daily-amount">5,611,036g</text>
              </view>
              <view class="daily-item">
                <text class="daily-date">2025-01-02</text>
                <text class="daily-amount">5,611,036g</text>
              </view>
              <view class="daily-item">
                <text class="daily-date">2025-12-01</text>
                <text class="daily-amount">5,611,036g</text>
              </view>
              <view class="daily-item">
                <text class="daily-date">2025-11-30</text>
                <text class="daily-amount">5,610,000g</text>
              </view>
              <view class="daily-item">
                <text class="daily-date">2025-11-29</text>
                <text class="daily-amount">5,609,500g</text>
              </view>
              <view class="daily-item">
                <text class="daily-date">2025-11-28</text>
                <text class="daily-amount">5,609,000g</text>
              </view>
            </view>
          </scroll-view>
        </view>
        <view class="source-info">
          <text class="source-text">Source: African Gold Mining Area</text>
          <text class="certificate-text">Certificate No: AGL-2021-001</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { onPageScroll, onShow } from '@dcloudio/uni-app'
  
  // 轮播图数据
  const banners = ref([
    '/static/Home/banner1.png',
    '/static/Home/banner2.png',
    '/static/Home/banner3.png'
  ])
  
  // 当前轮播图索引
  const currentBannerIndex = ref(0)
  
  // 合同地址
  const contractAddress = ref('0x1234567890abcdef1234567890abcdef12345678')
  
  // 复制合同地址到剪贴板
  const copyContractAddress = () => {
    uni.setClipboardData({
      data: contractAddress.value,
      success: () => {
        uni.showToast({
          title: 'Copied',
          icon: 'success',
          duration: 2000
        })
      },
      fail: () => {
        uni.showToast({
          title: 'Copy failed',
          icon: 'error',
          duration: 2000
        })
      }
    })
  }
  
  // 连接钱包
  const connectWallet = () => {
    uni.showToast({
      title: 'Wallet connection coming soon',
      icon: 'none',
      duration: 2000
    })
  }
  
  // 轮播图切换事件
  const onSwiperChange = (e) => {
    currentBannerIndex.value = e.detail.current
  }
  
  // 语言选择相关
  const showLanguageDropdown = ref(false)
  const currentLanguage = ref('en') // 默认设置为英文，因为当前页面是英文页面
  
  // 切换语言下拉框显示
  const toggleLanguageDropdown = () => {
    showLanguageDropdown.value = !showLanguageDropdown.value
  }
  
  // 选择语言
  const selectLanguage = (language) => {
    currentLanguage.value = language
    showLanguageDropdown.value = false
    
    // 语言切换提示文字
    const switchMessages = {
      'ar': 'تم التبديل',
      'en': 'Switched',
      'fr': 'Changé',
      'zh': '已切換',
      'pt': 'Alterado'
    }
    
    // 使用与复制功能相同的Toast样式
    uni.showToast({
      title: switchMessages[language],
      icon: 'none',
      duration: 2000,
      position: 'center'
    })
  }
  
  onMounted(() => {
    console.log('首页加载完成')
    
    // 添加点击外部关闭下拉框的监听器（支持移动端）
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: false })
    document.addEventListener('touchend', handleClickOutside, { passive: false })
    
    // 注入全局Toast样式
    injectToastStyles()
  })
  
  // 组件卸载时移除监听器
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
    document.removeEventListener('touchend', handleClickOutside)
  })
  
  // 处理点击外部关闭下拉框
  const handleClickOutside = (event) => {
    // 阻止事件冒泡，确保触摸事件正确处理
    event.stopPropagation()
    
    // 立即执行，确保触摸响应及时
    const languageContainer = document.querySelector('.language-container')
    if (languageContainer && !languageContainer.contains(event.target)) {
      showLanguageDropdown.value = false
    }
  }
  
  // 添加页面滚动时关闭下拉框
  onPageScroll(() => {
    if (showLanguageDropdown.value) {
      showLanguageDropdown.value = false
    }
  })
  
  // 添加页面显示时关闭下拉框
  onShow(() => {
    if (showLanguageDropdown.value) {
      showLanguageDropdown.value = false
    }
  })
  
  // 添加触摸移动事件监听，确保触摸响应
  onMounted(() => {
    // 监听整个页面的触摸事件
    const pageElement = document.querySelector('.content')
    if (pageElement) {
      pageElement.addEventListener('touchmove', () => {
        if (showLanguageDropdown.value) {
          showLanguageDropdown.value = false
        }
      })
    }
  })
  
  // 注入全局Toast样式
  const injectToastStyles = () => {
    const style = document.createElement('style')
    style.textContent = `
      .uni-toast,
      .uni-toast__content,
      .uni-toast--center,
      .uni-toast--top,
      .uni-toast--bottom {
        background: rgba(0, 0, 0, 0.8) !important;
        background-color: rgba(0, 0, 0, 0.8) !important;
        color: #FFFFFF !important;
        border-radius: 16rpx !important;
        border: 1rpx solid rgba(255, 255, 255, 0.1) !important;
      }
    `
    document.head.appendChild(style)
  }

</script>

<style lang="scss" scoped>
/* 全局背景色 */
:deep(body), :deep(html) {
  background-color: #0A0A0A !important;
}

/* 全局Toast样式覆盖 */
:deep(.uni-toast),
:deep(.uni-toast__content),
:deep(.uni-toast--center),
:deep(.uni-toast--top),
:deep(.uni-toast--bottom) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

/* 更强力的Toast样式覆盖 */
:deep(.uni-toast) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

:deep(.uni-toast__content) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  overflow-x: hidden;
}

/* 自定义顶部栏 */
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #000000;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding-top: var(--status-bar-height, 0px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
}

.logo-container {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.logo {
  width: 160rpx;
  height: 40rpx;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  object-fit: contain;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.page-title {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 600;
  text-align: center;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 24rpx;
  flex: 0 0 auto;
}

.connect-wallet-btn {
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 8rpx 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connect-wallet-btn:active {
  transform: scale(0.95);
}

.btn-text {
  color: #000000;
  font-size: 28rpx;
  font-weight: 500;
  white-space: nowrap;
}

.language-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66rpx;
  height: 64rpx;
  flex: 0 0 auto;
  position: relative;
}

.language-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8rpx;
  border-radius: 8rpx;
  transition: background-color 0.3s ease;
}

.language-btn:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
  min-width: 220rpx;
  max-width: 280rpx;
  z-index: 1001;
  margin-top: 8rpx;
}



.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18rpx 20rpx;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
}

.dropdown-item:first-child {
  border-radius: 16rpx 16rpx 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 16rpx 16rpx;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.language-text {
  font-size: 28rpx;
  color: #FFFFFF;
}



.language-icon {
  width: 56rpx;
  height: 56rpx;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 40rpx 32rpx;
  min-height: 100vh;
  background-color: #0A0A0A;
  margin-top: calc(88rpx + var(--status-bar-height, 0px));
}

/* 轮播图区域 */
.banner-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 44rpx;
}

.banner-swiper {
  width: 100%;
  height: 360rpx;
  border-radius: 32rpx;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 32rpx;
}



.banner-indicators {
  display: flex;
  justify-content: center;
  gap: 8rpx;
  margin-top: 32rpx;
}

.indicator {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.indicator.active {
  background: #FFFFFF;
}

/* TVL数据区域 */
.tvl-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rpx;
  padding: 32rpx 0;
}

.tvl-number {
  font-size: 72rpx;
  font-weight: 400;
  color: transparent;
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 1.1;
}

.tvl-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8rpx;
  display: inline-block;
  align-self: flex-start;
}

.tvl-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32rpx;
}

.tvl-text {
  font-size: 28rpx;
  color: #FFFFFF;
}

.apr-text {
  font-size: 28rpx;
  color: #00CC66;
}

/* 兑换功能区域 */
.exchange-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rpx;
  padding: 32rpx 0;
}

.exchange-title {
  font-size: 28rpx;
  color: #D1D5DB;
  margin-bottom: 16rpx;
}

.exchange-input {
  display: flex;
  align-items: center;
  border: 1rpx solid #444444;
  border-radius: 16rpx;
  padding: 30rpx 26rpx;
  margin-bottom: 32rpx;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.2);
  font-size: 28rpx;
}

.currency-label {
  font-size: 32rpx;
  color: #D1D5DB;
  margin-left: 32rpx;
}

.confirm-button {
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  border-radius: 16rpx;
  padding: 24rpx 0;
  text-align: center;
}

.button-text {
  color: #000000;
  font-size: 32rpx;
  font-weight: 400;
}

/* 项目介绍区域 */
.project-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rpx;
  padding: 32rpx 0;
}

.project-title {
  font-size: 40rpx;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

.project-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.67;
  margin-bottom: 32rpx;
}

.contract-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 32rpx;
  flex-wrap: nowrap;
}

.contract-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
}

.contract-address {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
}

.copy-icon {
  width: 28rpx;
  height: 28rpx;
  cursor: pointer;
}

.project-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.badge {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #333333;
  border-radius: 24rpx;
  padding: 12rpx 24rpx;
}

.badge-icon {
  width: 24rpx;
  height: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-text {
  font-size: 24rpx;
  color: #FFFFFF;
}

/* 黄金库存区域 */
.inventory-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 44rpx;
  padding: 32rpx 0;
}

.inventory-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.gold-icon {
  width: 48rpx;
  height: 48rpx;
}

.inventory-title {
  font-size: 36rpx;
  color: #FFFFFF;
}

.inventory-amount {
  margin-bottom: 32rpx;
}

.amount-number {
  font-size: 48rpx;
  color: #FFD700;
  display: block;
  margin-bottom: 8rpx;
}

.amount-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
}

.daily-inventory {
  margin-bottom: 32rpx;
}

.daily-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16rpx;
  display: block;
}

.daily-scroll {
  width: 100%;
  white-space: nowrap;
}

.daily-data {
  display: flex;
  gap: 16rpx;
  padding: 16rpx 0;
}

.daily-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200rpx;
  background: #000000;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  padding: 24rpx 16rpx;
  flex-shrink: 0;
}

.daily-date {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8rpx;
  text-align: center;
}

.daily-amount {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 600;
  text-align: center;
}

.source-info {
  margin-top: 32rpx;
}

.source-text, .certificate-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.2);
  display: block;
  margin-bottom: 8rpx;
}

/* 自定义Toast样式 - 半透明（移动端兼容） */
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

/* 针对不同位置的Toast样式 */
:deep(.uni-toast--center) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

:deep(.uni-toast--top) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

:deep(.uni-toast--bottom) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

/* 移动端特殊处理 */
@media (max-width: 768px) {
  :deep(.uni-toast) {
    background: rgba(0, 0, 0, 0.8) !important;
    background-color: rgba(0, 0, 0, 0.8) !important;
    font-size: 20rpx;
    padding: 16rpx 24rpx;
  }
}
</style> 
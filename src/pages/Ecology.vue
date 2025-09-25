<template>
  <view class="content">
    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 顶部热门外链区域 -->
      <view class="hero-section" v-if="!loading && popularLinks.length > 0">
        <swiper 
          class="popular-swiper" 
          :indicator-dots="false" 
          :autoplay="true" 
          :interval="3000" 
          :duration="500"
          :circular="true"
          @change="onSwiperChange"
        >
          <swiper-item 
            v-for="(link, index) in popularLinks" 
            :key="link.id"
            @click="handleLinkClick(link)"
          >
            <view class="popular-link-item">
              <view class="popular-link-image">
                <image 
                  v-if="getLinkImageUrl(link)" 
                  :src="getLinkImageUrl(link)" 
                  class="popular-image"
                  mode="aspectFill"
                />
                <view v-else class="popular-image-placeholder">
                  <text class="placeholder-text">{{ link.name }}</text>
                </view>
                <view class="popular-overlay">
                  <text class="popular-title">{{ link.name }}</text>
                  <text class="popular-description">{{ link.description || '点击访问' }}</text>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="popular-dots">
          <view 
            class="dot" 
            v-for="(link, index) in popularLinks" 
            :key="index"
            :class="{ 'active': currentSwiperIndex === index }"
          ></view>
        </view>
      </view>
      
      <!-- 顶部加载状态 -->
      <view class="hero-section" v-if="loading">
        <view class="hero-loading">
          <view class="loading-spinner"></view>
          <text class="loading-text">加载热门链接中...</text>
        </view>
      </view>
      
      <!-- 顶部错误状态 -->
      <view class="hero-section" v-if="error && !loading">
        <view class="hero-error">
          <text class="error-text">Load Failed</text>
        </view>
      </view>

      <!-- 横向游戏图标区域 -->
      <view class="horizontal-games" v-if="!loading && links.length > 0">
        <view 
          class="game-item" 
          v-for="(link, index) in links.slice(0, 4)" 
          :key="link.id"
          @click="handleLinkClick(link)"
        >
          <view class="game-icon">
            <image 
              v-if="getLinkIconUrl(link)" 
              :src="getLinkIconUrl(link)" 
              class="game-icon-image"
              mode="aspectFit"
            />
            <text v-else class="game-icon-text">🎮</text>
          </view>
          <text class="game-label">{{ link.name }}</text>
        </view>
      </view>
      
      <!-- 加载状态 -->
      <view class="loading-container" v-if="loading">
        <view class="loading-spinner"></view>
        <text class="loading-text">加载中...</text>
      </view>
      
      <!-- 错误状态 -->
      <view class="error-container" v-if="error && !loading">
        <text class="error-text">Load Failed</text>
      </view>
                 
      <!-- 垂直游戏列表区域 -->
      <view class="vertical-games" v-if="!loading && links.length > 0">
        <view 
          class="game-row" 
          v-for="(link, index) in links.slice(4)" 
          :key="link.id"
          @click="handleLinkClick(link)"
        >
          <view class="game-icon-small">
            <image 
              v-if="getLinkIconUrl(link)" 
              :src="getLinkIconUrl(link)" 
              class="game-icon-image-small"
              mode="aspectFit"
            />
            <text v-else class="game-icon-text-small">🎮</text>
          </view>
          <view class="game-info">
            <text class="game-title">{{ link.name }}</text>
            <text class="game-description">{{ link.description || '点击访问' }}</text>
          </view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view class="empty-container" v-if="!loading && links.length === 0">
        <text class="empty-text">暂无外链数据</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { contentAPI } from '@/api/apiService.js'
import { BASE_URL } from '@/config/api.js'
import { useI18n } from 'vue-i18n'

// 国际化
const { t } = useI18n()

// 响应式数据
const links = ref([])
const popularLinks = ref([])
const loading = ref(false)
const error = ref('')
const currentSwiperIndex = ref(0)

// 生成外链图标URL
const getLinkIconUrl = (link) => {
  if (!link.iconFileId) {
    return null
  }
  // 使用新的图标API接口
  return `${BASE_URL}/content/links/icon/${link.iconFileId}`
}

// 生成外链图片URL（用于轮播图）
const getLinkImageUrl = (link) => {
  if (!link.imageFileId) {
    return null
  }
  // 使用新的图片API接口
  return `${BASE_URL}/content/links/image/${link.imageFileId}`
}

// 获取外链数据
const fetchLinks = async () => {
  try {
    loading.value = true
    error.value = ''
    
    console.log('🌐 开始获取外链数据...')
    
    // 并行获取所有外链和热门外链
    const [linksResponse, popularResponse] = await Promise.all([
      contentAPI.getLinks(),
      contentAPI.getPopularLinks() // 获取热门外链，数量由后端决定
    ])
    
    console.log('📡 外链数据响应:', linksResponse)
    console.log('📡 热门外链响应:', popularResponse)
    
    if (linksResponse.success && linksResponse.data) {
      links.value = linksResponse.data
      console.log('✅ 外链数据获取成功:', links.value)
    } else {
      throw new Error(linksResponse.message || '获取外链数据失败')
    }
    
    if (popularResponse.success && popularResponse.data) {
      popularLinks.value = popularResponse.data
      console.log('✅ 热门外链数据获取成功:', popularLinks.value)
    } else {
      console.warn('⚠️ 热门外链获取失败:', popularResponse.message)
    }
  } catch (err) {
    console.error('❌ 获取外链数据失败:', err)
    error.value = err.message || '获取外链数据失败'
  } finally {
    loading.value = false
  }
}

// 轮播图切换事件
const onSwiperChange = (e) => {
  currentSwiperIndex.value = e.detail.current
  console.log('🔄 轮播图切换到索引:', currentSwiperIndex.value)
}

// 处理外链点击
const handleLinkClick = async (link) => {
  console.log('🔗 点击外链:', link)
  
  if (!link.targetUrl) {
    uni.showToast({
      title: t('invitation.invalidLink'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  try {
    // 1. 记录点击 - 匿名调用，不需要登录
    console.log('📊 记录外链点击...')
    await contentAPI.recordLinkClick(link.id)
    console.log('✅ 点击记录成功')
  } catch (error) {
    console.warn('⚠️ 点击记录失败:', error.message)
    // 点击记录失败不影响用户操作，继续执行
  }
  
  try {
    // 2. 确认进入 - 需要登录，尝试获取积分奖励
    console.log('🎯 尝试确认进入外链获取积分...')
    const confirmResult = await contentAPI.confirmLinkEntry(link.id)
    console.log('✅ 确认进入成功:', confirmResult)
    
    // 显示积分奖励提示
    if (confirmResult.success) {
      uni.showToast({
        title: t('invitation.pointsReward'),
        icon: 'success',
        duration: 2000
      })
    }
  } catch (error) {
    console.warn('⚠️ 确认进入失败:', error.message)
    // 确认进入失败不影响用户访问链接，静默处理
  }
  
  // 3. 直接打开外链
  // #ifdef H5
  window.open(link.targetUrl, '_blank')
  // #endif
  
  // #ifdef APP-PLUS
  plus.runtime.openURL(link.targetUrl)
  // #endif
  
  // #ifdef MP
  uni.showToast({
    title: t('invitation.openInBrowser'),
    icon: 'none',
    duration: 2000
  })
  // #endif
}

onMounted(() => {
  console.log('Ecology页面加载完成')
  fetchLinks()
})
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

.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32rpx;
  background-color: #0A0A0A;
}

/* 顶部热门外链区域 */
.hero-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 40rpx;
}

.popular-swiper {
  width: 100%;
  height: 352rpx;
  margin-bottom: 24rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.popular-link-item {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.popular-link-item:active {
  transform: scale(0.98);
}

.popular-link-image {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  overflow: hidden;
}

.popular-image {
  width: 100%;
  height: 100%;
}

.popular-image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-text {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.6);
  font-family: Inter, sans-serif;
  text-align: center;
}

.popular-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx 32rpx;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.popular-title {
  font-size: 48rpx;
  font-weight: 700;
  color: #FFFFFF;
  font-family: Inter, sans-serif;
}

.popular-description {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  font-family: Inter, sans-serif;
}

.popular-dots {
  display: flex;
  justify-content: center;
  gap: 16rpx;
}

/* 顶部加载状态 */
.hero-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 352rpx;
  gap: 24rpx;
  background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%);
  border-radius: 16rpx;
}

.hero-loading .loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
  font-family: Inter, sans-serif;
}

/* 顶部错误状态 */
.hero-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 352rpx;
  gap: 24rpx;
  background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%);
  border-radius: 16rpx;
}

.hero-error .error-text {
  font-size: 28rpx;
  color: #FF6B6B;
  font-family: Inter, sans-serif;
}

.dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.dot.active {
  background-color: #FFFFFF;
  transform: scale(1.2);
}

/* 横向游戏图标区域 */
.horizontal-games {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  margin-bottom: 40rpx;
  overflow-x: auto;
  padding: 0 0 16rpx 0;
}

.game-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  flex-shrink: 0;
}

.game-icon {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #1A1A1A;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-icon-text {
  font-size: 48rpx;
  color: #FFFFFF;
}

.game-icon image,
.game-icon-image {
  width: 100%;
  height: 100%;
}

.game-label {
  font-size: 24rpx;
  color: #FFFFFF;
  font-family: Inter, sans-serif;
  text-align: center;
  max-width: 120rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 垂直游戏列表区域 */
.vertical-games {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.game-row {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 2rpx solid #1A1A1A;
}

.game-row:last-child {
  border-bottom: none;
}

.game-icon-small {
  width: 96rpx;
  height: 96rpx;
  border-radius: 16rpx;
  overflow: hidden;
  background-color: #1A1A1A;
  margin-right: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-icon-text-small {
  font-size: 32rpx;
  color: #FFFFFF;
}

.game-icon-small image,
.game-icon-image-small {
  width: 100%;
  height: 100%;
}

.game-icon-small.placeholder {
  background-color: #222222;
}

.game-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.game-title {
  font-size: 30rpx;
  color: #FFFFFF;
  font-family: Inter, sans-serif;
  font-weight: 400;
}

.game-description {
  font-size: 26rpx;
  color: rgba(255, 255, 255, 0.5);
  font-family: Inter, sans-serif;
}


/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
  gap: 24rpx;
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.1);
  border-top: 4rpx solid #FFFFFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
  font-family: Inter, sans-serif;
}

/* 错误状态样式 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
  gap: 24rpx;
}

.error-text {
  font-size: 28rpx;
  color: #FF6B6B;
  font-family: Inter, sans-serif;
  text-align: center;
}


/* 空状态样式 */
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-family: Inter, sans-serif;
}

/* 点击效果 */
.game-item,
.game-row {
  cursor: pointer;
  transition: all 0.2s ease;
}

.game-item:active,
.game-row:active {
  transform: scale(0.95);
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 0 24rpx;
  }
  
  .popular-title {
    font-size: 40rpx;
  }
  
  .popular-description {
    font-size: 24rpx;
  }
  
  .popular-link-image {
    height: 280rpx;
  }
  
  .hero-loading,
  .hero-error {
    height: 280rpx;
  }
  
  .game-icon {
    width: 100rpx;
    height: 100rpx;
  }
  
  .game-icon-small {
    width: 80rpx;
    height: 80rpx;
  }
}
</style> 
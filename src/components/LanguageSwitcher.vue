<template>
  <view class="language-switcher">
    <view class="language-item" 
          v-for="locale in supportedLocales" 
          :key="locale.code"
          :class="{ active: currentLocale === locale.code }"
          @click="switchLanguage(locale.code)">
      <text class="flag">{{ locale.flag }}</text>
      <text class="name">{{ locale.name }}</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, getSupportedLocales } from '@/i18n/i18n.js'

const { locale } = useI18n()

// 当前语言
const currentLocale = computed(() => locale.value)

// 支持的语言列表
const supportedLocales = getSupportedLocales()

// 切换语言
const switchLanguage = (lang) => {
  if (lang !== currentLocale.value) {
    setLocale(lang)
    // 可以在这里添加其他语言切换后的逻辑
    uni.showToast({
      title: lang === 'zh' ? '已切换到中文' : 'Switched to English',
      icon: 'success',
      duration: 1500
    })
  }
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding: 24rpx;
}

.language-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 24rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.language-item.active {
  background: rgba(255, 255, 255, 0.3);
  border: 2rpx solid #00CC66;
}

.flag {
  font-size: 32rpx;
}

.name {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.language-item.active .name {
  color: #00CC66;
  font-weight: 600;
}
</style> 
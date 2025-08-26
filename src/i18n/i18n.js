import { createI18n } from 'vue-i18n'
import zh from './locales/zh.js'
import en from './locales/en.js'

// 获取浏览器语言设置
const getDefaultLocale = () => {
  const browserLang = navigator.language || navigator.userLanguage
  const lang = browserLang.toLowerCase()
  
  if (lang.startsWith('zh')) {
    return 'zh'
  }
  return 'en'
}

// 获取存储的语言设置
const getStoredLocale = () => {
  try {
    return uni.getStorageSync('locale') || getDefaultLocale()
  } catch (e) {
    return getDefaultLocale()
  }
}

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用Composition API模式
  locale: getStoredLocale(),
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  },
  globalInjection: true, // 全局注入$t函数
  silentTranslationWarn: true, // 静默翻译警告
  missingWarn: false, // 关闭缺失翻译警告
  fallbackWarn: false // 关闭回退翻译警告
})

// 语言切换函数
export const setLocale = (locale) => {
  i18n.global.locale.value = locale
  try {
    uni.setStorageSync('locale', locale)
  } catch (e) {
    console.error('Failed to save locale to storage:', e)
  }
}

// 获取当前语言
export const getCurrentLocale = () => {
  return i18n.global.locale.value
}

// 获取支持的语言列表
export const getSupportedLocales = () => {
  return [
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]
}

export default i18n 
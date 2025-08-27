# Vue I18n 国际化配置说明

## 概述

本项目使用 Vue I18n 实现国际化支持，支持中文和英文两种语言，可以根据用户设置或浏览器语言自动切换。

## 文件结构

```
src/
├── i18n/
│   ├── i18n.js               # I18n配置文件
│   ├── locales/
│   │   ├── zh.js             # 中文语言包
│   │   └── en.js             # 英文语言包
│   └── README.md             # 说明文档
├── components/
│   # 组件相关文件
└── main.js                   # 主入口文件
```

## 支持的语言

- **中文 (zh)**: 简体中文
- **英文 (en)**: English

## 使用方法

### 1. 在 Vue 组件中使用

#### Composition API 方式

```vue
<template>
  <view>
    <text>{{ $t('common.confirm') }}</text>
    <text>{{ $t('navigation.home') }}</text>
    <text>{{ $t('wallet.balance') }}</text>
  </view>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// 使用翻译函数
const message = t('common.success')

// 获取当前语言
const currentLang = locale.value

// 切换语言
const switchToEnglish = () => {
  locale.value = 'en'
}
</script>
```

#### Options API 方式

```vue
<template>
  <view>
    <text>{{ $t('common.confirm') }}</text>
  </view>
</template>

<script>
export default {
  methods: {
    getMessage() {
      return this.$t('common.success')
    }
  }
}
</script>
```

### 2. 编程式切换语言

```javascript
import { setLocale, getCurrentLocale } from '@/i18n/i18n.js'

// 切换到中文
setLocale('zh')

// 获取当前语言
const currentLang = getCurrentLocale()
```

## 语言包结构

### 通用文本 (common)
```javascript
common: {
  confirm: '确认',
  cancel: '取消',
  save: '保存',
  // ...
}
```

### 导航 (navigation)
```javascript
navigation: {
  home: '首页',
  defi: 'DeFi',
  ecology: '生态',
  // ...
}
```

### 页面特定文本
每个页面都有自己的翻译键，如：
- `home.*` - 首页相关
- `defi.*` - DeFi页面相关
- `wallet.*` - 钱包相关
- `auth.*` - 认证相关

## 添加新的翻译

### 1. 在中文语言包中添加

```javascript
// src/i18n/locales/zh.js
export default {
  // ... 现有翻译
  newFeature: {
    title: '新功能',
    description: '这是一个新功能的描述'
  }
}
```

### 2. 在英文语言包中添加

```javascript
// src/i18n/locales/en.js
export default {
  // ... 现有翻译
  newFeature: {
    title: 'New Feature',
    description: 'This is a description of the new feature'
  }
}
```

### 3. 在组件中使用

```vue
<template>
  <view>
    <text>{{ $t('newFeature.title') }}</text>
    <text>{{ $t('newFeature.description') }}</text>
  </view>
</template>
```

## 动态翻译

### 带参数的翻译

```javascript
// 语言包
{
  welcome: '欢迎 {name}',
  balance: '余额: {amount} {currency}'
}

// 使用
$t('welcome', { name: 'John' })
$t('balance', { amount: '1000', currency: 'USDT' })
```

### 复数形式

```javascript
// 语言包
{
  item: 'no items | one item | {count} items'
}

// 使用
$tc('item', 0) // "no items"
$tc('item', 1) // "one item"
$tc('item', 10) // "10 items"
```

## 语言持久化

语言设置会自动保存到本地存储，下次打开应用时会恢复用户的语言选择。

## 自动语言检测

应用会根据浏览器的语言设置自动选择默认语言：
- 中文浏览器 → 中文
- 其他语言浏览器 → 英文

## 最佳实践

1. **使用有意义的键名**: 使用描述性的键名，如 `wallet.balance` 而不是 `wb`
2. **保持结构一致**: 中英文语言包的结构应该保持一致
3. **避免硬编码**: 不要在代码中硬编码文本，始终使用翻译键
4. **及时更新**: 添加新功能时及时更新语言包
5. **测试翻译**: 切换语言测试所有文本是否正确显示

## 注意事项

1. 确保所有翻译键在两种语言包中都存在
2. 翻译文本要符合目标语言的习惯和表达方式
3. 注意文本长度，不同语言的文本长度可能差异很大
4. 定期检查和更新翻译内容 
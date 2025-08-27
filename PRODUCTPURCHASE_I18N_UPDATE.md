# ProductPurchase 组件国际化更新

## 修改内容

### 1. 更新国际化文本
- **中文**: `輸入質押金額` → `請輸入金額`
- **英文**: `Enter staking amount` → `Please enter amount`

### 2. 修复输入框占位符语法
**修改前 (错误语法):**
```vue
placeholder="{{ t('components.productPurchase.enterStakingAmount') }}"
```

**修改后 (正确语法):**
```vue
:placeholder="$t('components.productPurchase.enterStakingAmount')"
```

## 语法说明

### uni-app 中的动态绑定
- ❌ 错误: `placeholder="{{ expression }}"`
- ✅ 正确: `:placeholder="expression"`

### Vue.js 动态绑定规则
- 使用 `:` 前缀进行属性绑定
- 直接使用 JavaScript 表达式，不需要双花括号

## 修改的文件

1. `src/i18n/locales/zh.js` - 更新中文占位符文本
2. `src/i18n/locales/en.js` - 更新英文占位符文本  
3. `src/views/ProductPurchase.vue` - 修复占位符语法

## 测试结果

现在输入框将根据用户的语言设置显示正确的占位符：
- 中文用户: "请输入金额"
- 英文用户: "Please enter amount"

## 注意事项

确保在其他组件中也使用正确的动态绑定语法，避免类似的语法错误。
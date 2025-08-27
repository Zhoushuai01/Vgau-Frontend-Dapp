# 质押订单创建功能集成

## 功能概述

已成功集成 `/api/stake/orders` 接口到 `ProductPurchase` 组件中，实现了用户创建质押订单的完整功能。

## API 接口详情

### 创建质押订单
- **POST** `/api/stake/orders`
- **权限要求**: 需要用户登录 (ROLE_USER)

### 请求参数
```json
{
  "productId": "stake_prod_abc123def456ghi789jkl",
  "stakeAmount": 1000
}
```

### 响应数据
```json
{
  "success": true,
  "message": "质押订单创建成功",
  "data": {
    "orderId": 12345,
    "stakeAmount": 1000,
    "productId": "VGAU_7D_001",
    "expectedAnnualRate": "8.50",
    "startTime": "2024-01-15T10:30:00",
    "endTime": "2024-01-22T10:30:00",
    "status": "ACTIVE",
    "fundsPoolId": "stake_order_12345"
  }
}
```

## 业务流程

### 资金池机制
1. **资金扣减**: 创建订单时从用户可用余额中扣减VGAU到专用资金池
2. **资金隔离**: 每个订单都有独立的资金池，确保资金安全隔离
3. **自动退还**: 订单取消时会自动退还资金池中的剩余资金
4. **收益分配**: 赎回时从资金池返还本金，并额外发放USDT利息

## 前端实现

### 1. API 配置更新

**`src/config/api.js`**
```javascript
STAKE: {
  PRODUCTS: '/stake/products',
  ORDERS: '/stake/orders',
  HISTORY: '/stake/history',
  DETAILS: '/stake/details'
}
```

**`src/api/apiService.js`**
```javascript
stake = {
  // 创建质押订单
  createOrder: (data) => this.post(this.endpoints.STAKE.ORDERS, data),
  // 获取用户订单列表
  getOrders: () => this.get(this.endpoints.STAKE.ORDERS),
  // 其他方法...
}
```

### 2. 订单创建流程

#### 数据验证
```javascript
// 产品选择验证
if (!selectedProductInfo.value) {
  uni.showToast({ title: t('components.productPurchase.selectProduct') })
  return
}

// 金额验证
const amount = parseFloat(stakingAmount.value)
const minAmount = selectedProductInfo.value.minAmount
const maxAmount = selectedProductInfo.value.maxAmount

if (amount < minAmount || amount > maxAmount) {
  uni.showToast({
    title: `${t('components.productPurchase.amountOutOfRange')} (${minAmount}-${maxAmount} VGAU)`
  })
  return
}
```

#### API 调用
```javascript
const orderData = {
  productId: selectedProductInfo.value.id,
  stakeAmount: parseInt(stakingAmount.value)
}

const response = await stakeAPI.createOrder(orderData)
```

#### 成功处理
```javascript
if (response.success && response.data) {
  // 显示成功提示
  uni.showToast({
    title: response.message || t('components.productPurchase.orderCreateSuccess'),
    icon: 'success'
  })
  
  // 清空输入
  stakingAmount.value = ''
  showProductDetail.value = false
  
  // 跳转到订单详情
  setTimeout(() => {
    uni.navigateTo({
      url: `/views/StakingDetail?orderId=${response.data.orderId}&status=staking`
    })
  }, 2000)
}
```

### 3. 错误处理机制

#### 智能错误识别
```javascript
let errorMessage = t('components.productPurchase.orderCreateFailed')

if (error.message) {
  if (error.message.includes('余额不足') || error.message.includes('insufficient')) {
    errorMessage = t('common.insufficientBalance')
  } else if (error.message.includes('产品不存在')) {
    errorMessage = t('components.productPurchase.productNotFound')
  } else if (error.message.includes('金额')) {
    errorMessage = t('components.productPurchase.invalidAmount')
  } else {
    errorMessage = error.message
  }
}
```

#### 用户体验优化
- **加载提示**: 显示 "处理中..." 遮罩
- **成功反馈**: 成功提示 + 自动跳转
- **错误提示**: 详细的错误信息分类
- **表单重置**: 成功后清空输入内容

### 4. 国际化支持

#### 中文文本
```javascript
productPurchase: {
  processing: '處理中...',
  selectProduct: '請選擇產品',
  orderCreateSuccess: '質押訂單創建成功！',
  orderCreateFailed: '創建訂單失敗',
  productNotFound: '產品不存在',
  invalidAmount: '金額無效'
}
```

#### 英文文本
```javascript
productPurchase: {
  processing: 'Processing...',
  selectProduct: 'Please select a product',
  orderCreateSuccess: 'Staking order created successfully!',
  orderCreateFailed: 'Failed to create order',
  productNotFound: 'Product not found',
  invalidAmount: 'Invalid amount'
}
```

## 主要特性

### ✅ 已实现功能

1. **完整的订单创建流程**
   - 产品选择验证
   - 金额范围验证
   - API 调用处理
   - 成功/失败反馈

2. **用户体验优化**
   - 加载状态指示
   - 智能错误提示
   - 自动页面跳转
   - 表单状态管理

3. **数据安全保障**
   - 前端数据验证
   - 后端权限控制
   - 资金池隔离机制

4. **国际化完整支持**
   - 所有提示信息多语言
   - 错误消息本地化

### 🔧 技术亮点

1. **智能错误处理**
   - 根据错误内容自动分类
   - 提供用户友好的错误提示

2. **异步流程控制**
   - 完整的 async/await 处理
   - 加载状态管理
   - 错误边界处理

3. **数据类型转换**
   - 前端 `parseFloat` 验证
   - 后端 `parseInt` 发送
   - 确保数据类型正确

## 用户操作流程

1. **选择产品**: 用户点击产品卡片
2. **查看详情**: 自动显示产品详情栏
3. **输入金额**: 在输入框中输入质押数量
4. **验证数据**: 系统验证金额范围和产品选择
5. **创建订单**: 调用 API 创建质押订单
6. **资金处理**: 系统自动创建资金池并扣减余额
7. **成功反馈**: 显示成功提示并跳转到订单详情

## 后续优化建议

1. **用户余额显示**: 实时显示用户VGAU余额
2. **预估收益计算**: 根据金额和利率计算预期收益
3. **订单确认弹窗**: 创建前显示订单详情确认
4. **批量创建**: 支持一次创建多个订单
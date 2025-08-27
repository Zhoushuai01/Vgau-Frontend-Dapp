# 合约服务使用说明

## 自动重新初始化功能

当用户连接钱包或切换账户时，合约服务会自动重新初始化，确保合约包装器与新的钱包地址匹配。

## 钱包绑定检测功能

当钱包地址切换后，系统会自动检测新地址是否绑定了用户账户，并触发相应的事件通知。

## 无缓存策略

系统采用无缓存策略，确保每次登录状态检查都从后端获取最新数据，不依赖浏览器缓存或本地存储。

### 功能特性

1. **自动监听钱包变化**：监听 MetaMask 的账户变化和链变化事件
2. **自动重新初始化**：检测到变化后自动重新初始化合约
3. **自动绑定检测**：检测新钱包地址是否绑定了用户账户
4. **无缓存策略**：每次检查都从后端获取最新数据
5. **自动缓存清理**：钱包变化时自动清除本地缓存
6. **事件通知**：通过自定义事件通知其他组件

### 使用方法

#### 1. 基本使用

```javascript
import contractService from '@/utils/contractService.js'

// 初始化合约服务
await contractService.init()

// 获取余额等操作会自动使用最新的钱包地址
const balance = await contractService.getVGAUBalance()
```

#### 2. 手动重新初始化

```javascript
// 如果需要手动重新初始化
await contractService.reinit()
```

#### 3. 监听钱包变化事件

```javascript
// 在组件中监听钱包变化事件
window.addEventListener('walletAccountChanged', (event) => {
  console.log('钱包变化:', event.detail)
  // 可以在这里执行其他逻辑
})
```

#### 4. 监听钱包绑定状态更新

```javascript
// 监听钱包绑定状态更新事件
window.addEventListener('walletBindingStatusUpdated', (event) => {
  console.log('钱包绑定状态:', event.detail)
  const { isBound, isLoggedIn, walletAddress, message } = event.detail
  
  if (isBound && isLoggedIn) {
    console.log('✅ 钱包已绑定并已登录')
  } else if (isBound && !isLoggedIn) {
    console.log('⚠️ 钱包已绑定但未登录')
  } else {
    console.log('❌ 钱包未绑定，需要登录')
  }
})
```

#### 5. 监听钱包绑定错误

```javascript
// 监听钱包绑定检测错误
window.addEventListener('walletBindingError', (event) => {
  console.error('钱包绑定检测错误:', event.detail.error)
})
```

### 事件详情

#### `walletAccountChanged` 事件
钱包变化事件，包含以下信息：

```javascript
{
  detail: {
    account: '0x...', // 新的钱包地址
    chainId: '97'     // 当前链ID
  }
}
```

#### `walletBindingCheck` 事件
钱包绑定检测事件，包含以下信息：

```javascript
{
  detail: {
    account: '0x...', // 钱包地址
    chainId: '97',    // 当前链ID
    timestamp: 1234567890, // 时间戳
    source: 'contractService' // 事件来源
  }
}
```

#### `walletBindingStatusUpdated` 事件
钱包绑定状态更新事件，包含以下信息：

```javascript
{
  detail: {
    isBound: true,           // 是否已绑定
    isLoggedIn: true,        // 是否已登录
    walletAddress: '0x...',  // 钱包地址
    message: '状态描述',      // 状态消息
    timestamp: 1234567890    // 时间戳
  }
}
```

#### `walletBindingError` 事件
钱包绑定检测错误事件，包含以下信息：

```javascript
{
  detail: {
    error: '错误描述',        // 错误信息
    timestamp: 1234567890    // 时间戳
  }
}
```

### 注意事项

1. 合约服务会自动处理钱包变化，通常不需要手动干预
2. 钱包绑定检测会在每次地址切换后自动执行
3. 系统采用无缓存策略，每次检查都从后端获取最新数据
4. 钱包变化时会自动清除本地缓存，确保数据一致性
5. 如果遇到合约调用失败，可以尝试调用 `reinit()` 方法
6. 确保在正确的网络上操作（BSC测试网）

### 使用场景

1. **钱包切换检测**：用户切换MetaMask账户时自动检测
2. **登录状态同步**：确保UI显示正确的用户登录状态
3. **权限验证**：验证新钱包地址是否有相应的操作权限
4. **数据一致性**：确保每次操作都使用最新的后端数据
5. **用户体验优化**：自动处理钱包变化，无需用户手动操作 
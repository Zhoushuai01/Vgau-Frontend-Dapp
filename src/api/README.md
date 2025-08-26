# API 服务文档

## 概述

本项目使用统一的API服务进行后端通信，支持多语言错误处理和请求/响应拦截。

## 配置

### 基础配置
- **开发环境**: `http://localhost:5173/api` (代理到 `http://192.168.1.100:8080`)
- **生产环境**: `http://192.168.1.100:8080/api`

### 代理配置
开发环境下，所有 `/api` 请求会自动代理到后端服务器。

## API 模块

### 钱包认证 (Wallet Auth)

#### 创建登录挑战
```javascript
// 请求参数
{
  walletAddress: string,  // 钱包地址 (必需)
  chainId: number        // 链ID (必需，10进制数字)
}

// 响应
{
  message: string,       // 需要签名的消息
  nonce: string         // 随机数
}
```

#### 验证登录签名
```javascript
// 请求参数
{
  walletAddress: string,  // 钱包地址
  message: string,        // 签名消息
  signature: string,      // 签名
  nonce: string          // 随机数
}

// 响应
{
  userData: object,      // 用户数据
  token: string         // 认证令牌
}
```

### 用户认证 (Auth)
- `POST /auth/login` - 用户登录
- `POST /auth/register` - 用户注册
- `GET /auth/profile` - 获取用户资料

### 钱包管理 (Wallet)
- `GET /wallet/balance` - 获取钱包余额
- `GET /wallet/transactions` - 获取交易记录
- `POST /wallet/withdraw` - 提现
- `POST /wallet/deposit` - 充值

### 用户管理 (User)
- `GET /user/profile` - 获取用户资料
- `PUT /user/update` - 更新用户资料
- `POST /user/kyc` - KYC认证

### 2FA认证 (TOTP)
- `POST /totp/setup` - 设置2FA
- `POST /totp/verify` - 验证2FA
- `POST /totp/disable` - 禁用2FA

### 文件管理 (File)
- `POST /file/upload` - 上传文件
- `GET /file/download` - 下载文件
- `GET /file/preview` - 预览文件

### 邀请管理 (Invite)
- `GET /invite/code` - 获取邀请码
- `POST /invite/bind` - 绑定邀请码
- `GET /invite/relations` - 获取邀请关系

## 使用示例

### 钱包登录流程
```javascript
import { walletLogin } from '@/utils/walletService.js'

// 完整的钱包登录流程（包含chainId）
const result = await walletLogin()

if (result.success) {
  console.log('登录成功:', result.userData)
} else if (result.error === 'WALLET_NOT_BOUND') {
  console.log('钱包未绑定，需要引导用户到官网绑定')
} else {
  console.log('登录失败:', result.message)
}
```

### 直接调用API
```javascript
import { walletAuthAPI } from '@/api/apiService.js'

// 创建登录挑战（包含chainId）
const chainId = await getCurrentChainId()
const challenge = await walletAuthAPI.createLoginChallenge(walletAddress, chainId)

// 验证签名
const verifyResult = await walletAuthAPI.verifyLoginSignature({
  walletAddress,
  message: challenge.message,
  signature: signature,
  nonce: challenge.nonce
})
```

## 错误处理

### 统一错误处理
所有API错误都会通过统一的错误处理器处理，支持多语言错误消息。

### 常见错误码
- `401` - 未授权，需要登录
- `403` - 权限不足
- `404` - 资源不存在
- `500` - 服务器错误

### 钱包相关错误
- `WALLET_NOT_BOUND` - 钱包未绑定用户账户
- `CHAIN_ID_MISSING` - 无法获取网络链ID

## 注意事项

1. **chainId参数**: 钱包登录接口必须传递chainId参数，用于验证用户当前连接的网络。chainId以10进制数字格式发送（如：1表示以太坊主网，56表示BSC主网）。如果无法获取chainId，会返回CHAIN_ID_MISSING错误
2. **错误处理**: 所有API调用都应该包含适当的错误处理
3. **多语言支持**: 错误消息会根据当前语言设置自动显示对应语言
4. **代理配置**: 开发环境下API请求会自动代理到后端服务器 
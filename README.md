# VGAU 前端 DApp 项目文档

## 项目概述

VGAU 是一个基于区块链的去中心化金融（DeFi）应用，专注于数字黄金代币（VGAU）的兑换、质押、借贷等金融服务。本项目是 VGAU 生态系统的前端 DApp 应用，采用 uni-app 框架开发，支持多平台部署。

### 项目名称
- **应用名称**: VeriGold
- **项目代号**: vgau-frontend-dapp
- **版本**: 1.0.0

## 技术栈

### 前端框架
- **uni-app 3.0**: 跨平台开发框架，支持 H5、小程序、App 等多端部署
- **Vue 3.4.21**: 渐进式 JavaScript 框架
- **uView Plus 3.4.52**: UI 组件库

### 区块链技术
- **Web3.js 4.16.0**: 以太坊区块链交互库
- **BSC (Binance Smart Chain)**: 主要部署网络
- **MetaMask**: 钱包连接支持

### 开发工具
- **Vite 5.2.8**: 构建工具
- **Sass**: CSS 预处理器
- **Vue i18n 9.14.5**: 国际化支持

## 项目结构

```
vgau-frontend-dapp/
├── src/
│   ├── api/                    # API 服务层
│   │   └── apiService.js       # 统一 API 请求服务
│   ├── config/                 # 配置文件
│   │   ├── api.js             # API 配置
│   │   └── contracts.js       # 智能合约配置
│   ├── i18n/                  # 国际化
│   │   ├── i18n.js           # i18n 配置
│   │   └── locales/          # 语言包
│   │       ├── zh.js         # 中文
│   │       ├── en.js         # 英文
│   │       ├── fr.js         # 法文
│   │       ├── ar.js         # 阿拉伯文
│   │       └── pt.js         # 葡萄牙文
│   ├── pages/                 # 主要页面
│   │   ├── Home.vue          # 首页
│   │   ├── Defi.vue          # DeFi 功能页
│   │   ├── Ecology.vue       # 生态页面
│   │   └── Person.vue        # 个人中心
│   ├── views/                 # 功能页面
│   │   ├── Exchange.vue      # 兑换页面
│   │   ├── Redeem.vue        # 赎回页面
│   │   ├── VGAURecharge.vue  # VGAU 充值
│   │   ├── USDTRecharge.vue  # USDT 充值
│   │   ├── VGAUWithdraw.vue  # VGAU 提现
│   │   ├── USDTWithdraw.vue  # USDT 提现
│   │   ├── MyFinance.vue     # 我的理财
│   │   ├── ProductPurchase.vue # 产品购买
│   │   ├── BorrowOrder.vue   # 借贷订单
│   │   ├── NewLending.vue    # 新借贷
│   │   ├── IncreaseCollateral.vue # 增加抵押
│   │   ├── BorrowingDetail.vue # 借贷详情
│   │   ├── StakingDetail.vue  # 质押详情
│   │   ├── PointsDetails.vue  # 积分详情
│   │   ├── Invitation.vue     # 邀请页面
│   │   ├── Settings.vue       # 设置页面
│   │   ├── History.vue        # 历史记录
│   │   ├── TransactionDetail.vue # 交易详情
│   │   ├── InfoPage.vue       # 信息页面
│   │   └── ProductHelp.vue    # 产品帮助
│   ├── utils/                 # 工具类
│   │   ├── web3.js           # Web3 服务
│   │   ├── vgauService.js    # VGAU 业务服务
│   │   ├── walletService.js  # 钱包服务
│   │   ├── contractService.js # 合约服务
│   │   ├── contractExchange.js # 兑换合约服务
│   │   ├── walletBindingService.js # 钱包绑定服务
│   │   ├── addressUtils.js   # 地址工具
│   │   ├── abiLoader.js      # ABI 加载器
│   │   ├── mobileErrorDetector.js # 移动端错误检测
│   │   └── walletErrorTypes.js # 钱包错误类型
│   ├── static/               # 静态资源
│   │   ├── Home/            # 首页图片
│   │   ├── DeFi/            # DeFi 页面图片
│   │   ├── Person/          # 个人中心图片
│   │   └── ...              # 其他图片资源
│   └── vgau-contracts_bsc-testnet_20250820/ # 智能合约
│       ├── abi/             # 合约 ABI 文件
│       └── deployed_addresses.json # 部署地址
├── package.json             # 项目依赖
├── vite.config.js          # Vite 配置
├── pages.json              # 页面配置
├── manifest.json           # 应用配置
└── README.md               # 项目文档
```

## 核心功能

### 1. 钱包连接
- 支持 MetaMask 钱包连接
- 自动检测网络切换
- 钱包地址管理
- 连接状态持久化

### 2. 代币兑换
- VGAU ↔ USDT 双向兑换
- 实时汇率显示
- 兑换历史记录
- 滑点保护

### 3. 质押服务
- VGAU 代币质押
- 质押收益计算
- 质押详情查看
- 收益提取

### 4. 借贷功能
- 抵押 VGAU 借出 USDT
- 借贷订单管理
- 抵押率监控
- 清算保护

### 5. 资产管理
- 多币种余额显示
- 充值提现功能
- 交易历史查询
- 资产统计

### 6. 生态集成
- 热门链接展示
- 游戏入口
- 合作伙伴链接
- 社区活动

## 智能合约

### 已部署合约（BSC 测试网）

| 合约名称 | 地址 | 功能描述 |
|---------|------|---------|
| VGAUToken | 0x75579C9FB3A30e7c3CaBB5c74E4A6c0DB1e2054d | VGAU 代币合约 |
| VGAUExchange | 0xbEe820f5ACA3a90f21af24a6573F69E3D3232609 | 兑换合约 |
| VGAUPlatformRecharge | 0xFb015C1e853a66a7713e7C750C2fc4451405601b | 平台充值合约 |
| VGAUAccessControl | 0x1b514B0eB5614E4D3d71c235aa733B23b21E0359 | 访问控制合约 |
| VGAUUserKycManager | 0x4772F321A71e70060ceB5C1Ce924DAfA4Ad42B8E | KYC 管理合约 |
| BEP20USDT | 0xf6307065A593840680765889Fc16461bC7781231 | USDT 代币合约 |

### 网络配置
- **BSC 测试网**: Chain ID 97
- **BSC 主网**: Chain ID 56
- **浏览器**: https://testnet.bscscan.com/

## 开发环境配置

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0
- 支持 H5 的现代浏览器
- MetaMask 钱包插件

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# App 开发
npm run dev:custom
```

### 构建部署
```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin

# App 构建
npm run build:custom
```

## 配置说明

### API 配置
- **开发环境**: http://192.168.1.100:8080/api
- **生产环境**: https://api.verigold.ai/api

### 多语言支持
项目支持 5 种语言：
- 中文（简体）
- 英文
- 法文
- 阿拉伯文
- 葡萄牙文

### 平台支持
- H5 网页版
- 微信小程序
- 支付宝小程序
- 百度小程序
- 字节跳动小程序
- QQ 小程序
- App（Android/iOS）

## 主要页面说明

### 首页 (Home.vue)
- 应用 Logo 和导航
- 钱包连接状态
- 语言切换功能
- 轮播图展示
- TVL 数据展示
- 快速兑换功能

### DeFi 页面 (Defi.vue)
- 兑换汇率显示
- 用户余额展示
- 质押收益信息
- 充值提现操作
- 理财功能入口

### 生态页面 (Ecology.vue)
- 热门链接轮播
- 游戏图标展示
- 合作伙伴链接
- 社区活动入口

### 个人中心 (Person.vue)
- 用户信息展示
- 钱包地址管理
- 快捷操作入口
- 资产概览
- 功能菜单

## 技术特性

### 1. 响应式设计
- 适配多种屏幕尺寸
- 移动端优先设计
- 触摸友好的交互

### 2. 状态管理
- 全局状态管理
- 钱包连接状态
- 用户数据缓存

### 3. 错误处理
- 网络错误重试机制
- 用户友好的错误提示
- 移动端错误检测

### 4. 性能优化
- 图片懒加载
- 组件按需加载
- 缓存策略优化

### 5. 安全特性
- 钱包签名验证
- 交易确认机制
- 地址格式验证

## 部署说明

### H5 部署
1. 执行 `npm run build:h5`
2. 将 `dist/build/h5` 目录部署到 Web 服务器
3. 配置 HTTPS 支持（钱包连接要求）

### 小程序部署
1. 执行 `npm run build:mp-weixin`
2. 使用微信开发者工具打开 `dist/build/mp-weixin` 目录
3. 上传代码并提交审核

### App 部署
1. 执行 `npm run build:custom`
2. 使用 HBuilderX 打开项目
3. 配置证书并打包发布

## 注意事项

### 开发注意事项
1. 确保 MetaMask 钱包已安装并配置 BSC 网络
2. 测试网 USDT 需要从测试网水龙头获取
3. 合约交互需要足够的 BNB 作为 Gas 费
4. 生产环境需要替换为主网合约地址

### 安全注意事项
1. 私钥安全：永远不要在代码中硬编码私钥
2. 合约验证：确保使用已验证的合约地址
3. 用户教育：提醒用户注意钓鱼网站
4. 审计报告：定期进行安全审计

## 更新日志

### v1.0.0 (2025-01-20)
- 初始版本发布
- 支持 VGAU/USDT 兑换
- 支持质押和借贷功能
- 多语言支持
- 多平台部署支持

## 联系方式

- **项目地址**: [GitHub Repository]
- **官方网站**: https://verigold.ai
- **技术支持**: [Support Email]
- **社区**: [Community Links]

## 许可证

本项目采用 [LICENSE] 许可证，详情请查看 LICENSE 文件。

---

*本文档最后更新时间：2025年9月25日*
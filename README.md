# VGAU Frontend DApp

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4.21-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Uni-app](https://img.shields.io/badge/Uni--app-3.0.0-2D8CF0?style=flat-square)](https://uniapp.dcloud.io/)
[![Vite](https://img.shields.io/badge/Vite-5.2.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Sass](https://img.shields.io/badge/Sass-1.63.2-CC6699?style=flat-square&logo=sass)](https://sass-lang.com/)

## 📖 项目简介

VGAU Frontend DApp 是一个基于 Uni-app 和 Vue 3 构建的去中心化金融应用前端，专注于 VGAU 代币的借贷、理财和资产管理功能。项目采用现代化的技术栈，支持多端部署，提供流畅的用户体验。

## ✨ 主要功能

### 🔗 Web3 区块链集成
- **MetaMask 钱包连接** - 支持主流钱包连接
- **VGAU 代币交互** - 余额查询、转账、授权等操作
- **智能合约调用** - 与 VGAU 相关合约的完整交互
- **实时数据获取** - TVL、价格、APR 等链上数据
- **交易管理** - 交易发送、确认、历史记录

### 🏦 借贷系统
- **新借贷页面** (`NewLending.vue`) - 提供抵押借贷服务
- **借贷订单管理** (`BorrowOrder.vue`) - 查看和管理借贷订单
- **增加抵押物** (`IncreaseCollateral.vue`) - 追加抵押物功能
- **智能风控** - 实时监控质押率和清算风险

### 💰 资产管理
- **VGAU 充值/提现** (`VGAURecharge.vue`, `VGAUWithdraw.vue`)
- **USDT 充值/提现** (`USDTRecharge.vue`, `USDTWithdraw.vue`)
- **我的理财** (`MyFinance.vue`) - 理财产品管理
- **产品购买** (`ProductPurchase.vue`) - 理财产品购买

### 📚 信息中心
- **金融产品信息** (`InfoPage.vue`) - 详细的产品说明和规则
  - 词汇表 (Glossary) - 专业术语解释
  - 还款规则 (Repayment Rules) - 借贷规则说明

### 🏠 主要页面
- **首页** (`Home.vue`) - 应用主页面
- **DeFi 页面** (`Defi.vue`) - 去中心化金融服务
- **生态页面** (`Ecology.vue`) - 生态系统介绍
- **个人中心** (`Person.vue`) - 用户个人管理

## 🛠 技术栈

### 核心框架
- **Vue 3.4.21** - 渐进式 JavaScript 框架
- **Uni-app 3.0.0** - 跨平台应用开发框架
- **Vite 5.2.8** - 现代化构建工具

### 样式与UI
- **Sass 1.63.2** - CSS 预处理器
- **uview-plus 3.4.52** - UI 组件库
- **自定义样式系统** - 基于 Bootstrap 设计理念

### 工具库
- **dayjs 1.11.13** - 轻量级日期处理库
- **clipboard 2.0.11** - 剪贴板操作
- **vue-i18n 9.1.9** - 国际化支持
- **web3 4.x** - 以太坊 JavaScript API

### 开发工具
- **TypeScript** - 类型安全支持
- **ESLint** - 代码质量检查
- **Prettier** - 代码格式化

## 📦 安装与运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖
```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 开发模式
```bash
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# 支付宝小程序开发
npm run dev:mp-alipay

# 自定义平台
npm run dev:custom
```

### 生产构建
```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin

# 支付宝小程序构建
npm run build:mp-alipay
```

## 📁 项目结构

```
VGAU-Frontend-DApp/
├── src/                          # 源代码目录
│   ├── pages/                    # 主要页面
│   │   ├── Home.vue             # 首页（已集成Web3）
│   │   ├── Defi.vue             # DeFi页面
│   │   ├── Ecology.vue          # 生态页面
│   │   └── Person.vue           # 个人中心
│   ├── views/                    # 功能页面
│   │   ├── NewLending.vue       # 新借贷页面
│   │   ├── InfoPage.vue         # 信息页面
│   │   ├── BorrowOrder.vue      # 借贷订单
│   │   ├── MyFinance.vue        # 我的理财
│   │   ├── ProductPurchase.vue  # 产品购买
│   │   ├── VGAURecharge.vue     # VGAU充值
│   │   ├── VGAUWithdraw.vue     # VGAU提现
│   │   ├── USDTRecharge.vue     # USDT充值
│   │   ├── USDTWithdraw.vue     # USDT提现
│   │   └── IncreaseCollateral.vue # 增加抵押物
│   ├── utils/                    # 工具函数
│   │   ├── web3.js              # Web3核心服务
│   │   ├── vgauService.js       # VGAU业务逻辑
│   │   └── abiLoader.js         # 合约ABI加载器
│   ├── config/                   # 配置文件
│   │   └── contracts.js         # 合约配置
│   ├── vgau-contracts_bsc-testnet_20250820/ # 合约文件
│   │   ├── abi/                 # 合约ABI文件
│   │   └── deployed_addresses.json # 部署地址
│   ├── static/                   # 静态资源
│   │   ├── DiFi/                # DeFi相关图标
│   │   ├── Home/                # 首页相关图片
│   │   ├── Person/              # 个人中心图标
│   │   ├── USDT.png             # USDT图标
│   │   ├── VGAU.png             # VGAU图标
│   │   └── history.png          # 历史记录图标
│   ├── api/                      # API接口
│   ├── componen/                 # 组件目录
│   ├── App.vue                   # 应用入口
│   ├── main.js                   # 主入口文件
│   ├── pages.json               # 页面配置
│   ├── manifest.json            # 应用配置
│   └── uni.scss                 # 全局样式
├── dist/                         # 构建输出目录
├── unpackage/                    # 打包输出目录
├── node_modules/                 # 依赖包
├── package.json                  # 项目配置
├── vite.config.js               # Vite配置
├── index.html                   # HTML模板
└── README.md                    # 项目文档
```

## 🎨 设计特色

### UI/UX 设计
- **深色主题** - 采用深色背景 (#0A0A0A) 提供专业金融应用体验
- **VGAU 品牌色** - 使用橙色 (#FFA500) 作为主要强调色
- **响应式设计** - 适配多种屏幕尺寸和设备
- **现代化界面** - 简洁清晰的用户界面设计

### 交互体验
- **流畅动画** - 页面切换和按钮交互动画
- **实时反馈** - Toast 消息提示和加载状态
- **直观导航** - 清晰的页面层级和导航结构

## 🔧 开发指南

### Web3 开发指南

#### 合约配置
项目使用 BSC 测试网的 VGAU 合约：
- **VGAU 代币合约**: `0x2799cF234C62f9ACee0C0eE2A75A709F29Cc687e`
- **VGAU 兑换合约**: `0x043f1cE5ebE0238606e24e1C4fC433334F8Ed938`
- **VGAU 平台充值合约**: `0x222794B80425954A1EE94DB0241D8f2b5b368a81`
- **VGAU 访问控制合约**: `0x6D34076cEd015521Decc988cdfEe13C53DbCD510`
- **VGAU 用户KYC管理合约**: `0x2b8A7b547a020dE614ea63Fd2978A0c9E2f17b43`

#### 使用示例
```javascript
// 连接钱包
import web3Service from '../utils/web3.js'
import vgauService from '../utils/vgauService.js'

// 初始化服务
await vgauService.init()

// 连接钱包
const result = await web3Service.connectWallet()

// 获取VGAU余额
const balance = await vgauService.getVGAUBalance()

// 获取平台数据
const stats = await vgauService.getPlatformStats()
```

#### 错误处理
所有 Web3 操作都包含完整的错误处理：
```javascript
try {
  const result = await web3Service.connectWallet()
  // 处理成功情况
} catch (error) {
  console.error('操作失败:', error)
  // 显示用户友好的错误信息
}
```

### 代码规范
- 使用 Vue 3 Composition API
- 遵循 ESLint 规则
- 组件命名采用 PascalCase
- 文件命名采用 kebab-case

### 样式规范
- 使用 SCSS 预处理器
- 采用 BEM 命名规范
- 响应式设计优先
- 保持样式模块化

### 组件开发
```vue
<template>
  <view class="component-name">
    <!-- 组件内容 -->
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 组件逻辑
</script>

<style lang="scss" scoped>
.component-name {
  // 组件样式
}
</style>
```

## 🚀 部署说明

### 环境要求
- **MetaMask 钱包**: 用户需要安装 MetaMask 浏览器扩展
- **BSC 网络**: 确保连接到 BSC 测试网（Chain ID: 97）或主网（Chain ID: 56）
- **BNB 余额**: 用户需要有足够的 BNB 支付 Gas 费用

### H5 部署
1. 执行构建命令：`npm run build:h5`
2. 将 `dist/build/h5` 目录部署到 Web 服务器
3. 确保服务器支持 HTTPS（MetaMask 要求）

### 小程序部署
1. 执行对应平台构建命令
2. 使用对应开发者工具打开项目
3. 上传代码到小程序平台

### App 部署
1. 使用 HBuilderX 打开项目
2. 配置应用信息
3. 打包生成安装包

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -m 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- **项目地址**: [https://github.com/YZY-Team/vgau-frontend-dapp](https://github.com/YZY-Team/vgau-frontend-dapp)
- **团队**: YZY-Team
- **技术支持**: 如有问题请提交 Issue

## 🔄 更新日志

### v1.1.0 (2024-12-19)
- 🔗 新增 Web3.js 集成
- 🔗 新增 MetaMask 钱包连接功能
- 🔗 新增 VGAU 代币交互功能
- 🔗 新增智能合约调用功能
- 🔗 新增实时链上数据获取
- ✨ 新增 Web3 功能测试页面
- 📚 更新项目文档和 Web3 使用说明

### v1.0.0 (2024-12-19)
- ✨ 新增借贷功能模块
- ✨ 新增信息页面 (InfoPage)
- ✨ 新增资产管理功能
- ✨ 完善 UI/UX 设计
- 🐛 修复已知问题
- 📚 添加项目文档

---

**VGAU Frontend DApp** - 专业的去中心化金融应用前端解决方案 🚀 
# 贡献指南

感谢您对 VGAU Frontend DApp 项目的关注！我们欢迎所有形式的贡献，包括但不限于：

- 🐛 报告 Bug
- ✨ 提出新功能建议
- 📝 改进文档
- 🔧 提交代码修复
- 🎨 优化用户界面

## 📋 贡献流程

### 1. Fork 项目

首先，请在 GitHub 上 Fork 本项目到您的账户。

### 2. 克隆仓库

```bash
# 克隆您的 Fork
git clone https://github.com/YOUR_USERNAME/vgau-frontend-dapp.git

# 添加上游仓库
git remote add upstream https://github.com/YZY-Team/vgau-frontend-dapp.git
```

### 3. 创建分支

```bash
# 切换到主分支
git checkout main

# 拉取最新代码
git pull upstream main

# 创建功能分支
git checkout -b feature/your-feature-name
# 或创建修复分支
git checkout -b fix/your-fix-name
```

### 4. 开发

- 遵循项目的代码规范
- 确保代码通过所有测试
- 添加必要的文档和注释

### 5. 提交代码

```bash
# 添加更改
git add .

# 提交更改（使用清晰的提交信息）
git commit -m "feat: add new lending feature"

# 推送到您的 Fork
git push origin feature/your-feature-name
```

### 6. 创建 Pull Request

在 GitHub 上创建 Pull Request，并包含以下信息：

- 清晰的标题和描述
- 相关的 Issue 链接
- 测试结果
- 截图（如果是 UI 更改）

## 🛠 开发环境设置

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装步骤

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev:h5
```

## 📝 代码规范

### Vue 组件规范

```vue
<template>
  <!-- 使用语义化的 HTML 标签 -->
  <view class="component-name">
    <text class="title">{{ title }}</text>
    <view class="content">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 使用 Composition API
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update'])

// 响应式数据
const count = ref(0)

// 计算属性
const doubleCount = computed(() => count.value * 2)

// 方法
const increment = () => {
  count.value++
  emit('update', count.value)
}
</script>

<style lang="scss" scoped>
.component-name {
  // 使用 BEM 命名规范
  &__title {
    font-size: 16px;
    font-weight: 500;
  }
  
  &__content {
    margin-top: 8px;
  }
}
</style>
```

### 命名规范

- **文件命名**: 使用 kebab-case (例如: `new-lending.vue`)
- **组件命名**: 使用 PascalCase (例如: `NewLending`)
- **变量命名**: 使用 camelCase (例如: `userName`)
- **常量命名**: 使用 UPPER_SNAKE_CASE (例如: `API_BASE_URL`)

### 提交信息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型 (type)**:
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例**:
```
feat(lending): add new lending page with collateral management
fix(ui): resolve button alignment issue in mobile view
docs: update README with installation instructions
```

## 🎨 UI/UX 设计规范

### 颜色规范

- **主背景色**: `#0A0A0A`
- **VGAU 品牌色**: `#FFA500`
- **文字颜色**: `#FFFFFF` (主要), `rgba(255, 255, 255, 0.7)` (次要)
- **边框颜色**: `rgba(255, 255, 255, 0.1)`

### 间距规范

- 使用 8px 的倍数作为间距
- 常用间距: 8px, 16px, 24px, 32px, 48px

### 字体规范

- 主要文字: 28rpx
- 标题文字: 32rpx, 36rpx
- 小字文字: 24rpx

## 🧪 测试

### 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --grep "lending"
```

### 编写测试

```javascript
import { mount } from '@vue/test-utils'
import NewLending from '@/views/NewLending.vue'

describe('NewLending', () => {
  it('should render correctly', () => {
    const wrapper = mount(NewLending)
    expect(wrapper.exists()).toBe(true)
  })
})
```

## 📚 文档

### 更新文档

- 添加新功能时，请更新相关文档
- 保持 README.md 的准确性
- 添加必要的代码注释

### 文档结构

```
docs/
├── api/           # API 文档
├── components/    # 组件文档
├── guides/        # 使用指南
└── examples/      # 示例代码
```

## 🐛 报告 Bug

### Bug 报告模板

```markdown
## Bug 描述
简要描述 Bug 的情况

## 重现步骤
1. 打开页面
2. 点击按钮
3. 观察结果

## 预期行为
描述期望的正确行为

## 实际行为
描述实际发生的错误行为

## 环境信息
- 操作系统: [例如: Windows 10]
- 浏览器: [例如: Chrome 120.0]
- 设备: [例如: 桌面端/移动端]

## 截图
如果适用，请添加截图

## 其他信息
任何其他相关信息
```

## ✨ 功能建议

### 功能建议模板

```markdown
## 功能描述
详细描述您希望添加的功能

## 使用场景
描述该功能的使用场景和用户价值

## 实现建议
如果有的话，提供实现建议

## 相关链接
相关的 Issue 或讨论链接
```

## 🤝 社区

### 获取帮助

- 📧 邮箱: [项目邮箱]
- 💬 讨论区: [GitHub Discussions]
- 📖 文档: [项目文档]

### 行为准则

我们致力于为每个人提供友好、安全和欢迎的环境。请：

- 尊重所有贡献者
- 使用包容性语言
- 接受建设性批评
- 关注社区利益
- 展现对其他社区成员的同情

## 📄 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下发布。

---

感谢您的贡献！ 🙏 
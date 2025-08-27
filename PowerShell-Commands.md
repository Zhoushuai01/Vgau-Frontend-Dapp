# PowerShell 运行指南

## 问题说明
在 PowerShell 中，`&&` 不是有效的命令分隔符。

## 解决方案

### 方法1: 使用分号分隔符
```powershell
cd D:\VeriGoldDapp; npm run dev:h5
```

### 方法2: 分别执行命令
```powershell
cd D:\VeriGoldDapp
npm run dev:h5
```

### 方法3: 使用 PowerShell 的逻辑运算符
```powershell
cd D:\VeriGoldDapp -and npm run dev:h5
```

## 推荐使用
建议使用**方法1**或**方法2**，这样更清晰且兼容性更好。

## 其他常用命令

### 启动开发服务器
```powershell
npm run dev:h5
```

### 构建项目
```powershell
npm run build:h5
```

### 安装依赖
```powershell
npm install
```
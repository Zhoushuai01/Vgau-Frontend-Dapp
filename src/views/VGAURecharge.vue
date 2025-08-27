<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="header-content">
        <view class="back-btn" @click="goBack">
          <image class="back-icon" src="/static/back.png" mode="aspectFit"></image>
        </view>
        <view class="title-container">
          <view class="vgau-icon">
            <image class="vgau-logo" src="/static/VGAU.png" mode="aspectFit"></image>
          </view>
          <view class="title">{{ $t('rechargePage.vgauRecharge') }}</view>
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 数量输入区域 -->
        <view class="amount-section">
          <view class="section-title">{{ $t('rechargePage.amount') }}</view>
          <view class="input-container">
            <view class="input-field">
              <input 
                class="amount-input" 
                type="number" 
                :placeholder="$t('rechargePage.minimumAmount')" 
                v-model="amount"
                @input="handleAmountInput"
              />
              <view class="currency-label">VGAU |{{ $t('rechargePage.max') }}</view>
            </view>
            <view class="divider"></view>
            <view class="redeemable-info">
              <text class="redeemable-label">{{ $t('rechargePage.availableBalance') }}</text>
              <text class="redeemable-amount">{{ vgauBalance }} vgau</text>
            </view>

          </view>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" :class="{ disabled: isLoading }" @click="confirmRecharge">
          <text class="confirm-text">{{ isLoading ? $t('rechargePage.processing') : $t('rechargePage.confirmOperation') }}</text>
        </view>
      </view>

      <!-- 自定义确认弹窗（与IncreaseCollateral.vue一致） -->
      <view v-if="showConfirmModal" class="modal-overlay" @click="showConfirmModal = false">
        <view class="modal-content" @click.stop>
          <view class="modal-text">
            <text class="recharge-title">{{ t('recharge.modal.title') }}</text>
            <text class="recharge-desc">{{ t('recharge.modal.content', { amount: pendingAmount, symbol: 'VGAU' }) }}</text>
          </view>
          <view class="modal-actions">
            <view class="modal-btn outline" @click="showConfirmModal = false">{{ t('recharge.modal.cancel') }}</view>
            <view class="modal-btn solid" :class="{ disabled: isLoading }" @click="onConfirmModal">{{ t('recharge.modal.confirm') }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 充值错误模态框 -->
    <view class="error-modal" v-if="showErrorModal" @click="showErrorModal = false">
      <view class="error-modal-content" @click.stop>
        <!-- 错误标题 -->
        <view class="error-header">
          <text class="error-title">{{ $t('rechargePage.errorModal.title') }}</text>
          <view class="close-btn" @click="showErrorModal = false">{{ $t('rechargePage.errorModal.close') }}</view>
        </view>
        
        <!-- 错误详情 -->
        <view class="error-details">
          <text class="error-message">{{ currentError.message }}</text>
          <text class="error-description" v-if="currentError.details">{{ currentError.details }}</text>
        </view>
        
        <!-- 解决建议 -->
        <view class="error-suggestions" v-if="currentError.suggestions && currentError.suggestions.length > 0">
          <text class="suggestions-title">{{ $t('rechargePage.errorModal.suggestions') }}</text>
          <view class="suggestion-item" v-for="(suggestion, index) in currentError.suggestions" :key="index">
            <text class="suggestion-text">{{ index + 1 }}. {{ suggestion }}</text>
          </view>
        </view>
        
        <!-- 调试信息（仅在开发环境显示） -->
        <view class="debug-info" v-if="showDebugInfo">
          <text class="debug-title">{{ $t('rechargePage.errorModal.debugInfo') }}</text>
          <text class="debug-text">{{ $t('rechargePage.errorModal.errorType') }}: {{ currentError.errorType || '未知' }}</text>
          <text class="debug-text">{{ $t('rechargePage.errorModal.contract') }}: {{ currentError.contractName || '未知' }}</text>
          <text class="debug-text">{{ $t('rechargePage.errorModal.method') }}: {{ currentError.methodName || '未知' }}</text>
          <text class="debug-text">{{ $t('rechargePage.errorModal.timestamp') }}: {{ currentError.timestamp || '未知' }}</text>
          
          <!-- 技术细节 -->
          <text class="debug-text" v-if="currentError.technicalDetails">原始错误: {{ currentError.technicalDetails.originalError || '未知' }}</text>
          <text class="debug-text" v-if="currentError.technicalDetails?.operationContext">操作金额: {{ currentError.technicalDetails.operationContext.amount || '未知' }}</text>
          <text class="debug-text" v-if="currentError.technicalDetails?.operationContext">钱包地址: {{ currentError.technicalDetails.operationContext.walletAddress || '未知' }}</text>
          
          <!-- 设备信息 -->
          <text class="debug-text" v-if="currentError.technicalDetails?.deviceInfo">设备类型: {{ currentError.technicalDetails.deviceInfo.isMobile ? '移动端' : '桌面端' }}</text>
          <text class="debug-text" v-if="currentError.technicalDetails?.deviceInfo">网络状态: {{ currentError.technicalDetails.deviceInfo.onLine ? '在线' : '离线' }}</text>
          <text class="debug-text" v-if="currentError.technicalDetails?.deviceInfo">平台: {{ currentError.technicalDetails.deviceInfo.platform || '未知' }}</text>
          
          <!-- 移动端特定信息 -->
          <text class="debug-text" v-if="mobileErrorDetector.isMobile">{{ $t('rechargePage.errorModal.deviceType') }}: {{ $t('rechargePage.errorModal.mobile') }}</text>
          <text class="debug-text" v-if="mobileErrorDetector.isMobile">{{ $t('rechargePage.errorModal.platform') }}: {{ mobileErrorDetector.deviceInfo.platform }}</text>
          <text class="debug-text" v-if="mobileErrorDetector.isMobile">{{ $t('rechargePage.errorModal.onlineStatus') }}: {{ mobileErrorDetector.deviceInfo.onLine ? $t('rechargePage.errorModal.online') : $t('rechargePage.errorModal.offline') }}</text>
        </view>
        
        <!-- 操作按钮 -->
        <view class="error-actions">
          <view class="retry-btn" @click="retryRecharge">
            <text class="retry-text">{{ $t('rechargePage.errorModal.retry') }}</text>
          </view>
          <view class="diagnose-btn" @click="runDiagnostics">
            <text class="diagnose-text">🔍 诊断问题</text>
          </view>
          <view class="debug-btn" @click="toggleDebugInfo">
            <text class="debug-btn-text">{{ showDebugInfo ? $t('rechargePage.errorModal.hideDebug') : $t('rechargePage.errorModal.showDebug') }}</text>
          </view>
          <view class="close-error-btn" @click="showErrorModal = false">
            <text class="close-error-text">{{ $t('rechargePage.errorModal.closeError') }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import contractService from '@/utils/contractService.js'
  import mobileErrorDetector from '@/utils/mobileErrorDetector.js'
  
  // 响应式数据
  const amount = ref('')
  const vgauBalance = ref('0.000000')
  const isLoading = ref(false)
  const walletAddress = ref('')
  const showConfirmModal = ref(false)
  const pendingAmount = ref('')
  
  // 错误模态框相关状态
  const showErrorModal = ref(false)
  const showDebugInfo = ref(false)
  const currentError = ref({
    message: '',
    details: '',
    suggestions: [],
    errorType: '',
    contractName: '',
    methodName: '',
    timestamp: ''
  })
  
  const { t } = useI18n()
  
  // 页面加载时初始化
  onMounted(async () => {
    try {
      console.log('📱 页面初始化开始...')
      
      // 检查移动端环境
      if (mobileErrorDetector.isMobile) {
        console.log('📱 检测到移动端设备')
        await checkMobileEnvironment()
      }
      
      await initContractService()
      await loadUserData()
      
      console.log('✅ 页面初始化完成')
    } catch (error) {
      console.error('❌ 页面初始化失败:', error)
    }
  })
  
  // 检查移动端环境
  const checkMobileEnvironment = async () => {
    try {
      console.log('🔍 开始检查移动端环境...')
      
      // 检查常见问题
      const issues = await mobileErrorDetector.checkCommonMobileIssues()
      
      if (issues.length > 0) {
        console.log('⚠️ 发现移动端问题:', issues)
        
        // 显示警告信息
        issues.forEach(issue => {
          if (issue.severity === 'high') {
            uni.showToast({
              title: issue.message,
              icon: 'none',
              duration: 4000
            })
          }
        })
      } else {
        console.log('✅ 移动端环境检查通过')
      }
      
      // 检测钱包环境
      const walletEnv = await mobileErrorDetector.detectWalletEnvironment()
      console.log('📱 移动端钱包环境:', walletEnv)
      
    } catch (error) {
      console.error('❌ 移动端环境检查失败:', error)
    }
  }

  // 初始化合约服务
  const initContractService = async () => {
    try {
      isLoading.value = true
      await contractService.init()
      console.log('✅ 合约服务初始化成功')
    } catch (error) {
      console.error('❌ 合约服务初始化失败:', error)
      uni.showToast({
        title: t('rechargePage.contractInitFailed'),
        icon: 'none',
        duration: 3000
      })
    } finally {
      isLoading.value = false
    }
  }
  
  // 加载用户数据
  const loadUserData = async () => {
    try {
      console.log('🔄 开始加载用户数据...')
      
      // 获取VGAU余额
      console.log('📊 正在获取VGAU余额...')
      const balance = await contractService.getVGAUBalance()
      console.log('💰 VGAU余额获取成功:', balance)
      
      vgauBalance.value = balance.raw
      console.log('💳 设置VGAU余额显示:', vgauBalance.value)
      
      // 获取网络信息
      console.log('🌐 正在获取网络信息...')
      const networkInfo = await contractService.getNetworkInfo()
      walletAddress.value = networkInfo.currentAccount
      console.log('🔗 网络信息获取成功:', networkInfo)
      
      console.log('✅ 用户数据加载成功')
      console.log('📱 当前VGAU余额:', vgauBalance.value)
      console.log('👛 钱包地址:', walletAddress.value)
    } catch (error) {
      console.error('❌ 用户数据加载失败:', error)
      
      // 显示错误提示
      uni.showToast({
        title: `余额加载失败: ${error.message}`,
        icon: 'none',
        duration: 3000
      })
      
      // 设置默认值
      vgauBalance.value = '0.00'
    }
  }




  
  // 返回上一页
  const goBack = () => {
    uni.navigateBack()
  }
  
  // 处理金额输入
  const handleAmountInput = (e) => {
    amount.value = e.detail.value
  }
  
  // 确认充值
  const confirmRecharge = async () => {
    if (!amount.value || parseFloat(amount.value) <= 0) {
      uni.showToast({
        title: t('rechargePage.pleaseEnterValidAmount'),
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    const rechargeAmount = parseFloat(amount.value)
    
    try {
      isLoading.value = true
      // 打开自定义确认弹窗
      pendingAmount.value = rechargeAmount.toString()
      showConfirmModal.value = true
    } catch (error) {
      console.error('充值操作失败:', error)
      uni.showToast({
        title: t('rechargePage.rechargeFailed'),
        icon: 'none',
        duration: 3000
      })
    } finally {
      isLoading.value = false
    }
  }
  
  // 执行充值
  const executeRecharge = async (rechargeAmount) => {
    try {
      isLoading.value = true
      
      uni.showLoading({
        title: t('recharge.loading'),
        mask: true
      })
      
      // 执行完整的VGAU充值流程（授权+充值）
      const result = await contractService.completeVGAURecharge(rechargeAmount)
      
      uni.hideLoading()
      
      if (result && result.transactionHash) {
        uni.showToast({
          title: t('rechargePage.rechargeSuccess'),
          icon: 'success',
          duration: 3000
        })
        
        // 刷新余额
        await loadUserData()
        
        // 清空输入
        amount.value = ''
        
        // 立即返回上一页
        uni.navigateBack()
      }
    } catch (error) {
      uni.hideLoading()
      console.error('❌ 充值执行失败:', error)
      
      // 检查是否是RPC错误，提供重试选项
      if (error.message && error.message.includes('RPC endpoint returned HTTP client error')) {
        showRPCErrorModal(error)
      } else {
        // 显示详细的错误信息
        showRechargeErrorModal(error)
      }
    } finally {
      isLoading.value = false
    }
  }

  // 弹窗确认
  const onConfirmModal = async () => {
    const amount = pendingAmount.value
    showConfirmModal.value = false
    await executeRecharge(amount)
  }

  // 显示RPC错误模态框
  const showRPCErrorModal = (error) => {
    console.log('🔍 显示RPC错误模态框:', error)
    
    const errorInfo = {
      message: '区块链网络连接失败',
      details: 'RPC节点暂时不可用，可能是网络拥堵或节点维护',
      suggestions: [
        '检查网络连接是否正常',
        '尝试切换网络（4G/5G/WiFi）',
        '检查VPN设置',
        '稍后重试（可能是网络拥堵）',
        '尝试使用其他RPC节点'
      ],
      errorType: 'RPC_ERROR',
      contractName: error.contractName || '未知',
      methodName: error.methodName || '未知',
      timestamp: new Date().toISOString()
    }
    
    // 设置错误信息
    currentError.value = errorInfo
    
    showErrorModal.value = true
    showDebugInfo.value = false
  }

  // 显示充值错误模态框
  const showRechargeErrorModal = async (error) => {
    console.log('🔍 显示充值错误模态框:', error)
    
    // 进行详细的错误分析
    const detailedAnalysis = await analyzeRechargeError(error)
    
    let errorInfo = {
      message: detailedAnalysis.userMessage,
      details: detailedAnalysis.details,
      suggestions: detailedAnalysis.suggestions,
      errorType: detailedAnalysis.errorType,
      contractName: detailedAnalysis.contractName,
      methodName: detailedAnalysis.methodName,
      timestamp: detailedAnalysis.timestamp,
      technicalDetails: detailedAnalysis.technicalDetails
    }
    
    // 设置错误信息
    currentError.value = errorInfo
    
    showErrorModal.value = true
    showDebugInfo.value = false // 默认隐藏调试信息
  }

  // 详细分析充值错误
  const analyzeRechargeError = async (error) => {
    console.log('🔍 开始详细分析充值错误...', error)
    
    const analysis = {
      userMessage: '充值失败',
      details: '',
      suggestions: [],
      errorType: 'UNKNOWN',
      contractName: error.contractName || '未知',
      methodName: error.methodName || '未知',
      timestamp: new Date().toISOString(),
      technicalDetails: {}
    }
    
    // 1. 分析错误类型和消息
    if (error.message) {
      const errorMessage = error.message.toLowerCase()
      
      // RPC相关错误
      if (errorMessage.includes('rpc') || errorMessage.includes('http client error') || errorMessage.includes('-32080')) {
        analysis.errorType = 'RPC_ERROR'
        analysis.userMessage = '区块链网络连接失败'
        analysis.details = 'RPC节点暂时不可用，可能是网络拥堵或节点维护'
        analysis.suggestions = [
          '检查网络连接是否正常',
          '尝试切换网络（4G/5G/WiFi）',
          '检查VPN设置',
          '稍后重试（可能是网络拥堵）',
          '尝试使用其他RPC节点'
        ]
      }
      // Gas费用相关错误
      else if (errorMessage.includes('gas') || errorMessage.includes('insufficient funds') || errorMessage.includes('out of gas')) {
        analysis.errorType = 'GAS_ERROR'
        analysis.userMessage = 'Gas费用不足或余额不足'
        analysis.details = '账户BNB余额不足以支付交易手续费'
        analysis.suggestions = [
          '检查账户BNB余额是否充足',
          '尝试减少充值金额',
          '检查Gas费用设置',
          '确保有足够的BNB支付手续费'
        ]
      }
      // 授权相关错误
      else if (errorMessage.includes('approve') || errorMessage.includes('allowance') || errorMessage.includes('permission')) {
        analysis.errorType = 'AUTHORIZATION_ERROR'
        analysis.userMessage = '授权失败'
        analysis.details = 'VGAU代币授权操作失败，可能是权限不足或合约问题'
        analysis.suggestions = [
          '检查钱包是否已连接',
          '确认授权操作',
          '尝试重新授权',
          '检查合约状态'
        ]
      }
      // 合约相关错误
      else if (errorMessage.includes('contract') || errorMessage.includes('method') || errorMessage.includes('abi') || errorMessage.includes('execution reverted')) {
        analysis.errorType = 'CONTRACT_ERROR'
        analysis.userMessage = '合约调用失败'
        analysis.details = '智能合约执行失败，可能是合约问题或参数错误'
        analysis.suggestions = [
          '检查合约地址是否正确',
          '验证合约方法是否存在',
          '检查参数格式是否正确',
          '联系技术支持'
        ]
      }
      // 网络相关错误
      else if (errorMessage.includes('network') || errorMessage.includes('fetch') || errorMessage.includes('timeout') || errorMessage.includes('connection')) {
        analysis.errorType = 'NETWORK_ERROR'
        analysis.userMessage = '网络连接失败'
        analysis.details = '无法连接到区块链网络，可能是网络问题或服务器暂时不可用'
        analysis.suggestions = [
          '检查网络连接是否正常',
          '检查VPN设置',
          '尝试切换网络',
          '稍后重试'
        ]
      }
      // 钱包连接错误
      else if (errorMessage.includes('wallet') || errorMessage.includes('metamask') || errorMessage.includes('provider') || errorMessage.includes('ethereum')) {
        analysis.errorType = 'WALLET_ERROR'
        analysis.userMessage = '钱包连接问题'
        analysis.details = 'MetaMask钱包连接失败，请检查钱包状态'
        analysis.suggestions = [
          '确保MetaMask已安装并解锁',
          '检查钱包是否连接到正确的网络',
          '尝试重新连接钱包',
          '刷新页面后重试'
        ]
      }
      // 用户拒绝错误
      else if (errorMessage.includes('user rejected') || errorMessage.includes('user denied') || errorMessage.includes('cancel') || errorMessage.includes('rejected')) {
        analysis.errorType = 'USER_REJECTED'
        analysis.userMessage = '您取消了操作'
        analysis.details = '在MetaMask中取消了交易请求'
        analysis.suggestions = [
          '请重新点击确认按钮',
          '在MetaMask中确认交易请求',
          '检查MetaMask弹窗是否被阻止'
        ]
      }
      // 其他未知错误
      else {
        analysis.errorType = 'UNKNOWN_ERROR'
        analysis.userMessage = `充值失败: ${error.message}`
        analysis.details = '发生未知错误，需要进一步分析'
        analysis.suggestions = [
          '刷新页面后重试',
          '检查钱包状态',
          '联系技术支持',
          '查看控制台错误日志'
        ]
      }
    }
    
    // 2. 收集技术细节
    analysis.technicalDetails = {
      originalError: error.message,
      errorStack: error.stack,
      errorType: error.errorType,
      contractName: error.contractName,
      methodName: error.methodName,
      timestamp: error.timestamp,
      deviceInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        isMobile: mobileErrorDetector.isMobile,
        onLine: navigator.onLine
      },
      operationContext: {
        operation: 'recharge',
        amount: pendingAmount.value,
        walletAddress: walletAddress.value,
        currentTime: new Date().toISOString()
      }
    }
    
    // 3. 如果是移动端，添加移动端特定分析
    if (mobileErrorDetector.isMobile) {
      console.log('📱 添加移动端特定分析...')
      const mobileAnalysis = mobileErrorDetector.analyzeMobileError(error, {
        operation: 'recharge',
        amount: pendingAmount.value,
        timestamp: new Date().toISOString()
      })
      
      // 合并移动端分析结果
      analysis.details = mobileAnalysis.details || analysis.details
      analysis.suggestions = [...analysis.suggestions, ...mobileAnalysis.suggestions]
    }
    
    // 4. 记录详细分析结果
    console.log('📋 充值错误详细分析完成:', analysis)
    
    return analysis
  }

  // 获取错误详情
  const getErrorDetails = (error) => {
    if (error.errorType === 'NETWORK_ERROR') {
      return t('rechargePage.errorDetails.networkError')
    } else if (error.errorType === 'WALLET_ERROR') {
      return t('rechargePage.errorDetails.walletError')
    } else if (error.errorType === 'GAS_ERROR') {
      return t('rechargePage.errorDetails.gasError')
    } else if (error.errorType === 'CONTRACT_ERROR') {
      return t('rechargePage.errorDetails.contractError')
    } else if (error.errorType === 'NETWORK_UNSUPPORTED') {
      return t('rechargePage.errorDetails.networkUnsupported')
    } else if (error.errorType === 'USER_REJECTED') {
      return t('rechargePage.errorDetails.userRejected')
    } else {
      return t('rechargePage.errorDetails.unknownError')
    }
  }

  // 获取默认解决建议
  const getDefaultSuggestions = (error) => {
    if (error.errorType === 'NETWORK_ERROR') {
      return t('rechargePage.suggestions.network')
    } else if (error.errorType === 'WALLET_ERROR') {
      return t('rechargePage.suggestions.wallet')
    } else if (error.errorType === 'GAS_ERROR') {
      return t('rechargePage.suggestions.gas')
    } else if (error.errorType === 'NETWORK_UNSUPPORTED') {
      return t('rechargePage.suggestions.networkUnsupported')
    } else {
      return t('rechargePage.suggestions.default')
    }
  }

  // 重试充值
  const retryRecharge = async () => {
    try {
      showErrorModal.value = false
      
      // 如果是RPC错误，先等待一下再重试
      if (currentError.value.errorType === 'RPC_ERROR') {
        uni.showToast({
          title: '正在重试，请稍候...',
          icon: 'loading',
          duration: 2000
        })
        
        // 等待3秒后重试
        await new Promise(resolve => setTimeout(resolve, 3000))
      } else {
        // 延迟一下再重试，避免用户连续点击
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      
      if (pendingAmount.value) {
        await executeRecharge(pendingAmount.value)
      }
    } catch (error) {
      console.error('❌ 重试充值失败:', error)
      
      // 检查是否是RPC错误
      if (error.message && error.message.includes('RPC endpoint returned HTTP client error')) {
        showRPCErrorModal(error)
      } else {
        showRechargeErrorModal(error)
      }
    }
  }

  // 切换调试信息显示
  const toggleDebugInfo = () => {
    showDebugInfo.value = !showDebugInfo.value
  }

  // 运行问题诊断
  const runDiagnostics = async () => {
    try {
      console.log('🔍 开始运行问题诊断...')
      
      uni.showLoading({
        title: '正在诊断...',
        mask: true
      })
      
      const diagnostics = await performDiagnostics()
      
      uni.hideLoading()
      
      // 显示诊断结果
      showDiagnosticResults(diagnostics)
      
    } catch (error) {
      uni.hideLoading()
      console.error('❌ 诊断失败:', error)
      
      uni.showToast({
        title: '诊断失败',
        icon: 'none',
        duration: 2000
      })
    }
  }

  // 执行诊断检查
  const performDiagnostics = async () => {
    const results = {
      timestamp: new Date().toISOString(),
      checks: []
    }
    
    // 1. 检查网络连接
    try {
      const networkStatus = await contractService.checkNetwork()
      results.checks.push({
        name: '网络状态',
        status: networkStatus.isSupported ? '✅ 正常' : '❌ 异常',
        details: `链ID: ${networkStatus.chainId}, 支持: ${networkStatus.isSupported}`,
        severity: networkStatus.isSupported ? 'low' : 'high'
      })
    } catch (error) {
      results.checks.push({
        name: '网络状态',
        status: '❌ 检查失败',
        details: error.message,
        severity: 'high'
      })
    }
    
    // 2. 检查钱包连接
    try {
      if (walletAddress.value) {
        results.checks.push({
          name: '钱包连接',
          status: '✅ 已连接',
          details: `地址: ${walletAddress.value}`,
          severity: 'low'
        })
      } else {
        results.checks.push({
          name: '钱包连接',
          status: '❌ 未连接',
          details: '钱包未连接或连接失败',
          severity: 'high'
        })
      }
    } catch (error) {
      results.checks.push({
        name: '钱包连接',
        status: '❌ 检查失败',
        details: error.message,
        severity: 'high'
      })
    }
    
    // 3. 检查合约服务状态
    try {
      const isInitialized = contractService.isInitialized
      results.checks.push({
        name: '合约服务',
        status: isInitialized ? '✅ 已初始化' : '❌ 未初始化',
        details: `初始化状态: ${isInitialized}`,
        severity: isInitialized ? 'low' : 'medium'
      })
    } catch (error) {
      results.checks.push({
        name: '合约服务',
        status: '❌ 检查失败',
        details: error.message,
        severity: 'medium'
      })
    }
    
    // 4. 检查设备环境
    try {
      const isOnline = navigator.onLine
      const isMobile = mobileErrorDetector.isMobile
      
      results.checks.push({
        name: '设备环境',
        status: '✅ 正常',
        details: `在线: ${isOnline}, 设备: ${isMobile ? '移动端' : '桌面端'}`,
        severity: 'low'
      })
    } catch (error) {
      results.checks.push({
        name: '设备环境',
        status: '❌ 检查失败',
        details: error.message,
        severity: 'medium'
      })
    }
    
    // 5. 检查VGAU余额
    try {
      if (vgauBalance.value && vgauBalance.value !== '0.000000') {
        results.checks.push({
          name: 'VGAU余额',
          status: '✅ 正常',
          details: `余额: ${vgauBalance.value}`,
          severity: 'low'
        })
      } else {
        results.checks.push({
          name: 'VGAU余额',
          status: '⚠️ 余额为0',
          details: '当前VGAU余额为0',
          severity: 'medium'
        })
      }
    } catch (error) {
      results.checks.push({
        name: 'VGAU余额',
        status: '❌ 检查失败',
        details: error.message,
        severity: 'medium'
      })
    }
    
    console.log('📋 诊断检查完成:', results)
    return results
  }

  // 显示诊断结果
  const showDiagnosticResults = (diagnostics) => {
    const results = diagnostics.checks
    const highSeverityIssues = results.filter(check => check.severity === 'high')
    const mediumSeverityIssues = results.filter(check => check.severity === 'medium')
    
    let message = '诊断完成！\n\n'
    
    if (highSeverityIssues.length > 0) {
      message += '🔴 严重问题:\n'
      highSeverityIssues.forEach(check => {
        message += `• ${check.name}: ${check.details}\n`
      })
      message += '\n'
    }
    
    if (mediumSeverityIssues.length > 0) {
      message += '🟡 需要注意:\n'
      mediumSeverityIssues.forEach(check => {
        message += `• ${check.name}: ${check.details}\n`
      })
      message += '\n'
    }
    
    if (highSeverityIssues.length === 0 && mediumSeverityIssues.length === 0) {
      message += '✅ 所有检查项都正常！'
    }
    
    uni.showModal({
      title: '问题诊断结果',
      content: message,
      showCancel: false,
      confirmText: '确定'
    })
  }
</script>

<style lang="scss" scoped>
/* 全局样式 */
.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  background: #0A0A0A;
  padding-top: calc(var(--status-bar-height, 0px) + 20rpx);
}

.header-content {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 32rpx;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.title-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
}

.vgau-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vgau-logo {
  width: 48rpx;
  height: 48rpx;
}

.title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
}

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
}

/* 数量输入区域 */
.amount-section {
  margin-bottom: 32rpx;
}

.section-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-bottom: 40rpx;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.input-field {
  position: relative;
  height: 112rpx;
  background: #1A1A1A;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  padding: 0 32rpx;
}

.amount-input {
  flex: 1;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.2);
  font-size: 32rpx;
  height: 100%;
}

.currency-label {
  font-size: 32rpx;
  color: #FFA500;
  font-weight: 400;
  margin-left: 32rpx;
}

.divider {
  width: 100%;
  height: 2rpx;
  background: #1A1A1A;
}

.redeemable-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32rpx;
}



.redeemable-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.redeemable-amount {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: right;
}

/* 赎回至区域 */
.redeem-to-section {
  margin-bottom: 600rpx;  
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.wallet-label {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  text-align: right;
}

.daily-limit {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 确认按钮区域 */
.confirm-section {
  margin-bottom: 24rpx;
}

.confirm-btn {
  width: 100%;
  height: 96rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn:active {
  transform: scale(0.98);
}

.confirm-btn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.confirm-btn.disabled:active {
  transform: none;
}

.confirm-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 400;
}

/* 充值确认弹窗样式（与IncreaseCollateral.vue一致） */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #1A1A1A;
  border-radius: 24rpx;
  padding: 80rpx 32rpx;
  margin: 0 48rpx;
  max-width: 600rpx;
  width: 100%;
}

.modal-text {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 48rpx;
  height: 320rpx;
  justify-content: center;
  align-items: center;
}

.recharge-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5;
}

.recharge-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 20rpx;
}

.modal-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  transition: all 0.2s ease;
  cursor: pointer;
}

.modal-btn.solid {
  background: linear-gradient(90deg, #FEDA78 0%, #B07920 100%);
  color: #000;
  font-weight: 500;
}

.modal-btn.outline {
  background: transparent;
  border: 2rpx solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
}

.modal-btn:active {
  transform: scale(0.98);
}

.modal-btn.disabled {
  opacity: .6;
  pointer-events: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 80rpx 24rpx 0 24rpx;
  }
  
  .section-title {
    margin-bottom: 48rpx;
  }
}

/* 错误模态框样式 */
.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
}

.error-modal-content {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 20rpx;
  padding: 32rpx;
  max-width: 600rpx;
  width: 100%;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.6);
  max-height: 80vh;
  overflow-y: auto;
}

.error-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
}

.error-title {
  color: #FF6B6B;
  font-size: 32rpx;
  font-weight: 600;
}

.close-btn {
  color: rgba(255, 255, 255, 0.6);
  font-size: 40rpx;
  cursor: pointer;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

.error-details {
  margin-bottom: 24rpx;
}

.error-message {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 500;
  display: block;
  margin-bottom: 12rpx;
}

.error-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 26rpx;
  line-height: 1.5;
  display: block;
}

.error-suggestions {
  margin-bottom: 24rpx;
}

.suggestions-title {
  color: #FFD700;
  font-size: 26rpx;
  font-weight: 500;
  display: block;
  margin-bottom: 16rpx;
}

.suggestion-item {
  margin-bottom: 12rpx;
  padding-left: 20rpx;
  position: relative;
}

.suggestion-item::before {
  content: '•';
  color: #FFD700;
  position: relative;
  left: 0;
  top: 0;
}

.suggestion-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 24rpx;
  line-height: 1.4;
}

.debug-info {
  margin-bottom: 24rpx;
  padding: 16rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
}

.debug-title {
  color: #00D4FF;
  font-size: 24rpx;
  font-weight: 500;
  display: block;
  margin-bottom: 12rpx;
}

.debug-text {
  color: rgba(255, 255, 255, 0.6);
  font-size: 22rpx;
  line-height: 1.4;
  display: block;
  margin-bottom: 8rpx;
}

.error-actions {
  display: flex;
  gap: 16rpx;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.retry-btn {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:active {
  transform: scale(0.95);
}

.retry-text {
  color: #FFFFFF;
  font-size: 26rpx;
  font-weight: 500;
}

.diagnose-btn {
  background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%);
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.diagnose-btn:active {
  transform: scale(0.95);
}

.diagnose-text {
  color: #FFFFFF;
  font-size: 26rpx;
  font-weight: 500;
}

.debug-btn {
  background: rgba(0, 212, 255, 0.2);
  border: 1rpx solid rgba(0, 212, 255, 0.3);
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.debug-btn:active {
  transform: scale(0.95);
}

.debug-btn-text {
  color: #00D4FF;
  font-size: 26rpx;
  font-weight: 500;
}

.close-error-btn {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  padding: 16rpx 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-error-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.2);
}

.close-error-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 26rpx;
  font-weight: 500;
}
</style> 
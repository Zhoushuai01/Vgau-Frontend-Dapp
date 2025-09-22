<template>
  <view class="content">
    <!-- 顶部标题栏 - 固定在顶部 -->
    <view class="header">
      <view class="header-actions">
        <view class="header-btn" @click="goToHistory">
          <image src="/static/history.png" class="header-icon" />
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 轮播图区域 -->
      <view class="banner-section">
        <swiper class="banner-swiper" 
                :indicator-dots="false" 
                :autoplay="true" 
                :interval="3000" 
                :duration="500"
                :circular="true"
                @change="onSwiperChange">
          <swiper-item v-for="(banner, index) in banners" :key="index">
            <image class="banner-image" :src="banner" mode="aspectFill" />
          </swiper-item>
        </swiper>
        <!-- 轮播指示器 -->
        <view class="banner-indicators">
          <view v-for="(banner, index) in banners" 
                :key="index" 
                class="indicator" 
                :class="{ active: currentBannerIndex === index }">
          </view>
        </view>
      </view>

      <!-- 兑换汇率区域 -->
      <view class="exchange-rate-section">
        <view class="rate-info">
          <text class="rate-label">{{ $t('defi.exchangeRate') }}</text>
          <text class="rate-value">1 VGAU={{ exchangeRate }} USDT</text>
        </view>
      </view>

      <!-- 余额区域 -->
      <view class="balance-section">
        <text class="balance-label">{{ $t('defi.balance') }}</text>
        <view class="balance-divider"></view>
        
        <!-- VGAU余额 -->
        <view class="balance-item">
          <view class="balance-header">
            <text class="currency-label">VGAU</text>
          </view>
          <text class="balance-amount">{{ balances.VGAU }}</text>
        </view>
        
        <!-- USDT余额 -->
        <view class="balance-item">
          <view class="balance-header">
            <text class="currency-label">USDT</text>
          </view>
          <text class="balance-amount">{{ balances.USDT }}</text>
        </view>
        
        <view class="balance-divider"></view>
      </view>

      <!-- 收益信息区域 -->
      <view class="yield-section">
        <view class="yield-card">
          <view class="yield-info">
            <view class="yield-item">
              <text class="yield-label">{{ $t('defi.currentApr') }}</text>
              <text class="yield-value">1%</text>
            </view>
            <view class="yield-item">
              <text class="yield-label">{{ $t('defi.pending') }}</text>
              <text class="yield-value">{{ yieldData.pending }}</text>
            </view>
          </view>
          <view class="claim-button" @click="handleClaimInterest">
            <text class="claim-text">{{ $t('defi.claim') }}</text>
          </view>
        </view>
      </view>

      <!-- 操作按钮区域 -->
      <view class="action-section">
        <view class="action-btn primary" @click="handleRecharge">
          <text class="btn-text">{{ $t('defi.deposit') }}</text>
        </view>
        <view class="action-btn secondary" @click="handleWithdraw">
          <text class="btn-text">{{ $t('defi.withdraw') }}</text>
        </view>
        
                  <view class="action-buttons">
            <view class="action-btn outline" @click="handleFinance">
              <text class="btn-text">{{ $t('defi.finance') }}</text>
            </view>
            <view class="action-btn outline" @click="handleLending">
              <text class="btn-text">{{ $t('defi.lending') }}</text>
            </view>
          </view>
      </view>
    </view>

    <!-- 充值弹窗 -->
    <view class="deposit-modal" v-if="showDepositModal" @click="closeDepositModal">
      <view class="modal-overlay"></view>
      <view class="modal-content" @click.stop>
        <!-- 弹窗头部 -->
        <view class="modal-header">
          <view class="modal-handle"></view>
          <text class="modal-title">{{ $t(`defi.modalTitles.${currentAction}`) }}</text>
        </view>
        
        <!-- 货币选择区域 -->
        <view class="currency-section">
          <!-- 根据操作类型显示不同选项 -->
          <template v-if="currentAction === 'finance'">
            <!-- 我的理财选择 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'MyFinance' }" @click="selectCurrency('MyFinance')">
              <view class="currency-icon">
                <image class="finance-icon" src="/static/DiFi/licai.png" mode="aspectFit" />
              </view>
              <text class="currency-name">{{ $t('defi.myFinance') }}</text>
            </view>
            
            <!-- 产品申购选择 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'ProductPurchase' }" @click="selectCurrency('ProductPurchase')">
              <view class="currency-icon">
                <image class="purchase-icon" src="/static/DiFi/shengou.png" mode="aspectFit" />
              </view>
              <text class="currency-name">{{ $t('defi.productPurchase') }}</text>
            </view>
          </template>
          
          <template v-else-if="currentAction === 'lending'">
            <!-- 借币订单选项 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'BorrowOrder' }" @click="selectCurrency('BorrowOrder')">
              <view class="currency-icon">
                <image class="borrow-icon" src="/static/DiFi/jiebi.png" mode="aspectFit" />
              </view>
              <text class="currency-name">{{ $t('defi.borrowOrder') }}</text>
            </view>
            
            <!-- 新的借贷选项 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'NewLending' }" @click="selectCurrency('NewLending')">
              <view class="currency-icon">
                <image class="lending-icon" src="/static/DiFi/jiedai.png" mode="aspectFit" />
              </view>
              <text class="currency-name">{{ $t('defi.newLending') }}</text>
            </view>
          </template>
          
          <template v-else>
            <!-- USDT选择 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'USDT' }" @click="selectCurrency('USDT')">
              <view class="currency-icon">
                <view class="usdt-icon">
                  <view class="usdt-diamond"></view>
                  <view class="usdt-symbol">T</view>
                </view>
              </view>
              <text class="currency-name">USDT</text>
            </view>
            
            <!-- VGAU选择 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'VGAU' }" @click="selectCurrency('VGAU')">
              <view class="currency-icon">
                <view class="vgau-icon">
                  <view class="vgau-circle"></view>
                  <view class="vgau-symbol">G</view>
                </view>
              </view>
              <text class="currency-name">VGAU</text>
            </view>
          </template>
        </view>
      </view>
    </view>

    <!-- 钱包绑定弹窗 -->
    <view class="wallet-bind-modal" v-if="showWalletBindModal" @click="closeWalletBindModal">
      <view class="modal-overlay"></view>
      <view class="modal-content" @click.stop>
        <!-- 弹窗头部 -->
        <view class="modal-header">
          <view class="modal-handle"></view>
          <text class="modal-title">{{ $t('wallet.bind.title') }}</text>
        </view>
        
        <!-- 弹窗内容 -->
        <view class="bind-content">
          <view class="bind-icon">
            <text class="icon-text">🔗</text>
          </view>
          <text class="bind-title">{{ $t('wallet.bind.subtitle') }}</text>
          <text class="bind-description">
            {{ $t('wallet.bind.description') }}
          </text>
          
          <!-- 操作按钮 -->
          <view class="bind-actions">
            <view class="bind-btn primary" @click="goToWebsite">
              <text class="btn-text">{{ $t('wallet.bind.visitWebsite') }}</text>
            </view>
            <view class="bind-btn secondary" @click="closeWalletBindModal">
              <text class="btn-text">{{ $t('wallet.bind.cancel') }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- 加载状态 -->
  <view class="loading-overlay" v-if="walletBindStatus.isChecking">
    <view class="loading-content">
      <text class="loading-text">{{ $t('wallet.bind.checking') }}</text>
    </view>
  </view>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, reactive } from 'vue'
  import { smartUserVerify } from '@/utils/walletService.js'
  import web3Service from '@/utils/web3.js'
  import vgauService from '@/utils/vgauService.js'
  import { useI18n } from 'vue-i18n'
  import { userFundsAPI, vgauSavingsAPI } from '@/api/apiService.js'
 
  const { t, locale } = useI18n()
  
  // 轮播图数据
  const banners = ref([
    '/static/Home/banner1.png',
    '/static/Home/banner2.png',
    '/static/Home/banner3.png'
  ])
  
  // 当前轮播图索引
  const currentBannerIndex = ref(0)
  
  // 轮播图切换事件
  const onSwiperChange = (e) => {
    currentBannerIndex.value = e.detail.current
  }
  
  // 弹窗相关状态
  const showDepositModal = ref(false)
  const showWalletBindModal = ref(false)
  const selectedCurrency = ref('USDT')
  const currentAction = ref('deposit') // 'deposit' 或 'withdraw'
  
  // 钱包绑定状态
  const walletBindStatus = ref({
    isChecking: false,
    isBound: false,
    walletAddress: null
  })
  
  // 会话状态管理
  const sessionStatus = ref({
    isAuthenticated: false,
    walletAddress: null,
    authenticatedAt: null,
    sessionId: null
  })
  
  // 钱包连接状态
  const walletConnectionStatus = ref({
    isConnected: false,
    walletAddress: null,
    lastConnectedAt: null
  })
  
  // 用户登录状态管理
  const userLoginStatus = ref({
    isLoggedIn: false,
    walletAddress: null,
    loggedInAt: null,
    userData: null,
    token: null
  })
  
  // 余额数据
  const balances = reactive({
    VGAU: '0',
    USDT: '0'
  })
  
  // 收益数据
  const yieldData = reactive({
    currentApr: '0',
    pending: '0'
  })
  
  // 汇率数据
  const exchangeRate = ref('123.4561')
  
  // 汇率更新定时器
  let exchangeRateTimer = null
  
  // 格式化数字显示
  const formatNumber = (value) => {
    if (value === null || value === undefined) {
      return '0'
    }
    
    const num = parseFloat(value)
    if (isNaN(num)) {
      return '0'
    }
    
    // 如果数字很大，使用千分位分隔符
    if (num >= 1000) {
      return num.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    }
    
    // 保留2位小数
    return num.toFixed(2)
  }
  
  // 会话管理函数
  const initSession = () => {
    try {
      const storedSession = localStorage.getItem('defi_session')
      if (storedSession) {
        const session = JSON.parse(storedSession)
        // 检查会话是否过期（24小时）
        const now = Date.now()
        const sessionAge = now - session.authenticatedAt
        const maxAge = 24 * 60 * 60 * 1000 // 24小时
        
        if (sessionAge < maxAge) {
          sessionStatus.value = session
          console.log('✅ 恢复会话状态:', session)
          return true
        } else {
          console.log('⚠️ 会话已过期，清除会话')
          clearSession()
          return false
        }
      }
      return false
    } catch (error) {
      console.error('初始化会话失败:', error)
      clearSession()
      return false
    }
  }
  
  const createSession = (walletAddress) => {
    const session = {
      isAuthenticated: true,
      walletAddress: walletAddress,
      authenticatedAt: Date.now(),
      sessionId: `defi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    sessionStatus.value = session
    localStorage.setItem('defi_session', JSON.stringify(session))
    console.log('✅ 创建新会话:', session)
  }
  
  const clearSession = () => {
    sessionStatus.value = {
      isAuthenticated: false,
      walletAddress: null,
      authenticatedAt: null,
      sessionId: null
    }
    localStorage.removeItem('defi_session')
    
    // 清空余额数据
    balances.VGAU = '0'
    balances.USDT = '0'
    yieldData.pending = '0'
    
    console.log('🗑️ 清除会话状态和余额数据')
  }
  
  const isSessionValid = () => {
    return sessionStatus.value.isAuthenticated && 
           sessionStatus.value.walletAddress && 
           sessionStatus.value.authenticatedAt
  }
  
  // 检查钱包连接状态
  const checkWalletConnection = async () => {
    try {
      // 确保web3Service已初始化
      if (!web3Service.web3) {
        console.log('🔧 web3Service未初始化，开始初始化...')
        const initResult = await web3Service.init()
        if (!initResult) {
          console.log('❌ web3Service初始化失败')
          walletConnectionStatus.value = {
            isConnected: false,
            walletAddress: null,
            lastConnectedAt: null
          }
          return false
        }
      }
      
      // 检查web3Service连接状态
      if (web3Service.isConnected && web3Service.currentAccount) {
        const currentAddress = web3Service.currentAccount
        
        // 检查地址是否发生变化
        if (walletConnectionStatus.value.walletAddress !== currentAddress) {
          console.log('🔄 检测到钱包地址变化:', {
            old: walletConnectionStatus.value.walletAddress,
            new: currentAddress
          })
          
          // 地址变化，清除会话并要求重新认证
          clearSession()
          
          // 更新连接状态
          walletConnectionStatus.value = {
            isConnected: true,
            walletAddress: currentAddress,
            lastConnectedAt: Date.now()
          }
          
          return true
        }
        
        // 地址未变化，更新连接状态
        walletConnectionStatus.value = {
          isConnected: true,
          walletAddress: currentAddress,
          lastConnectedAt: walletConnectionStatus.value.lastConnectedAt || Date.now()
        }
        
        return true
      } else {
        // 钱包未连接
        if (walletConnectionStatus.value.isConnected) {
          console.log('⚠️ 钱包已断开连接')
          // 清除会话状态
          clearSession()
        }
        
        walletConnectionStatus.value = {
          isConnected: false,
          walletAddress: null,
          lastConnectedAt: null
        }
        
        // 强制清除余额显示
        balances.VGAU = '0'
        balances.USDT = '0'
        yieldData.pending = '0'
        
        return false
      }
    } catch (error) {
      console.error('检查钱包连接状态失败:', error)
      return false
    }
  }
  
  // 检查操作是否可用
  const isOperationAvailable = () => {
    // 确保web3Service已初始化
    if (!web3Service.web3) {
      console.log('⚠️ web3Service未初始化，操作不可用')
      return false
    }
    
    return walletConnectionStatus.value.isConnected && 
           walletConnectionStatus.value.walletAddress
  }
  
  // 获取汇率数据
  const getExchangeRate = async () => {
    try {
      console.log('💰 开始获取汇率数据...')
      
      if (vgauService.isInitialized) {
        const stats = await vgauService.getPlatformStats()
        if (stats && stats.price) {
          exchangeRate.value = parseFloat(stats.price).toFixed(4)
          console.log('✅ 汇率数据更新:', exchangeRate.value)
        }
      } else {
        console.log('⚠️ vgauService未初始化，使用默认汇率')
        exchangeRate.value = '123.4561'
      }
    } catch (error) {
      console.error('❌ 获取汇率数据失败:', error)
      // 发生异常时使用默认值
      exchangeRate.value = '123.4561'
    }
  }
  
  // 启动汇率更新定时器
  const startExchangeRateTimer = () => {
    // 清除现有定时器
    if (exchangeRateTimer) {
      clearInterval(exchangeRateTimer)
    }
    
    // 每30秒更新一次汇率
    exchangeRateTimer = setInterval(async () => {
      await getExchangeRate()
    }, 30000)
    
    console.log('✅ DeFi页面汇率更新定时器已启动（30秒间隔）')
  }
  
  // 停止汇率更新定时器
  const stopExchangeRateTimer = () => {
    if (exchangeRateTimer) {
      clearInterval(exchangeRateTimer)
      exchangeRateTimer = null
      console.log('⏹️ DeFi页面汇率更新定时器已停止')
    }
  }
  
  // 获取可领取利息
  const getClaimableInterest = async () => {
    // 检查钱包连接状态，如果未连接则不调用接口
    if (!walletConnectionStatus.value.isConnected || !walletConnectionStatus.value.walletAddress) {
      console.log('⚠️ 钱包未连接，跳过可领取利息获取')
      yieldData.pending = '0'
      return
    }
    
    try {
      console.log('💰 开始获取可领取利息...')
      
      const response = await vgauSavingsAPI.getClaimableInterest()
      
      if (response && response.success && response.data !== undefined) {
        console.log('✅ 可领取利息数据:', response.data)
        
        // 更新待领取金额
        yieldData.pending = formatNumber(response.data)
        console.log('✅ 待领取金额更新:', response.data)
      } else {
        console.warn('⚠️ 可领取利息接口调用失败:', response)
        // 接口失败时保持默认值 0
        yieldData.pending = '0'
      }
    } catch (error) {
      console.error('❌ 获取可领取利息失败:', error)
      // 发生异常时重置为默认值
      yieldData.pending = '0'
    }
  }
  
  // 领取利息
  const handleClaimInterest = async () => {
    // 先检查并初始化钱包连接状态
    const isWalletConnected = await checkWalletConnection()
    if (!isWalletConnected) {
      uni.showToast({
        title: t('person.pleaseConnectWallet'),
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 进行钱包登录认证
    const loginSuccess = await performWalletLogin()
    if (!loginSuccess) {
      return
    }
    
    // 检查是否需要重新认证
    const isWalletBound = await checkWalletBinding()
    if (!isWalletBound) {
      return
    }
    
    try {
      // 获取待领取金额
      const pendingAmountStr = yieldData.pending.replace(/,/g, '')
      const pendingAmount = parseFloat(pendingAmountStr)
      
      // 直接使用字符串类型（后端要求），让后端处理金额为0的情况
      console.log('💰 开始领取利息...', { claimAmount: pendingAmountStr })
      
      // 显示加载提示
      uni.showLoading({
        title: t('person.claiming'),
        mask: true
      })
      
      // 调用领取接口
      const response = await vgauSavingsAPI.claimInterest({
        claimAmount: pendingAmountStr
      })
      
      // 隐藏加载提示
      uni.hideLoading()
      
      if (response && response.success) {
        console.log('✅ 利息领取成功:', response)
        
        // 显示成功提示
        uni.showToast({
          title: t('person.claimSuccess'),
          icon: 'success',
          duration: 2000
        })
        
        // 重新获取可领取利息和余额数据
        await Promise.all([
          getClaimableInterest(),
          getBalances()
        ])
      } else {
        console.warn('⚠️ 利息领取失败:', response)
        
        // 显示失败提示
        uni.showToast({
          title: response?.message || t('person.claimFailed'),
          icon: 'none',
          duration: 2000
        })
      }
    } catch (error) {
      console.error('❌ 领取利息失败:', error)
      
      // 隐藏加载提示
      uni.hideLoading()
      
      // 显示错误提示
      uni.showToast({
        title: t('person.claimRetry'),
        icon: 'none',
        duration: 2000
      })
    }
  }
  
  // 获取用户余额
  const getBalances = async () => {
    // 检查钱包连接状态，如果未连接则不调用接口
    if (!walletConnectionStatus.value.isConnected || !walletConnectionStatus.value.walletAddress) {
      console.log('⚠️ 钱包未连接，跳过余额获取')
      balances.VGAU = '0'
      balances.USDT = '0'
      return
    }
    
    try {
      console.log('💰 开始获取用户余额...')
      
      const response = await userFundsAPI.getBalances()
      
      if (response && response.success && response.data && Array.isArray(response.data)) {
        const balanceData = response.data
        console.log('✅ 余额数据:', balanceData)
        
        // 重置余额
        balances.VGAU = '0'
        balances.USDT = '0'
        
        // 遍历数组查找对应的货币余额
        balanceData.forEach(item => {
          if (item.currency === 'VGAU' && item.availableAmount !== undefined) {
            balances.VGAU = formatNumber(item.availableAmount)
            console.log('✅ VGAU余额更新:', item.availableAmount)
          } else if (item.currency === 'USDT' && item.availableAmount !== undefined) {
            balances.USDT = formatNumber(item.availableAmount)
            console.log('✅ USDT余额更新:', item.availableAmount)
          }
        })
        
        console.log('💰 余额更新完成:', balances)
      } else {
        console.warn('⚠️ 余额接口调用失败:', response)
        // 接口失败时保持默认值 0
        balances.VGAU = '0'
        balances.USDT = '0'
      }
    } catch (error) {
      console.error('❌ 获取余额失败:', error)
      // 发生异常时重置为默认值
      balances.VGAU = '0'
      balances.USDT = '0'
    }
  }
  
  // 实时更新余额（用于操作完成后调用）
  const refreshBalances = async () => {
    console.log('🔄 开始实时更新余额...')
    try {
      await getBalances()
      console.log('✅ 余额实时更新完成')
    } catch (error) {
      console.error('❌ 余额实时更新失败:', error)
    }
  }
  
  // 钱包验证
  const checkWalletBinding = async () => {
    try {
      walletBindStatus.value.isChecking = true
      
      // 首先检查钱包连接状态
      const isWalletConnected = await checkWalletConnection()
      
      if (!isWalletConnected) {
        console.log('❌ 钱包未连接，无法进行操作')
        uni.showToast({
          title: t('person.pleaseConnectWallet'),
          icon: 'none',
          duration: 2000
        })
        return false
      }
      
      // 检查是否有有效的会话（且钱包地址匹配）
      if (isSessionValid() && 
          sessionStatus.value.walletAddress === walletConnectionStatus.value.walletAddress) {
        console.log('✅ 检测到有效会话，跳过钱包验证')
        walletBindStatus.value.isBound = true
        walletBindStatus.value.walletAddress = sessionStatus.value.walletAddress
        return true
      }
      
      // 检查用户是否已经登录（通过performWalletLogin）
      if (checkUserLoginStatus()) {
        console.log('✅ 用户已登录，跳过钱包验证')
        walletBindStatus.value.isBound = true
        walletBindStatus.value.walletAddress = walletConnectionStatus.value.walletAddress
        return true
      }
      
      console.log('⚠️ 无有效会话且用户未登录，开始钱包验证')
      const result = await smartUserVerify()
      
      if (result.success) {
        // 钱包验证成功，创建会话
        walletBindStatus.value.isBound = true
        walletBindStatus.value.walletAddress = result.walletAddress
        
        // 创建新会话
        createSession(result.walletAddress)
        
        console.log('✅ 钱包验证成功，已创建会话')
        uni.showToast({
          title: t('auth.loginSuccess'),
          icon: 'success',
          duration: 1500
        })
        
        return true
      } else if (result.error === 'WALLET_NOT_BOUND') {
        // 钱包未绑定，显示绑定弹窗
        walletBindStatus.value.isBound = false
        showWalletBindModal.value = true
        return false
      } else if (result.error === 'CHAIN_ID_MISSING') {
        // 链ID缺失，提示用户切换网络
        uni.showToast({
          title: result.message || t('wallet.bind.chainIdMissing'),
          icon: 'none',
          duration: 3000
        })
        return false
      } else {
        // 其他错误
        uni.showToast({
          title: result.message || t('wallet.bind.checkFailed'),
          icon: 'none',
          duration: 2000
        })
        return false
      }
    } catch (error) {
      console.error('钱包验证失败:', error)
      uni.showToast({
        title: t('wallet.bind.checkFailed'),
        icon: 'none',
        duration: 2000
      })
      return false
    } finally {
      walletBindStatus.value.isChecking = false
    }
  }
  
  // 检查用户是否已登录
  const checkUserLoginStatus = () => {
    const currentWalletAddress = walletConnectionStatus.value.walletAddress
    const isLoggedIn = userLoginStatus.value.isLoggedIn && 
                      userLoginStatus.value.walletAddress === currentWalletAddress
    
    console.log('🔍 检查用户登录状态:', {
      isLoggedIn: userLoginStatus.value.isLoggedIn,
      currentWalletAddress,
      loggedInWalletAddress: userLoginStatus.value.walletAddress,
      result: isLoggedIn
    })
    
    return isLoggedIn
  }
  
  // 清除用户登录状态
  const clearUserLoginStatus = () => {
    console.log('🧹 清除用户登录状态')
    userLoginStatus.value = {
      isLoggedIn: false,
      walletAddress: null,
      loggedInAt: null,
      userData: null,
      token: null
    }
  }
  
  // 钱包登录认证函数
  const performWalletLogin = async () => {
    // 检查是否已经登录
    if (checkUserLoginStatus()) {
      console.log('✅ 用户已登录，跳过登录流程')
      return true
    }
    
    try {
      console.log('🔐 开始钱包登录认证...')
      
      // 进行钱包验证/登录
      const result = await smartUserVerify()
      
      if (result.success) {
        console.log('✅ 钱包登录成功:', result)
        console.log('🔍 登录结果详情:', {
          hasWalletAddress: !!result.walletAddress,
          hasUserData: !!result.userData,
          hasToken: !!result.token,
          walletAddress: result.walletAddress,
          userData: result.userData,
          token: result.token
        })
        
        // 更新登录状态
        userLoginStatus.value = {
          isLoggedIn: true,
          walletAddress: result.walletAddress,
          loggedInAt: Date.now(),
          userData: result.userData,
          token: result.token
        }
        
        // 准备事件数据
        const eventData = {
          walletAddress: result.walletAddress,
          userData: result.userData,
          token: result.token,
          loggedInAt: Date.now()
        }
        
        console.log('🚀 准备触发userLoggedIn事件:', eventData)
        
        // 登录成功，触发用户登录事件
        uni.$emit('userLoggedIn', eventData)
        
        console.log('✅ userLoggedIn事件已触发')
        
        // 显示登录成功提示
        uni.showToast({
          title: t('auth.loginSuccess') || '登录成功',
          icon: 'success',
          duration: 1000
        })
        
        return true
      } else {
        console.error('❌ 钱包登录失败:', result)
        uni.showToast({
          title: t('auth.loginFailed') || '登录失败',
          icon: 'error',
          duration: 2000
        })
        return false
      }
    } catch (loginError) {
      console.error('❌ 钱包登录异常:', loginError)
      uni.showToast({
        title: t('auth.loginFailed') || '登录失败',
        icon: 'error',
        duration: 2000
      })
      return false
    }
  }
  
  // 操作按钮事件处理
  const handleRecharge = async () => {
    // 先检查并初始化钱包连接状态
    const isWalletConnected = await checkWalletConnection()
    if (!isWalletConnected) {
      uni.showToast({
        title: t('person.pleaseConnectWallet'),
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 进行钱包登录认证
    const loginSuccess = await performWalletLogin()
    if (!loginSuccess) {
      return
    }
    
    const isWalletBound = await checkWalletBinding()
    if (isWalletBound) {
      currentAction.value = 'deposit'
      showDepositModal.value = true
    }
  }
  
  const handleWithdraw = async () => {
    // 先检查并初始化钱包连接状态
    const isWalletConnected = await checkWalletConnection()
    if (!isWalletConnected) {
      uni.showToast({
        title: t('person.pleaseConnectWallet'),
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 进行钱包登录认证
    const loginSuccess = await performWalletLogin()
    if (!loginSuccess) {
      return
    }
    
    const isWalletBound = await checkWalletBinding()
    if (isWalletBound) {
      currentAction.value = 'withdraw'
      showDepositModal.value = true
    }
  }
  
  const handleFinance = async () => {
    // 先检查并初始化钱包连接状态
    const isWalletConnected = await checkWalletConnection()
    if (!isWalletConnected) {
      uni.showToast({
        title: t('person.pleaseConnectWallet'),
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 进行钱包登录认证
    const loginSuccess = await performWalletLogin()
    if (!loginSuccess) {
      return
    }
    
    const isWalletBound = await checkWalletBinding()
    if (isWalletBound) {
      currentAction.value = 'finance'
      showDepositModal.value = true
    }
  }
  
  const handleLending = async () => {
    // 先检查并初始化钱包连接状态
    const isWalletConnected = await checkWalletConnection()
    if (!isWalletConnected) {
      uni.showToast({
        title: t('person.pleaseConnectWallet'),
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    // 进行钱包登录认证
    const loginSuccess = await performWalletLogin()
    if (!loginSuccess) {
      return
    }
    
    const isWalletBound = await checkWalletBinding()
    if (isWalletBound) {
      currentAction.value = 'lending'
      showDepositModal.value = true
    }
  }
  
  // 弹窗相关方法
  const closeDepositModal = () => {
    showDepositModal.value = false
  }
  
  const closeWalletBindModal = () => {
    showWalletBindModal.value = false
  }
  
  const goToWebsite = () => {
    // 跳转到官网绑定页面
    // 这里可以替换为实际的官网地址
    const websiteUrl = 'https://vgau.io/bind-wallet'
    
    // 在uni-app中打开外部链接
    uni.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(websiteUrl)}`
    })
    
    // 或者直接使用系统浏览器打开
    // #ifdef H5
    window.open(websiteUrl, '_blank')
    // #endif
    
    // #ifdef APP-PLUS
    plus.runtime.openURL(websiteUrl)
    // #endif
    
    closeWalletBindModal()
  }
  
  const selectCurrency = (currency) => {
    selectedCurrency.value = currency
    closeDepositModal()
    
    if (currentAction.value === 'deposit') {
      // 充值操作
      if (currency === 'VGAU') {
        // 跳转到VGAU充值页面
        uni.navigateTo({
          url: '/views/VGAURecharge'
        })
      } else if (currency === 'USDT') {
        // 跳转到USDT充值页面
        uni.navigateTo({
          url: '/views/USDTRecharge'
        })
      } else {
        uni.showToast({
          title: `Selected ${currency}`,
          icon: 'none',
          duration: 2000
        })
      }
          } else if (currentAction.value === 'withdraw') {
        // 提现操作
        if (currency === 'VGAU') {
          // 跳转到VGAU提现页面
          uni.navigateTo({
            url: '/views/VGAUWithdraw'
          })
        } else if (currency === 'USDT') {
          // 跳转到USDT提现页面
          uni.navigateTo({
            url: '/views/USDTWithdraw'
          })
        } else {
          uni.showToast({
            title: `${currency} withdraw feature coming soon`,
            icon: 'none',
            duration: 2000
          })
        }
      } else if (currentAction.value === 'finance') {
        // Finance操作
        if (currency === 'MyFinance') {
          // 跳转到我的理财页面
          uni.navigateTo({
            url: '/views/MyFinance'
          })
        } else if (currency === 'ProductPurchase') {
          // 跳转到产品申购页面
          uni.navigateTo({
            url: '/views/ProductPurchase'
          })
        } else {
          uni.showToast({
            title: `${currency} finance feature coming soon`,
            icon: 'none',
            duration: 2000
          })
        }
      } else if (currentAction.value === 'lending') {
        // Lending操作
        if (currency === 'BorrowOrder') {
          // 跳转到借币订单页面
          uni.navigateTo({
            url: '/views/BorrowOrder'
          })
        } else if (currency === 'NewLending') {
          // 跳转到新的借贷页面
          uni.navigateTo({
            url: '/views/NewLending'
          })
        } else {
          uni.showToast({
            title: `${currency} lending feature coming soon`,
            icon: 'none',
            duration: 2000
          })
        }
      }
  }
  
  // 跳转到历史记录页面
  const goToHistory = () => {
    uni.navigateTo({
      url: '/views/History'
    })
  }
  
  // 手动清除会话（用于调试或重新认证）
  const clearSessionManually = () => {
    clearSession()
    uni.showToast({
      title: '会话已清除，下次操作需要重新签名',
      icon: 'success',
      duration: 2000
    })
  }
  
  // 设置钱包事件监听
  const setupWalletEventListeners = () => {
    if (typeof window.ethereum !== 'undefined') {
      // 监听账户变化
      window.ethereum.on('accountsChanged', async (accounts) => {
        console.log('🔄 钱包账户已切换:', accounts)
        
        if (accounts.length > 0) {
          // 有账户连接
          const wasConnected = walletConnectionStatus.value.isConnected
          const wasAddress = walletConnectionStatus.value.walletAddress
          const newAddress = accounts[0]
          
          // 更新连接状态
          walletConnectionStatus.value = {
            isConnected: true,
            walletAddress: newAddress,
            lastConnectedAt: Date.now()
          }
          
          if (!wasConnected) {
            console.log('✅ 检测到钱包重新连接')
            uni.showToast({
              title: t('person.walletConnectionSuccess'),
              icon: 'success',
              duration: 1500
            })
            // 钱包重新连接后，获取用户数据
            Promise.all([
              getBalances(),
              getClaimableInterest()
            ]).catch(error => {
              console.error('重新连接后获取数据失败:', error)
            })
          } else if (wasAddress !== newAddress) {
            console.log('🔄 检测到钱包地址变化')
            // 地址变化，清除会话
            clearSession()
            uni.showToast({
              title: '钱包地址已变化，需要重新签名',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          // 没有账户连接
          if (walletConnectionStatus.value.isConnected) {
            console.log('⚠️ 检测到钱包断开连接')
            // 清除会话状态和余额数据
            clearSession()
            walletConnectionStatus.value = {
              isConnected: false,
              walletAddress: null,
              lastConnectedAt: null
            }
            // 强制清除余额显示
            balances.VGAU = '0'
            balances.USDT = '0'
            yieldData.pending = '0'
            uni.showToast({
              title: t('person.walletDisconnected'),
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
      
      // 监听网络变化
      window.ethereum.on('chainChanged', (chainId) => {
        console.log('🔄 网络已切换:', chainId)
        // 网络变化时清除会话和余额数据，需要重新签名
        clearSession()
        // 强制清除余额显示
        balances.VGAU = '0'
        balances.USDT = '0'
        yieldData.pending = '0'
        uni.showToast({
          title: '网络已切换，需要重新签名',
          icon: 'none',
          duration: 2000
        })
      })
    }
  }
  
  const removeWalletEventListeners = () => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.removeAllListeners('accountsChanged')
      window.ethereum.removeAllListeners('chainChanged')
    }
  }
  
  // 开发环境下添加调试功能
  if (process.env.NODE_ENV === 'development') {
    // 在开发环境下添加全局调试方法
    if (typeof window !== 'undefined') {
      window.clearDefiSession = clearSessionManually
      window.getDefiSession = () => {
        console.log('当前会话状态:', sessionStatus.value)
        return sessionStatus.value
      }
      window.getWalletStatus = () => {
        console.log('当前钱包连接状态:', walletConnectionStatus.value)
        return walletConnectionStatus.value
      }
    }
  }
  
  
  onMounted(async () => {
    console.log('DeFi页面加载完成')
    
    // 初始化会话状态
    initSession()
    
    // 初始化钱包连接状态
    await checkWalletConnection()
    
    // 初始化vgauService
    if (!vgauService.isInitialized) {
      console.log('🔧 初始化vgauService...')
      await vgauService.init()
    }
    
    // 设置钱包事件监听
    setupWalletEventListeners()
    
    // 监听用户登录事件（而不是钱包连接事件）
    uni.$on('userLoggedIn', async (data) => {
      console.log('📡 DeFi页面收到用户登录事件:', data)
      // 重新检查钱包连接状态
      await checkWalletConnection()
      // 获取用户数据
      if (walletConnectionStatus.value.isConnected && walletConnectionStatus.value.walletAddress) {
        await Promise.all([
          getBalances(),
          getClaimableInterest()
        ])
      }
    })
    
    // 监听钱包连接事件（仅更新连接状态，不进行登录认证）
    uni.$on('walletConnected', async (data) => {
      console.log('📡 DeFi页面收到钱包连接事件:', data)
      
      // 重新检查钱包连接状态
      await checkWalletConnection()
      
      // 检查钱包地址是否发生变化，如果变化则清除登录状态
      const currentWalletAddress = walletConnectionStatus.value.walletAddress
      const loggedInWalletAddress = userLoginStatus.value.walletAddress
      
      if (currentWalletAddress !== loggedInWalletAddress) {
        console.log('🔄 检测到钱包地址变化，清除登录状态')
        clearUserLoginStatus()
      }
      
      console.log('✅ DeFi页面钱包连接状态已更新，等待用户点击功能按钮进行登录...')
    })
    
    // 监听钱包地址变化事件
    uni.$on('walletAddressChanged', async (data) => {
      console.log('📡 DeFi页面收到钱包地址变化事件:', data)
      if (data.newAddress) {
        console.log('🔄 钱包地址已变化，强制清除认证状态并重新认证...')
        
        // 1. 清除用户登录状态
        clearUserLoginStatus()
        
        // 2. 通知API服务重置认证状态
        try {
          const { default: apiService } = await import('@/api/apiService.js')
          apiService.resetAuthState()
          console.log('✅ DeFi页面API服务认证状态已重置')
        } catch (error) {
          console.warn('⚠️ DeFi页面重置API服务认证状态失败:', error)
        }
        
        // 2. 先调用后端登出接口，清除旧地址的session
        try {
          console.log('🔓 调用后端登出接口清除旧地址session...')
          await authAPI.logout()
          console.log('✅ 后端登出成功')
        } catch (error) {
          console.warn('⚠️ 后端登出失败，继续执行地址切换:', error)
        }
        
        // 3. 清除本地认证相关数据
        console.log('🧹 清除本地认证数据...')
        const authKeys = [
          'userToken',
          'walletAddress', 
          'userData',
          'authToken',
          'loginStatus',
          'walletConnection',
          'userLoginData',
          'defi_session'
        ]
        
        authKeys.forEach(key => {
          localStorage.removeItem(key)
          sessionStorage.removeItem(key)
        })
        
        // 4. 更新钱包连接状态
        walletConnectionStatus.value = {
          isConnected: true,
          walletAddress: data.newAddress,
          lastConnectedAt: Date.now()
        }
        
        // 5. 更新API服务的钱包地址
        try {
          const { default: apiService } = await import('@/api/apiService.js')
          apiService.updateWalletAddress(data.newAddress)
          console.log('✅ DeFi页面API服务钱包地址已更新')
        } catch (error) {
          console.warn('⚠️ DeFi页面更新API服务钱包地址失败:', error)
        }
        
        // 6. 清除会话，需要重新认证
        clearSession()
        
        // 7. 重新获取新地址的数据
        try {
          console.log('🔄 DeFi页面重新获取新地址的数据...')
          await Promise.all([
            getBalances(),
            getClaimableInterest()
          ])
          console.log('✅ DeFi页面新地址数据获取完成')
        } catch (error) {
          console.error('❌ DeFi页面获取新地址数据失败:', error)
        }
        
        // 8. 显示地址变化提示
        uni.showToast({
          title: '钱包地址已变化，数据已更新',
          icon: 'success',
          duration: 2000
        })
        
        console.log('✅ DeFi页面钱包地址变化处理完成，数据已更新')
      }
    })
    
    // 监听余额更新事件
    uni.$on('balanceUpdated', async (data) => {
      console.log('📡 DeFi页面收到余额更新事件:', data)
      console.log('🔄 操作类型:', data.type, '币种:', data.currency, '金额:', data.amount)
      
      // 延迟一点时间确保后端数据已更新
      setTimeout(async () => {
        try {
          console.log('🔄 开始实时更新余额...')
          await refreshBalances()
          console.log('✅ 余额实时更新完成')
        } catch (error) {
          console.error('❌ 余额实时更新失败:', error)
        }
      }, 1000) // 延迟1秒确保后端数据已更新
    })
    
    // 获取汇率数据（不需要钱包连接）
    await getExchangeRate()
    
    // 只有在钱包连接时才获取用户相关数据
    if (walletConnectionStatus.value.isConnected && walletConnectionStatus.value.walletAddress) {
      await Promise.all([
        getBalances(),
        getClaimableInterest()
      ])
    } else {
      console.log('⚠️ 钱包未连接，跳过用户数据获取')
      // 确保余额和收益数据为0
      balances.VGAU = '0'
      balances.USDT = '0'
      yieldData.pending = '0'
    }
    
    // 启动汇率更新定时器（无论钱包是否连接）
    startExchangeRateTimer()
  })
  
  // 页面卸载时清理事件监听
  onUnmounted(() => {
    removeWalletEventListeners()
    
    // 清理钱包连接事件监听
    uni.$off('walletConnected')
    uni.$off('walletAddressChanged')
    
    // 停止汇率更新定时器
    stopExchangeRateTimer()
  })
</script>

<style lang="scss" scoped>
/* 全局背景色 */
:deep(body), :deep(html) {
  background-color: #0A0A0A !important;
}

.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  overflow-x: hidden;
}

/* 顶部标题栏样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20rpx 32rpx 8rpx;
  background-color: #0A0A0A;
  height: 70rpx;
}

.header-title {
  color: #FFFFFF;
  font-size: 40rpx;
  font-weight: 400;
  line-height: 1.4;
}

.header-actions {
  display: flex;
  gap: 16rpx;
}

.header-btn {
  width: 56rpx;
  height: 56rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.header-icon {
  width: 40rpx;
  height: 40rpx;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 32rpx;
  padding-top: 120rpx !important;
  min-height: 100vh;
  background-color: #0A0A0A;
}

/* 轮播图区域 */
.banner-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 44rpx;
}

.banner-swiper {
  width: 100%;
  height: 360rpx;
  border-radius: 32rpx;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  border-radius: 32rpx;
}

.banner-indicators {
  display: flex;
  justify-content: center;
  gap: 8rpx;
  margin-top: 32rpx;
}

.indicator {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.indicator.active {
  background: #FFFFFF;
}

/* 兑换汇率区域 */
.exchange-rate-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.rate-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rpx;
}

.rate-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.rate-value {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: right;
}

/* 余额区域 */
.balance-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.balance-label {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-bottom: 16rpx;
}

.balance-divider {
  width: 100%;
  height: 2rpx;
  background: #1A1A1A;
  margin: 16rpx 0;
}

.balance-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 8rpx;
}

.balance-header {
  display: flex;
  align-items: center;
}

.currency-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
  text-align: right;
}

/* 收益信息区域 */
.yield-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.yield-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-radius: 16rpx;
  padding: 32rpx;
  position: relative;
}


.yield-info {
  display: flex;
  flex: 1;
  gap: 32rpx;
}

.yield-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}

.yield-label {
  font-size: 28rpx;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 400;
  margin-bottom: 8rpx;
}

.yield-value {
  font-size: 32rpx;
  color: #000000;
  font-weight: 400;
}


.claim-button {
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 16rpx;
  padding: 16rpx 32rpx;
  box-shadow: inset 0px 4rpx 0px 0px rgba(255, 255, 255, 0.25), inset 0px -2rpx 0px 0px rgba(218, 118, 52, 1);
}

.claim-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 500;
}

/* 操作按钮区域 */
.action-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.action-buttons {
  display: flex;
  gap: 16rpx;
}

.action-btn {
  width: 100%;
  height: 96rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
}

.action-btn.primary {
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
}

.action-btn.secondary {
  background: #FFFFFF;
}

.action-btn.outline {
  background: transparent;
  border: 2rpx solid #FFFFFF;
}

.btn-text {
  font-size: 28rpx;
  font-weight: 400;
  text-align: center;
}

.action-btn.primary .btn-text {
  color: #000000;
}

.action-btn.secondary .btn-text {
  color: #000000;
}

.action-btn.outline .btn-text {
  color: #FFFFFF;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 24rpx;
  }
  
  .banner-swiper {
    height: 320rpx;
  }
  
  .yield-card {
    padding: 24rpx;
  }
  
  .action-btn {
    height: 88rpx;
  }
}

/* 自定义Toast样式 */
:deep(.uni-toast) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  color: #FFFFFF !important;
  font-size: 24rpx;
  padding: 20rpx 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
}

:deep(.uni-toast__content) {
  color: #FFFFFF !important;
  background: transparent !important;
  font-size: 24rpx;
}

/* 充值弹窗样式 */
.deposit-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

.modal-content {
  position: relative;
  width: 100%;
  height: 716rpx;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(50px);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 40rpx 40rpx 0 0;
  box-shadow: 0 -8rpx 32rpx rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32rpx;
  margin-bottom: 32rpx;
  gap: 16rpx;
}

.modal-title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.modal-handle {
  width: 96rpx;
  height: 8rpx;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4rpx;
}

.currency-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin: 0 66rpx 32rpx 66rpx;
  flex: 1;
  justify-content: center;
}

.currency-option {
  display: flex;
  align-items: center;
  gap: 32rpx;
  padding: 32rpx;
  background: rgba(0, 0, 0, 0.5);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.currency-option.active {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.currency-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.finance-icon {
  width: 60rpx;
  height: 60rpx;
}

.purchase-icon {
  width: 60rpx;
  height: 60rpx;
}

.usdt-icon {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.usdt-diamond {
  position: absolute;
  width: 80rpx;
  height: 80rpx;
  background: #26A17B;
  transform: rotate(45deg);
  border-radius: 8rpx;
}

.usdt-symbol {
  position: relative;
  color: #FFFFFF;
  font-size: 32rpx;
  font-weight: bold;
  z-index: 1;
}

.vgau-icon {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vgau-circle {
  position: absolute;
  width: 80rpx;
  height: 80rpx;
  background: #FED500;
  border-radius: 50%;
}

.vgau-symbol {
  position: relative;
  color: #000000;
  font-size: 32rpx;
  font-weight: bold;
  z-index: 1;
}

.borrow-icon {
  width: 60rpx;
  height: 60rpx;
}

.lending-icon {
  width: 60rpx;
  height: 60rpx;
}

.currency-name {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 钱包绑定弹窗样式 */
.wallet-bind-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wallet-bind-modal .modal-content {
  position: relative;
  width: 90%;
  max-width: 600rpx;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(50px);
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 48rpx;
}

.bind-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24rpx;
}

.bind-icon {
  width: 120rpx;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16rpx;
}

.icon-text {
  font-size: 48rpx;
}

.bind-title {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.bind-description {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 32rpx;
}

.bind-actions {
  display: flex;
  gap: 16rpx;
  width: 100%;
}

.bind-btn {
  flex: 1;
  height: 88rpx;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bind-btn:active {
  transform: scale(0.98);
}

.bind-btn.primary {
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
}

.bind-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.bind-btn .btn-text {
  font-size: 28rpx;
  font-weight: 500;
}

.bind-btn.primary .btn-text {
  color: #000000;
}

.bind-btn.secondary .btn-text {
  color: #FFFFFF;
}

/* 加载状态样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.loading-content {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16rpx;
  padding: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.loading-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

</style>
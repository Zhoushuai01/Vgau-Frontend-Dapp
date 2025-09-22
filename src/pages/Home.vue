<template>
  <view class="content">
    <!-- 自定义顶部栏 -->
    <view class="custom-header">
      <view class="header-content">
        <!-- 左侧Logo -->
        <view class="logo-container">
          <image class="logo" src="/static/k1.png" mode="aspectFit" />
        </view>
        
        <!-- 中间标题 -->
        <view class="title-container">
          <text class="page-title"></text>
        </view>
        
        <!-- 右侧钱包连接和语言选择 -->
        <view class="right-controls">
          <!-- 官网按钮（白色） -->
          <view class="official-link-btn" :class="{ 'french-adjustment': locale === 'fr' }" @click="openOfficialSite">
            <text class="official-link-text">{{ $t('home.officialSite') }}</text>
          </view>
          <view class="connect-wallet-btn" @click="walletConnected ? showWalletModal = true : connectWallet()" :class="{ connected: walletConnected }">
            <text class="btn-text">{{ walletConnected ? formatShortAddress(currentAccount) : $t('wallet.connect') }}</text>
          </view>
          <view class="language-container">
            <view class="language-btn" @click="toggleLanguageDropdown">
              <image class="language-icon" src="/static/language.png" mode="aspectFit" />
            </view>
            <!-- 语言选择下拉框 -->
            <view class="language-dropdown" v-if="showLanguageDropdown">
              <!-- 语言选项 -->
              <view class="dropdown-item" @click="selectLanguage('ar')">
                <text class="language-text">{{ $t('languageNames.ar') }}</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('en')">
                <text class="language-text">{{ $t('languageNames.en') }}</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('fr')">
                <text class="language-text">{{ $t('languageNames.fr') }}</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('zh')">
                <text class="language-text">{{ $t('languageNames.zh') }}</text>
              </view>
              <view class="dropdown-item" @click="selectLanguage('pt')">
                <text class="language-text">{{ $t('languageNames.pt') }}</text>
              </view>
            </view>
          </view>
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

      <!-- TVL数据区域 -->
      <view class="tvl-section">
        <view class="tvl-number">{{ tvlData }}</view>
        <view class="tvl-label">{{ $t('home.tvl') }}</view>
        <view class="tvl-details">
          <view class="tvl-item">
            <text class="tvl-text">1 VGAU={{ vgauPrice }} USDT</text>
          </view>
          
        </view>
      </view>

      <!-- 兑换功能区域 -->
      <view class="exchange-section">
        <view class="exchange-title">{{ $t('home.exchange') }}</view>
        <view class="exchange-input">
          <input 
            class="input-field" 
            type="number"
            v-model="homeExchangeAmount"
            :placeholder="$t('home.enterAmount')" 
            placeholder-class="placeholder-text"
            :adjust-position="false"
            :hold-keyboard="true"
            :cursor-spacing="200"
          />
          <view class="currency-label">VGAU</view>
        </view>
        <view class="confirm-button" :class="{ 'loading': isHomeExchangeLoading }" @click="confirmHomeExchange">
          <text class="button-text">{{ isHomeExchangeLoading ? getHomeLoadingTitle() : $t('home.confirmOperation') }}</text>
        </view>
      </view>

      <!-- 项目介绍区域 -->
      <view class="project-section">
        <view class="project-title">{{ $t('home.projectTitle') }}</view>
        <view class="project-desc">
          {{ $t('home.projectDesc') }}
        </view>
        <view class="contract-info">
          <text class="contract-label">{{ walletConnected ? $t('home.walletAddress') : $t('home.contractAddress') }}</text>
          <text class="contract-address" @click="walletConnected ? copyWalletAddress() : copyContractAddress()">
            {{ walletConnected ? formatShortAddress(currentAccount) : '' }}
          </text>
          <image class="copy-icon" src="/static/fuzhi.png" mode="aspectFit" @click="walletConnected ? copyWalletAddress() : copyContractAddress()" />
        </view>
        <view class="project-badges">
          <view class="badge">
            <image class="badge-icon" src="/static/Home/Audited.png" mode="aspectFit" />
            <text class="badge-text">{{ $t('home.features.audited') }}</text>
          </view>
          <view class="badge">
            <image class="badge-icon" src="/static/Home/Custodian.png" mode="aspectFit" />
            <text class="badge-text">{{ $t('home.features.custodian') }}</text>
          </view>
          <view class="badge">
            <image class="badge-icon" src="/static/Home/Details.png" mode="aspectFit" />
            <text class="badge-text">{{ $t('home.features.details') }}</text>
          </view>
        </view>
      </view>

      <!-- 黄金库存区域 -->
      <view class="inventory-section">
        <view class="inventory-header">
          <image class="gold-icon" src="/static/Home/Gold.png" mode="aspectFit" />
          <text class="inventory-title">{{ $t('home.goldInventory') }}</text>
        </view>
        <view class="inventory-amount">
          <text class="amount-number">5,611,036g</text>
          <text class="amount-label">{{ $t('home.inventoryAmount') }}</text>
        </view>

      </view>
    </view>
    
    <!-- 钱包弹窗 -->
    <view class="wallet-modal" v-if="showWalletModal" @click="showWalletModal = false">
      <view class="wallet-modal-content" @click.stop>
        <!-- 钱包地址和复制按钮 -->
        <view class="wallet-address-section" @click="copyWalletAddress">
          <text class="wallet-address">{{ formatShortAddress(currentAccount) }}</text>
          <image class="copy-icon" src="/static/fuzhi.png" mode="aspectFit" />
        </view>
        
        <!-- 断开连接按钮 -->
        <view class="disconnect-btn" @click="disconnectWallet">
          <text class="disconnect-text">{{ $t('wallet.disconnect') }}</text>
        </view>
      </view>
    </view>

    <!-- 钱包错误模态框 -->
    <view class="error-modal" v-if="showErrorModal" @click="showErrorModal = false">
      <view class="error-modal-content" @click.stop>
        <!-- 错误标题 -->
        <view class="error-header">
          <text class="error-title">⚠️ {{ t('wallet.connectionFailed') }}</text>
          <view class="close-btn" @click="showErrorModal = false">×</view>
        </view>
        
        <!-- 错误详情 -->
        <view class="error-details">
          <text class="error-message">{{ currentError.message }}</text>
          <text class="error-description">{{ currentError.details }}</text>
        </view>
        
        <!-- 解决建议 -->
        <view class="error-suggestions" v-if="currentError.suggestions && currentError.suggestions.length > 0">
          <text class="suggestions-title">{{ t('common.suggestions') }}：</text>
          <view class="suggestion-item" v-for="(suggestion, index) in currentError.suggestions" :key="index">
            <text class="suggestion-text">{{ index + 1 }}. {{ suggestion }}</text>
          </view>
        </view>
        
        <!-- 操作按钮 -->
        <view class="error-actions">
          <view class="retry-btn" @click="retryWalletConnection">
            <text class="retry-text">{{ t('common.retry') }}</text>
          </view>
          <view class="close-error-btn" @click="showErrorModal = false">
            <text class="close-error-text">{{ t('common.close') }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 兑换错误模态框 -->
    <view class="exchange-error-modal" v-if="showExchangeErrorModal" @click="showExchangeErrorModal = false">
      <view class="exchange-error-modal-content" @click.stop>
        <!-- 错误标题 -->
        <view class="exchange-error-header">
          <view class="exchange-close-btn" @click="showExchangeErrorModal = false">×</view>
        </view>
        
        <!-- 错误详情 -->
        <view class="exchange-error-details">
          <text class="exchange-error-message">{{ exchangeErrorData.message }}</text>
        </view>
        
        <!-- 操作按钮 -->
        <view class="exchange-error-actions">
          <view class="exchange-confirm-btn" @click="showExchangeErrorModal = false">
            <text class="exchange-confirm-text">{{ t('common.confirm') }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { onPageScroll, onShow } from '@dcloudio/uni-app'
  import { useI18n } from 'vue-i18n'
  import { setLocale } from '@/i18n/i18n.js'
  import i18n from '@/i18n/i18n.js'
  import web3Service from '../utils/web3.js'
  import vgauService from '../utils/vgauService.js'
  import contractExchange from '@/utils/contractExchange.js'
  import { formatShortAddress } from '@/utils/addressUtils'
  import { platformFundsAPI, authAPI } from '@/api/apiService.js'
  
  const { t, locale } = useI18n()
  
  // 官网地址
  const officialUrl = 'https://verigold.ai/'
  const openOfficialSite = () => {
    // #ifdef H5
    window.open(officialUrl, '_blank')
    // #endif
    
    // #ifdef APP-PLUS || MP
    uni.navigateTo({ url: officialUrl })
    // #endif
  }
  
  // 轮播图数据
  const banners = ref([
    '/static/Home/banner1.png',
    '/static/Home/banner2.png',
    '/static/Home/banner3.png'
  ])
  
  // 当前轮播图索引
  const currentBannerIndex = ref(0)
  
  // 合同地址
  const contractAddress = ref('0x1234567890abcdef1234567890abcdef12345678')
  
  // Web3相关状态
  const walletConnected = ref(false)
  const currentAccount = ref('')
  const accountBalance = ref('0')
  const vgauBalance = ref('0')
  const tvlData = ref('1,000')
  const vgauPrice = ref('123.4561')
  const aprData = ref('1%')
  const showWalletModal = ref(false)
  
  // 错误模态框相关状态
  const showErrorModal = ref(false)
  const currentError = ref({
    message: '',
    details: '',
    suggestions: []
  })
  
  // 兑换错误模态框相关状态
  const showExchangeErrorModal = ref(false)
  const exchangeErrorData = ref({
    message: ''
  })
  
  // 首页兑换相关状态
  const homeExchangeAmount = ref('')
  const isHomeExchangeLoading = ref(false)
  
  // 汇率更新定时器
  let exchangeRateTimer = null
  
  // 复制合同地址到剪贴板
  const copyContractAddress = () => {
    if (!walletConnected.value) {
      uni.showToast({
        title: t('wallet.pleaseConnect'),
        icon: 'none',
        duration: 1000
      })
      return
    }
    
    uni.setClipboardData({
      data: contractAddress.value,
      success: () => {
        uni.showToast({
          title: t('wallet.contractAddressCopied'),
          icon: 'success',
          duration: 1000
        })
      },
      fail: () => {
        uni.showToast({
          title: t('wallet.copyFailed'),
          icon: 'error',
          duration: 1000
        })
      }
    })
  }
  
  // 连接钱包
  const connectWallet = async () => {
    try {
      const result = await web3Service.connectWallet()
      
      if (result.success) {
        walletConnected.value = true
        currentAccount.value = result.account
        console.log('钱包连接成功，状态更新:', walletConnected.value, currentAccount.value)
        console.log('连接钱包后的状态:', {
          result: result,
          walletConnected: walletConnected.value,
          currentAccount: currentAccount.value,
          web3ServiceConnected: web3Service.isConnected,
          web3ServiceAccount: web3Service.currentAccount
        })
        
        // 设置钱包连接状态到localStorage
        localStorage.setItem('walletConnected', 'true')
        
        // 触发钱包连接事件（仅通知钱包已连接）
        uni.$emit('walletConnected', {
          walletAddress: currentAccount.value,
          isConnected: true,
          connectedAt: Date.now()
        })
        
        // 立即显示成功提示
        uni.showToast({
          title: t('wallet.connected'),
          icon: 'success',
          duration: 1000
        })
        
        // 异步获取数据，不阻塞UI
        setTimeout(async () => {
          try {
            // 获取账户余额
            await updateAccountBalance()
            
            // 获取VGAU余额
            await updateVGAUBalance()
            
            // 获取平台数据（包括汇率）
            await updatePlatformData()
          } catch (error) {
            console.error('获取数据失败:', error)
          }
        }, 100)
      } else {
        // 显示详细的错误信息和解决建议
        showWalletErrorModal(result)
      }
    } catch (error) {
      console.error('连接钱包失败:', error)
      // 显示详细的错误信息和解决建议
      showWalletErrorModal({
        success: false,
        error: 'CONNECTION_FAILED',
        message: '连接失败',
        details: error.message || '钱包连接过程中发生未知错误',
        suggestions: ['刷新页面后重试', '检查钱包状态', '联系技术支持']
      })
    }
  }
  
  // 更新账户余额
  const updateAccountBalance = async () => {
    try {
      const balance = await web3Service.getBalance()
      if (balance) {
        accountBalance.value = parseFloat(balance.eth).toFixed(4)
      }
    } catch (error) {
      console.error('获取账户余额失败:', error)
    }
  }
  
  // 更新VGAU余额
  const updateVGAUBalance = async () => {
    try {
      if (vgauService.isInitialized) {
        const balance = await vgauService.getVGAUBalance()
        if (balance) {
          vgauBalance.value = parseFloat(balance.vgau).toFixed(4)
        }
      }
    } catch (error) {
      console.error('获取VGAU余额失败:', error)
    }
  }
  
  // 更新平台数据
  const updatePlatformData = async () => {
    try {
      if (vgauService.isInitialized) {
        const stats = await vgauService.getPlatformStats()
        if (stats) {
          // TVL数据使用中心化接口，不通过合约获取
          // tvlData.value = parseFloat(stats.tvl).toLocaleString()
          vgauPrice.value = parseFloat(stats.price).toFixed(4)
          aprData.value = `${(stats.apr * 100).toFixed(2)}%`
        }
      }
    } catch (error) {
      console.error('获取平台数据失败:', error)
    }
  }
  
  // 获取TVL数据（平台资金总览接口）
  const getTVLData = async () => {
    try {
      console.log('💰 开始获取TVL数据...')
      
      const response = await platformFundsAPI.getOverview()
      
      if (response?.success && response?.data) {
        const { totalVgauStaked } = response.data
        
        // 直接使用totalVgauStaked字段作为TVL数据
        const totalTvl = parseFloat(totalVgauStaked || 0)
        
        // 格式化显示（整数，添加千分位分隔符）
        tvlData.value = Math.round(totalTvl).toLocaleString('en-US')
        
        console.log('✅ TVL数据更新:', {
          totalVgauStaked: totalVgauStaked,
          totalTvl: tvlData.value
        })
      } else {
        console.warn('⚠️ 平台资金总览接口返回数据格式异常，使用默认值')
        tvlData.value = '1,000'
      }
    } catch (error) {
      console.error('❌ 获取TVL数据失败:', error)
      // 发生异常时使用默认值
      tvlData.value = '1,000'
    }
  }
  
  // 获取汇率数据（独立于钱包连接状态）
  const getExchangeRate = async () => {
    try {
      console.log('💰 开始获取汇率数据...')
      
      if (vgauService.isInitialized) {
        const stats = await vgauService.getPlatformStats()
        if (stats && stats.price) {
          vgauPrice.value = parseFloat(stats.price).toFixed(4)
          console.log('✅ 汇率数据更新:', vgauPrice.value)
        }
      } else {
        console.log('⚠️ vgauService未初始化，使用默认汇率')
        vgauPrice.value = '123.4561'
      }
    } catch (error) {
      console.error('❌ 获取汇率数据失败:', error)
      // 发生异常时使用默认值
      vgauPrice.value = '123.4561'
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
    
    console.log('✅ 汇率更新定时器已启动（30秒间隔）')
  }
  
  // 停止汇率更新定时器
  const stopExchangeRateTimer = () => {
    if (exchangeRateTimer) {
      clearInterval(exchangeRateTimer)
      exchangeRateTimer = null
      console.log('⏹️ 汇率更新定时器已停止')
    }
  }
  
  // 轮播图切换事件
  const onSwiperChange = (e) => {
    currentBannerIndex.value = e.detail.current
  }
  
  // 复制钱包地址
  const copyWalletAddress = () => {
    uni.setClipboardData({
      data: currentAccount.value,
      success: () => {
        uni.showToast({
          title: t('wallet.addressCopied'),
          icon: 'success',
          duration: 1000
        })
      },
      fail: () => {
        uni.showToast({
          title: t('wallet.copyFailed'),
          icon: 'error',
          duration: 1000
        })
      }
    })
  }
  
  // 获取首页加载弹窗的纯文字标题（避免显示键值对）
  const getHomeLoadingTitle = () => {
    try {
      const locale = i18n.global.locale?.value || 'en'
      return locale.startsWith('zh') ? '正在兌換...' : 'Exchanging...'
    } catch (e) {
      return 'Exchanging...'
    }
  }
  
  // 首页确认兑换
  const confirmHomeExchange = async () => {
    if (!homeExchangeAmount.value || parseFloat(homeExchangeAmount.value) <= 0) {
      uni.showToast({
        title: i18n.global.t('common.pleaseEnterValidAmount'),
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (isHomeExchangeLoading.value) {
      return
    }

    try {
      isHomeExchangeLoading.value = true
      
      // 显示加载提示（使用纯文字，避免键值对显示）
      uni.showLoading({
        title: getHomeLoadingTitle(),
        mask: true
      })

      console.log('🚀 开始首页USDT兑换VGAU流程...')
      console.log('兑换数量:', homeExchangeAmount.value, 'VGAU')

      // 调用合约兑换
      const result = await contractExchange.exchangeUsdtToVgau(homeExchangeAmount.value)
      
      // 隐藏加载提示
      uni.hideLoading()

      console.log('✅ 首页兑换成功:', result)

      // 显示成功提示
      uni.showToast({
        title: i18n.global.t('components.exchange.exchangeSuccess'),
        icon: 'success',
        duration: 3000
      })

      // 清空输入框
      homeExchangeAmount.value = ''

    } catch (error) {
      console.error('❌ 首页兑换失败:', error)
      
      // 隐藏加载提示
      uni.hideLoading()
      
      // 显示错误信息
      let errorMessage = t('components.exchange.exchangeFailed')
      
      if (error.errorType === 'KYC_REQUIRED') {
        errorMessage = error.message
      } else if (error.message) {
        if (error.message.includes('余额不足')) {
          errorMessage = error.message
        } else if (error.message.includes('用户取消') || error.message.includes('User rejected')) {
          // 直接使用翻译文本，避免键值对显示
          const locale = i18n.global.locale?.value || 'zh'
          if (locale.startsWith('zh')) {
            errorMessage = '用戶取消操作'
          } else if (locale.startsWith('en')) {
            errorMessage = 'User Cancelled Operation'
          } else if (locale.startsWith('fr')) {
            errorMessage = 'Utilisateur a Annulé l\'Opération'
          } else if (locale.startsWith('ar')) {
            errorMessage = 'رفض المستخدم العملية'
          } else if (locale.startsWith('pt')) {
            errorMessage = 'Usuário Cancelou Operação'
          } else {
            errorMessage = t('common.userRejected')
          }
        } else if (error.message.includes('网络')) {
          // 直接使用翻译文本，避免键值对显示
          const locale = i18n.global.locale?.value || 'zh'
          if (locale.startsWith('zh')) {
            errorMessage = '網絡錯誤'
          } else if (locale.startsWith('en')) {
            errorMessage = 'Network Error'
          } else if (locale.startsWith('fr')) {
            errorMessage = 'Erreur de Réseau'
          } else if (locale.startsWith('ar')) {
            errorMessage = 'خطأ في الشبكة'
          } else if (locale.startsWith('pt')) {
            errorMessage = 'Erro de Rede'
          } else {
            errorMessage = t('common.networkError')
          }
        } else if (error.message.includes('Gas')) {
          // 直接使用翻译文本，避免键值对显示
          const locale = i18n.global.locale?.value || 'zh'
          if (locale.startsWith('zh')) {
            errorMessage = 'Gas費用不足'
          } else if (locale.startsWith('en')) {
            errorMessage = 'Insufficient Gas Fee'
          } else if (locale.startsWith('fr')) {
            errorMessage = 'Frais de Gas Insuffisants'
          } else if (locale.startsWith('ar')) {
            errorMessage = 'رسوم الغاز غير كافية'
          } else if (locale.startsWith('pt')) {
            errorMessage = 'Taxa de Gas Insuficiente'
          } else {
            errorMessage = t('common.gasInsufficient')
          }
        } else if (error.message.includes('请先连接钱包')) {
          // 直接使用翻译文本，避免键值对显示
          const locale = i18n.global.locale?.value || 'zh'
          if (locale.startsWith('zh')) {
            errorMessage = '請先連接您的錢包'
          } else if (locale.startsWith('en')) {
            errorMessage = 'Please connect your wallet first'
          } else if (locale.startsWith('fr')) {
            errorMessage = 'Veuillez d\'abord connecter votre portefeuille'
          } else if (locale.startsWith('ar')) {
            errorMessage = 'يرجى ربط محفظتك أولاً'
          } else if (locale.startsWith('pt')) {
            errorMessage = 'Por favor, conecte sua carteira primeiro'
          } else {
            errorMessage = t('wallet.pleaseConnectWallet')
          }
        }
      }

      // 显示自定义错误弹窗
      exchangeErrorData.value = {
        message: errorMessage
      }
      showExchangeErrorModal.value = true
    } finally {
      isHomeExchangeLoading.value = false
    }
  }
  
  // 断开钱包连接
  const disconnectWallet = async () => {
    try {
      // 1. 调用logout接口
      console.log('🔓 开始登出流程...')
      try {
        await authAPI.logout()
        console.log('✅ 登出接口调用成功')
      } catch (error) {
        console.warn('⚠️ 登出接口调用失败，继续执行本地登出:', error)
      }
      
      // 2. 断开钱包连接（保持原有逻辑）
      web3Service.disconnect(true)
      walletConnected.value = false
      currentAccount.value = ''
      accountBalance.value = '0'
      vgauBalance.value = '0'
      showWalletModal.value = false
      
      // 3. 设置钱包断开状态到localStorage
      localStorage.setItem('walletManuallyDisconnected', 'true')
      localStorage.setItem('walletConnected', 'false')
      
      // 4. 清除个人中心相关数据
      console.log('🧹 清除个人中心数据...')
      
      // 触发个人中心数据清除事件
      uni.$emit('walletDisconnected', {
        clearUserData: true,
        clearAssetsData: true
      })
      
      // 5. 显示成功提示
      uni.showToast({
        title: t('wallet.disconnected'),
        icon: 'success',
        duration: 1000
      })
      
      console.log('✅ 钱包断开和登出流程完成')
    } catch (error) {
      console.error('❌ 断开钱包时发生错误:', error)
      
      // 即使出错也要执行本地断开
      web3Service.disconnect(true)
      walletConnected.value = false
      currentAccount.value = ''
      accountBalance.value = '0'
      vgauBalance.value = '0'
      showWalletModal.value = false
      
      // 设置钱包断开状态到localStorage
      localStorage.setItem('walletManuallyDisconnected', 'true')
      localStorage.setItem('walletConnected', 'false')
      
      uni.showToast({
        title: t('wallet.disconnected'),
        icon: 'success',
        duration: 1000
      })
    }
  }

  // 显示钱包错误模态框
  const showWalletErrorModal = (errorData) => {
    currentError.value = {
      message: errorData.message || '连接失败',
      details: errorData.details || '钱包连接过程中发生未知错误',
      suggestions: errorData.suggestions || ['刷新页面后重试', '检查钱包状态', '联系技术支持']
    }
    showErrorModal.value = true
  }

  // 重试钱包连接
  const retryWalletConnection = async () => {
    showErrorModal.value = false
    // 延迟一下再重试，避免用户连续点击
    setTimeout(() => {
      connectWallet()
    }, 500)
  }
  
  // 语言选择相关
  const showLanguageDropdown = ref(false)
  
  // 切换语言下拉框显示
  const toggleLanguageDropdown = () => {
    showLanguageDropdown.value = !showLanguageDropdown.value
  }
  
  // 选择语言
  const selectLanguage = async (language) => {
    try {
      // 使用Vue I18n的语言切换功能
      await setLocale(language)
      showLanguageDropdown.value = false
      
      // 语言切换提示文字
      const switchMessages = {
        'ar': 'تم التبديل',
        'en': 'Switched',
        'fr': 'Changé',
        'zh': '已切換',
        'pt': 'Alterado'
      }
      
      // 使用与复制功能相同的Toast样式
      uni.showToast({
        title: switchMessages[language] || 'Language Changed',
        icon: 'none',
        duration: 2000,
        position: 'center'
      })
    } catch (error) {
      console.error('语言切换失败:', error)
      uni.showToast({
        title: 'Language switch failed',
        icon: 'error',
        duration: 2000
      })
    }
  }
  
  onMounted(async () => {
    console.log('首页加载完成')
    
    // 初始化Web3和VGAU服务
    try {
      // 先初始化Web3服务
      await web3Service.init()
      console.log('Web3服务初始化成功')
      
      // 再初始化VGAU服务
      await vgauService.init()
      console.log('VGAU服务初始化成功')
      
      // 检查是否已经连接了钱包（现在web3Service已经检查过现有连接）
      if (web3Service.isConnected && web3Service.currentAccount) {
        walletConnected.value = true
        currentAccount.value = web3Service.currentAccount
        console.log('检测到已连接的钱包:', currentAccount.value)
        console.log('钱包连接状态:', {
          isConnected: web3Service.isConnected,
          currentAccount: web3Service.currentAccount,
          walletConnected: walletConnected.value,
          currentAccountValue: currentAccount.value
        })
        
        // 获取初始数据
        await updateAccountBalance()
        await updateVGAUBalance()
        await updatePlatformData()
      } else {
        // 即使钱包未连接，也要获取汇率数据
        console.log('钱包未连接，但仍获取汇率数据')
        await getExchangeRate()
      }
      
      // 获取TVL数据（无论钱包是否连接）
      await getTVLData()
      
      // 启动汇率更新定时器（无论钱包是否连接）
      startExchangeRateTimer()
    } catch (error) {
      console.error('服务初始化失败:', error)
    }
    
    // 添加点击外部关闭下拉框的监听器（支持移动端）
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside, { passive: false })
    document.addEventListener('touchend', handleClickOutside, { passive: false })
    
    // 监听钱包地址不匹配事件
    document.addEventListener('walletAddressMismatch', handleWalletAddressMismatch)
    
    // 注入全局Toast样式
    injectToastStyles()
  })
  
  // 组件卸载时移除监听器
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('touchstart', handleClickOutside)
    document.removeEventListener('touchend', handleClickOutside)
    document.removeEventListener('walletAddressMismatch', handleWalletAddressMismatch)
    
    // 停止汇率更新定时器
    stopExchangeRateTimer()
  })
  
  // 处理钱包地址不匹配事件
  const handleWalletAddressMismatch = (event) => {
    const { currentAddress, newAddress, message } = event.detail
    
    console.warn('钱包地址不匹配:', {
      当前连接地址: currentAddress,
      MetaMask新地址: newAddress
    })
    
    // 显示用户提示
    uni.showModal({
      title: '钱包地址已更改',
      content: `检测到您在MetaMask中切换了钱包地址。\n\n当前连接地址: ${formatShortAddress(currentAddress)}\n新地址: ${formatShortAddress(newAddress)}\n\n如需使用新地址，请先断开当前连接，然后重新连接。`,
      showCancel: true,
      cancelText: '保持当前连接',
      confirmText: '断开连接',
      success: (res) => {
        if (res.confirm) {
          // 用户选择断开连接
          disconnectWallet()
        }
        // 如果用户选择保持当前连接，不做任何操作
      }
    })
  }

  // 处理点击外部关闭下拉框
  const handleClickOutside = (event) => {
    // 阻止事件冒泡，确保触摸事件正确处理
    event.stopPropagation()
    
    // 立即执行，确保触摸响应及时
    const languageContainer = document.querySelector('.language-container')
    if (languageContainer && !languageContainer.contains(event.target)) {
      showLanguageDropdown.value = false
    }
  }
  
  // 添加页面滚动时关闭下拉框
  onPageScroll(() => {
    if (showLanguageDropdown.value) {
      showLanguageDropdown.value = false
    }
  })
  
  // 添加页面显示时关闭下拉框
  onShow(() => {
    if (showLanguageDropdown.value) {
      showLanguageDropdown.value = false
    }
  })
  
  // 添加触摸移动事件监听，确保触摸响应
  onMounted(() => {
    // 监听整个页面的触摸事件
    const pageElement = document.querySelector('.content')
    if (pageElement) {
      pageElement.addEventListener('touchmove', () => {
        if (showLanguageDropdown.value) {
          showLanguageDropdown.value = false
        }
      })
    }
  })
  
  // 注入全局Toast样式
  const injectToastStyles = () => {
    const style = document.createElement('style')
    style.textContent = `
      .uni-toast,
      .uni-toast__content,
      .uni-toast--center,
      .uni-toast--top,
      .uni-toast--bottom {
        background: rgba(0, 0, 0, 0.8) !important;
        background-color: rgba(0, 0, 0, 0.8) !important;
        color: #FFFFFF !important;
        border-radius: 16rpx !important;
        border: 1rpx solid rgba(255, 255, 255, 0.1) !important;
      }
    `
    document.head.appendChild(style)
  }

</script>

<style lang="scss" scoped>
/* 全局背景色 */
:deep(body), :deep(html) {
  background-color: #0A0A0A !important;
}

/* 钱包连接按钮样式强制覆盖 */
:deep(.connect-wallet-btn.connected) {
  background: #FFFFFF !important;
  border: 1rpx solid rgba(255, 255, 255, 0.2) !important;
}

/* 全局Toast样式覆盖 */
:deep(.uni-toast),
:deep(.uni-toast__content),
:deep(.uni-toast--center),
:deep(.uni-toast--top),
:deep(.uni-toast--bottom) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

/* 更强力的Toast样式覆盖 */
:deep(.uni-toast) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

:deep(.uni-toast__content) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
  color: #FFFFFF !important;
}

.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
  overflow-x: hidden;
}

/* 自定义顶部栏 */
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  background: #000000;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  padding-top: var(--status-bar-height, 0px);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
}

.logo-container {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
}

.logo {
  width: 160rpx;
  height: 40rpx;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  object-fit: contain;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.page-title {
  color: #FFFFFF;
  font-size: 36rpx;
  font-weight: 600;
  text-align: center;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 32rpx;
  flex: 0 0 auto;
}

.connect-wallet-btn {
  background: #FFFFFF;
  border-radius: 12rpx;
  padding: 6rpx 16rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80rpx;
  border: 1rpx solid transparent;
}

.connect-wallet-btn.connected {
  background: #FFFFFF !important;
  border: 1rpx solid rgba(255, 255, 255, 0.2) !important;
}

.connect-wallet-btn:active {
  transform: scale(0.95);
}

.btn-text {
  color: #000000;
  font-size: 22rpx;
  font-weight: 500;
  white-space: nowrap;
}

.connect-wallet-btn.connected .btn-text {
  color: #000000 !important;
  font-weight: 500;
}

.language-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 66rpx;
  height: 64rpx;
  flex: 0 0 auto;
  position: relative;
}

.language-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8rpx;
  border-radius: 8rpx;
  transition: background-color 0.3s ease;
}

.language-btn:active {
  background-color: rgba(0, 0, 0, 0.1);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
  min-width: 220rpx;
  max-width: 280rpx;
  z-index: 1001;
  margin-top: 8rpx;
}



.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18rpx 20rpx;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
}

.dropdown-item:first-child {
  border-radius: 16rpx 16rpx 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 16rpx 16rpx;
}

.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.language-text {
  font-size: 28rpx;
  color: #FFFFFF;
}



.language-icon {
  width: 56rpx;
  height: 56rpx;
}

.main-content {
  display: flex;
  flex-direction: column;
  padding: 40rpx 32rpx;
  min-height: 100vh;
  background-color: #0A0A0A;
  margin-top: calc(88rpx + var(--status-bar-height, 0px));
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
}

.indicator.active {
  background: #FFFFFF;
}

/* TVL数据区域 */
.tvl-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rpx;
  padding: 32rpx 0;
}

.tvl-number {
  font-size: 72rpx;
  font-weight: 400;
  color: transparent;
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 1.1;
}

.tvl-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8rpx;
  display: inline-block;
  align-self: flex-start;
}

.tvl-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32rpx;
}

.tvl-text {
  font-size: 28rpx;
  color: #FFFFFF;
}


/* 兑换功能区域 */
.exchange-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rpx;
  padding: 32rpx 0;
}

.exchange-title {
  font-size: 28rpx;
  color: #D1D5DB;
  margin-bottom: 16rpx;
}

.exchange-input {
  display: flex;
  align-items: center;
  border: 1rpx solid #444444;
  border-radius: 16rpx;
  padding: 30rpx 26rpx;
  margin-bottom: 32rpx;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 28rpx;
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.2);
  font-size: 28rpx;
  font-weight: 400;
  line-height: 1.5;
}

.currency-label {
  font-size: 32rpx;
  color: #D1D5DB;
  margin-left: 32rpx;
}

.confirm-button {
  background: linear-gradient(90deg, #FFD700 0%, #FFA500 100%);
  border-radius: 16rpx;
  padding: 24rpx 0;
  text-align: center;
  transition: all 0.3s ease;
}

.confirm-button.loading {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.6) 0%, rgba(255, 165, 0, 0.6) 100%);
  pointer-events: none;
}

.button-text {
  color: #000000;
  font-size: 32rpx;
  font-weight: 400;
}

/* 项目介绍区域 */
.project-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rpx;
  padding: 32rpx 0;
}

.project-title {
  font-size: 40rpx;
  color: #FFFFFF;
  margin-bottom: 16rpx;
}

/* 官网按钮（白色） */
.official-link-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6rpx 12rpx; /* 进一步减小内边距 */
  background-color: #FFFFFF;
  border-radius: 16rpx;
  height: 40rpx; /* 与链接钱包一致 */
  min-width: 70rpx; /* 进一步减小最小宽度 */
}

.official-link-text {
  color: #000000;
  font-size: 18rpx; /* 继续缩小字体 */
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

/* 法语状态下的官网按钮调整 */
.official-link-btn.french-adjustment {
  margin-left: 16rpx; /* 向右移动 */
}

.project-desc {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.67;
  margin-bottom: 32rpx;
}

.contract-info {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 32rpx;
  flex-wrap: nowrap;
}

.contract-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
}

.contract-address {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.3s ease;
}

.contract-address:active {
  color: rgba(255, 255, 255, 0.8);
}

.copy-icon {
  width: 28rpx;
  height: 28rpx;
  cursor: pointer;
}

.project-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
}

.badge {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #333333;
  border-radius: 24rpx;
  padding: 12rpx 24rpx;
}

.badge-icon {
  width: 24rpx;
  height: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-text {
  font-size: 24rpx;
  color: #FFFFFF;
}

/* 黄金库存区域 */
.inventory-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 44rpx;
  padding: 32rpx 0;
}

.inventory-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.gold-icon {
  width: 48rpx;
  height: 48rpx;
}

.inventory-title {
  font-size: 36rpx;
  color: #FFFFFF;
}

.inventory-amount {
  margin-bottom: 32rpx;
}

.amount-number {
  font-size: 48rpx;
  color: #FFD700;
  display: block;
  margin-bottom: 8rpx;
}

.amount-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
}




/* 自定义Toast样式 - 半透明（移动端兼容） */
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

/* 针对不同位置的Toast样式 */
:deep(.uni-toast--center) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

:deep(.uni-toast--top) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

:deep(.uni-toast--bottom) {
  background: rgba(0, 0, 0, 0.8) !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

/* 移动端特殊处理 */
@media (max-width: 768px) {
  :deep(.uni-toast) {
    background: rgba(0, 0, 0, 0.8) !important;
    background-color: rgba(0, 0, 0, 0.8) !important;
    font-size: 20rpx;
    padding: 16rpx 24rpx;
  }
  
  /* 移动端顶部栏调整 */
  .right-controls {
    gap: 24rpx;
  }
  
  .header-content {
    padding: 0 24rpx;
  }
  
  .official-link-btn {
    padding: 4rpx 10rpx;
    min-width: 60rpx;
  }
  
  .official-link-text {
    font-size: 16rpx;
  }
  
  .connect-wallet-btn {
    padding: 4rpx 12rpx;
    min-width: 70rpx;
  }
  
  .btn-text {
    font-size: 20rpx;
  }
}

/* 超小屏幕处理 */
@media (max-width: 480px) {
  .right-controls {
    gap: 20rpx;
  }
  
  .header-content {
    padding: 0 20rpx;
  }
  
  .official-link-btn {
    padding: 3rpx 8rpx;
    min-width: 55rpx;
  }
  
  .official-link-text {
    font-size: 14rpx;
  }
  
  .connect-wallet-btn {
    padding: 3rpx 10rpx;
    min-width: 65rpx;
  }
  
  .btn-text {
    font-size: 18rpx;
  }
}

/* 钱包弹窗样式 */
.wallet-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 2000;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 120rpx 32rpx 0 0;
}

.wallet-modal-content {
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  border-radius: 16rpx;
  padding: 24rpx;
  min-width: 280rpx;
  max-width: 320rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.5);
}

.wallet-address-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16rpx;
  padding: 16rpx;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wallet-address-section:active {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0.98);
}

.wallet-address {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 500;
  font-family: monospace;
  flex: 1;
  margin-right: 12rpx;
}

.copy-icon {
  width: 24rpx;
  height: 24rpx;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.wallet-address-section:hover .copy-icon {
  opacity: 1;
}

.disconnect-btn {
  background: #FFFFFF;
  border-radius: 12rpx;
  padding: 16rpx;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.disconnect-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.9);
}

.disconnect-text {
  color: #000000;
  font-size: 28rpx;
  font-weight: 500;
}

/* 错误模态框样式 */
.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3000;
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
  margin-bottom: 32rpx;
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
  position: absolute;
  left: 0;
  top: 0;
}

.suggestion-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 24rpx;
  line-height: 1.4;
}

.error-actions {
  display: flex;
  gap: 16rpx;
  justify-content: flex-end;
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

/* 兑换错误模态框样式 */
.exchange-error-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32rpx;
}

.exchange-error-modal-content {
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

.exchange-error-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 24rpx;
  padding-bottom: 16rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
}

.exchange-error-title {
  color: #FF6B6B;
  font-size: 32rpx;
  font-weight: 600;
}

.exchange-close-btn {
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

.exchange-close-btn:hover {
  color: #FFFFFF;
  background: rgba(255, 255, 255, 0.1);
}

.exchange-error-details {
  margin-bottom: 32rpx;
  text-align: center;
}

.exchange-error-message {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 500;
  line-height: 1.5;
  display: block;
  text-align: center;
}

.exchange-error-actions {
  display: flex;
  justify-content: center;
}

.exchange-confirm-btn {
  background: linear-gradient(135deg, #E78B1B 0%, #D67A0A 100%);
  border-radius: 12rpx;
  padding: 16rpx 48rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120rpx;
  text-align: center;
}

.exchange-confirm-btn:active {
  transform: scale(0.95);
  background: linear-gradient(135deg, #D67A0A 0%, #C66A00 100%);
}

.exchange-confirm-text {
  color: #FFFFFF;
  font-size: 28rpx;
  font-weight: 500;
}
</style> 
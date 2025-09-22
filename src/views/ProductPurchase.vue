<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('components.productPurchase.productPurchase') }}</text>
      </view>
      <view class="header-buttons">
        <view class="header-button" @click="showRecords">
          <image class="header-icon" src="/static/history.png" mode="aspectFit" />
        </view>
        <view class="header-button" @click="showHelp">
          <image class="header-icon" src="/static/DiFi/xiangqing.png" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 产品选择区域 -->
        <view class="product-selection">
          <view 
            v-for="product in products" 
            :key="product.id" 
            class="product-card" 
            :class="{ active: selectedProduct === product.id }" 
            @click="selectProduct(product.id)"
          >
            <text class="product-term">{{ product.lockDays }}{{ $t('stakingDetail.days') }}</text>
            <text class="product-apy">{{ product.annualRate }}% APY</text>
          </view>
          
          <!-- 加载状态 -->
          <view v-if="loading" class="loading-card">
            <text class="loading-text">{{ $t('common.loading') }}</text>
          </view>
          
          <!-- 无产品时的占位 -->
          <view v-if="!loading && products.length === 0" class="empty-card">
            <text class="empty-text">{{ $t('common.noData') }}</text>
          </view>
        </view>

        <!-- 产品详情栏 -->
        <view class="product-detail-bar" v-if="showProductDetail && selectedProductInfo">
          <view class="detail-header">
            <text class="detail-title">{{ $t('components.productPurchase.productDetails') }} - {{ selectedProductInfo.name }}</text>
            <view class="close-button" @click="closeProductDetail">
              <text class="close-text">×</text>
            </view>
          </view>
          <view class="detail-content">
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.productPurchase.term') }}:</text>
              <text class="detail-value">{{ selectedProductInfo.lockDays }}{{ $t('stakingDetail.days') }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.productPurchase.apy') }}:</text>
              <text class="detail-value">{{ selectedProductInfo.annualRate }}%</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.productPurchase.minAmount') }}:</text>
              <text class="detail-value">{{ selectedProductInfo.minAmount }} VGAU</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">{{ $t('components.productPurchase.maxAmount') }}:</text>
              <text class="detail-value">{{ selectedProductInfo.maxAmount }} VGAU</text>
            </view>
          </view>
        </view>

        <!-- 金额输入区域 -->
        <view class="amount-section">
          <text class="amount-label">{{ t('components.productPurchase.amount') }}</text>
          <view class="amount-input-container">
            <input class="amount-input" 
                   type="number" 
                   :placeholder="$t('components.productPurchase.enterStakingAmount')" 
                   v-model="stakingAmount"
                   @input="calculateEstimatedInterest"
                   :adjust-position="false" />
            <view class="input-suffix">
              <text class="currency-text">{{ t('components.productPurchase.vgau') }}</text>
              <view class="max-button" @click="setMaxAmount">
                <text class="max-text">{{ t('components.productPurchase.max') }}</text>
              </view>
            </view>
          </view>
          <text class="available-balance">
            {{ t('components.productPurchase.availableBalance') }} 
            <text class="balance-amount">
              <text v-if="balanceLoading" class="loading-text">加载中...</text>
              <text v-else>{{ vgauBalance }}</text>
            </text> 
            {{ t('components.productPurchase.vgau') }}
          </text>
        </view>

        <!-- 规则说明区域 -->
        <view class="rules-section" :class="{ 'product-rules-active': currentTab === 'product' }">
          <view class="rules-tabs">
            <view class="tab" :class="{ active: currentTab === 'transaction' }" @click="switchTab('transaction')">
              <text class="tab-text">{{ t('components.productPurchase.transactionRules') }}</text>
            </view>
            <view class="tab" :class="{ active: currentTab === 'product' }" @click="switchTab('product')">
              <text class="tab-text">{{ t('components.productPurchase.productRules') }}</text>
            </view>
          </view>
          
          <view class="rules-content" v-if="currentTab === 'transaction'">
            <view class="transaction-rule-item">
              <text class="transaction-rule-label">{{ t('components.productPurchase.estimatedInterest') }}</text>
              <text class="transaction-rule-value">{{ estimatedInterest }} USDT</text>
            </view>
          </view>
          
          <view class="rules-content" v-else>
            <view class="rule-section">
              <text class="rule-section-title">{{ t('components.productPurchase.rewards') }}</text>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">{{ t('components.productPurchase.rewardsDailyChange') }}</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">{{ t('components.productPurchase.rewardsStartCalculation') }}</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">{{ t('components.productPurchase.rewardsAfterStaking') }}</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">{{ t('components.productPurchase.settlementIncome') }}</text>
              </view>
            </view>
            
            <view class="rule-section">
              <text class="rule-section-title">{{ t('components.productPurchase.subscriptionAndRedemption') }}</text>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">{{ t('components.productPurchase.subscriptionAndRedemptionDaily') }}</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">{{ t('components.productPurchase.earlyRedemptionMyFinance') }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" @click="confirmPurchase">
          <text class="confirm-text">{{ t('components.productPurchase.confirm') }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { stakeAPI, userFundsAPI } from '@/api/apiService.js'

const { t } = useI18n()

// 响应式数据
const products = ref([])
const loading = ref(false)
const selectedProduct = ref('')
const showProductDetail = ref(false)
const stakingAmount = ref('')
const currentTab = ref('transaction')
const vgauBalance = ref('0.00')
const balanceLoading = ref(false)
const vgauPrice = ref('0.00') // VGAU价格（USDT）
const estimatedInterest = ref('0.00') // 预估利息

// 计算属性
const selectedProductInfo = computed(() => {
  return products.value.find(product => product.id === selectedProduct.value)
})

// 获取VGAU价格
const fetchVGAUPrice = async () => {
  try {
    console.log('🔄 开始获取VGAU价格...')
    
    // 这里需要调用获取VGAU价格的API或合约方法
    // 暂时使用模拟数据，实际应该从链上获取
    const response = await userFundsAPI.getBalances() // 假设这个API也返回价格信息
    
    if (response.success && response.data) {
      // 查找VGAU价格信息
      const vgauPriceData = response.data.find(balance => balance.currency === 'VGAU')
      
      if (vgauPriceData && vgauPriceData.price) {
        vgauPrice.value = parseFloat(vgauPriceData.price).toFixed(4)
        console.log('💰 VGAU价格获取成功:', vgauPrice.value)
      } else {
        // 如果没有价格数据，使用默认值
        vgauPrice.value = '123.4561' // 默认价格
        console.log('⚠️ 未找到VGAU价格数据，使用默认值')
      }
    } else {
      vgauPrice.value = '123.4561' // 默认价格
      console.log('⚠️ 获取价格失败，使用默认值')
    }
  } catch (error) {
    console.error('❌ 获取VGAU价格失败:', error)
    vgauPrice.value = '123.4561' // 默认价格
  }
}

// 计算预估利息
const calculateEstimatedInterest = () => {
  if (!stakingAmount.value || !selectedProductInfo.value || !vgauPrice.value) {
    estimatedInterest.value = '0.00'
    return
  }
  
  const amount = parseFloat(stakingAmount.value)
  const price = parseFloat(vgauPrice.value)
  const annualRate = parseFloat(selectedProductInfo.value.annualRate) / 100 // 转换为小数
  const lockDays = selectedProductInfo.value.lockDays
  
  if (amount <= 0 || price <= 0 || annualRate <= 0 || lockDays <= 0) {
    estimatedInterest.value = '0.00'
    return
  }
  
  // 计算公式：质押VGAU数量 × 每枚VGAU的USDT × 年化利率 × (选择产品天数/ 365)
  const interest = amount * price * annualRate * (lockDays / 365)
  
  // 保留4位小数
  estimatedInterest.value = interest.toFixed(4)
  
  console.log('💰 预估利息计算:', {
    amount,
    price,
    annualRate,
    lockDays,
    interest: estimatedInterest.value
  })
}

// 获取VGAU余额
const fetchVGAUBalance = async () => {
  try {
    balanceLoading.value = true
    console.log('🔄 开始获取VGAU余额...')
    
    const response = await userFundsAPI.getBalances()
    console.log('✅ VGAU余额获取成功:', response)
    
    if (response.success && response.data) {
      // 查找VGAU余额
      const vgauBalanceData = response.data.find(balance => balance.currency === 'VGAU')
      
      if (vgauBalanceData) {
        vgauBalance.value = vgauBalanceData.availableAmount || '0.00'
        console.log('💰 VGAU余额设置成功:', vgauBalance.value)
      } else {
        console.log('⚠️ 未找到VGAU余额数据')
        vgauBalance.value = '0.00'
      }
    } else {
      console.log('⚠️ 获取余额失败，使用默认值')
      vgauBalance.value = '0.00'
    }
  } catch (error) {
    console.error('❌ 获取VGAU余额失败:', error)
    
    // 如果API调用失败，使用默认值
    vgauBalance.value = '0.00'
    
    uni.showToast({
      title: '余额获取失败',
      icon: 'none',
      duration: 2000
    })
  } finally {
    balanceLoading.value = false
  }
}

// 获取产品列表
const fetchProducts = async () => {
  try {
    loading.value = true
    console.log('🔄 开始获取质押产品列表...')
    
    const response = await stakeAPI.getProducts()
    console.log('✅ 质押产品列表获取成功:', response)
    
    if (response.success && response.data) {
      products.value = response.data
      
      // 默认选中第一个产品
      if (products.value.length > 0) {
        selectedProduct.value = products.value[0].id
      }
    } else {
      throw new Error(response.message || '获取产品列表失败')
    }
  } catch (error) {
    console.error('❌ 获取质押产品列表失败:', error)
    
    uni.showToast({
      title: error.message || t('common.networkError'),
      icon: 'none',
      duration: 3000
    })
    
    // 如果API调用失败，使用模拟数据
    products.value = [
      {
        id: 'mock_7d',
        name: '7天短期质押',
        description: '7天短期质押产品，年化收益5.5%',
        annualRate: '5.50',
        lockDays: 7,
        minAmount: 100,
        maxAmount: 10000,
        status: 'ACTIVE'
      },
      {
        id: 'mock_30d',
        name: '30天中期质押',
        description: '30天中期质押产品，年化收益8.0%',
        annualRate: '8.00',
        lockDays: 30,
        minAmount: 500,
        maxAmount: 50000,
        status: 'ACTIVE'
      }
    ]
    
    if (products.value.length > 0) {
      selectedProduct.value = products.value[0].id
    }
  } finally {
    loading.value = false
  }
}

// 选择产品
const selectProduct = (productId) => {
  selectedProduct.value = productId
  showProductDetail.value = true
  // 选择产品后重新计算预估利息
  calculateEstimatedInterest()
}

// 关闭产品详情
const closeProductDetail = () => {
  showProductDetail.value = false
}

// 设置最大金额
const setMaxAmount = () => {
  if (selectedProductInfo.value) {
    // 使用产品最大金额和用户VGAU余额中的较小值
    const maxProductAmount = selectedProductInfo.value.maxAmount
    const userBalance = parseFloat(vgauBalance.value) || 0
    
    const maxAmount = Math.min(maxProductAmount, userBalance)
    stakingAmount.value = maxAmount.toString()
    
    console.log('💰 设置最大金额:', {
      productMaxAmount: maxProductAmount,
      userBalance: userBalance,
      finalMaxAmount: maxAmount
    })
  } else {
    // 如果没有选中产品，使用用户余额
    const userBalance = parseFloat(vgauBalance.value) || 0
    stakingAmount.value = userBalance.toString()
  }
  
  // 设置金额后重新计算预估利息
  calculateEstimatedInterest()
}

// 切换标签页
const switchTab = (tab) => {
  currentTab.value = tab
}

// 显示记录
const showRecords = () => {
  console.log('🔄 点击历史记录按钮，准备跳转到History页面...')
  
  uni.navigateTo({
    url: '/views/History',
    success: () => {
      console.log('✅ 成功跳转到History页面')
    },
    fail: (error) => {
      console.error('❌ 跳转到History页面失败:', error)
      
      // 尝试备用路径
      console.log('🔄 尝试备用路径...')
      uni.navigateTo({
        url: 'views/History',
        success: () => {
          console.log('✅ 备用路径跳转成功')
        },
        fail: (backupError) => {
          console.error('❌ 备用路径也失败:', backupError)
          uni.showToast({
            title: '页面跳转失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  })
}

// 显示帮助
const showHelp = () => {
  uni.navigateTo({
    url: '/views/ProductHelp'
  })
}

// 确认购买
const confirmPurchase = async () => {
  if (!selectedProductInfo.value) {
    uni.showToast({
      title: t('components.productPurchase.selectProduct'),
      icon: 'none',
      duration: 2000
    })
    return
  }

  if (!stakingAmount.value || parseFloat(stakingAmount.value) <= 0) {
    uni.showToast({
      title: t('common.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  const amount = parseFloat(stakingAmount.value)
  const minAmount = selectedProductInfo.value.minAmount
  const maxAmount = selectedProductInfo.value.maxAmount
  
  if (amount < minAmount || amount > maxAmount) {
    uni.showToast({
      title: `${t('components.productPurchase.amountOutOfRange')} (${minAmount}-${maxAmount} VGAU)`,
      icon: 'none',
      duration: 3000
    })
    return
  }
  
  // 检查用户VGAU余额是否充足
  const userBalance = parseFloat(vgauBalance.value) || 0
  if (amount > userBalance) {
    uni.showToast({
      title: `余额不足，当前可用余额: ${userBalance} VGAU`,
      icon: 'none',
      duration: 3000
    })
    return
  }
  
  // 创建质押订单
  await createStakeOrder()
}

// 创建质押订单
const createStakeOrder = async () => {
  try {
    // 显示加载提示
    uni.showLoading({
      title: t('components.productPurchase.processing'),
      mask: true
    })
    
    console.log('🔄 开始创建质押订单...', {
      productId: selectedProductInfo.value.id,
      stakeAmount: parseInt(stakingAmount.value)
    })
    
    const orderData = {
      productId: selectedProductInfo.value.id,
      stakeAmount: parseInt(stakingAmount.value)
    }
    
    const response = await stakeAPI.createOrder(orderData)
    console.log('📡 质押订单创建API响应:', response)
    console.log('📊 响应结构分析:', {
      hasSuccess: !!response.success,
      successValue: response.success,
      hasCode: !!response.code,
      codeValue: response.code,
      hasStatusCode: !!response.statusCode,
      statusCodeValue: response.statusCode,
      hasData: !!response.data,
      hasMessage: !!response.message,
      messageValue: response.message
    })
    
    uni.hideLoading()
    
    // 检查响应结构，支持不同的API响应格式
    const isSuccess = response.success || response.code === 0 || response.statusCode === 200
    const responseData = response.data || response
    const responseMessage = response.message || '质押订单创建成功'
    
    console.log('🔍 成功判断结果:', {
      isSuccess,
      success: response.success,
      code: response.code,
      statusCode: response.statusCode
    })
    
    if (isSuccess) {
             // 显示成功提示
       uni.showToast({
         title: responseMessage,
         icon: 'success',
         duration: 1000
       })
      
      // 清空输入
      stakingAmount.value = ''
      showProductDetail.value = false
      
      // 刷新VGAU余额
      await fetchVGAUBalance()
      
      // 通知DeFi页面更新余额
      uni.$emit('balanceUpdated', {
        type: 'finance',
        currency: 'VGAU',
        amount: stakingAmount.value
      })
      
             // 延迟返回上一页
       setTimeout(() => {
         uni.navigateBack()
       }, 1000)
      
    } else {
      throw new Error(responseMessage || '创建订单失败')
    }
    
  } catch (error) {
    console.error('❌ 创建质押订单失败:', error)
    
    uni.hideLoading()
    
    let errorMessage = t('components.productPurchase.orderCreateFailed')
    
    // 根据错误类型显示不同的提示
    if (error.message) {
      // 如果错误消息是成功消息，说明API实际是成功的，只是响应结构问题
      if (error.message.includes('质押订单创建成功') || error.message.includes('success')) {
        console.log('⚠️ API实际成功，但响应结构有问题，按成功处理')
        
                 // 显示成功提示
         uni.showToast({
           title: t('components.productPurchase.orderCreateSuccess'),
           icon: 'success',
           duration: 1000
         })
        
        // 清空输入
        stakingAmount.value = ''
        showProductDetail.value = false
        
        // 刷新VGAU余额
        await fetchVGAUBalance()
        
                 // 延迟返回上一页
         setTimeout(() => {
           uni.navigateBack()
         }, 1000)
        
        return // 提前返回，不显示错误提示
      }
      
      // 处理其他错误类型
      if (error.message.includes('余额不足') || error.message.includes('insufficient')) {
        errorMessage = t('common.insufficientBalance')
      } else if (error.message.includes('产品不存在') || error.message.includes('product not found')) {
        errorMessage = t('components.productPurchase.productNotFound')
      } else if (error.message.includes('金额') || error.message.includes('amount')) {
        errorMessage = t('components.productPurchase.invalidAmount')
      } else {
        errorMessage = error.message
      }
    }
    
    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 4000
    })
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 页面初始化
onMounted(async () => {
  console.log('📱 ProductPurchase 页面初始化开始...')
  
  // 并行获取产品列表、VGAU余额和VGAU价格
  await Promise.all([
    fetchProducts(),
    fetchVGAUBalance(),
    fetchVGAUPrice()
  ])
  
  // 初始化完成后计算一次预估利息
  calculateEstimatedInterest()
  
  console.log('✅ ProductPurchase 页面初始化完成')
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
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* 顶部导航栏 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  height: 88rpx;
  padding-top: var(--status-bar-height, 0px);
  padding-left: 32rpx;
  padding-right: 32rpx;
  background-color: #0A0A0A;
  border-bottom: 1rpx solid #1A1A1A;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  margin-right: 24rpx;
}

.back-icon {
  width: 48rpx;
  height: 48rpx;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.title-text {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.header-buttons {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.header-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
}

.header-icon {
  width: 48rpx;
  height: 48rpx;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
  padding-top: 120rpx;
}

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
  flex: 1;
}

/* 产品选择区域 */
.product-selection {
  display: flex;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.product-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.product-card.active {
  background: rgba(255, 255, 255, 0.1);
  border-color: #FFA500;
}

.product-term {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.product-card.active .product-term {
  color: #FFA500;
}

.product-apy {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.product-card.active .product-apy {
  color: rgba(255, 165, 0, 0.8);
}

/* 加载状态卡片 */
.loading-card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 40rpx 24rpx;
  min-height: 120rpx;
}

.loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

/* 空状态卡片 */
.empty-card {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 40rpx 24rpx;
  min-height: 120rpx;
}

.empty-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

/* 产品详情栏 */
.product-detail-bar {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 32rpx;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.detail-title {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-button:active {
  transform: scale(0.9);
}

.close-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.detail-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 金额输入区域 */
.amount-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.amount-label {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-bottom: 16rpx;
}

.amount-input-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 12rpx;
}

.amount-input {
  flex: 1;
  font-size: 28rpx;
  color: #FFFFFF;
  background: transparent;
  border: none;
  outline: none;
}

.amount-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-suffix {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.currency-text {
  font-size: 28rpx;
  color: #FFA500;
  font-weight: 500;
}

.max-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
  padding: 8rpx 16rpx;
  cursor: pointer;
}

.max-text {
  font-size: 20rpx;
  color: #FFA500;
  font-weight: 500;
}

.available-balance {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  color: #FFA500;
  font-weight: 500;
}

.loading-text {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

/* 规则说明区域 */
.rules-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 600rpx;
}

/* 当显示Product Rules时，减少底部间距 */
.rules-section.product-rules-active {
  margin-bottom: 200rpx;
}

.rules-tabs {
  display: flex;
  margin-bottom: 24rpx;
  justify-content: flex-start;
  gap: 48rpx;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx 24rpx;
  cursor: pointer;
  position: relative;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2rpx;
  background: #FFA500;
}

.tab-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.tab.active .tab-text {
  color: #FFA500;
}

.rules-content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.rule-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.rule-section-title {
  font-size: 28rpx;
  color: #FFA500;
  font-weight: 500;
  margin-bottom: 8rpx;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 12rpx;
}

.rule-bullet {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 400;
  margin-top: 4rpx;
  flex-shrink: 0;
}

.rule-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 400;
  flex: 1;
  line-height: 1.5;
}

/* Transaction Rules 样式 */
.transaction-rule-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16rpx 0;
}

.transaction-rule-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.transaction-rule-value {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: right;
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

.confirm-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 400;
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
</style> 
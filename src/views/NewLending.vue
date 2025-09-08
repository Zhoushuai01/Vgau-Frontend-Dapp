<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('components.newLending.lending') }}</text>
      </view>
      <view class="history-button">
        <image class="history-icon" src="/static/history.png" mode="aspectFit" />
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
             <!-- 提示信息 -->
       <view class="notice-section">
         <view class="notice-content">
           <view class="info-button" @click="goToInfoPage">
             <text class="info-icon">!</text>
           </view>
           <text class="notice-text">{{ t('components.newLending.pledgedVGAUAssets') }}</text>
         </view>
       </view>

      <!-- 借贷参数区域 -->
      <!-- 借贷参数区域 -->
      <view class="parameters-section">
                 <view class="parameter-item">
           <text class="parameter-label">{{ t('components.newLending.collateralQuantity') }}</text>
          <view class="input-container">
            <input class="amount-input" 
                   type="number" 
                   :placeholder="t('components.newLending.enterCollateralAmount')" 
                   v-model="collateralAmount"
                   :adjust-position="false" />
            <view class="input-suffix">
              <text class="currency-text">VGAU</text>
              <view class="divider"></view>
              <text class="max-text" @click="setMaxCollateral">{{ t('components.newLending.max') }}</text>
            </view>
          </view>
                     <view class="available-balance">
             <text class="balance-label">{{ t('components.newLending.availableAssets') }}</text>
             <text class="balance-amount" :class="{ 'loading': isLoadingBalance }">
               {{ isLoadingBalance ? '加载中...' : `${vgauBalance} VGAU` }}
             </text>
           </view>
        </view>

                 <view class="parameter-item">
           <text class="parameter-label">{{ t('components.newLending.lendingAmount') }}</text>
          <view class="input-container">
            <input class="amount-input" 
                   type="number" 
                   :placeholder="t('components.newLending.enterBorrowAmount')" 
                   v-model="borrowAmount"
                   :adjust-position="false" />
                         <view class="input-suffix">
               <text class="currency-text-white">USDT</text>
             </view>
                     </view>
                    <view class="available-balance">
            <text class="balance-label">{{ t('components.newLending.borrowRange') }}</text>
            <text class="balance-amount">{{ `${minBorrowAmount} - ${maxBorrowAmount} USDT` }}</text>
          </view>
         </view>
      </view>

             <!-- 借贷详情区域 -->
       <view class="details-section">
         <!-- 第一部分：抵押和清算相关比率 -->
         <view class="details-part">
                       <view class="detail-item">
              <text class="detail-label">{{ t('components.newLending.liquidationInsuranceFee') }}</text>
              <text class="detail-value">{{ formatPercentage(loanConfig.insuranceFeeRate) }}</text>
            </view>
            
            <view class="detail-item">
              <text class="detail-label">{{ t('components.newLending.initialCollateralRatio') }}</text>
              <text class="detail-value">{{ loanConfig.maxLtvRatio }}</text>
            </view>
            
            <view class="detail-item">
              <text class="detail-label">{{ t('components.newLending.additionalMargin') }}</text>
              <text class="detail-value">{{ loanConfig.riskThresholdLevel2 }}</text>
            </view>
            
            <view class="detail-item">
              <text class="detail-label">{{ t('components.newLending.forcedLiquidationCollateralRatio') }}</text>
              <text class="detail-value">{{ loanConfig.riskThresholdLiquidation }}</text>
            </view>
         </view>
         
         <!-- 分割线 -->
         <view class="divider-line"></view>
         
         <!-- 第二部分：利率和参考价格 -->
         <view class="details-part">
                       <view class="detail-item">
              <text class="detail-label">{{ t('components.newLending.annualInterestRate') }}</text>
              <text class="detail-value">{{ loanConfig.annualRate }}</text>
            </view>
           
           
           
           <view class="detail-item">
             <text class="detail-label">{{ t('components.newLending.liquidationReferencePrice') }}</text>
             <text class="detail-value">0 兑</text>
           </view>
         </view>
       </view>

             <!-- 确认按钮 -->
       <view class="confirm-section">
         <view class="confirm-btn" @click="confirmLending">
           <text class="confirm-text">{{ t('components.newLending.confirmLending') }}</text>
         </view>
       </view>
     </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { userFundsAPI, loanAPI } from '@/api/apiService'
import contractExchange from '@/utils/contractExchange.js'

const { t } = useI18n()

// 响应式数据
const collateralAmount = ref('')
const borrowAmount = ref('')
const vgauBalance = ref('0')
const isLoadingBalance = ref(false)

// 借贷配置数据
const loanConfig = ref({
  maxLtvRatio: '78%',        // 初始抵押比率
  minLtvRatio: '60%',        // 最小抵押比率（新增）
  riskThresholdLevel2: '88%',    // 追加保证金
  riskThresholdLiquidation: '85%',    // 强制清算抵押比率
  insuranceFeeRate: '2%',    // 清算保险费率
  annualRate: '8.18%'         // 净年化利率
})
const isLoadingConfig = ref(false)

// 抵押对应USDT价值与可借范围
const collateralUsdtValue = ref('0')
const minBorrowAmount = ref('0')
const maxBorrowAmount = ref('0')

// 计算可借金额（基于抵押品数量）
const calculatedBorrowAmount = computed(() => {
  if (!collateralAmount.value || isNaN(collateralAmount.value)) {
    return ''
  }
  const collateral = parseFloat(collateralAmount.value)
  // 假设抵押率为80%，即1 VGAU可以借0.8 USDT
  return (collateral * 0.8).toFixed(2)
})

// 监听抵押品数量变化，自动计算可借金额
const handleCollateralChange = () => {
  if (collateralAmount.value && !isNaN(collateralAmount.value)) {
    borrowAmount.value = calculatedBorrowAmount.value
  }
}

// 计算并更新抵押对应USDT价值与可借范围（基于合约价格，按克计价）
const updateBorrowRange = async () => {
  try {
    const collateral = parseFloat(String(collateralAmount.value).replace(/,/g, ''))
    if (!collateral || isNaN(collateral) || collateral <= 0) {
      collateralUsdtValue.value = '0'
      minBorrowAmount.value = '0'
      maxBorrowAmount.value = '0'
      return
    }

    // 从合约计算该VGAU数量对应的USDT价值（已考虑精度）
    const required = await contractExchange.getRequiredUSDT(collateral)
    const usdtValue = Number(required.formatted) || 0
    collateralUsdtValue.value = usdtValue.toFixed(2)

    const minRatio = parsePercentToDecimal(loanConfig.value.minLtvRatio)
    const maxRatio = parsePercentToDecimal(loanConfig.value.maxLtvRatio)

    const minV = (usdtValue * minRatio)
    const maxV = (usdtValue * maxRatio)

    minBorrowAmount.value = minV.toFixed(2)
    maxBorrowAmount.value = maxV.toFixed(2)

    // 若当前输入借款额不在范围内，则夹紧到区间
    if (borrowAmount.value) {
      const cur = parseFloat(String(borrowAmount.value).replace(/,/g, ''))
      if (!isNaN(cur)) {
        if (cur < minV) borrowAmount.value = minBorrowAmount.value
        if (cur > maxV) borrowAmount.value = maxBorrowAmount.value
      }
    }
  } catch (e) {
    console.error('❌ 更新借款范围失败:', e)
  }
}

// 监听抵押数量变化，实时刷新范围
watch(collateralAmount, () => {
  updateBorrowRange()
})

// 借款金额输入强校验：必须在[min,max]区间
watch(borrowAmount, (val) => {
  if (!val) return
  const cur = parseFloat(String(val).replace(/,/g, ''))
  const minV = parseFloat(minBorrowAmount.value)
  const maxV = parseFloat(maxBorrowAmount.value)
  if (isNaN(cur) || isNaN(minV) || isNaN(maxV) || minV === 0 && maxV === 0) return
  if (cur < minV || cur > maxV) {
    uni.showToast({ title: `借款范围 ${minV.toFixed(2)} - ${maxV.toFixed(2)} USDT`, icon: 'none', duration: 2000 })
    // 自动夹紧
    if (cur < minV) borrowAmount.value = minBorrowAmount.value
    if (cur > maxV) borrowAmount.value = maxBorrowAmount.value
  }
})



// 将百分比值解析为小数（支持 '8.18%' 或 0.0818 或 '0.0818'）
const parsePercentToDecimal = (value) => {
  if (value === undefined || value === null) return 0
  if (typeof value === 'number') {
    return value > 1 ? value / 100 : value
  }
  const s = String(value).trim()
  if (s.endsWith('%')) {
    const num = parseFloat(s.slice(0, -1))
    return isNaN(num) ? 0 : num / 100
  }
  const num = parseFloat(s)
  if (isNaN(num)) return 0
  return num > 1 ? num / 100 : num
}

// 将小数格式化为百分比显示（去掉不必要的小数零）
const formatPercentage = (value) => {
  if (value === undefined || value === null) return '--'
  if (typeof value === 'number') {
    const percentage = value * 100
    // 去掉不必要的小数零
    return `${parseFloat(percentage.toFixed(2))}%`
  }
  const s = String(value).trim()
  if (s.endsWith('%')) {
    return s
  }
  const num = parseFloat(s)
  if (isNaN(num)) return '--'
  const percentage = num * 100
  // 去掉不必要的小数零
  return `${parseFloat(percentage.toFixed(2))}%`
}

// 获取借贷配置
const fetchLoanConfig = async () => {
  try {
    isLoadingConfig.value = true
    console.log('📡 开始获取借贷配置...')
    
    const response = await loanAPI.getConfig()
    console.log('📡 借贷配置接口响应:', response)
    
    if (response && response.success && response.data) {
      // 更新借贷配置
      loanConfig.value = {
        maxLtvRatio: formatPercentage(response.data.maxLtvRatio) || '78%',
        minLtvRatio: formatPercentage(response.data.minLtvRatio) || '60%',
        riskThresholdLevel2: formatPercentage(response.data.riskThresholdLevel2) || '88%',
        riskThresholdLiquidation: formatPercentage(response.data.riskThresholdLiquidation) || '85%',
        insuranceFeeRate: response.data.insuranceFeeRate || '0.0200', // 保险费率，保持原始小数格式
        annualRate: formatPercentage(response.data.annualRate) || '8.18%'
      }
      console.log('✅ 借贷配置获取成功:', loanConfig.value)
      console.log('🔍 保险费率详情:', {
        原始值: response.data.insuranceFeeRate,
        处理后值: loanConfig.value.insuranceFeeRate,
        转换后小数: parsePercentToDecimal(loanConfig.value.insuranceFeeRate)
      })
    } else {
      console.warn('⚠️ 借贷配置接口返回异常:', response)
    }
  } catch (error) {
    console.error('❌ 获取借贷配置失败:', error)
    // 保持默认值，不显示错误提示
  } finally {
    isLoadingConfig.value = false
  }
}

// 获取用户VGAU余额
const fetchVGAUBalance = async () => {
  try {
    isLoadingBalance.value = true
    console.log('📡 开始获取用户VGAU余额...')
    
         const response = await userFundsAPI.getBalances()
     console.log('📡 VGAU余额接口响应:', response)
     console.log('🔍 响应数据结构:', {
       success: response?.success,
       message: response?.message,
       dataLength: response?.data?.length,
       dataKeys: response?.data?.[0] ? Object.keys(response.data[0]) : [],
       firstItem: response?.data?.[0]
     })
    
         if (response && response.success && response.data) {
       // 查找VGAU余额
       const vgauData = response.data.find(balance => 
         balance.currency && balance.currency.toUpperCase() === 'VGAU'
       )
       
       console.log('🔍 找到的VGAU数据:', vgauData)
       
       if (vgauData && vgauData.availableAmount !== undefined) {
         vgauBalance.value = formatNumber(vgauData.availableAmount)
         console.log('✅ VGAU余额获取成功:', vgauBalance.value)
       } else {
         console.warn('⚠️ 未找到VGAU余额数据或availableAmount字段')
         console.log('🔍 VGAU数据详情:', vgauData)
         vgauBalance.value = '0'
       }
    } else {
      console.warn('⚠️ VGAU余额接口返回异常:', response)
      vgauBalance.value = '0'
    }
  } catch (error) {
    console.error('❌ 获取VGAU余额失败:', error)
    vgauBalance.value = '0'
    
    // 显示错误提示
    uni.showToast({
      title: '获取余额失败，请稍后重试',
      icon: 'none',
      duration: 2000
    })
  } finally {
    isLoadingBalance.value = false
  }
}

// 格式化数字显示
const formatNumber = (number) => {
  if (typeof number === 'string') {
    number = parseFloat(number)
  }
  
  if (isNaN(number)) {
    return '0'
  }
  
  // 如果数字很大，使用千分位分隔符
  if (number >= 1000) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    })
  }
  
  return number.toFixed(2)
}

// 设置最大抵押品数量
const setMaxCollateral = () => {
  if (vgauBalance.value && vgauBalance.value !== '0') {
    collateralAmount.value = vgauBalance.value.replace(/,/g, '')
    handleCollateralChange()
  } else {
    uni.showToast({
      title: '请先获取余额信息',
      icon: 'none',
      duration: 2000
    })
  }
}

// 前往信息页面
const goToInfoPage = () => {
  uni.navigateTo({
    url: '/views/InfoPage'
  })
}

// 确认借贷
const confirmLending = async () => {
  if (!collateralAmount.value || parseFloat(collateralAmount.value) <= 0) {
    uni.showToast({
      title: t('common.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  if (!borrowAmount.value || parseFloat(borrowAmount.value) <= 0) {
    uni.showToast({
      title: t('components.newLending.pleaseEnterBorrowAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }

  try {
    uni.showLoading({ title: '提交中...' })

    const collateralInStd = parseFloat(String(collateralAmount.value).replace(/,/g, ''))
    const loanAmt = parseFloat(String(borrowAmount.value).replace(/,/g, ''))

    // 提交前校验借款额必须在[min,max]区间
    const minV = parseFloat(minBorrowAmount.value) || 0
    const maxV = parseFloat(maxBorrowAmount.value) || 0
    if (minV > 0 && maxV > 0 && (loanAmt < minV || loanAmt > maxV)) {
      uni.hideLoading()
      uni.showToast({ title: `借款范围 ${minV.toFixed(2)} - ${maxV.toFixed(2)} USDT`, icon: 'none', duration: 2000 })
      return
    }

    const body = {
      collateralAmount: collateralInStd,        // 输入的VGAU数量
      loanAmount: loanAmt                      // 可借USDT金额
    }

    console.log('📝 创建借贷订单参数:', body)
    console.log('🔍 参数详情:', {
      collateralAmount: `${collateralInStd} VGAU`,
      loanAmount: `${loanAmt} USDT`
    })
    
    const resp = await loanAPI.createOrder(body)
    console.log('✅ 创建借贷订单响应:', resp)

    if (resp && resp.success) {
      uni.showToast({ title: '创建成功', icon: 'success', duration: 1500 })
      // 立即跳转到DeFi页面
      console.log('🚀 准备跳转到DeFi页面...')
      
      // 使用setTimeout确保Toast显示后再跳转
      setTimeout(() => {
        // 先返回到上一页，然后跳转到DeFi
        uni.navigateBack({
          success: () => {
            console.log('✅ 返回上一页成功，准备跳转到DeFi')
            // 延迟一下再跳转
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/Defi',
                success: () => {
                  console.log('✅ 跳转到DeFi页面成功')
                },
                fail: (err) => {
                  console.error('❌ 跳转到DeFi页面失败:', err)
                }
              })
            }, 100)
          },
          fail: (err) => {
            console.error('❌ 返回上一页失败:', err)
            // 如果返回失败，直接尝试跳转
            uni.switchTab({
              url: '/pages/Defi',
              success: () => {
                console.log('✅ 直接跳转到DeFi页面成功')
              },
              fail: (err2) => {
                console.error('❌ 直接跳转也失败:', err2)
              }
            })
          }
        })
      }, 100)
    } else {
      uni.showToast({ title: resp?.message || '创建失败', icon: 'none', duration: 2000 })
    }
  } catch (e) {
    console.error('❌ 创建借贷订单异常:', e)
    uni.showToast({ title: '创建失败，请稍后重试', icon: 'none', duration: 2000 })
  } finally {
    uni.hideLoading()
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 页面加载时获取VGAU余额和借贷配置
onMounted(() => {
  console.log('🚀 NewLending页面加载完成，开始获取数据...')
  fetchVGAUBalance()
  fetchLoanConfig()
  // 初始化一次范围
  updateBorrowRange()
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
  display: flex;
  flex-direction: column;
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

.history-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48rpx;
  height: 48rpx;
}

.history-icon {
  width: 48rpx;
  height: 48rpx;
}

.page-title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-text {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 提示信息区域 */
.notice-section {
  margin-bottom: 16rpx;
}

.notice-content {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.info-button {
  width: 32rpx;
  height: 32rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.info-button:active {
  transform: scale(0.95);
}

.info-icon {
  font-size: 20rpx;
  color: #000000;
  font-weight: bold;
}

.notice-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.4;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 32rpx;
  gap: 32rpx;
  padding-top: 120rpx;
}



/* 借贷参数区域 */
.parameters-section {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.parameter-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.parameter-label {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.input-container {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
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

.currency-text-white {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.divider {
  width: 1rpx;
  height: 28rpx;
  background: #FFA500;
  margin: 0 4rpx;
}

.max-text {
  font-size: 28rpx;
  color: #FFA500;
  font-weight: 500;
  cursor: pointer;
}

.available-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-label {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.balance-amount.loading {
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
}



/* 借贷详情区域 */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.details-part {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.divider-line {
  height: 1rpx;
  background: rgba(255, 255, 255, 0.1);
  margin: 8rpx 0;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  text-align: right;
}

/* 确认按钮区域 */
.confirm-section {
  padding: 32rpx 0;
  margin-top: auto;
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
  font-weight: 500;
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
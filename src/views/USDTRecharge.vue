<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
             <view class="page-title">
         <image class="title-icon" src="/static/USDT.png" mode="aspectFit" />
                   <text class="title-text">{{ $t('rechargePage.usdtRecharge') }}</text>
       </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 数量输入区域 -->
      <view class="input-section">
                 <view class="input-label">
           <text class="label-text">{{ $t('rechargePage.amount') }}</text>
         </view>
        
                 <view class="input-container">
           <view class="input-field">
             <view class="input-border">
                               <view class="input-left">
                                     <input 
                     class="input-field-text" 
                     type="number" 
                     :placeholder="$t('rechargePage.minimumAmount')" 
                     placeholder-style="color: rgba(255, 255, 255, 0.2); font-size: 32rpx;"
                     v-model="inputAmount"
                   />
                </view>
                               <view class="input-currency">
                  <text class="currency-text">USDT |{{ $t('rechargePage.max') }}</text>
                </view>
             </view>
           </view>
          
                     <view class="balance-info">
             <view class="balance-label">
               <text class="balance-text">{{ $t('rechargePage.availableBalance') }}</text>
             </view>
             <view class="balance-amount">
               <text class="amount-text">{{ usdtBalance }} USDT</text>
             </view>
           </view>
          
          <view class="divider"></view>
        </view>
      </view>



      <!-- 确认按钮 -->
      <view class="confirm-section">
                 <view class="confirm-button" :class="{ disabled: isLoading }" @click="handleConfirm">
           <text class="confirm-text">{{ isLoading ? $t('rechargePage.processing') : $t('rechargePage.confirm') }}</text>
         </view>
      </view>

      <!-- 自定义确认弹窗（半透明白色、i18n） -->
      <view v-if="showConfirmModal" class="modal-overlay" @click="showConfirmModal = false">
        <view class="modal-content" @click.stop>
          <view class="modal-text">
            <text class="recharge-title">{{ t('recharge.modal.title') }}</text>
            <text class="recharge-desc">{{ t('recharge.modal.content', { amount: pendingAmount, symbol: 'USDT' }) }}</text>
          </view>
          <view class="modal-actions">
            <view class="modal-btn outline" @click="showConfirmModal = false">{{ t('recharge.modal.cancel') }}</view>
            <view class="modal-btn solid" :class="{ disabled: isLoading }" @click="onConfirmModal">{{ t('recharge.modal.confirm') }}</view>
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
import { defiAPI } from '@/api/apiService.js'
import web3Service from '@/utils/web3.js'

// 响应式数据
const inputAmount = ref('')
const usdtBalance = ref('0.000000')
const isLoading = ref(false)
const walletAddress = ref('')
const showConfirmModal = ref(false)
const pendingAmount = ref('')
const { t } = useI18n()

// 生成幂等键（UUID格式）- 强制更新版本
const generateIdempotencyKey = () => {
  console.log('🔧 使用新的UUID生成函数')
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  console.log('🔑 生成的UUID:', uuid)
  return uuid
}

// 页面加载时初始化
onMounted(async () => {
  try {
    // 测试API服务
    console.log('🧪 测试API服务:', defiAPI)
    
    await initContractService()
    await loadUserData()
  } catch (error) {
    console.error('页面初始化失败:', error)
  }
})

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
    // 获取USDT余额
    const balance = await contractService.getUSDTBalance()
    usdtBalance.value = balance.formatted
    
    // 获取网络信息
    const networkInfo = await contractService.getNetworkInfo()
    walletAddress.value = networkInfo.currentAccount
    
    console.log('✅ 用户数据加载成功')
  } catch (error) {
    console.error('❌ 用户数据加载失败:', error)
  }
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 确认充值操作
const handleConfirm = async () => {
  if (!inputAmount.value || parseFloat(inputAmount.value) <= 0) {
    uni.showToast({
      title: t('rechargePage.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }

  const amount = parseFloat(inputAmount.value)
  
  try {
    isLoading.value = true
    // 打开自定义确认弹窗
    pendingAmount.value = amount.toString()
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
const executeRecharge = async (amount) => {
  try {
    isLoading.value = true
    
    uni.showLoading({
      title: t('recharge.loading'),
      mask: true
    })
    
    // 执行完整的USDT充值流程（授权+充值）
    const result = await contractService.completeUSDTRecharge(amount)
    
    if (result && result.transactionHash) {
      console.log('✅ 充值交易成功，开始创建订单...')
      
      try {
        // 获取网络信息
        const networkInfo = await contractService.getNetworkInfo()
        console.log('🌐 网络信息:', networkInfo)
        
        // 处理chainId的BigInt问题
        const chainIdNumber = typeof networkInfo.chainId === 'bigint' 
          ? Number(networkInfo.chainId) 
          : networkInfo.chainId
        console.log('🔢 chainId处理:', {
          original: networkInfo.chainId,
          type: typeof networkInfo.chainId,
          converted: chainIdNumber,
          convertedType: typeof chainIdNumber
        })
        
        // 生成幂等键
        const idempotencyKey = generateIdempotencyKey()
        console.log('🔑 生成的幂等键:', idempotencyKey)
        
        // 准备订单数据
        const orderData = {
          txHash: result.transactionHash,
          currency: 'USDT', // 币种字段
          amountRaw: parseFloat(amount), // 直接传number数字类型
          fromAddress: networkInfo.currentAccount,
          chainId: chainIdNumber, // 使用处理过的chainId
          idempotencyKey: idempotencyKey // 使用生成的幂等键
        }
        
        console.log('📋 订单数据:', orderData)
        console.log('📋 订单数据JSON:', JSON.stringify(orderData, null, 2))
        console.log('📋 订单数据类型检查:', {
          txHash: typeof orderData.txHash,
          tokenType: typeof orderData.tokenType,
          amountRaw: typeof orderData.amountRaw,
          fromAddress: typeof orderData.fromAddress,
          chainId: typeof orderData.chainId,
          idempotencyKey: typeof orderData.idempotencyKey
        })
        
        // 检查数据是否有问题
        Object.keys(orderData).forEach(key => {
          const value = orderData[key]
          if (value === null || value === undefined) {
            console.error(`❌ 字段 ${key} 的值为空:`, value)
          }
          if (typeof value === 'object' && value !== null) {
            console.error(`❌ 字段 ${key} 是对象类型:`, value)
          }
        })
        
        // 验证订单数据
        if (!orderData.txHash || !orderData.fromAddress || !orderData.chainId) {
          throw new Error('订单数据不完整')
        }
        
        // 调用后端接口创建订单
        console.log('🚀 开始调用后端接口...')
        const orderResult = await defiAPI.createDepositOrder(orderData)
        console.log('✅ 订单创建成功:', orderResult)
        
        uni.showToast({
          title: t('rechargePage.rechargeSuccess'),
          icon: 'success',
          duration: 3000
        })
        
        // 刷新余额
        await loadUserData()
        
        // 清空输入
        inputAmount.value = ''
        
        // 立即返回上一页
        uni.navigateBack()
        
      } catch (orderError) {
        console.error('❌ 创建订单失败:', orderError)
        
        // 即使订单创建失败，充值交易已经成功，仍然显示成功消息
        uni.showToast({
          title: t('rechargePage.rechargeSuccess'),
          icon: 'success',
          duration: 3000
        })
        
        // 刷新余额
        await loadUserData()
        
        // 清空输入
        inputAmount.value = ''
        
        // 立即返回上一页
        uni.navigateBack()
      }
    }
  } catch (error) {
    console.error('❌ 充值执行失败:', error)
    
    let errorMessage = t('rechargePage.rechargeFailed')
    if (error.message.includes('insufficient funds')) {
      errorMessage = t('rechargePage.insufficientFunds')
    } else if (error.message.includes('user rejected')) {
      errorMessage = t('rechargePage.userRejected')
    } else if (error.message.includes('gas')) {
      errorMessage = t('rechargePage.gasInsufficient')
    }
    
    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 3000
    })
  } finally {
    uni.hideLoading()
    isLoading.value = false
  }
}

// 弹窗确认执行
const onConfirmModal = async () => {
  const amount = pendingAmount.value
  showConfirmModal.value = false
  await executeRecharge(amount)
}
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
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.header {
  display: flex;
  align-items: center;
  height: 88rpx;
  padding: 0 32rpx;
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
  gap: 16rpx;
}

.title-icon {
  width: 48rpx;
  height: 48rpx;
}

.title-text {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 400;
}

/* 主要内容区域 */
.main-content {
  display: flex;
  flex-direction: column;
  padding: 32rpx;
  flex: 1;
}

/* 输入区域 */
.input-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 48rpx;
}

.input-label {
  display: flex;
  align-items: center;
  height: 40rpx;
  margin-bottom: 16rpx;
}

.label-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.input-field {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-border {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 112rpx;
  background-color: #1A1A1A;
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  padding: 0 32rpx;
}

.input-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.input-field-text {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.input-currency {
  display: flex;
  align-items: center;
}

.currency-text {
  font-size: 32rpx;
  color: #FFA500;
  font-weight: 400;
}

.balance-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40rpx;
}

.balance-label {
  display: flex;
  align-items: center;
}

.balance-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  display: flex;
  align-items: center;
}

.amount-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.divider {
  width: 100%;
  height: 2rpx;
  background-color: #1A1A1A;
}

/* 赎回至区域 */
.redeem-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 168rpx;
  margin-bottom: 48rpx;
}

.redeem-label {
  display: flex;
  align-items: center;
}

.redeem-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.wallet-info {
  display: flex;
  align-items: center;
}

.wallet-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
  text-align: right;
}

/* 确认按钮区域 */
.confirm-section {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 32rpx;
}

.confirm-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 96rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 16rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-button:active {
  transform: scale(0.98);
}

.confirm-button.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.confirm-button.disabled:active {
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
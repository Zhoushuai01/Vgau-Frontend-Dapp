<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
             <view class="page-title">
         <image class="title-icon" src="/static/USDT.png" mode="aspectFit" />
                   <text class="title-text">USDT Recharge</text>
       </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 数量输入区域 -->
      <view class="input-section">
                 <view class="input-label">
           <text class="label-text">Amount</text>
         </view>
        
                 <view class="input-container">
           <view class="input-field">
             <view class="input-border">
                               <view class="input-left">
                                     <input 
                     class="input-field-text" 
                     type="number" 
                     placeholder="Minimum 0" 
                     placeholder-style="color: rgba(255, 255, 255, 0.2); font-size: 32rpx;"
                     v-model="inputAmount"
                   />
                </view>
                               <view class="input-currency">
                  <text class="currency-text">USDT |Max</text>
                </view>
             </view>
           </view>
          
                     <view class="balance-info">
             <view class="balance-label">
               <text class="balance-text">Available Balance</text>
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
           <text class="confirm-text">{{ isLoading ? 'Processing...' : 'Confirm' }}</text>
         </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import contractService from '@/utils/contractService.js'

// 响应式数据
const inputAmount = ref('')
const usdtBalance = ref('0.000000')
const isLoading = ref(false)
const walletAddress = ref('')

// 页面加载时初始化
onMounted(async () => {
  try {
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
      title: '合约服务初始化失败',
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
      title: '请输入有效的充值金额',
      icon: 'none',
      duration: 2000
    })
    return
  }

  const amount = parseFloat(inputAmount.value)
  
  try {
    isLoading.value = true
    
    // 显示确认弹窗
    uni.showModal({
      title: '确认充值',
      content: `确定要充值 ${amount} USDT 吗？`,
      confirmText: '确认',
      cancelText: '取消',
      success: async (res) => {
        if (res.confirm) {
          await executeRecharge(amount)
        }
      }
    })
  } catch (error) {
    console.error('充值操作失败:', error)
    uni.showToast({
      title: '充值操作失败',
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
      title: '正在充值...',
      mask: true
    })
    
    // 执行完整的USDT充值流程（授权+充值）
    const result = await contractService.completeUSDTRecharge(amount)
    
    uni.hideLoading()
    
    if (result && result.transactionHash) {
      uni.showToast({
        title: '充值成功！',
        icon: 'success',
        duration: 3000
      })
      
      // 刷新余额
      await loadUserData()
      
      // 清空输入
      inputAmount.value = ''
      
      // 延迟返回上一页
      setTimeout(() => {
        uni.navigateBack()
      }, 2000)
    }
  } catch (error) {
    uni.hideLoading()
    console.error('❌ 充值执行失败:', error)
    
    let errorMessage = '充值失败'
    if (error.message.includes('insufficient funds')) {
      errorMessage = '余额不足'
    } else if (error.message.includes('user rejected')) {
      errorMessage = '用户取消操作'
    } else if (error.message.includes('gas')) {
      errorMessage = 'Gas费用不足'
    }
    
    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 3000
    })
  } finally {
    isLoading.value = false
  }
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
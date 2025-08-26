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
           <view class="title">VGAU Recharge</view>
         </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 数量输入区域 -->
        <view class="amount-section">
          <view class="section-title">Amount</view>
          <view class="input-container">
            <view class="input-field">
              <input 
                class="amount-input" 
                type="number" 
                placeholder="Minimum 0" 
                v-model="amount"
                @input="handleAmountInput"
              />
              <view class="currency-label">VGAU |Max</view>
            </view>
            <view class="divider"></view>
            <view class="redeemable-info">
              <text class="redeemable-label">Redeemable</text>
              <text class="redeemable-amount">{{ vgauBalance }} VGAU</text>
            </view>
          </view>
        </view>


      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" :class="{ disabled: isLoading }" @click="confirmRecharge">
          <text class="confirm-text">{{ isLoading ? 'Processing...' : 'Confirm Operation' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import contractService from '@/utils/contractService.js'
  
  // 响应式数据
  const amount = ref('')
  const vgauBalance = ref('0.000000')
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
      // 获取VGAU余额
      const balance = await contractService.getVGAUBalance()
      vgauBalance.value = balance.formatted
      
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
  
  // 处理金额输入
  const handleAmountInput = (e) => {
    amount.value = e.detail.value
  }
  
  // 确认充值
  const confirmRecharge = async () => {
    if (!amount.value || parseFloat(amount.value) <= 0) {
      uni.showToast({
        title: '请输入有效的充值金额',
        icon: 'none',
        duration: 2000
      })
      return
    }
    
    const rechargeAmount = parseFloat(amount.value)
    
    try {
      isLoading.value = true
      
      // 显示确认弹窗
      uni.showModal({
        title: '确认充值',
        content: `确定要充值 ${rechargeAmount} VGAU 吗？`,
        confirmText: '确认',
        cancelText: '取消',
        success: async (res) => {
          if (res.confirm) {
            await executeRecharge(rechargeAmount)
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
  const executeRecharge = async (rechargeAmount) => {
    try {
      isLoading.value = true
      
      uni.showLoading({
        title: '正在充值...',
        mask: true
      })
      
      // 执行完整的VGAU充值流程（授权+充值）
      const result = await contractService.completeVGAURecharge(rechargeAmount)
      
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
        amount.value = ''
        
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

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 80rpx 24rpx 0 24rpx;
  }
  
  .section-title {
    margin-bottom: 48rpx;
  }
}
</style> 
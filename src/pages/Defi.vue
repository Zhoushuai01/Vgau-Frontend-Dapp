<template>
  <view class="content">
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
          <text class="rate-label">Exchange Rate</text>
          <text class="rate-value">1 VGAU=123.4561 USDT</text>
        </view>
      </view>

      <!-- 余额区域 -->
      <view class="balance-section">
        <text class="balance-label">Balance</text>
        <view class="balance-divider"></view>
        
        <!-- VGAU余额 -->
        <view class="balance-item">
          <view class="balance-header">
            <text class="currency-label">VGAU</text>
          </view>
          <text class="balance-amount">48,456,156</text>
        </view>
        
        <!-- USDT余额 -->
        <view class="balance-item">
          <view class="balance-header">
            <text class="currency-label">USDT</text>
          </view>
          <text class="balance-amount">111.41</text>
        </view>
        
        <view class="balance-divider"></view>
      </view>

      <!-- 收益信息区域 -->
      <view class="yield-section">
        <view class="yield-card">
          <view class="yield-info">
            <view class="yield-item">
              <text class="yield-label">Current APR</text>
              <text class="yield-value">1%</text>
            </view>
            <view class="yield-divider"></view>
            <view class="yield-item">
              <text class="yield-label">Pending</text>
              <text class="yield-value">1231.00</text>
            </view>
          </view>
          <view class="claim-button">
            <text class="claim-text">Claim</text>
          </view>
        </view>
      </view>

      <!-- 操作按钮区域 -->
      <view class="action-section">
        <view class="action-btn primary" @click="handleRecharge">
          <text class="btn-text">Deposit</text>
        </view>
        <view class="action-btn secondary" @click="handleWithdraw">
          <text class="btn-text">Withdraw</text>
        </view>
        
        <view class="action-buttons">
          <view class="action-btn outline" @click="handleFinance">
            <text class="btn-text">Finance</text>
          </view>
          <view class="action-btn outline" @click="handleLending">
            <text class="btn-text">Lending</text>
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
          <text class="modal-title">{{ 
            currentAction === 'deposit' ? 'Deposit' : 
            currentAction === 'withdraw' ? 'Withdraw' : 
            currentAction === 'finance' ? 'Finance' : 
            currentAction === 'lending' ? 'Lending' : 'Action'
          }}</text>
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
              <text class="currency-name">My Finance</text>
            </view>
            
            <!-- 产品申购选择 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'ProductPurchase' }" @click="selectCurrency('ProductPurchase')">
              <view class="currency-icon">
                <image class="purchase-icon" src="/static/DiFi/shengou.png" mode="aspectFit" />
              </view>
              <text class="currency-name">Product Purchase</text>
            </view>
          </template>
          
          <template v-else-if="currentAction === 'lending'">
            <!-- 借币订单选项 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'BorrowOrder' }" @click="selectCurrency('BorrowOrder')">
              <view class="currency-icon">
                <image class="borrow-icon" src="/static/DiFi/jiebi.png" mode="aspectFit" />
              </view>
              <text class="currency-name">Borrow Order</text>
            </view>
            
            <!-- 新的借贷选项 -->
            <view class="currency-option" :class="{ active: selectedCurrency === 'NewLending' }" @click="selectCurrency('NewLending')">
              <view class="currency-icon">
                <image class="lending-icon" src="/static/DiFi/jiedai.png" mode="aspectFit" />
              </view>
              <text class="currency-name">New Lending</text>
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
  </view>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
 
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
  const selectedCurrency = ref('USDT')
  const currentAction = ref('deposit') // 'deposit' 或 'withdraw'
  
  // 操作按钮事件处理
  const handleRecharge = () => {
    currentAction.value = 'deposit'
    showDepositModal.value = true
  }
  
  const handleWithdraw = () => {
    currentAction.value = 'withdraw'
    showDepositModal.value = true
  }
  
  const handleFinance = () => {
    currentAction.value = 'finance'
    showDepositModal.value = true
  }
  
  const handleLending = () => {
    currentAction.value = 'lending'
    showDepositModal.value = true
  }
  
  // 弹窗相关方法
  const closeDepositModal = () => {
    showDepositModal.value = false
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
  
  onMounted(() => {
    console.log('DeFi页面加载完成')
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

.main-content {
  display: flex;
  flex-direction: column;
  padding: 32rpx;
  padding-top: 80rpx !important;
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
  background: linear-gradient(90deg, rgba(100, 100, 100, 1) 0%, rgba(255, 255, 255, 1) 100%);
  border-radius: 16rpx;
  padding: 32rpx;
  position: relative;
}

.yield-card::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2rpx;
  height: 90rpx;
  background: rgba(255, 255, 255, 0.1);
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
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  margin-bottom: 8rpx;
}

.yield-value {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 400;
}

.yield-divider {
  width: 2rpx;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
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


</style> 
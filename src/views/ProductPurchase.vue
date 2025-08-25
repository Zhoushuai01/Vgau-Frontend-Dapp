<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">Product Purchase</text>
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
          <view class="product-card active" @click="selectProduct('10days')">
            <text class="product-term">10 Days</text>
            <text class="product-apy">APY 5%</text>
          </view>
          <view class="product-card" @click="selectProduct('30days')">
            <text class="product-term">30 Days</text>
            <text class="product-apy">APY 8%</text>
          </view>
          <view class="product-card" @click="selectProduct('90days')">
            <text class="product-term">90 Days</text>
            <text class="product-apy">APY 12%</text>
          </view>
        </view>

        <!-- 产品详情栏 -->
        <view class="product-detail-bar" v-if="showProductDetail">
          <view class="detail-header">
            <text class="detail-title">{{ selectedProduct }} Product Details</text>
            <view class="close-button" @click="closeProductDetail">
              <text class="close-text">×</text>
            </view>
          </view>
          <view class="detail-content">
            <view class="detail-item">
              <text class="detail-label">Term:</text>
              <text class="detail-value">{{ getProductTerm(selectedProduct) }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">APY:</text>
              <text class="detail-value">{{ getProductAPY(selectedProduct) }}</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Min Amount:</text>
              <text class="detail-value">100 VGAU</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Max Amount:</text>
              <text class="detail-value">10,000 VGAU</text>
            </view>
            <view class="detail-item">
              <text class="detail-label">Risk Level:</text>
              <text class="detail-value">Low</text>
            </view>
          </view>
        </view>

        <!-- 金额输入区域 -->
        <view class="amount-section">
          <text class="amount-label">Amount</text>
          <view class="amount-input-container">
            <input class="amount-input" 
                   type="number" 
                   placeholder="Enter staking amount" 
                   v-model="stakingAmount"
                   :adjust-position="false" />
            <view class="input-suffix">
              <text class="currency-text">VGAU</text>
              <view class="max-button" @click="setMaxAmount">
                <text class="max-text">MAX</text>
              </view>
            </view>
          </view>
          <text class="available-balance">Available <text class="balance-amount">0</text> VGAU</text>
        </view>

        <!-- 规则说明区域 -->
        <view class="rules-section" :class="{ 'product-rules-active': currentTab === 'product' }">
          <view class="rules-tabs">
            <view class="tab" :class="{ active: currentTab === 'transaction' }" @click="switchTab('transaction')">
              <text class="tab-text">Transaction Rules</text>
            </view>
            <view class="tab" :class="{ active: currentTab === 'product' }" @click="switchTab('product')">
              <text class="tab-text">Product Rules</text>
            </view>
          </view>
          
          <view class="rules-content" v-if="currentTab === 'transaction'">
            <view class="transaction-rule-item">
              <text class="transaction-rule-label">Purchase time</text>
              <text class="transaction-rule-value">2025-07-18 14:00</text>
            </view>
            <view class="transaction-rule-item">
              <text class="transaction-rule-label">Expiration Time</text>
              <text class="transaction-rule-value">2025-07-29 08:00</text>
            </view>
            <view class="transaction-rule-item">
              <text class="transaction-rule-label">Estimated Interest (USDT)</text>
              <text class="transaction-rule-value">--</text>
            </view>
            <view class="transaction-rule-item">
              <text class="transaction-rule-label">Requires Manual Redemption</text>
              <text class="transaction-rule-value">--</text>
            </view>
          </view>
          
          <view class="rules-content" v-else>
            <view class="rule-section">
              <text class="rule-section-title">1. Rewards</text>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">The annualized yield of the fixed-term products you subscribe to may change daily.</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">Rewards will start to be calculated at 00:00 (UTC) on the day following the subscription, and cannot be redeemed during the staking period.</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">After the staking period expires, it needs to be manually converted to flexible staking, and the corresponding income will be distributed to the account, and the distributed income can be withdrawn immediately.</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">Settlement income = subscribed assets * annualized yield / 365 * fixed term (accurate to decimal places)</text>
              </view>
            </view>
            
            <view class="rule-section">
              <text class="rule-section-title">2. Subscription and Redemption</text>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">Subscription and redemption for principal-protected fixed-term earning products are open daily between 00:10 UTC and 23:50 UTC.</text>
              </view>
            </view>
            
            <view class="rule-section">
              <text class="rule-section-title">3. Early Redemption</text>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">For specified fixed-term products, you can redeem assets at any time in "My Finance".</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">If you redeem early, you will lose all the income already distributed by this product.</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">The entire balance of assets locked by this product, minus all income you received during this period, will be credited to your spot account within 72 hours.</text>
              </view>
              <view class="rule-item">
                <text class="rule-bullet">•</text>
                <text class="rule-text">In case of extreme market fluctuations, network delays, or an excessive number of redemption requests, redemption may be delayed.</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" @click="handleConfirm">
          <text class="confirm-text">Confirm</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 当前选中的产品
const selectedProduct = ref('10days')
// 当前选中的标签页
const currentTab = ref('transaction')
// 质押金额
const stakingAmount = ref('')
// 是否显示产品详情
const showProductDetail = ref(false)

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 显示记录
const showRecords = () => {
  uni.showToast({
    title: 'Records feature coming soon',
    icon: 'none',
    duration: 2000
  })
}

// 显示帮助
const showHelp = () => {
  uni.navigateTo({
    url: '/views/ProductHelp'
  })
}

// 选择产品
const selectProduct = (product) => {
  selectedProduct.value = product
  showProductDetail.value = true
}

// 关闭产品详情
const closeProductDetail = () => {
  showProductDetail.value = false
}

// 获取产品期限
const getProductTerm = (product) => {
  const terms = {
    '10days': '10 Days',
    '30days': '30 Days',
    '90days': '90 Days'
  }
  return terms[product] || 'Unknown'
}

// 获取产品APY
const getProductAPY = (product) => {
  const apys = {
    '10days': '5%',
    '30days': '8%',
    '90days': '12%'
  }
  return apys[product] || 'Unknown'
}

// 设置最大金额
const setMaxAmount = () => {
  stakingAmount.value = '1000'
}

// 切换标签页
const switchTab = (tab) => {
  currentTab.value = tab
}

// 处理确认
const handleConfirm = () => {
  uni.showToast({
    title: 'Purchase confirmed',
    icon: 'none',
    duration: 2000
  })
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
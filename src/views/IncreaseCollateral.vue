<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('components.increaseCollateral.increaseCollateralAmount') }}</text>
      </view>
      <view class="header-buttons">
        <view class="header-button" @click="showHelp">
          <image class="header-icon" src="/static/DiFi/xiangqing.png" mode="aspectFit" />
        </view>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 当前抵押信息 -->
        <view class="current-collateral-section">
          <view class="collateral-info-card">
            <view class="info-header">
              <text class="info-title">{{ t('components.increaseCollateral.collateralAmount') }}</text>
              <text class="info-value">100 </text>
            </view>
            <view class="info-details">
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.initialCollateralRatio') }}</text>
                <text class="detail-value">80%</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.stakingRatio') }}</text>
                <text class="detail-value">80%</text>
              </view>
              <view class="detail-item">
                <text class="detail-label">{{ t('components.increaseCollateral.stakingRatioAfterIncrease') }}</text>
                <text class="detail-value">--</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 增加抵押金额输入区域 -->
        <view class="increase-amount-section">
          <text class="section-label">{{ t('components.increaseCollateral.increaseAmount') }}</text>
          <view class="amount-input-container">
            <input class="amount-input" 
                   type="number" 
                   placeholder="Amount" 
                   v-model="increaseAmount"
                   :adjust-position="false" />
            <view class="input-suffix">
              <text class="currency-text">VGAU</text>
              <view class="vertical-divider"></view>
              <text class="max-text" @click="setMaxAmount">{{ t('components.increaseCollateral.max') }}</text>
            </view>
          </view>
          <view class="available-balance-container">
            <text class="available-balance">{{ t('components.increaseCollateral.availableAssets') }}</text>
            <text class="balance-amount">48,456,156 VGAU</text>
          </view>
        </view>

        <!-- 底部间距区域 -->
        <view class="bottom-spacing"></view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-btn" @click="handleConfirm">
          <text class="confirm-text">{{ t('components.increaseCollateral.confirmOperation') }}</text>
        </view>
      </view>
    </view>
  </view>

  <!-- 确认弹窗 -->
  <view v-if="showConfirmModal" class="modal-overlay" @click="showConfirmModal = false">
    <view class="modal-content" @click.stop>
      <view class="modal-text">
        <text v-if="modalStep === 1" class="warning-text">{{ t('components.increaseCollateral.collateralRatioWarning') }}</text>
        <text v-if="modalStep === 1" class="instruction-text">{{ t('components.increaseCollateral.collateralRatioInstruction') }}</text>
        <text v-if="modalStep === 2" class="repayment-amount">{{ t('components.increaseCollateral.repaymentAmount') }} <text class="highlight">{{ t('components.increaseCollateral.repaymentAmountValue') }}</text></text>
        <text v-if="modalStep === 2" class="repayment-after">{{ t('components.increaseCollateral.repaymentAfter') }}</text>
        <text v-if="modalStep === 2" class="repayment-result">{{ t('components.increaseCollateral.repaymentResult') }} <text class="white-text">{{ t('components.increaseCollateral.repaymentResultRedeem') }}</text> {{ t('components.increaseCollateral.repaymentResultRefund') }}</text>
        <text v-if="modalStep === 3" class="success-amount">{{ t('components.increaseCollateral.repaymentSuccessful') }} <text class="highlight">{{ t('components.increaseCollateral.repaymentAmountValue') }}</text></text>
        <text v-if="modalStep === 3" class="success-result">{{ t('components.increaseCollateral.successResult') }} <text class="white-text">{{ t('components.increaseCollateral.successResultRedeem') }}</text>, {{ t('components.increaseCollateral.successResultRefund') }}</text>
      </view>
      <view class="modal-btn" @click="confirmModalAction">
        <text class="modal-btn-text">{{ t('components.increaseCollateral.confirm') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 增加金额
const increaseAmount = ref('')

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 显示帮助
const showHelp = () => {
  uni.showToast({
    title: t('components.productHelp.helpContent'),
    icon: 'none',
    duration: 2000
  })
}

// 设置最大金额
const setMaxAmount = () => {
  increaseAmount.value = '1000'
}

// 显示确认弹窗
const showConfirmModal = ref(false)
const modalStep = ref(1) // 1: 初始确认, 2: 还款提示, 3: 成功提示

// 处理确认
const handleConfirm = () => {
  if (!increaseAmount.value || parseFloat(increaseAmount.value) <= 0) {
    uni.showToast({
      title: t('common.pleaseEnterValidAmount'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  // 检查是否为正整数
  const amount = parseFloat(increaseAmount.value)
  if (!Number.isInteger(amount) || amount <= 0) {
    uni.showToast({
      title: t('common.pleaseEnterPositiveInteger'),
      icon: 'none',
      duration: 2000
    })
    return
  }
  
  // 显示确认弹窗
  showConfirmModal.value = true
  modalStep.value = 1
}

// 确认弹窗确认操作
const confirmModalAction = () => {
  if (modalStep.value === 1) {
    // 第一步：显示还款提示
    modalStep.value = 2
  } else if (modalStep.value === 2) {
    // 第二步：显示成功提示
    modalStep.value = 3
  } else {
    // 第三步：完成操作，留在此页面
    showConfirmModal.value = false
    modalStep.value = 1
    
    uni.showToast({
      title: t('components.increaseCollateral.collateralIncreased'),
      icon: 'success',
      duration: 2000
    })
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

/* 当前抵押信息区域 */
.current-collateral-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.collateral-info-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.info-title {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.info-value {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.info-details {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.detail-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
  text-align: right;
}

.detail-value.positive {
  color: #4CAF50;
}

/* 增加金额输入区域 */
.increase-amount-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 32rpx;
}

.section-label {
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
  margin-bottom: 8rpx;
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

.vertical-divider {
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

.divider {
  width: 100%;
  height: 2rpx;
  background: #1A1A1A;
  margin-bottom: 12rpx;
}

.available-balance-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12rpx;
}

.available-balance {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.balance-amount {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  text-align: right;
}

/* 底部间距区域 */
.bottom-spacing {
  margin-bottom: 600rpx;
}

/* 确认按钮区域 */
.confirm-section {
  margin-top: auto;
  margin-bottom: 80rpx;
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

/* 模态对话框样式 */
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

.warning-text {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 400;
  line-height: 1.5;
}

.instruction-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 400;
  line-height: 1.5;
}

.repayment-amount {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.repayment-after {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 16rpx;
}

.repayment-result {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
}

.white-text {
  color: #FFFFFF;
  font-weight: 400;
}

.success-amount {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 24rpx;
}

.success-result {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  line-height: 1.5;
}

.highlight {
  color: #FFA500;
  font-weight: 600;
}

.modal-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(90deg, rgba(254, 218, 120, 1) 0%, rgba(176, 121, 32, 1) 100%);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal-btn-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 600;
}
</style> 
<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <image class="title-icon" src="/static/USDT.png" mode="aspectFit" />
        <text class="title-text">{{ t('usdtWithdraw') }}</text>
      </view>
    </view>

    <!-- 主要内容区域 -->
    <view class="main-content">
      <!-- 赎回说明 -->
      <view class="redeem-notice">
        <text class="notice-text">{{ t('selectedAssetsWillBeFullyRedeemedToYourWalletAfterT1Days') }}</text>
      </view>
      
      <!-- 内容区域 -->
      <view class="content-area">
        <!-- 数量输入区域 -->
        <view class="input-section">
          <view class="input-label">
            <text class="label-text">{{ t('totalRedemptionAmount') }}</text>
          </view>
          
          <view class="input-container">
            <view class="input-field">
              <view class="input-border">
                <view class="input-left">
                  <input 
                    class="input-field-text" 
                    type="number" 
                    :placeholder="t('minimum0')" 
                    placeholder-style="color: rgba(255, 255, 255, 0.2); font-size: 32rpx;"
                    v-model="inputAmount"
                  />
                </view>
                <view class="input-currency">
                  <text class="currency-text">{{ t('usdtMax') }}</text>
                </view>
              </view>
            </view>
            
            <view class="balance-info">
              <view class="balance-label">
                <text class="balance-text">{{ t('availableBalance') }}</text>
              </view>
              <view class="balance-amount">
                <text class="amount-text">{{ usdtAvailable }} USDT</text>
              </view>
            </view>
            
            <view class="fee-info">
              <view class="fee-label">
                <text class="fee-text">{{ t('estimatedFee') }}</text>
              </view>
              <view class="fee-amount">
                <text class="fee-amount-text">0.001 USDT</text>
              </view>
            </view>
            
            <view class="divider"></view>
          </view>
        </view>

        <!-- 提现至区域 -->
        <view class="withdraw-section">
          <view class="withdraw-content">
            <view class="withdraw-label">
              <text class="withdraw-text">{{ t('withdrawTo') }}</text>
            </view>
            <view class="wallet-info">
              <text class="wallet-text">{{ t('boundWalletAddress') }}</text>
            </view>
          </view>
          <view class="daily-limit-section">
            <text class="daily-limit-text">{{ t('dailyMaximumRedemptionLimit') }}</text>
          </view>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-button" @click="handleConfirm">
          <text class="confirm-text">{{ t('confirm') }}</text>
        </view>
      </view>

      <!-- 2FA 模态框（支持多因子选择） -->
      <view v-if="show2faModal" class="modal-overlay">
        <view class="modal">
          <view class="modal-title">2FA</view>
          <view class="modal-body">
            <view v-if="availableFactors.length > 1" style="margin-bottom: 16rpx; color: #fff;">
              <picker :range="availableFactors" range-key="displayName" @change="e => selectedFactor = availableFactors[e.detail.value]">
                <view class="modal-input" style="display:flex; align-items:center;">{{ selectedFactor?.displayName || '选择验证方式' }}</view>
              </picker>
            </view>
            <input class="modal-input" type="text" v-model="twoFACode" :placeholder="selectedFactor?.displayName || t('totp.code')" />
          </view>
          <view class="modal-actions">
            <view class="modal-btn cancel" @click="cancel2FA">{{ t('common.cancel') }}</view>
            <view class="modal-btn confirm" @click="confirm2FA" :class="{ disabled: submitting }">{{ t('common.confirm') }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { userFundsAPI, authAPI } from '@/api/apiService.js'

const { t } = useI18n()

// 输入金额
const inputAmount = ref('')
// 可用USDT余额（后端返回）
const usdtAvailable = ref('0.00')
// 2FA 模态框
const show2faModal = ref(false)
const twoFACode = ref('')
const submitting = ref(false)
let pendingWithdraw = null
const availableFactors = ref([]) // [{ code:'EMAIL_VERIFY_CODE', displayName:'邮箱验证码' }, { code:'TOTP_CODE', displayName:'TOTP验证码' }]
const selectedFactor = ref(null)

// 加载后端可用余额
const loadUsdtAvailable = async () => {
  try {
    const res = await userFundsAPI.getBalances()
    // 期望结构：{ success: true, data: [{ currency:'USDT', availableAmount:'...' }, ...] }
    const list = res?.data || []
    const usdt = list.find(item => item?.currency === 'USDT')
    if (usdt && typeof usdt.availableAmount === 'string') {
      // 显示两位小数
      usdtAvailable.value = (parseFloat(usdt.availableAmount) || 0).toFixed(2)
    } else {
      usdtAvailable.value = '0.00'
    }
  } catch (e) {
    console.error('获取后端USDT余额失败:', e)
    usdtAvailable.value = '0.00'
  }
}

onMounted(() => {
  loadUsdtAvailable()
})

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 生成UUID作为幂等键
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 提交提现请求（第一步）：先发起withdraw，若需要2FA则弹窗
const handleConfirm = async () => {
  if (!inputAmount.value || Number(inputAmount.value) <= 0) {
    uni.showToast({ title: t('pleaseEnterWithdrawAmount'), icon: 'none', duration: 2000 })
    return
  }
  try {
    submitting.value = true
    uni.showLoading({ title: t('processing') })
    const body = {
      currency: 'USDT',
      amount: Number(inputAmount.value),
      idempotencyKey: generateUUID()
    }
    const resp = await userFundsAPI.withdraw(body)
    // 保存此次请求体，后续验证成功无需重复输入
    pendingWithdraw = body
    const requires2FA = resp?.requires2FA || resp?.data?.requires2FA
    const factors = resp?.factors || resp?.data?.factors || []
    if (requires2FA) {
      availableFactors.value = Array.isArray(factors) ? factors : []
      selectedFactor.value = availableFactors.value[0] || null
      show2faModal.value = true
    } else if (resp?.success) {
      uni.showToast({ title: t('withdrawSuccess') || '提现成功', icon: 'success', duration: 1500 })
      setTimeout(() => {
        uni.switchTab({ url: '/pages/Defi' })
      }, 500)
    } else {
      throw new Error(resp?.message || '提现失败')
    }
  } catch (e) {
    console.error('发起提现失败:', e)
    uni.showToast({ title: t('requestFailed'), icon: 'none' })
  } finally {
    submitting.value = false
    uni.hideLoading()
  }
}

// 验证2FA并最终提交
const confirm2FA = async () => {
  if (!twoFACode.value) {
    uni.showToast({ title: t('validation.code'), icon: 'none' })
    return
  }
  try {
    submitting.value = true
    uni.showLoading({ title: t('processing') })
    // 选择的验证方式
    const factorCode = selectedFactor.value?.code
    // 调用2FA验证
    let verifyOk = false
    try {
      const vr = await authAPI.verify2FA({ code: twoFACode.value, factor: factorCode })
      verifyOk = vr?.success !== false
    } catch (err) {
      // 兜底直调接口
      const res2 = await uni.request({
        url: '/api/auth/2fa/verify',
        method: 'POST',
        data: { code: twoFACode.value, factor: factorCode },
        withCredentials: true,
        header: { 'Content-Type': 'application/json' }
      })
      verifyOk = res2.statusCode === 200 && res2.data?.success
      if (!verifyOk) throw new Error(res2.data?.message || '2FA 验证失败')
    }
    if (!verifyOk) throw new Error('2FA 验证失败')
    // 验证成功则认为提现流程完成
    const resp = { success: true }
    if (resp?.success) {
      uni.showToast({ title: t('withdrawSuccess') || '提现成功', icon: 'success', duration: 1500 })
      show2faModal.value = false
      twoFACode.value = ''
      pendingWithdraw = null
      // 返回或跳转
      setTimeout(() => {
        uni.switchTab({ url: '/pages/Defi' })
      }, 500)
    } else {
      throw new Error(resp?.message || '提现失败')
    }
  } catch (e) {
    console.error('2FA 验证或提现失败:', e)
    uni.showToast({ title: e.message || t('requestFailed'), icon: 'none' })
  } finally {
    submitting.value = false
    uni.hideLoading()
  }
}

const cancel2FA = () => {
  show2faModal.value = false
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  padding-top: calc(88rpx + 24rpx);
  min-height: calc(100vh - 88rpx - var(--status-bar-height, 0px));
}

/* 内容区域 */
.content-area {
  display: flex;
  flex-direction: column;
}

/* 赎回说明 */
.redeem-notice {
  display: flex;
  align-items: center;
  height: 40rpx;
  margin-top: 32rpx;
  margin-bottom: 32rpx;
}

.notice-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
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

.fee-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32rpx;
  margin-top: 8rpx;
}

.fee-label {
  display: flex;
  align-items: center;
}

.fee-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.fee-amount {
  display: flex;
  align-items: center;
}

.fee-amount-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.divider {
  width: 100%;
  height: 2rpx;
  background-color: #1A1A1A;
}

/* 提现至区域 */
.withdraw-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 600rpx;
}

.withdraw-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 168rpx;
}

.withdraw-label {
  display: flex;
  align-items: center;
}

.withdraw-text {
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

.daily-limit-section {
  display: flex;
  align-items: center;
  height: 40rpx;
  margin-top: 8rpx;
}

.daily-limit-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 确认按钮区域 */
.confirm-section {
  margin-bottom: 24rpx;
}

.confirm-button {
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

.confirm-button:active {
  transform: scale(0.98);
}

.confirm-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 400;
}

/* 2FA 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  width: 80%;
  background: #121212;
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx;
}

.modal-title {
  font-size: 32rpx;
  color: #fff;
  margin-bottom: 24rpx;
}

.modal-body {
  margin-bottom: 24rpx;
}

.modal-input {
  width: 100%;
  height: 88rpx;
  background: #1A1A1A;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 12rpx;
  padding: 0 24rpx;
  color: #fff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 24rpx;
}

.modal-btn {
  min-width: 160rpx;
  height: 72rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-btn.cancel {
  background: #2a2a2a;
  color: #fff;
}

.modal-btn.confirm {
  background: linear-gradient(90deg, rgba(254,218,120,1) 0%, rgba(176,121,32,1) 100%);
  color: #000;
}

.modal-btn.confirm.disabled {
  opacity: 0.6;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 80rpx 24rpx 0 24rpx;
  }
  
  .input-label {
    margin-bottom: 48rpx;
  }
}
</style> 
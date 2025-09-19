<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <image class="title-icon" src="/static/VGAU.png" mode="aspectFit" />
        <text class="title-text">{{ t('vgauWithdraw') }}</text>
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
                  <text class="currency-text">{{ t('vgauMax') }}</text>
                </view>
              </view>
            </view>
            
            <view class="balance-info">
              <view class="balance-label">
                <text class="balance-text">{{ t('availableBalance') }}</text>
              </view>
              <view class="balance-amount">
                <text class="amount-text">{{ vgauAvailable }} VGAU</text>
              </view>
            </view>
            
            <view class="fee-info">
              <view class="fee-label">
                <text class="fee-text">{{ t('estimatedFee') }}</text>
              </view>
              <view class="fee-amount">
                <text class="fee-amount-text">0.001 VGAU</text>
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
            <text class="daily-limit-text">{{ t('dailyMaximumRedemptionLimitVGAU') }}</text>
          </view>
        </view>
      </view>

      <!-- 确认按钮 -->
      <view class="confirm-section">
        <view class="confirm-button" @click="handleConfirm">
          <text class="confirm-text">{{ t('confirm') }}</text>
        </view>
      </view>

      <!-- 2FA 认证模态框 -->
      <view v-if="show2faModal" class="auth-modal-overlay" @click="cancel2FA">
        <view class="auth-modal" @click.stop>
          <!-- 返回按钮 -->
          <view class="auth-modal-header">
            <view class="back-button" @click="cancel2FA">
              <image class="back-icon" src="/static/back.png" mode="aspectFit" />
            </view>
          </view>
          
          <!-- 标题 -->
          <view class="auth-modal-title">
            <text class="title-text">{{ t('twoFA.modal.title') }}</text>
          </view>
          
          <!-- 说明文字 -->
          <view class="auth-modal-subtitle">
            <text class="subtitle-text">{{ t('twoFA.modal.subtitle') }}</text>
          </view>
          
          <!-- 验证方式选择 -->
          <view class="auth-methods">
            <!-- 邮箱验证码 -->
            <view 
              class="auth-method-item" 
              :class="{ active: selectedMethod === 'EMAIL_VERIFY_CODE' }"
              @click="selectMethod('EMAIL_VERIFY_CODE')"
              v-if="availableMethods.includes('EMAIL_VERIFY_CODE')"
            >
              <view class="method-icon">
                <text class="icon-text">✉</text>
              </view>
              <text class="method-text">{{ t('twoFA.modal.methods.email') }}</text>
            </view>
            
            <!-- TOTP验证码 -->
            <view 
              class="auth-method-item"
              :class="{ active: selectedMethod === 'TOTP_CODE' }"
              @click="selectMethod('TOTP_CODE')"
              v-if="availableMethods.includes('TOTP_CODE')"
            >
              <view class="method-icon">
                <text class="icon-text">🕒</text>
              </view>
              <view class="method-content">
                <text class="method-text">{{ t('twoFA.modal.methods.totp') }}</text>
                <text class="method-status">{{ t('twoFA.modal.methods.totpEnabled') }}</text>
              </view>
            </view>
          </view>
          
          <!-- 验证码输入 -->
          <view v-if="selectedMethod" class="code-input-section">
            <view class="code-input-container">
              <input 
                class="code-input" 
                type="text" 
                v-model="twoFACode" 
                :placeholder="getCodePlaceholder()" 
                maxlength="6"
              />
              <!-- 邮箱验证码发送按钮 -->
              <view 
                v-if="selectedMethod === 'EMAIL_VERIFY_CODE'" 
                class="send-code-btn"
                :class="{ disabled: emailCodeSending || emailCodeCountdown > 0 }"
                @click="sendEmailCode"
              >
                <text class="send-code-text">
                  {{ emailCodeSending ? t('twoFA.modal.sendCode.sending') : emailCodeCountdown > 0 ? t('twoFA.modal.sendCode.countdown', { seconds: emailCodeCountdown }) : t('twoFA.modal.sendCode.send') }}
                </text>
              </view>
            </view>
            <!-- 邮箱验证码发送状态提示 -->
            <view v-if="selectedMethod === 'EMAIL_VERIFY_CODE' && emailCodeSent" class="email-code-tip">
              <text class="tip-text">{{ t('twoFA.modal.emailCodeSent') }}</text>
            </view>
          </view>
          
          <!-- 确认按钮 -->
          <view class="auth-modal-actions">
            <view 
              class="confirm-auth-btn" 
              :class="{ disabled: !selectedMethod || !twoFACode || submitting }"
              @click="confirm2FA"
            >
              <text class="confirm-auth-text">{{ submitting ? t('twoFA.modal.confirm.verifying') : t('twoFA.modal.confirm.confirm') }}</text>
            </view>
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
import { getBoundWalletAddress } from '@/utils/walletService.js'

const { t } = useI18n()

// 输入金额
const inputAmount = ref('')
// 可用VGAU余额（后端返回）
const vgauAvailable = ref('0.00')
// 2FA 模态框
const show2faModal = ref(false)
const twoFACode = ref('')
const submitting = ref(false)
let pendingWithdraw = null
const availableMethods = ref([]) // ["EMAIL_VERIFY_CODE", "TOTP_CODE"]
const selectedMethod = ref('')

// 邮箱验证码发送相关
const emailCodeSent = ref(false)
const emailCodeSending = ref(false)
const emailCodeCountdown = ref(0)

// 加载后端可用余额
const loadVgauAvailable = async () => {
  try {
    const res = await userFundsAPI.getBalances()
    // 期望结构：{ success: true, data: [{ currency:'VGAU', availableAmount:'...' }, ...] }
    const list = res?.data || []
    const vgau = list.find(item => item?.currency === 'VGAU')
    if (vgau && typeof vgau.availableAmount === 'string') {
      vgauAvailable.value = (parseFloat(vgau.availableAmount) || 0).toFixed(2)
    } else {
      vgauAvailable.value = '0.00'
    }
  } catch (e) {
    console.error('获取后端VGAU余额失败:', e)
    vgauAvailable.value = '0.00'
  }
}

onMounted(() => {
  loadVgauAvailable()
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
    
    // 获取用户绑定的钱包地址
    const targetWalletAddress = await getBoundWalletAddress()
    if (!targetWalletAddress) {
      uni.showToast({ title: '未找到绑定的钱包地址', icon: 'none', duration: 2000 })
      return
    }
    
    const body = {
      currency: 'VGAU',
      amount: Number(inputAmount.value),
      targetWalletAddress: targetWalletAddress,
      idempotencyKey: generateUUID()
    }
    const resp = await userFundsAPI.withdraw(body)
    const requires2FA = resp?.requires2FA || resp?.data?.requires2FA
    const methods = resp?.availableMethods || resp?.data?.availableMethods || []
    const operationId = resp?.data?.operationId
    
    if (requires2FA) {
      // 保存operationId和idempotencyKey用于后续执行
      pendingWithdraw = {
        ...body,
        operationId: operationId
      }
      availableMethods.value = Array.isArray(methods) ? methods : []
      selectedMethod.value = '' // 让用户手动选择
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
    
    // 1. 验证2FA
    const methodCode = selectedMethod.value
    let verifyOk = false
    try {
      const vr = await authAPI.verify2FA({ code: twoFACode.value, method: methodCode })
      verifyOk = vr?.success !== false
    } catch (err) {
      // 兜底直调接口
      const res2 = await uni.request({
        url: '/api/auth/2fa/verify',
        method: 'POST',
        data: { code: twoFACode.value, method: methodCode },
        withCredentials: true,
        header: { 'Content-Type': 'application/json' }
      })
      verifyOk = res2.statusCode === 200 && res2.data?.success
      if (!verifyOk) throw new Error(res2.data?.message || '2FA 验证失败')
    }
    if (!verifyOk) throw new Error('2FA 验证失败')
    
    // 2. 查询2FA状态确认完成
    try {
      const statusResp = await userFundsAPI.check2FAStatus(pendingWithdraw.operationId)
      console.log('2FA状态查询结果:', statusResp)
      
      if (statusResp?.isCompleted) {
        uni.showToast({ title: t('withdrawSuccess') || '提现成功', icon: 'success', duration: 1500 })
        show2faModal.value = false
        twoFACode.value = ''
        pendingWithdraw = null
        selectedMethod.value = ''
        
        // 刷新余额
        await loadVgauAvailable()
        
        // 返回或跳转
        setTimeout(() => {
          uni.switchTab({ url: '/pages/Defi' })
        }, 500)
      } else {
        throw new Error('2FA验证未完成')
      }
    } catch (statusError) {
      console.error('查询2FA状态失败:', statusError)
      throw new Error('查询提现状态失败')
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
  selectedMethod.value = ''
  twoFACode.value = ''
}

// 选择验证方式
const selectMethod = (method) => {
  selectedMethod.value = method
  twoFACode.value = '' // 清空之前输入的验证码
  
  // 如果选择邮箱验证，重置邮箱验证码状态
  if (method === 'EMAIL_VERIFY_CODE') {
    emailCodeSent.value = false
    emailCodeCountdown.value = 0
  }
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (emailCodeSending.value || emailCodeCountdown.value > 0) {
    return
  }
  
  try {
    emailCodeSending.value = true
    uni.showLoading({ title: '发送中...' })
    
    const response = await authAPI.sendEmailCode()
    
    if (response?.success) {
      emailCodeSent.value = true
      uni.showToast({ 
        title: '验证码已发送', 
        icon: 'success', 
        duration: 2000 
      })
      
      // 开始倒计时
      startCountdown()
    } else {
      throw new Error(response?.message || '发送失败')
    }
  } catch (error) {
    console.error('发送邮箱验证码失败:', error)
    uni.showToast({ 
      title: error.message || '发送失败', 
      icon: 'none', 
      duration: 2000 
    })
  } finally {
    emailCodeSending.value = false
    uni.hideLoading()
  }
}

// 开始倒计时
const startCountdown = () => {
  emailCodeCountdown.value = 300 // 300秒倒计时（5分钟）
  
  const timer = setInterval(() => {
    emailCodeCountdown.value--
    if (emailCodeCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 获取验证码输入框占位符
const getCodePlaceholder = () => {
  if (selectedMethod.value === 'EMAIL_VERIFY_CODE') {
    return t('validation.emailCodePlaceholder')
  } else if (selectedMethod.value === 'TOTP_CODE') {
    return t('validation.totpCodePlaceholder')
  }
  return t('validation.codePlaceholder')
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
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 80rpx;
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

/* 2FA 认证模态框样式 */
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-modal {
  width: 90%;
  max-width: 640rpx;
  background: #1A1A1A;
  border-radius: 24rpx;
  padding: 48rpx 32rpx;
  position: relative;
}

.auth-modal-header {
  position: absolute;
  top: 32rpx;
  left: 32rpx;
}

.back-button {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-icon {
  width: 24rpx;
  height: 24rpx;
}

.auth-modal-title {
  text-align: center;
  margin-bottom: 16rpx;
  margin-top: 32rpx;
}

.title-text {
  font-size: 36rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.auth-modal-subtitle {
  text-align: center;
  margin-bottom: 48rpx;
}

.subtitle-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.auth-methods {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  margin-bottom: 48rpx;
}

.auth-method-item {
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 24rpx;
}

.auth-method-item.active {
  border-color: #FFC107;
  background: rgba(255, 193, 7, 0.1);
}


.method-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12rpx;
}

.icon-text {
  font-size: 24rpx;
}

.method-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.method-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.method-status {
  font-size: 24rpx;
  color: #00FF88;
  font-weight: 400;
}

.code-input-section {
  margin-bottom: 48rpx;
}

.code-input-container {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.code-input {
  flex: 1;
  height: 96rpx;
  background: rgba(255, 255, 255, 0.05);
  border: 2rpx solid rgba(255, 255, 255, 0.2);
  border-radius: 16rpx;
  padding: 0 32rpx;
  font-size: 32rpx;
  color: #FFFFFF;
  text-align: left;
  letter-spacing: 8rpx;
  box-sizing: border-box;
}

.code-input:focus {
  border-color: #FFC107;
  outline: none;
}

.send-code-btn {
  height: 96rpx;
  padding: 0 24rpx;
  background: linear-gradient(90deg, #FEDA78 0%, #B07920 100%);
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 160rpx;
}

.send-code-btn:active {
  transform: scale(0.98);
}

.send-code-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-code-btn.disabled:active {
  transform: none;
}

.send-code-text {
  font-size: 24rpx;
  color: #000000;
  font-weight: 500;
  white-space: nowrap;
}

.email-code-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  background: rgba(0, 255, 136, 0.1);
  border: 1rpx solid rgba(0, 255, 136, 0.3);
  border-radius: 12rpx;
}

.tip-text {
  font-size: 24rpx;
  color: #00FF88;
  font-weight: 400;
}

.auth-modal-actions {
  display: flex;
  justify-content: center;
}

.confirm-auth-btn {
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

.confirm-auth-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.confirm-auth-btn:not(.disabled):active {
  transform: scale(0.98);
}

.confirm-auth-text {
  font-size: 32rpx;
  color: #000000;
  font-weight: 600;
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
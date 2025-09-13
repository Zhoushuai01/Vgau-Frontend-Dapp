<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">{{ t('history.title') }}</text>
      </view>
    </view>

         <!-- 主要内容区域 -->
     <view class="main-content">
       <!-- 顶部切换栏 -->
       <view class="top-tabs">
         <view class="tab-item" :class="{ active: topActiveTab === 'account' }" @click="setTopActiveTab('account')">
           <text class="tab-text">{{ t('history.tabs.account') }}</text>
         </view>
         <view class="tab-item" :class="{ active: topActiveTab === 'loans' }" @click="setTopActiveTab('loans')">
           <text class="tab-text">{{ t('history.tabs.loans') }}</text>
         </view>
         <view class="tab-item" :class="{ active: topActiveTab === 'earn' }" @click="setTopActiveTab('earn')">
           <text class="tab-text">{{ t('history.tabs.earn') }}</text>
         </view>
       </view>
       
       <!-- Account 内容 -->
       <view v-if="topActiveTab === 'account'">
         <!-- 筛选标签 -->
         <view class="filter-tabs">
           <view class="tab-container">
             <view 
               class="tab-item" 
               :class="{ active: activeTab === 'all' }"
               @click="setActiveTab('all')"
             >
               <text class="tab-text">{{ t('history.filter.all') }}</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: activeTab === 'vgau' }"
               @click="setActiveTab('vgau')"
             >
               <text class="tab-text">{{ t('history.filter.vgau') }}</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: activeTab === 'usdt' }"
               @click="setActiveTab('usdt')"
             >
               <text class="tab-text">{{ t('history.filter.usdt') }}</text>
             </view>
           </view>
         </view>

        <!-- 加载状态 -->
        <view class="loading-state" v-if="loading">
          <text class="loading-text">{{ t('common.loading') }}</text>
        </view>

        <!-- 交易记录列表 -->
        <view class="transaction-list" v-else>
          <!-- 交易记录项 -->
          <view class="transaction-item" v-for="(transaction, index) in filteredTransactions" :key="index" @click="viewTransactionDetail(transaction)">
            <view class="transaction-left">
              <text class="transaction-type">{{ transaction.type }}</text>
              <text class="transaction-amount" :class="transaction.amountClass">
                {{ transaction.amount }}
              </text>
            </view>
            <view class="transaction-right">
              <text class="transaction-date">{{ transaction.date }}</text>
              <view class="status-container">
                <text class="transaction-time">{{ formatTime(transaction.rawData?.createdAt) }}</text>
                <text class="transaction-status" :class="transaction.statusClass">
                  {{ getStatusText(transaction.status) }}
                </text>
              </view>
            </view>
          </view>
        </view>

         <!-- 加载更多 -->
         <view class="load-more" v-if="hasMore" @click="loadMore">
           <text class="load-more-text">{{ t('history.loadMore') }}</text>
         </view>
         
         <!-- 没有更多数据 -->
         <view class="no-more-data" v-if="!hasMore">
           <text class="no-more-text">{{ t('history.noMoreData') }}</text>
         </view>

         <!-- 无数据状态 -->
         <view class="empty-state" v-if="filteredTransactions.length === 0">
           <image class="empty-icon" src="/static/empty.png" mode="aspectFit" />
           <text class="empty-text">{{ t('history.noTransactionsFound') }}</text>
         </view>
       </view>

       <!-- Loans 内容 -->
       <view v-if="topActiveTab === 'loans'" class="loans-content">

         <!-- 总债务卡片 -->
         <view class="debt-card">
           <view class="card-header">
             <text class="debt-title">{{ t('history.loans.totalDebt') }}</text>
           </view>
           <text class="debt-amount">{{ t('history.loans.totalDebtAmount') }}</text>
           <view class="debt-details">
             <view class="detail-row">
               <text class="detail-label">{{ t('history.loans.collateralAmt') }}</text>
               <text class="detail-value">{{ t('history.loans.collateralAmtValue') }}</text>
             </view>
             <view class="detail-row">
               <text class="detail-label">{{ t('history.loans.borrowedAmt') }}</text>
               <text class="detail-value">{{ t('history.loans.borrowedAmtValue') }}</text>
             </view>
           </view>
           <view class="risk-warning">
             <view class="warning-icon">⚠</view>
             <text class="warning-text">{{ t('history.loans.riskWarning') }}</text>
           </view>
         </view>

         <!-- 第一个借贷状态卡片 -->
         <view class="loan-status-card">
           <view class="borrowing-item">
             <view class="borrowing-header">
               <text class="borrowing-status">{{ t('history.loans.borrowing') }}</text>
               <view class="status-badge" @click="goToBorrowingDetail('borrowing')">
                 <text class="badge-text">{{ t('history.loans.details') }}</text>
               </view>
             </view>
             <view class="borrowing-details">
               <view class="detail-item">
                 <text class="detail-label">{{ t('history.loans.stakingRate') }}</text>
                 <text class="detail-amount">{{ t('history.loans.stakingRateValue') }}</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">{{ t('history.loans.collateralVGAU') }}</text>
                 <text class="detail-amount">{{ t('history.loans.collateralVGAUValue') }}</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">{{ t('history.loans.borrowedUSDT') }}</text>
                 <text class="detail-amount">{{ t('history.loans.borrowedUSDTValue') }}</text>
               </view>
             </view>
           </view>
         </view>

                    <!-- 第二个借贷状态卡片 -->
         <view class="loan-status-card">
           <view class="borrowing-item">
             <view class="borrowing-header">
               <text class="borrowing-status complete-status">{{ t('history.loans.completed') }}</text>
               <view class="status-badge" @click="goToBorrowingDetail('completed')">
                 <text class="badge-text">{{ t('history.loans.details') }}</text>
               </view>
             </view>
             <view class="borrowing-details">
               <view class="detail-item">
                 <text class="detail-label">{{ t('history.loans.stakingRate') }}</text>
                 <text class="detail-amount">{{ t('history.loans.stakingRateValue') }}</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">{{ t('history.loans.collateralVGAU') }}</text>
                 <text class="detail-amount">{{ t('history.loans.collateralVGAUValue') }}</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">{{ t('history.loans.borrowedUSDT') }}</text>
                 <text class="detail-amount">{{ t('history.loans.borrowedUSDTValue') }}</text>
               </view>
             </view>
           </view>
         </view>

         <!-- 底部提示 -->
         <view class="bottom-hint">
           <text class="hint-text">{{ t('history.loans.noMoreData') }}</text>
         </view>
       </view>

       <!-- Earn 内容 -->
       <view v-if="topActiveTab === 'earn'">
         <!-- 筛选标签 -->
         <view class="filter-tabs">
           <view class="tab-container">
             <view 
               class="tab-item" 
               :class="{ active: earnActiveTab === 'all' }"
               @click="setEarnActiveTab('all')"
             >
               <text class="tab-text">{{ t('history.earn.filter.all') }}</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: earnActiveTab === 'staking' }"
               @click="setEarnActiveTab('staking')"
             >
               <text class="tab-text">{{ t('history.earn.filter.staking') }}</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: earnActiveTab === 'toClaim' }"
               @click="setEarnActiveTab('toClaim')"
             >
               <text class="tab-text">{{ t('history.earn.filter.toClaim') }}</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: earnActiveTab === 'completed' }"
               @click="setEarnActiveTab('completed')"
             >
               <text class="tab-text">{{ t('history.earn.filter.completed') }}</text>
             </view>
           </view>
         </view>

         <!-- Earn 交易记录列表 -->
         <view class="earn-transaction-list">
           <!-- 交易记录项 -->
           <view class="earn-transaction-item" v-for="(transaction, index) in filteredEarnTransactions" :key="index" @click="viewEarnTransactionDetail(transaction)">
             <view class="earn-transaction-left">
               <text class="earn-transaction-status" :class="transaction.statusClass">
                 {{ transaction.status }}
               </text>
               <text class="earn-transaction-amount">
                 {{ transaction.amount }}
               </text>
             </view>
             <view class="earn-transaction-right">
               <text class="earn-transaction-date">{{ transaction.date }}</text>
               <view class="earn-view-details-btn">
                 <text class="earn-view-details-text">{{ t('history.earn.viewDetails') }}</text>
               </view>
             </view>
           </view>
         </view>

         <!-- 没有更多数据 -->
         <view class="no-more-data" v-if="filteredEarnTransactions.length > 0">
           <text class="no-more-text">{{ t('history.noMoreData') }}</text>
         </view>

         <!-- 无数据状态 -->
         <view class="empty-state" v-if="filteredEarnTransactions.length === 0">
           <image class="empty-icon" src="/static/empty.png" mode="aspectFit" />
           <text class="empty-text">{{ t('history.earn.noTransactionsFound') }}</text>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { defiAPI } from '@/api/apiService'

const { t } = useI18n()

// 响应式数据
const topActiveTab = ref('account')
const activeTab = ref('all')
const earnActiveTab = ref('all')
const hasMore = ref(true)
const loading = ref(false)

// 充值订单数据
const depositOrders = ref([])

// Earn 交易数据
const earnTransactions = ref([
  {
    status: t('history.earn.status.staking'),
    amount: '10 VGAU',
    date: '2025-01-15 14:32',
    statusClass: 'staking'
  },
  {
    status: t('history.earn.status.toClaim'),
    amount: '10 VGAU',
    date: '2025-01-15 14:32',
    statusClass: 'toClaim'
  },
  {
    status: t('history.earn.status.completed'),
    amount: '10 VGAU',
    date: '2025-01-15 14:32',
    statusClass: 'completed'
  }
])

// 计算属性 - 处理充值订单数据
const processedTransactions = computed(() => {
  return depositOrders.value.map(order => {
    const isVGAU = order.currency === 'VGAU'
    const amount = isVGAU ? order.amountRaw : order.amountRaw
    const currency = order.currency
    
    return {
      id: order.orderId,
      type: t('history.transaction.deposit'),
      amount: `+${amount}`, // 只显示金额，不包含币种
      amountClass: 'positive',
      date: formatDate(order.processedAt),
      status: order.status, // 传递原始状态值，让详情页翻译
      statusClass: getStatusClass(order.status),
      currency: currency,
      rawData: order // 保存原始数据用于详情页
    }
  })
})

// 计算属性 - 筛选交易记录
const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') {
    return processedTransactions.value
  }
  return processedTransactions.value.filter(tx => {
    if (activeTab.value === 'vgau') {
      return tx.currency === 'VGAU'
    } else if (activeTab.value === 'usdt') {
      return tx.currency === 'USDT'
    }
    return true
  })
})

// Earn 交易筛选
const filteredEarnTransactions = computed(() => {
  if (earnActiveTab.value === 'all') {
    return earnTransactions.value
  }
  return earnTransactions.value.filter(tx => {
    if (earnActiveTab.value === 'staking') {
      return tx.statusClass === 'staking'
    } else if (earnActiveTab.value === 'toClaim') {
      return tx.statusClass === 'toClaim'
    } else if (earnActiveTab.value === 'completed') {
      return tx.statusClass === 'completed'
    }
    return true
  })
})

// 设置顶部标签页
const setTopActiveTab = (tab) => {
  topActiveTab.value = tab
}

// 设置筛选标签页
const setActiveTab = (tab) => {
  activeTab.value = tab
}

// 设置Earn筛选标签页
const setEarnActiveTab = (tab) => {
  earnActiveTab.value = tab
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().split('T')[0] // 返回 YYYY-MM-DD 格式
}

// 格式化时间，精确到秒
const formatTime = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return ''
    
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('时间格式化错误:', error)
    return ''
  }
}

// 获取状态文本
const getStatusText = (status) => {
  const statusMap = {
    'PENDING': t('history.transaction.pending'),
    'PROCESSING': t('history.transaction.processing'),
    'COMPLETED': t('history.transaction.done'),
    'FAILED': t('history.transaction.failed'),
    'CANCELLED': t('history.transaction.cancelled'),
    'SUBMITTED': t('history.transaction.pending') // 添加SUBMITTED状态
  }
  return statusMap[status] || status
}

// 获取状态样式类
const getStatusClass = (status) => {
  const classMap = {
    'PENDING': 'pending',
    'PROCESSING': 'processing',
    'COMPLETED': 'success',
    'FAILED': 'failed',
    'CANCELLED': 'cancelled',
    'SUBMITTED': 'pending' // 添加SUBMITTED状态
  }
  return classMap[status] || 'pending'
}

// 获取充值订单列表
const fetchDepositOrders = async () => {
  try {
    loading.value = true
    console.log('📡 开始获取充值订单列表...')
    
    const response = await defiAPI.getDepositOrdersList()
    console.log('📡 充值订单列表响应:', response)
    
    if (response && response.data) {
      depositOrders.value = response.data
      console.log('✅ 充值订单列表获取成功:', depositOrders.value.length, '条记录')
    } else {
      console.warn('⚠️ 充值订单列表响应格式异常:', response)
      depositOrders.value = []
    }
  } catch (error) {
    console.error('❌ 获取充值订单列表失败:', error)
    uni.showToast({
      title: t('common.error.networkError'),
      icon: 'none',
      duration: 2000
    })
    depositOrders.value = []
  } finally {
    loading.value = false
  }
}





// 查看交易详情
const viewTransactionDetail = (transaction) => {
  // 如果是充值记录，传递原始数据
  if (transaction.rawData) {
    const detailData = {
      type: transaction.type,
      amount: transaction.amount,
      amountClass: transaction.amountClass,
      currency: transaction.rawData.currency, // 传递币种信息
      status: transaction.rawData.status, // 使用原始状态值
      createdAt: transaction.rawData.createdAt,
      orderId: transaction.rawData.orderId,
      fromAddress: transaction.rawData.fromAddress,
      transactionHash: transaction.rawData.txHash
    }
    
    uni.navigateTo({
      url: `/views/TransactionDetail?transaction=${encodeURIComponent(JSON.stringify(detailData))}`
    })
  } else {
    // 其他类型的交易记录
    uni.navigateTo({
      url: `/views/TransactionDetail?transaction=${encodeURIComponent(JSON.stringify(transaction))}`
    })
  }
}

// 查看Earn交易详情
const viewEarnTransactionDetail = (transaction) => {
  const params = {
    days: '10',
    apy: '5',
    orderId: 'L-202503-013',
    start: '2025-07-15',
    end: '2025-07-25',
    completed: transaction.statusClass === 'completed' ? 'true' : 'false'
  }
  const query = Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&')
  uni.navigateTo({
    url: `/views/StakingDetail?${query}`
  })
}


// 前往借贷详情
const goToBorrowingDetail = (status = 'borrowing') => {
  uni.navigateTo({
    url: `/views/BorrowingDetail?status=${status}`
  })
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 加载更多
const loadMore = () => {
  // 模拟加载更多数据
  setTimeout(() => {
    hasMore.value = false
  }, 1000)
}

// 页面加载
onMounted(() => {
  // 初始化逻辑
  fetchDepositOrders()
})
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  background-color: #0A0A0A;
  width: 100%;
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


/* 主要内容区域 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24rpx;
  padding-top: 120rpx;
}

/* 顶部切换栏 */
.top-tabs {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  position: relative;
  background: transparent;
}

.top-tabs .tab-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  position: relative;
  cursor: pointer;
  background: transparent;
}

.top-tabs .tab-text {
  font-size: 32rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  transition: color 0.3s ease;
}

.top-tabs .tab-item.active .tab-text {
  color: #FFFFFF;
}

.top-tabs .tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60rpx;
  height: 4rpx;
  background: #FFA500;
  border-radius: 2rpx;
}

.top-tabs::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rpx;
  background: rgba(255, 255, 255, 0.2);
}

/* 筛选标签 */
.filter-tabs {
  margin-bottom: 32rpx;
}

.tab-container {
  display: flex;
  gap: 16rpx;
  justify-content: flex-start;
}

.tab-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64rpx;
  padding: 0 24rpx;
  border-radius: 8rpx;
  background: #333333;
  transition: all 0.3s ease;
  min-width: 120rpx;
}

.tab-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  transition: color 0.3s ease;
}

/* 筛选标签的选中状态 */
.filter-tabs .tab-item.active {
  background: #FFFFFF;
}

.filter-tabs .tab-item.active .tab-text {
  color: #000000;
}

/* 交易记录列表 */
.transaction-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  flex: 1;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  transition: all 0.3s ease;
}

.transaction-item:active {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(0.98);
}

.transaction-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.transaction-right {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  align-items: flex-end;
}

.status-container {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  align-items: flex-end;
}

.transaction-type {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.transaction-amount {
  font-size: 32rpx;
  font-weight: 600;
}

.transaction-amount.positive {
  color: #00CC66;
}

.transaction-amount.negative {
  color: #FF6B6B;
}

.transaction-date {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.transaction-time {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
}

.transaction-status {
  font-size: 24rpx;
  font-weight: 500;
  color: #FFFFFF; /* 所有状态都显示为白色 */
}

.transaction-status.ongoing {
  color: #FFFFFF;
}

.transaction-status.done {
  color: #FFFFFF;
}

.transaction-status.success {
  color: #FFFFFF;
}

.transaction-status.pending {
  color: #FFFFFF;
}

.transaction-status.processing {
  color: #FFFFFF;
}

.transaction-status.failed {
  color: #FFFFFF;
}

.transaction-status.cancelled {
  color: #FFFFFF;
}

/* 加载更多 */
.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
  padding: 24rpx;
}

.load-more-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* 没有更多数据 */
.no-more-data {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
  padding: 24rpx;
}

.no-more-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* 加载状态 */
.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80rpx 0;
}

.loading-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 80rpx 0;
}

.empty-icon {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 32rpx;
  opacity: 0.5;
}

.empty-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* Loans 内容样式 */
.loans-content {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  flex: 1;
}



/* 总债务卡片 */
.debt-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  position: relative;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
}



.debt-title {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.debt-amount {
  font-size: 48rpx;
  color: #FFFFFF;
  font-weight: 600;
  margin-bottom: 32rpx;
}

.debt-details {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.detail-row {
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
}

.risk-warning {
  display: flex;
  align-items: center;
  gap: 12rpx;
  padding: 16rpx;
  background: rgba(255, 107, 107, 0.1);
  border: 1rpx solid rgba(255, 107, 107, 0.2);
  border-radius: 8rpx;
}

.warning-icon {
  font-size: 24rpx;
  color: #FF6B6B;
}

.warning-text {
  font-size: 24rpx;
  color: #FF6B6B;
  font-weight: 400;
}

/* 借贷状态卡片 */
.loan-status-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 0;
  overflow: hidden;
}





.borrowing-item {
  padding: 32rpx 24rpx;
}

.borrowing-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.borrowing-status {
  font-size: 32rpx;
  color: #00CC66;
  font-weight: 500;
}

.complete-status {
  color: #FFFFFF;
}

.status-badge {
  padding: 8rpx 24rpx;
  background: #333333;
  border: 1rpx solid #444444;
  border-radius: 20rpx;
  min-width: 120rpx;
  text-align: center;
}

.badge-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.borrowing-details {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-item .detail-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.detail-amount {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
}

/* 底部提示 */
.bottom-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
  padding: 24rpx;
}

.hint-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

/* Earn 内容样式 */
.earn-transaction-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  flex: 1;
}

.earn-transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 32rpx 24rpx;
  transition: all 0.3s ease;
}

.earn-transaction-item:active {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(0.98);
}

.earn-transaction-left {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.earn-transaction-right {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  align-items: flex-end;
}

.earn-transaction-status {
  font-size: 32rpx;
  font-weight: 500;
}

.earn-transaction-status.staking {
  color: #FFFFFF;
}

.earn-transaction-status.toClaim {
  color: #00CC66;
}

.earn-transaction-status.completed {
  color: rgba(255, 255, 255, 0.7);
}

.earn-transaction-amount {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 600;
}

.earn-transaction-date {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.earn-view-details-btn {
  padding: 8rpx 24rpx;
  background: #333333;
  border: 1rpx solid #444444;
  border-radius: 20rpx;
  min-width: 120rpx;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.earn-view-details-btn:active {
  background: #444444;
  transform: scale(0.95);
}

.earn-view-details-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 500;
}
</style>
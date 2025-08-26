<template>
  <view class="content">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="back-button" @click="goBack">
        <image class="back-icon" src="/static/back.png" mode="aspectFit" />
      </view>
      <view class="page-title">
        <text class="title-text">History</text>
      </view>
      <view class="header-actions">
        <view class="header-btn" @click="goToTransactionHistory">
          <image src="/static/history.png" class="header-icon" />
        </view>
      </view>
    </view>

         <!-- 主要内容区域 -->
     <view class="main-content">
       <!-- 顶部切换栏 -->
       <view class="top-tabs">
         <view class="tab-item" :class="{ active: topActiveTab === 'account' }" @click="setTopActiveTab('account')">
           <text class="tab-text">Account</text>
         </view>
         <view class="tab-item" :class="{ active: topActiveTab === 'loans' }" @click="setTopActiveTab('loans')">
           <text class="tab-text">Loans</text>
         </view>
         <view class="tab-item" :class="{ active: topActiveTab === 'earn' }" @click="setTopActiveTab('earn')">
           <text class="tab-text">Earn</text>
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
               <text class="tab-text">All</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: activeTab === 'vgau' }"
               @click="setActiveTab('vgau')"
             >
               <text class="tab-text">VGAU</text>
             </view>
             <view 
               class="tab-item" 
               :class="{ active: activeTab === 'usdt' }"
               @click="setActiveTab('usdt')"
             >
               <text class="tab-text">USDT</text>
             </view>
           </view>
         </view>

         <!-- 交易记录列表 -->
         <view class="transaction-list">
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
               <text class="transaction-status" :class="transaction.statusClass">
                 {{ transaction.status }}
               </text>
             </view>
           </view>
         </view>

         <!-- 加载更多 -->
         <view class="load-more" v-if="hasMore">
           <text class="load-more-text">Load More</text>
         </view>
         
         <!-- 没有更多数据 -->
         <view class="no-more-data" v-if="!hasMore">
           <text class="no-more-text">No More Data</text>
         </view>

         <!-- 无数据状态 -->
         <view class="empty-state" v-if="filteredTransactions.length === 0">
           <image class="empty-icon" src="/static/empty.png" mode="aspectFit" />
           <text class="empty-text">No transactions found</text>
         </view>
       </view>

       <!-- Loans 内容 -->
       <view v-if="topActiveTab === 'loans'" class="loans-content">
         <!-- 借贷选项卡片 -->
         <view class="loan-options-card">
           <view class="option-item" :class="{ active: loanActiveTab === 'stake' }" @click="setLoanActiveTab('stake')">
             <text class="option-text">Stake & Redeem</text>
           </view>
           <view class="option-item" :class="{ active: loanActiveTab === 'loan' }" @click="setLoanActiveTab('loan')">
             <text class="option-text">Loan Records</text>
             <view class="active-indicator"></view>
           </view>
           <view class="option-item" :class="{ active: loanActiveTab === 'rewards' }" @click="setLoanActiveTab('rewards')">
             <text class="option-text">Rewards History</text>
           </view>
         </view>

         <!-- 总债务卡片 -->
         <view class="debt-card">
           <view class="card-header">
             <view class="debt-icon">
               <view class="icon-circle"></view>
             </view>
             <text class="debt-title">Total Debt</text>
           </view>
           <text class="debt-amount">121.221 USDT</text>
           <view class="debt-details">
             <view class="detail-row">
               <text class="detail-label">Collateral Amt</text>
               <text class="detail-value">221 VGAU</text>
             </view>
             <view class="detail-row">
               <text class="detail-label">Borrowed Amt</text>
               <text class="detail-value">45.451115 USDT</text>
             </view>
           </view>
           <view class="risk-warning">
             <view class="warning-icon">⚠</view>
             <text class="warning-text">抵押率过低，存在清算风险</text>
           </view>
         </view>

         <!-- 借贷状态卡片 -->
         <view class="loan-status-card">
           <view class="status-header">
             <view class="status-tabs">
               <view class="status-tab" :class="{ active: statusActiveTab === 'all' }" @click="setStatusActiveTab('all')">
                 <text class="status-tab-text">All</text>
                 <view class="tab-underline"></view>
               </view>
               <view class="status-tab" :class="{ active: statusActiveTab === 'loan' }" @click="setStatusActiveTab('loan')">
                 <text class="status-tab-text">Loan</text>
               </view>
               <view class="status-tab" :class="{ active: statusActiveTab === 'repay' }" @click="setStatusActiveTab('repay')">
                 <text class="status-tab-text">Repay</text>
               </view>
             </view>
           </view>
           
           <view class="borrowing-item">
             <view class="borrowing-header">
               <text class="borrowing-status">Borrowing</text>
               <view class="status-badge">
                 <text class="badge-text">Ongoing</text>
               </view>
             </view>
             <view class="borrowing-details">
               <view class="detail-item">
                 <text class="detail-label">Borrowed Amount</text>
                 <text class="detail-amount">45.451115 USDT</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">Collateral Amount</text>
                 <text class="detail-amount">221 VGAU</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">Interest Rate</text>
                 <text class="detail-amount">5.2%</text>
               </view>
               <view class="detail-item">
                 <text class="detail-label">Liquidation Price</text>
                 <text class="detail-amount">$0.85</text>
               </view>
             </view>
           </view>
         </view>
       </view>

       <!-- Earn 内容 -->
       <view v-if="topActiveTab === 'earn'">
         <view class="empty-state">
           <text class="empty-text">Earn content coming soon</text>
         </view>
       </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const activeTab = ref('all')
const topActiveTab = ref('account')
const loanActiveTab = ref('loan')
const statusActiveTab = ref('all')

// 模拟交易数据
const transactions = ref([
  {
    type: 'Deposit',
    amount: '+5,000 VGAU',
    amountClass: 'positive',
    date: '2025-01-15 14:32',
    status: 'Ongoing',
    statusClass: 'ongoing'
  },
  {
    type: 'Withdraw',
    amount: '-5,000 VGAU',
    amountClass: 'negative',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  },
  {
    type: 'Redeem',
    amount: '+5,000 VGAU',
    amountClass: 'positive',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  },
  {
    type: 'Collateral',
    amount: '-5,000 VGAU',
    amountClass: 'negative',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  },
  {
    type: 'Borrow',
    amount: '+5,000 USDT',
    amountClass: 'positive',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  },
  {
    type: 'Earn Rewards',
    amount: '+5,000 USDT',
    amountClass: 'positive',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  },
  {
    type: 'Account Gains',
    amount: '+5,000 USDT',
    amountClass: 'positive',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  },
  {
    type: 'Deposit',
    amount: '+5,000 USDT',
    amountClass: 'positive',
    date: '2025-01-15 14:32',
    status: 'Ongoing',
    statusClass: 'ongoing'
  },
  {
    type: 'Withdraw',
    amount: '-5,000 USDT',
    amountClass: 'negative',
    date: '2025-01-15 14:32',
    status: 'Done',
    statusClass: 'done'
  }
])

// 计算属性：根据筛选条件过滤交易记录
const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') {
    return transactions.value
  }
  return transactions.value.filter(tx => 
    tx.amount.toLowerCase().includes(activeTab.value)
  )
})

// 是否有更多数据
const hasMore = ref(false)

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 跳转到交易记录
const goToTransactionHistory = () => {
  // 这里可以添加跳转到交易记录页面的逻辑
  uni.showToast({
    title: '交易记录',
    icon: 'none',
    duration: 2000
  })
}

// 设置活动标签
const setActiveTab = (tab) => {
  activeTab.value = tab
}

// 设置顶部活动标签
const setTopActiveTab = (tab) => {
  topActiveTab.value = tab
}

// 设置借贷选项标签
const setLoanActiveTab = (tab) => {
  loanActiveTab.value = tab
}

// 设置状态选项标签
const setStatusActiveTab = (tab) => {
  statusActiveTab.value = tab
}

// 查看交易详情
const viewTransactionDetail = (transaction) => {
  // 构建交易详情数据
  const detailData = {
    type: transaction.type,
    amount: transaction.amount,
    amountClass: transaction.amountClass,
    status: transaction.status,
    date: transaction.date,
    orderNumber: `L-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
    serialNumber: `TX${transaction.date.replace(/[-:]/g, '').replace(' ', '')}${String(Math.floor(Math.random() * 9999) + 1).padStart(3, '0')}`,
    orderId: `ORD${transaction.date.replace(/[-:]/g, '').replace(' ', '')}${String(Math.floor(Math.random() * 9999) + 1).padStart(3, '0')}`,
    recordNumber: String(Math.floor(Math.random() * 999999) + 100000),
    walletAddress: '0x7eCfbF2D6DEa2371ea8f237c056B024dA4Bc87af',
    transactionHash: transaction.status === 'Ongoing' ? '--' : `0x${Math.random().toString(16).substr(2, 64)}`
  }
  
  // 确保amountClass正确设置
  if (transaction.amount.startsWith('+')) {
    detailData.amountClass = 'positive'
  } else if (transaction.amount.startsWith('-')) {
    detailData.amountClass = 'negative'
  }
  
  // 根据状态设置交易哈希
  if (transaction.status === 'Ongoing') {
    detailData.transactionHash = ''
  }
  
  uni.navigateTo({
    url: `/views/TransactionDetail?transaction=${encodeURIComponent(JSON.stringify(detailData))}`
  })
}


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

.header-actions {
  display: flex;
  gap: 16rpx;
}

.header-btn {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.header-icon {
  width: 32rpx;
  height: 32rpx;
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

.transaction-status {
  font-size: 24rpx;
  font-weight: 500;
}

.transaction-status.ongoing {
  color: #FFFFFF;
}

.transaction-status.done {
  color: rgba(255, 255, 255, 0.5);
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

/* 借贷选项卡片 */
.loan-options-card {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 0;
  overflow: hidden;
}

.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx 24rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
  position: relative;
  transition: all 0.3s ease;
}

.option-item:last-child {
  border-bottom: none;
}

.option-item.active {
  background: rgba(255, 165, 0, 0.1);
}

.option-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.option-item.active .option-text {
  color: #FFA500;
}

.active-indicator {
  width: 12rpx;
  height: 12rpx;
  background: #FFA500;
  border-radius: 50%;
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

.debt-icon {
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 165, 0, 0.2);
  border-radius: 50%;
}

.icon-circle {
  width: 24rpx;
  height: 24rpx;
  background: #FFA500;
  border-radius: 50%;
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

.status-header {
  padding: 24rpx;
  border-bottom: 1rpx solid rgba(255, 255, 255, 0.1);
}

.status-tabs {
  display: flex;
  gap: 48rpx;
}

.status-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.status-tab-text {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  padding-bottom: 12rpx;
  transition: color 0.3s ease;
}

.status-tab.active .status-tab-text {
  color: #FFFFFF;
}

.tab-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40rpx;
  height: 4rpx;
  background: #FFA500;
  border-radius: 2rpx;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.status-tab.active .tab-underline {
  opacity: 1;
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
  color: #FFFFFF;
  font-weight: 500;
}

.status-badge {
  padding: 8rpx 16rpx;
  background: rgba(0, 204, 102, 0.2);
  border: 1rpx solid rgba(0, 204, 102, 0.3);
  border-radius: 20rpx;
}

.badge-text {
  font-size: 24rpx;
  color: #00CC66;
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
</style>
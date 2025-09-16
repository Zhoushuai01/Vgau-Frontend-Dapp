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
              <view class="status-container">
                <text class="transaction-time">{{ formatTime(transaction.rawData?.createdAt || transaction.rawData?.createTime) }}</text>
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
           <text class="debt-amount">{{ formatUsdtAmount(loanData.totalDebtUsdt) }} USDT</text>
           <view class="debt-details">
             <view class="detail-row">
               <text class="detail-label">{{ t('history.loans.collateralAmt') }}</text>
               <text class="detail-value">{{ formatUsdtAmount(loanData.collateralAmount) }} VGAU</text>
             </view>
             <view class="detail-row">
               <text class="detail-label">{{ t('history.loans.borrowedAmt') }}</text>
               <text class="detail-value">{{ formatUsdtAmount(loanData.borrowedAmount) }} USDT</text>
             </view>
           </view>
           <!-- 抵押过低红色警告 - 暂时隐藏 -->
           <!-- <view class="risk-warning">
             <view class="warning-icon">⚠</view>
             <text class="warning-text">{{ t('history.loans.riskWarning') }}</text>
           </view> -->
          </view>

          <!-- 借贷订单列表 -->
         <view class="loan-orders-list" v-if="sortedLoanOrders.length > 0">
           <view class="list-title">
             <text class="title-text">{{ t('history.loans.ordersList') }}</text>
           </view>
           <view class="orders-container">
             <view class="loan-order-item" v-for="(order, index) in sortedLoanOrders" :key="index">
               <view class="order-header">
                 <view class="order-info">
                   <text class="order-status" :class="getLoanStatusClass(order.status)">
                     {{ getLoanStatusText(order.status) }}
                   </text>
                   <text class="order-number">{{ order.orderNumber || '--' }}</text>
                 </view>
                 <view class="details-btn" @click="goToBorrowingDetail(order)">
                   <text class="details-text">{{ t('history.loans.details') }}</text>
                 </view>
               </view>
               <view class="order-details">
                 <view class="detail-row">
                   <text class="detail-label">质押率</text>
                   <text class="detail-value">{{ formatLtvRatio(order.currentLtvRatio) }}</text>
                 </view>
                 <view class="detail-row">
                   <text class="detail-label">抵押品 (VGAU)</text>
                   <text class="detail-value">{{ order.collateralAmount || '0' }}</text>
                 </view>
                 <view class="detail-row">
                   <text class="detail-label">借入 (USDT)</text>
                   <text class="detail-value">{{ formatUsdtAmount(order.loanAmount) }}</text>
                 </view>
               </view>
             </view>
           </view>
         </view>

         <!-- 无借贷订单状态 -->
         <view class="empty-loan-orders" v-if="sortedLoanOrders.length === 0" style="text-align: center; padding: 40rpx; color: rgba(255,255,255,0.5);">
           <text>暂无借贷订单</text>
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
           <view class="earn-transaction-item" v-for="(transaction, index) in filteredEarnTransactions" :key="index">
             <view class="earn-transaction-left">
               <text class="earn-transaction-status" :class="transaction.statusClass">
                 {{ transaction.status }}
               </text>
               <text class="earn-transaction-amount">
                 {{ transaction.amount }}
               </text>
             </view>
             <view class="earn-transaction-right">
               <text class="earn-transaction-time">{{ formatTime(transaction.rawData?.createTime || transaction.rawData?.createdAt) }}</text>
               <view class="earn-view-details-btn" @click="viewEarnTransactionDetail(transaction)">
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
import { defiAPI, loanAPI, stakeAPI, userFundsAPI } from '@/api/apiService'

const { t } = useI18n()

// 响应式数据
const topActiveTab = ref('account')
const activeTab = ref('all')
const earnActiveTab = ref('all')
const hasMore = ref(true)
const loading = ref(false)

// 充值订单数据
const depositOrders = ref([])

// 提现订单数据
const withdrawOrders = ref([])

// 借贷数据
const loanData = ref({
  totalDebtUsdt: '0',
  collateralAmount: '0',
  borrowedAmount: '0'
})

// 借贷订单列表
const loanOrders = ref([])

// 计算属性 - 排序后的借贷订单（已完成的订单放在下面）
const sortedLoanOrders = computed(() => {
  return [...loanOrders.value].sort((a, b) => {
    // 状态优先级：active > pending > completed > cancelled > liquidated
    const statusPriority = {
      'ACTIVE': 1,
      'PENDING': 2,
      'COMPLETED': 3,
      'CANCELLED': 4,
      'LIQUIDATED': 5
    }
    
    const aPriority = statusPriority[a.status] || 6
    const bPriority = statusPriority[b.status] || 6
    
    // 如果状态相同，按创建时间排序（新的在前）
    if (aPriority === bPriority) {
      const aTime = new Date(a.createdAt || a.createTime || 0).getTime()
      const bTime = new Date(b.createdAt || b.createTime || 0).getTime()
      return bTime - aTime
    }
    
    return aPriority - bPriority
  })
})

// Earn 交易数据
const earnTransactions = ref([])

// 质押订单数据
const stakeOrders = ref([])

// 计算属性 - 处理充值订单数据
const processedDepositTransactions = computed(() => {
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

// 计算属性 - 处理提现订单数据
const processedWithdrawTransactions = computed(() => {
  return withdrawOrders.value.map(order => {
    const isVGAU = order.currency === 'VGAU'
    const amount = order.amount || '0'
    const currency = order.currency
    
    return {
      id: order.id || order.businessRef,
      type: t('history.transaction.withdraw'),
      amount: `-${amount} ${currency}`, // 提现显示为负数并包含货币类型
      amountClass: 'negative',
      date: formatDate(order.createTime),
      status: order.simpleStatus || order.status, // 使用simpleStatus或status
      statusClass: getStatusClass(order.simpleStatus || order.status),
      currency: currency,
      rawData: order // 保存原始数据用于详情页
    }
  })
})

// 计算属性 - 合并所有交易记录
const processedTransactions = computed(() => {
  return [...processedDepositTransactions.value, ...processedWithdrawTransactions.value]
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

// 计算属性 - 处理质押订单数据
const processedStakeOrders = computed(() => {
  return stakeOrders.value.map(order => {
    const status = order.status || 'PENDING'
    const statusClass = getStakeStatusClass(status)
    
    return {
      id: order.orderId || order.id,
      status: getStakeStatusText(status),
      statusClass: statusClass,
      amount: `${order.stakeAmount || order.amount || '0'} VGAU`,
      date: formatDate(order.createdAt || order.created_at),
      rawData: order
    }
  })
})

// Earn 交易筛选
const filteredEarnTransactions = computed(() => {
  if (earnActiveTab.value === 'all') {
    return processedStakeOrders.value
  }
  return processedStakeOrders.value.filter(tx => {
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

// 获取借贷订单状态文本
const getLoanStatusText = (status) => {
  const statusMap = {
    'ACTIVE': t('history.loans.status.active'),
    'COMPLETED': t('history.loans.status.completed'),
    'LIQUIDATED': t('history.loans.status.liquidated'),
    'CANCELLED': t('history.loans.status.cancelled'),
    'PENDING': t('history.loans.status.pending')
  }
  return statusMap[status] || status
}

// 获取借贷订单状态样式类
const getLoanStatusClass = (status) => {
  const classMap = {
    'ACTIVE': 'active',
    'COMPLETED': 'completed',
    'LIQUIDATED': 'liquidated',
    'CANCELLED': 'cancelled',
    'PENDING': 'pending'
  }
  return classMap[status] || 'pending'
}

           // 获取质押订单状态文本
const getStakeStatusText = (status) => {
  const statusMap = {
    'PENDING': t('history.earn.status.pending'),
    'ACTIVE': t('history.earn.status.staking'),
    'COMPLETED': t('history.earn.status.completed'),
    'CANCELLED': t('history.earn.status.cancelled'),
    'REDEEMED': t('history.earn.status.redeemed'),
    'TO_CLAIM': t('history.earn.status.toClaim')
  }
  return statusMap[status] || status
}

// 获取质押订单状态样式类
const getStakeStatusClass = (status) => {
  const classMap = {
    'PENDING': 'pending',
    'ACTIVE': 'staking',
    'COMPLETED': 'completed',
    'CANCELLED': 'cancelled',
    'REDEEMED': 'completed',
    'TO_CLAIM': 'toClaim'
  }
  return classMap[status] || 'pending'
}

// 格式化质押率显示
const formatLtvRatio = (value) => {
  if (!value || value === null || value === undefined) {
    return '--'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '--'
  }
  
  // 转换为百分比并格式化
  const percentage = (num * 100).toFixed(2)
  return parseFloat(percentage).toString() + '%'
}

// 格式化USDT金额显示，保留小数点后四位
const formatUsdtAmount = (value) => {
  if (!value || value === null || value === undefined) {
    return '0'
  }
  
  const num = parseFloat(value)
  if (isNaN(num)) {
    return '0'
  }
  
  // 先格式化为4位小数，然后去除末尾的零
  return parseFloat(num.toFixed(4)).toString()
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

// 获取提现订单列表
const fetchWithdrawOrders = async () => {
  try {
    console.log('📡 开始获取提现订单列表...')
    
    const response = await userFundsAPI.getOperations({ opTypes: 'WITHDRAW' })
    console.log('📡 提现订单列表响应:', response)
    
    if (response && response.success && response.data && response.data.records) {
      withdrawOrders.value = response.data.records
      console.log('✅ 提现订单列表获取成功:', withdrawOrders.value.length, '条记录')
      console.log('📋 提现订单详情:', withdrawOrders.value)
    } else {
      console.warn('⚠️ 提现订单列表响应格式异常:', response)
      withdrawOrders.value = []
    }
  } catch (error) {
    console.error('❌ 获取提现订单列表失败:', error)
    console.error('❌ 错误详情:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    })
    withdrawOrders.value = []
  }
}

// 获取借贷数据
const fetchLoanData = async () => {
  try {
    console.log('📡 开始获取借贷数据...')
    
    // 只调用 summary 接口获取所有数据
    const summaryResponse = await loanAPI.getSummary()
    console.log('📡 借贷汇总响应:', summaryResponse)
    
    if (summaryResponse && summaryResponse.success && summaryResponse.data) {
      const data = summaryResponse.data
      
      // 处理统计数据
      loanData.value = {
        totalDebtUsdt: data.totalActiveDebt || '0',
        collateralAmount: data.totalActiveCollateral || '0',
        borrowedAmount: data.totalActiveLoanAmount || '0'
      }
      console.log('✅ 借贷汇总数据获取成功:', loanData.value)
      
      // 处理订单数据
      if (data.recentOrders && Array.isArray(data.recentOrders)) {
        loanOrders.value = data.recentOrders
        console.log('✅ 借贷订单列表获取成功:', loanOrders.value.length, '条记录')
        console.log('📋 订单详情:', loanOrders.value)
      } else {
        console.log('📋 summary接口没有返回订单数据')
        loanOrders.value = []
      }
    } else {
      console.warn('⚠️ 借贷汇总响应格式异常:', summaryResponse)
      loanData.value = {
        totalDebtUsdt: '0',
        collateralAmount: '0',
        borrowedAmount: '0'
      }
    }
  } catch (error) {
    console.error('❌ 获取借贷数据失败:', error)
    console.error('❌ 错误详情:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    })
    loanData.value = {
      totalDebtUsdt: '0',
      collateralAmount: '0',
      borrowedAmount: '0'
    }
    loanOrders.value = []
  }
}

// 获取质押订单数据
const fetchStakeOrders = async () => {
  try {
    console.log('📡 开始获取质押订单数据...')
    
    const response = await stakeAPI.getOrders()
    console.log('📡 质押订单响应:', response)
    
    if (response && response.data) {
      let orders = []
      if (Array.isArray(response.data)) {
        orders = response.data
      } else if (response.data.records && Array.isArray(response.data.records)) {
        orders = response.data.records
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        orders = response.data.orders
      } else if (response.data.list && Array.isArray(response.data.list)) {
        orders = response.data.list
      }
      
      stakeOrders.value = orders
      console.log('✅ 质押订单列表获取成功:', stakeOrders.value.length, '条记录')
      console.log('📋 质押订单详情:', stakeOrders.value)
      
      // 调试质押订单字段
      if (stakeOrders.value.length > 0) {
        console.log('🔍 第一个质押订单字段详情:', {
          orderId: stakeOrders.value[0].orderId || stakeOrders.value[0].id,
          status: stakeOrders.value[0].status,
          stakeAmount: stakeOrders.value[0].stakeAmount,
          amount: stakeOrders.value[0].amount,
          createdAt: stakeOrders.value[0].createdAt || stakeOrders.value[0].created_at
        })
      }
    } else {
      console.warn('⚠️ 质押订单响应格式异常:', response)
      stakeOrders.value = []
    }
  } catch (error) {
    console.error('❌ 获取质押订单列表失败:', error)
    console.error('❌ 错误详情:', {
      message: error.message,
      stack: error.stack,
      response: error.response
    })
    uni.showToast({
      title: t('common.error.networkError'),
      icon: 'none',
      duration: 2000
    })
    stakeOrders.value = []
  }
}





// 查看交易详情
const viewTransactionDetail = (transaction) => {
  // 如果有原始数据，传递原始数据
  if (transaction.rawData) {
    const detailData = {
      type: transaction.type,
      amount: transaction.amount,
      amountClass: transaction.amountClass,
      currency: transaction.rawData.currency, // 传递币种信息
      status: transaction.rawData.status, // 使用原始状态值
      createdAt: transaction.rawData.createdAt || transaction.rawData.createTime, // 支持充值记录的createdAt和提现记录的createTime
      orderId: transaction.rawData.orderId || transaction.rawData.id, // 支持不同的ID字段
      fromAddress: transaction.rawData.fromAddress || transaction.rawData.targetWalletAddress, // 支持充值记录的fromAddress和提现记录的targetWalletAddress
      transactionHash: transaction.rawData.txHash || transaction.rawData.onchainTxHash, // 支持不同的交易哈希字段
      rawData: transaction.rawData // 传递完整的原始数据
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
  console.log('🔍 点击质押详情，原始数据:', transaction.rawData)
  
  if (transaction.rawData) {
    // 如果有原始数据，传递订单信息 - 使用正确的字段名
    const orderData = {
      orderId: transaction.rawData.orderId || transaction.rawData.id,
      status: transaction.rawData.status,
      amount: transaction.rawData.amount,
      lockDays: transaction.rawData.lockDays || transaction.rawData.days || '',
      annualRate: transaction.rawData.annualRate || transaction.rawData.apy || '',
      createTime: transaction.rawData.createTime || transaction.rawData.createdAt || transaction.rawData.startDate,
      endTime: transaction.rawData.endTime || transaction.rawData.expiresAt || transaction.rawData.endDate,
      completed: transaction.statusClass === 'completed' ? 'true' : 'false'
    }
    
    console.log('🔍 传递到质押详情的参数:', orderData)
    
    const query = Object.entries(orderData).map(([k,v]) => `${k}=${encodeURIComponent(v || '')}`).join('&')
    uni.navigateTo({
      url: `/views/StakingDetail?${query}`
    })
  } else {
    // 默认情况
    const params = {
      lockDays: '',
      annualRate: '',
      orderId: '',
      createTime: '',
      endTime: '',
      completed: transaction.statusClass === 'completed' ? 'true' : 'false'
    }
    console.log('🔍 默认参数:', params)
    const query = Object.entries(params).map(([k,v]) => `${k}=${encodeURIComponent(v)}`).join('&')
    uni.navigateTo({
      url: `/views/StakingDetail?${query}`
    })
  }
}


// 前往借贷详情
const goToBorrowingDetail = (order) => {
  if (order && order.orderNumber) {
    // 如果有订单号，传递订单信息
    const orderData = {
      orderNumber: order.orderNumber,
      status: order.status,
      collateralAmount: order.collateralAmount,
      loanAmount: order.loanAmount,
      currentLtvRatio: order.currentLtvRatio
    }
    uni.navigateTo({
      url: `/views/BorrowingDetail?order=${encodeURIComponent(JSON.stringify(orderData))}`
    })
  } else {
    // 默认情况
    uni.navigateTo({
      url: `/views/BorrowingDetail?status=borrowing`
    })
  }
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
  fetchWithdrawOrders()
  fetchLoanData()
  fetchStakeOrders()
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

/* 借贷订单列表样式 */
.loan-orders-list {
  margin-bottom: 32rpx;
}

.list-title {
  margin-bottom: 24rpx;
}

.list-title .title-text {
  font-size: 32rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.loan-order-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  padding: 24rpx;
  transition: all 0.3s ease;
}

.loan-order-item:active {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(0.98);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.order-status {
  font-size: 32rpx;
  font-weight: 500;
}

.order-status.active {
  color: #00CC66;
}

.order-status.completed {
  color: #FFFFFF;
}

.order-status.liquidated {
  color: #FF6B6B;
}

.order-status.cancelled {
  color: rgba(255, 255, 255, 0.5);
}

.order-status.pending {
  color: #FFA500;
}

.order-number {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
}

.details-btn {
  padding: 12rpx 24rpx;
  background: #333333;
  border: 1rpx solid #444444;
  border-radius: 24rpx;
  min-width: 100rpx;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-btn:active {
  background: #444444;
  transform: scale(0.95);
}

.details-text {
  font-size: 24rpx;
  color: #FFFFFF;
  font-weight: 500;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.order-details .detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-details .detail-label {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.order-details .detail-value {
  font-size: 28rpx;
  color: #FFFFFF;
  font-weight: 500;
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
  gap: 12rpx;
  align-items: flex-end;
  justify-content: center;
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

.earn-transaction-time {
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
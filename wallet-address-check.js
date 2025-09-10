// 钱包地址检测脚本
// 在浏览器控制台中运行此脚本来检测当前连接的钱包地址

console.log('🔍 钱包地址检测开始...\n');

// 1. 检查localStorage中的钱包地址
console.log('📦 localStorage中的钱包地址信息:');
const connectedWalletAddress = localStorage.getItem('connectedWalletAddress');
const walletConnectedAt = localStorage.getItem('walletConnectedAt');
const walletLastConnectedAt = localStorage.getItem('walletLastConnectedAt');
const walletDisconnectedAt = localStorage.getItem('walletDisconnectedAt');
const walletManuallyDisconnected = localStorage.getItem('walletManuallyDisconnected');

console.log('  - connectedWalletAddress:', connectedWalletAddress);
console.log('  - walletConnectedAt:', walletConnectedAt);
console.log('  - walletLastConnectedAt:', walletLastConnectedAt);
console.log('  - walletDisconnectedAt:', walletDisconnectedAt);
console.log('  - walletManuallyDisconnected:', walletManuallyDisconnected);

// 2. 检查MetaMask状态
console.log('\n🦊 MetaMask状态:');
if (typeof window.ethereum !== 'undefined') {
  console.log('  - MetaMask已安装');
  
  // 获取当前选中的地址
  window.ethereum.request({ method: 'eth_accounts' })
    .then(accounts => {
      console.log('  - 当前选中的地址:', accounts);
      console.log('  - 地址数量:', accounts.length);
      
      if (accounts.length > 0) {
        console.log('  - 第一个地址:', accounts[0]);
      }
    })
    .catch(error => {
      console.error('  - 获取地址失败:', error);
    });
  
  // 获取当前网络
  window.ethereum.request({ method: 'eth_chainId' })
    .then(chainId => {
      console.log('  - 当前网络ID:', chainId);
      console.log('  - 网络ID (十进制):', parseInt(chainId, 16));
    })
    .catch(error => {
      console.error('  - 获取网络失败:', error);
    });
} else {
  console.log('  - MetaMask未安装');
}

// 3. 检查Vue应用状态（如果可用）
console.log('\n⚛️ Vue应用状态:');
if (typeof window !== 'undefined' && window.document) {
  // 尝试获取Vue应用实例
  const app = document.querySelector('#app') || document.querySelector('[data-v-app]');
  if (app) {
    console.log('  - Vue应用已挂载');
    
    // 检查是否有全局的web3Service
    if (window.web3Service) {
      console.log('  - web3Service可用');
      console.log('    - isConnected:', window.web3Service.isConnected);
      console.log('    - currentAccount:', window.web3Service.currentAccount);
    } else {
      console.log('  - web3Service不可用');
    }
  } else {
    console.log('  - Vue应用未找到');
  }
}

// 4. 检查页面中的钱包地址显示
console.log('\n🖥️ 页面显示的钱包地址:');
const walletElements = document.querySelectorAll('[class*="wallet"], [class*="address"], [class*="account"]');
console.log('  - 找到的钱包相关元素数量:', walletElements.length);

walletElements.forEach((element, index) => {
  const text = element.textContent?.trim();
  if (text && text.length > 10 && text.includes('0x')) {
    console.log(`  - 元素 ${index + 1}:`, text);
  }
});

// 5. 检查所有localStorage中的钱包相关数据
console.log('\n📋 所有localStorage中的钱包相关数据:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key && (key.includes('wallet') || key.includes('address') || key.includes('account'))) {
    const value = localStorage.getItem(key);
    console.log(`  - ${key}:`, value);
  }
}

console.log('\n✅ 钱包地址检测完成！');
console.log('\n💡 提示:');
console.log('  - 如果connectedWalletAddress存在，应用会使用这个地址');
console.log('  - 如果walletManuallyDisconnected为true，应用不会自动连接');
console.log('  - MetaMask中的地址变化不会影响应用显示的地址');
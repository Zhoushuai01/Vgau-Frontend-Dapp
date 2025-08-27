/**
 * 格式化钱包地址，只显示前几位和后几位，中间用...替代
 * @param {string} address - 完整的钱包地址
 * @param {number} prefixLength - 前缀长度，默认6
 * @param {number} suffixLength - 后缀长度，默认4
 * @returns {string} 格式化后的地址
 */
export function formatWalletAddress(address, prefixLength = 6, suffixLength = 4) {
  if (!address || typeof address !== 'string') {
    return ''
  }
  
  if (address.length <= prefixLength + suffixLength + 3) {
    return address
  }
  
  const prefix = address.substring(0, prefixLength)
  const suffix = address.substring(address.length - suffixLength)
  
  return `${prefix}...${suffix}`
}

/**
 * 格式化钱包地址，显示前6位和后4位
 * @param {string} address - 完整的钱包地址
 * @returns {string} 格式化后的地址
 */
export function formatShortAddress(address) {
  return formatWalletAddress(address, 6, 4)
}

/**
 * 格式化钱包地址，显示前8位和后6位
 * @param {string} address - 完整的钱包地址
 * @returns {string} 格式化后的地址
 */
export function formatMediumAddress(address) {
  return formatWalletAddress(address, 8, 6)
} 
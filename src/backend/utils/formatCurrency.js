function formatCurrency(price) {
  return `₦${price.toLocaleString()}`
}

export default formatCurrency;
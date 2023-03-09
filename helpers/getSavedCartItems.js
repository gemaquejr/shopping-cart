const getSavedCartItems = () => {
  // seu código aqui
  const savedItems = localStorage.getItem('cartItems');
  return savedItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

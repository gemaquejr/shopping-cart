const saveCartItems = (Array) => {
  // seu código aqui
  localStorage.setItem('cartItems', Array);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}

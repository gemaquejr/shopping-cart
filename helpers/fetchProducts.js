const fetchProducts = (product) => {
  const promise = fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`)
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => error);

  return promise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}

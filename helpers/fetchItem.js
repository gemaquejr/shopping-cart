const fetchItem = (item) => {
  const promise = fetch(`https://api.mercadolibre.com/items/${item}`)
  .then((data) => data.json())
  .catch((error) => error);

  return promise;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

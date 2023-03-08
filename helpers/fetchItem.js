const fetchItem = (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
  return fetch(url)
  .then((data) => data.json())
  .then((data) => data)
  .catch((error) => error);
 };

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

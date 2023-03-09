const sectionCart = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getAllPrices() {
  const arrayAllItems = sectionCart.childNodes;
  const itemValues = [];
  arrayAllItems.forEach((item) => {
    const itemPrice = item.innerHTML.split('PRICE: $');
    itemValues.push(Number(itemPrice[1]));
  });
  return itemValues;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function setCartPrice() {
  const totalToPay = document.querySelector('.total-price');
  totalToPay.innerHTML = getAllPrices().reduce((acc, current) => acc + current, 0);
}
setCartPrice();

function cartItemClickListener(event) {
  setCartPrice();
  event.target.remove();
}
sectionCart.addEventListener('click', cartItemClickListener);

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  sectionCart.appendChild(li);
}

async function addItem(sku) {
  const searchItem = await fetchItem(sku);
  const { title: name, price: salePrice, thumbnail: image } = searchItem;
  createCartItemElement({ sku, name, salePrice, image });
  saveCartItems(sectionCart.innerHTML);
  setCartPrice();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  const productSection = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const addElement = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(addElement);
  productSection.appendChild(section);
  addElement.addEventListener('click', () => {
    saveCartItems(sectionCart.innerHTML);
    addItem(sku);
  });
}

function removeLoading() {
  const loading = document.querySelector('.loading');
  loading.remove();
}

const searchProducts = () => {
  fetchProducts('computador').then((response) => {
    response.results.forEach((products) => createProductItemElement(products));
      removeLoading();
    });
  };

  const setSavedCart = () => {
    const memory = getSavedCartItems();
    sectionCart.innerHTML = memory;
  };

  const clearList = document.querySelector('.empty-cart');
  clearList.addEventListener('click', () => {
    const allItems = document.querySelector('.cart__items');
    allItems.innerHTML = '';
    setCartPrice();
    saveCartItems(sectionCart.innerHTML);
});

window.onload = async () => {
  searchProducts();
  setSavedCart();
  setCartPrice();
 };
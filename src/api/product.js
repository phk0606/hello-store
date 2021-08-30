import { instance } from './index';

function createProduct(data) {
  return instance.post('createProduct', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getProducts() {
  return instance.get('getProducts');
}

function getProductsPage(data) {
  return instance.get('getProductsPage', { params: data });
}

function getImage() {
  return instance.get('getImage');
}

export { createProduct, getProducts, getProductsPage, getImage };

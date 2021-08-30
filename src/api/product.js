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

function getImage() {
  return instance.get('getImage');
}

export { createProduct, getProducts, getImage };

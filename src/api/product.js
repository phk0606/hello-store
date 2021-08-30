import { instance } from './index';

function createProduct(data) {
  return instance.post('createProduct', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function searchProducts() {
  return instance.get('searchProducts');
}

function getImage() {
  return instance.get('getImage');
}

export { createProduct, searchProducts, getImage };

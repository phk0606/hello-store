import { instance } from './index';

function createProduct(data) {
  return instance.post('createProduct', data);
}

export { createProduct };

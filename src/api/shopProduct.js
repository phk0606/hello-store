import { instance } from './index';

function getProductsPageCondition(data) {
  return instance.get('/shop/getProductsPageCondition', { params: data });
}

export { getProductsPageCondition };

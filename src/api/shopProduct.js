import { instance } from './index';

function getProductsPageCondition(data) {
  return instance.get('/shop/getProductsPageCondition', { params: data });
}

function getProductById(data) {
  return instance.get('/shop/getProductById', { params: data });
}

function getListImage(data) {
  return instance.get('/shop/getListImage', { params: data });
}

export { getProductsPageCondition, getProductById, getListImage };

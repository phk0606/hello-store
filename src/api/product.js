import { admin } from './index';

function createProduct(data) {
  return admin.post('/createProduct', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getProductById(data) {
  return admin.get('/getProductById', { params: data });
}

function getProductsByCategoryId(data) {
  return admin.get('/getProductsByCategoryId', { params: data });
}

function getProductsPageCondition(data) {
  return admin.get('/getProductsPageCondition', { params: data });
}

function removeProducts(productIds) {
  return admin.delete('/removeProducts', { data: productIds });
}

function modifyProduct(data) {
  return admin.put('/modifyProduct', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function modifyProductShowType(data) {
  return admin.put('/modifyProductShowType', data);
}

export {
  createProduct,
  getProductById,
  getProductsPageCondition,
  removeProducts,
  modifyProduct,
  modifyProductShowType,
  getProductsByCategoryId,
};

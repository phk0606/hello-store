import { instance } from './index';

function createProduct(data) {
  return instance.post('createProduct', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getProductById(data) {
  return instance.get('getProductById', { params: data });
}

// function getProductsPage(data) {
//   return instance.get('getProductsPage', { params: data });
// }

function getProductsPageCondition(data) {
  return instance.get('getProductsPageCondition', { params: data });
}

// function getImage() {
//   return instance.get('getImage');
// }

function removeProducts(productIds) {
  return instance.delete('removeProducts', { data: productIds });
}

function modifyProduct(data) {
  return instance.put('modifyProduct', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function modifyProductShowType(data) {
  return instance.put('modifyProductShowType', data);
}

export {
  createProduct,
  // getProductsPage,
  getProductById,
  getProductsPageCondition,
  // getImage,
  removeProducts,
  modifyProduct,
  modifyProductShowType,
};

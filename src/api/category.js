import { instance } from './index';

// 카테고리 목록
function getProductCategories() {
  return instance.get('getProductCategories');
}

function getProductCategory(data) {
  return instance.get('getProductCategory', { params: data });
}

function createProductCategory(data) {
  return instance.post('createProductCategory', data);
}

function modifyProductCategory(data) {
  return instance.post('modifyProductCategory', data);
}

function deleteProductCategory(data) {
  return instance.post('deleteProductCategory', data);
}

export {
  getProductCategories,
  getProductCategory,
  createProductCategory,
  modifyProductCategory,
  deleteProductCategory,
};

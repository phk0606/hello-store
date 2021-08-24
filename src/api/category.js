import { instance } from './index';

// 카테고리 목록
function getProductCategories() {
  return instance.get('getProductCategories');
}

function createProductCategory(name) {
  return instance.post('createProductCategory', name);
}

export { getProductCategories, createProductCategory };

import { instance } from './index';

// 카테고리 목록
function getCategories() {
  return instance.get('/getCategories');
}

function getCategory(data) {
  return instance.get('/getCategory', { params: data });
}

function createCategory(data) {
  return instance.post('/createCategory', data);
}

function modifyCategory(data) {
  return instance.post('/modifyCategory', data);
}

function deleteCategory(data) {
  return instance.post('/deleteCategory', data);
}

export {
  getCategories,
  getCategory,
  createCategory,
  modifyCategory,
  deleteCategory,
};

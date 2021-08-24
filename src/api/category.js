import { instance } from './index';

// 카테고리 목록
function getCategories() {
  return instance.get('getProductCategories');
}

export { getCategories };

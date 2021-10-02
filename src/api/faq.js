import { faq } from './index';

function getCategories(data) {
  return faq.get('/getCategories', { params: data });
}

export { getCategories };

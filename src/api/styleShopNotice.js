import { styleShopNotice } from './index';

function getCategoryNotice(data) {
  console.log(data.username);
  return styleShopNotice.get('/getCategoryNotice', { params: data });
}

function mergeNoticeContent(data) {
  return styleShopNotice.post('/mergeNoticeContent', data);
}

export { getCategoryNotice, mergeNoticeContent };

import { board } from './index';

function getCategoryNotice(data) {
  console.log(data.username);
  return board.get('/getCategoryNotice', { params: data });
}

function mergeNoticeContent(data) {
  return board.post('/mergeNoticeContent', data);
}

export { getCategoryNotice, mergeNoticeContent };

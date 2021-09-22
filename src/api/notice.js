import { notice } from './index';

function createNotice(data) {
  return notice.post('/createNotice', data);
}

function getNotices(data) {
  return notice.get('/getNotices', { params: data });
}

function getNotice(data) {
  return notice.get('/getNotice', { params: data });
}

function modifyNotice(data) {
  return notice.put('/modifyNotice', data);
}

function removeNotice(data) {
  return notice.delete('/removeNotice', { data });
}

export { createNotice, getNotices, getNotice, modifyNotice, removeNotice };

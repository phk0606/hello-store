import { productComment } from './index';

function createProductComment(data) {
  return productComment.post('/createProductComment', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function createProductCommentReply(data) {
  return productComment.post('/createProductCommentReply', data);
}

function getProductComments(data) {
  return productComment.get('/getProductComments', { params: data });
}

function getProductCommentReplyList(data) {
  return productComment.get('/getProductCommentReplyList', { params: data });
}

function modifyProductComment(data) {
  return productComment.put('/modifyProductComment', data);
}

function removeProductComment(data) {
  return productComment.delete('/removeProductComment', { data });
}

function modifyProductCommentReply(data) {
  return productComment.put('/modifyProductCommentReply', data);
}

function removeProductCommentReply(data) {
  return productComment.delete('/removeProductCommentReply', { data });
}

export {
  createProductComment,
  getProductComments,
  createProductCommentReply,
  getProductCommentReplyList,
  modifyProductComment,
  removeProductComment,
  modifyProductCommentReply,
  removeProductCommentReply,
};

import { productComment } from './index';

function createProductComment(data) {
  return productComment.post('/createProductComment', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getProductComments(data) {
  return productComment.get('/getProductComments', { params: data });
}

export { createProductComment, getProductComments };

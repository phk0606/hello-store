import { productComment } from './index';

function createProductComment(data) {
  return productComment.post('/createProductComment', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { createProductComment };

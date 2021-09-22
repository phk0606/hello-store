import { productQnA } from './index';

function createProductQuestion(data) {
  return productQnA.post('/createProductQuestion', data);
}

function createProductAnswer(data) {
  return productQnA.post('/createProductAnswer', data);
}

function getProductQnA(data) {
  return productQnA.get('/getProductQnA', { params: data });
}

export { createProductQuestion, getProductQnA, createProductAnswer };

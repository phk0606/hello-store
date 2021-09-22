import { productQnA } from './index';

function createProductQuestion(data) {
  return productQnA.post('/createProductQuestion', data);
}

function createProductAnswer(data) {
  return productQnA.post('/createProductAnswer', data);
}

function modifyQuestion(data) {
  return productQnA.put('/modifyQuestion', data);
}

function removeQuestion(data) {
  return productQnA.delete('/removeQuestion', { data });
}

function modifyAnswer(data) {
  return productQnA.put('/modifyAnswer', data);
}

function removeAnswer(data) {
  return productQnA.delete('/removeAnswer', { data });
}

function getProductQnA(data) {
  return productQnA.get('/getProductQnA', { params: data });
}

export {
  createProductQuestion,
  getProductQnA,
  createProductAnswer,
  modifyQuestion,
  removeQuestion,
  modifyAnswer,
  removeAnswer,
};

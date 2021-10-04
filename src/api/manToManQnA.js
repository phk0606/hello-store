import { manToManQnA } from './index';

function getManToManQuestionTypes(data) {
  return manToManQnA.get('/getManToManQuestionTypes', { params: data });
}

function createManToManQuestion(data) {
  return manToManQnA.post('/createManToManQuestion', data);
}

function getManToManQuestions(data) {
  return manToManQnA.get('/getManToManQuestions', { params: data });
}

function getManToManQnA(data) {
  return manToManQnA.get('/getManToManQnA', { params: data });
}

export {
  createManToManQuestion,
  getManToManQnA,
  getManToManQuestions,
  getManToManQuestionTypes,
};

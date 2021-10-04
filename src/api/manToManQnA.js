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

function createOrModifyAnswer(data) {
  return manToManQnA.post('/createOrModifyAnswer', data);
}

function modifyManToManQuestion(data) {
  return manToManQnA.put('/modifyManToManQuestion', data);
}

function removeManToManQuestion(data) {
  return manToManQnA.delete('/removeManToManQuestion', { data });
}

function removeManToManAnswer(data) {
  return manToManQnA.delete('/removeManToManAnswer', { data });
}

export {
  createManToManQuestion,
  getManToManQnA,
  getManToManQuestions,
  getManToManQuestionTypes,
  createOrModifyAnswer,
  modifyManToManQuestion,
  removeManToManQuestion,
  removeManToManAnswer,
};

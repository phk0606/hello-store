import { faq } from './index';

function getCategories(data) {
  return faq.get('/getCategories', { params: data });
}

function getFaqs(data) {
  return faq.get('/getFaqs', { params: data });
}

function getFaq(data) {
  return faq.get('/getFaq', { params: data });
}

function createFaq(data) {
  return faq.post('/createFaq', data);
}

function modifyFaq(data) {
  return faq.put('/modifyFaq', data);
}

function removeFaq(data) {
  return faq.delete('/removeFaq', { data });
}

export { getCategories, createFaq, getFaqs, getFaq, modifyFaq, removeFaq };

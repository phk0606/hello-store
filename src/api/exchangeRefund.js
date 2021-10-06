import { exchangeRefund } from './index';

function createExchangeRefund(data) {
  return exchangeRefund.post('/createExchangeRefund', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getExchangeRefunds(data) {
  return exchangeRefund.get('/getExchangeRefunds', { params: data });
}

export { createExchangeRefund, getExchangeRefunds };

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

function getExchangeRefund(data) {
  return exchangeRefund.get('/getExchangeRefund', { params: data });
}

function modifyExchangeRefundStatus(data) {
  return exchangeRefund.put('/modifyExchangeRefundStatus', data);
}

export {
  createExchangeRefund,
  getExchangeRefunds,
  getExchangeRefund,
  modifyExchangeRefundStatus,
};

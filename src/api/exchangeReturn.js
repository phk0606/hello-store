import { exchangeReturn } from './index';

function createExchangeReturn(data) {
  return exchangeReturn.post('/createExchangeReturn', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

function getExchangeReturns(data) {
  return exchangeReturn.get('/getExchangeReturns', { params: data });
}

function getExchangeReturn(data) {
  return exchangeReturn.get('/getExchangeReturn', { params: data });
}

function modifyExchangeReturn(data) {
  return exchangeReturn.put('/modifyExchangeReturn', data);
}

function modifyExchangeReturnStatus(data) {
  return exchangeReturn.put('/modifyExchangeReturnStatus', data);
}

function removeExchangeReturn(data) {
  return exchangeReturn.delete('/removeExchangeReturn', { data });
}

export {
  createExchangeReturn,
  getExchangeReturns,
  getExchangeReturn,
  modifyExchangeReturnStatus,
  modifyExchangeReturn,
  removeExchangeReturn,
};

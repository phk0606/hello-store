import { exchangeRefund } from './index';

function createExchangeRefund(data) {
  return exchangeRefund.post('/createExchangeRefund', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export { createExchangeRefund };

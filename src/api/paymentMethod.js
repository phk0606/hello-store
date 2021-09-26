import { paymentMethod } from './index';

function modifyPaymentMethod(data) {
  return paymentMethod.put('/modifyPaymentMethod', data);
}

function getPaymentMethodTypes() {
  return paymentMethod.get('/getPaymentMethodTypes');
}

export { modifyPaymentMethod, getPaymentMethodTypes };

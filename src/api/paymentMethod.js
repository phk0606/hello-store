import { paymentMethod } from './index';

function modifyPaymentMethod(data) {
  return paymentMethod.put('/modifyPaymentMethod', data);
}

function getPaymentMethodTypes() {
  return paymentMethod.get('/getPaymentMethodTypes');
}

function getPaymentMethodTypesWithValues() {
  return paymentMethod.get('/getPaymentMethodTypesWithValues');
}

export {
  modifyPaymentMethod,
  getPaymentMethodTypes,
  getPaymentMethodTypesWithValues,
};

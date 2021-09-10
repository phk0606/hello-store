import { order } from './index';

function createOrder(data) {
  return order.post('/createOrder', data);
}

function getOrder(data) {
  return order.get('/getOrder', { params: data });
}

export { createOrder, getOrder };

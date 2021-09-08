import { order } from './index';

function createOrder(data) {
  return order.post('/createOrder', data);
}

export { createOrder };

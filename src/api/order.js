import { order } from './index';

function createOrder(data) {
  return order.post('/createOrder', data);
}

function getOrder(data) {
  return order.get('/getOrder', { params: data });
}

function getOrdersByUsername(data) {
  return order.get('/getOrdersByUsername', { params: data });
}

function getOrders(data) {
  return order.get('/getOrders', { params: data });
}

function modifyOrdererPhoneNumber(data) {
  return order.put('/modifyOrdererPhoneNumber', data);
}

function modifyDeliveryInfo(data) {
  return order.put('/modifyDeliveryInfo', data);
}

function modifyOrderDeliveryStatus(data) {
  return order.put('/modifyOrderDeliveryStatus', data);
}

function orderCancel(data) {
  return order.put('/orderCancel', data);
}

export {
  createOrder,
  getOrder,
  getOrders,
  getOrdersByUsername,
  modifyOrdererPhoneNumber,
  modifyDeliveryInfo,
  orderCancel,
  modifyOrderDeliveryStatus,
};

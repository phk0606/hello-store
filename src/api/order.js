import { order } from './index';

function createOrder(data) {
  return order.post('/createOrder', data);
}

function createExchangeReturnOrder(data) {
  return order.post('/createExchangeReturnOrder', data);
}

function getOrder(data) {
  return order.get('/getOrder', { params: data });
}

function getOrdersByUsername(data) {
  return order.get('/getOrdersByUsername', { params: data });
}

function getOrderProductsByUsername(data) {
  return order.get('/getOrderProductsByUsername', { params: data });
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

function modifyPaymentStatus(data) {
  return order.put('/modifyPaymentStatus', data);
}

function modifyOrder(data) {
  return order.put('/modifyOrder', data);
}

function orderCancel(data) {
  return order.put('/orderCancel', data);
}

export {
  createOrder,
  getOrder,
  getOrders,
  getOrdersByUsername,
  getOrderProductsByUsername,
  modifyOrdererPhoneNumber,
  modifyDeliveryInfo,
  orderCancel,
  modifyOrderDeliveryStatus,
  modifyPaymentStatus,
  modifyOrder,
  createExchangeReturnOrder,
};

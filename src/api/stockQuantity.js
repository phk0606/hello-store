import { stockQuantity } from './index';

function getFirstOptionsInStockQuantity(data) {
  return stockQuantity.get('/getFirstOptionsInStockQuantity', { params: data });
}

function getSecondOptionsInStockQuantity(data) {
  return stockQuantity.get('/getSecondOptionsInStockQuantity', {
    params: data,
  });
}

function getStockQuantities(data) {
  return stockQuantity.get('/getStockQuantities', { params: data });
}

function modifyStockQuantity(data) {
  return stockQuantity.put('/modifyStockQuantity', data);
}

function createStockQuantity(data) {
  return stockQuantity.post('/createStockQuantity', data);
}

export {
  getStockQuantities,
  modifyStockQuantity,
  createStockQuantity,
  getFirstOptionsInStockQuantity,
  getSecondOptionsInStockQuantity,
};

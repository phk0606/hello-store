import { stockQuantity } from './index';

function getStockQuantities(data) {
  return stockQuantity.get('/getStockQuantities', { params: data });
}

function modifyStockQuantity(data) {
  return stockQuantity.put('/modifyStockQuantity', data);
}

function createStockQuantity(data) {
  return stockQuantity.post('/createStockQuantity', data);
}

export { getStockQuantities, modifyStockQuantity, createStockQuantity };

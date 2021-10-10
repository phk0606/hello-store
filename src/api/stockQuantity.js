import { stockQuantity } from './index';

function getStockQuantities(data) {
  return stockQuantity.get('/getStockQuantities', { params: data });
}

function modifyStockQuantity(data) {
  return stockQuantity.put('/modifyStockQuantity', data);
}

export { getStockQuantities, modifyStockQuantity };

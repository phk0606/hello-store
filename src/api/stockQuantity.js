import { stockQuantity } from './index';

function getStockQuantities(data) {
  return stockQuantity.get('/getStockQuantities', { params: data });
}

export { getStockQuantities };

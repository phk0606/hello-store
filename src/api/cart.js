import { cart } from './index';

function addCartProduct(data) {
  return cart.post('/addCartProduct', data);
}

export { addCartProduct };

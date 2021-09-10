import { cart } from './index';

function addCartProduct(data) {
  return cart.post('/addCartProduct', data);
}

function getCartProducts(data) {
  return cart.get('/getCartProducts', { params: data });
}

export { addCartProduct, getCartProducts };

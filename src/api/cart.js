import { cart } from './index';

function addCartProduct(data) {
  return cart.post('/addCartProduct', data);
}

function getCartProducts(data) {
  return cart.get('/getCartProducts', { params: data });
}

function modifyQuantity(data) {
  return cart.put('/modifyQuantity', data);
}

function removeCartProducts(data) {
  return cart.delete('/removeCartProducts', { data });
}

export { addCartProduct, getCartProducts, modifyQuantity, removeCartProducts };

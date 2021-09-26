import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const admin = createInstanceWithAuth('/admin');
export const user = createInstanceWithAuth('/user');
export const order = createInstanceWithAuth('/order');
export const cart = createInstanceWithAuth('/cart');
export const styleShopNotice = createInstanceWithAuth('/styleShopNotice');
export const productComment = createInstanceWithAuth('/productComment');
export const productQnA = createInstanceWithAuth('/productQnA');
export const notice = createInstanceWithAuth('/notice');
export const community = createInstanceWithAuth('/community');
export const policy = createInstanceWithAuth('/policy');
export const bankAccount = createInstanceWithAuth('/bankAccount');
export const paymentMethod = createInstanceWithAuth('/paymentMethod');

export const posts = createInstanceWithAuth('posts');

// GET - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}

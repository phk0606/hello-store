import { productOption } from './index';

function getFirstOptions(data) {
  return productOption.get('/getFirstOptions', { params: data });
}

function getSecondOptions(data) {
  return productOption.get('/getSecondOptions', { params: data });
}

export { getFirstOptions, getSecondOptions };

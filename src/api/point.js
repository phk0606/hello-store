import { point } from './index';

function getPoint(data) {
  console.log(data.username);
  return point.get('/getPoint');
}

export { getPoint };

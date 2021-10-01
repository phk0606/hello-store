import { pointHistory } from './index';

function getPointHistory(data) {
  console.log(data.username);
  return pointHistory.get('/getPointHistory', { params: data });
}

function getUserHavePoint(data) {
  console.log(data.username);
  return pointHistory.get('/getUserHavePoint', { params: data });
}

export { getPointHistory, getUserHavePoint };

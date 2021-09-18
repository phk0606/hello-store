import { user } from './index';

function getUser(data) {
  console.log(data.username);
  return user.get(`/${data.username}`);
}

function getUsers(data) {
  return user.get('/getUsers', { params: data });
}

export { getUser, getUsers };

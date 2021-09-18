import { user } from './index';

function getUser(data) {
  console.log(data.username);
  return user.get(`/${data.username}`);
}

function getUsers() {
  return user.get('/getUsers');
}

export { getUser, getUsers };

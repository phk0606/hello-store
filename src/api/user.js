import { user } from './index';

function getUser(data) {
  console.log(data.username);
  return user.get(`/${data.username}`);
}

function getUsers(data) {
  return user.get('/getUsers', { params: data });
}

function modifyUser(data) {
  return user.put('/modifyUser', data);
}

export { getUser, getUsers, modifyUser };

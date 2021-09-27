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

function modifyPerson(data) {
  return user.put('/modifyPerson', data);
}

function modifyPassword(data) {
  return user.put('/modifyPassword', data);
}

function getUsername(data) {
  console.log(data.username);
  return user.get('/getUsername', { params: data });
}

export {
  getUser,
  getUsers,
  modifyUser,
  getUsername,
  modifyPerson,
  modifyPassword,
};

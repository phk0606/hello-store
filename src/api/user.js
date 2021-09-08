import { user } from './index';

function getUser(data) {
  console.log(data.username);
  return user.get(`/${data.username}`);
}

export { getUser };

import { notice } from './index';

function createNotice(data) {
  return notice.post('/createNotice', data);
}

export { createNotice };

import { event } from './index';

function createEvent(data) {
  return event.post('/createEvent', data);
}

function getEvents(data) {
  return event.get('/getEvents', { params: data });
}

export { createEvent, getEvents };

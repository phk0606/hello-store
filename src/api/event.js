import { event } from './index';

function createEvent(data) {
  return event.post('/createEvent', data);
}

function getEvents(data) {
  return event.get('/getEvents', { params: data });
}

function getEvent(data) {
  return event.get('/getEvent', { params: data });
}

export { createEvent, getEvents, getEvent };

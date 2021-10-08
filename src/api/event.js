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

function modifyEvent(data) {
  return event.put('/modifyEvent', data);
}

function removeEvents(eventIds) {
  return event.delete('/removeEvents', { data: eventIds });
}

export { createEvent, getEvents, getEvent, modifyEvent, removeEvents };

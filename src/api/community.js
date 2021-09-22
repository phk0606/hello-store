import { community } from './index';

function createCommunity(data) {
  return community.post('/createCommunity', data);
}

function getCommunities(data) {
  return community.get('/getCommunities', { params: data });
}

function getCommunity(data) {
  return community.get('/getCommunity', { params: data });
}

function modifyCommunity(data) {
  return community.put('/modifyCommunity', data);
}

function removeCommunity(data) {
  return community.delete('/removeCommunity', { data });
}

export {
  createCommunity,
  getCommunities,
  getCommunity,
  modifyCommunity,
  removeCommunity,
};

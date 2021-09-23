import { community } from './index';

function createCommunity(data) {
  return community.post('/createCommunity', data);
}

function createCommunityReply(data) {
  return community.post('/createCommunityReply', data);
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

function modifyCommunityReply(data) {
  return community.put('/modifyCommunityReply', data);
}

function removeCommunityReply(data) {
  return community.delete('/removeCommunityReply', { data });
}

export {
  createCommunity,
  getCommunities,
  getCommunity,
  modifyCommunity,
  removeCommunity,
  createCommunityReply,
  modifyCommunityReply,
  removeCommunityReply,
};

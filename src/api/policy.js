import { policy } from './index';

function getPolicy(data) {
  console.log(data.policyId);
  return policy.get('/getPolicy', { params: data });
}

function mergePolicy(data) {
  return policy.post('/mergePolicy', data);
}

export { getPolicy, mergePolicy };

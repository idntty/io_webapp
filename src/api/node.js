import { fetchWrapper } from '../shared/fetchWrapper';

export const getNodeInfo = (headers) => fetchWrapper.get('node/info/', headers);

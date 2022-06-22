import {registrationStore} from '../store/store';

function prepareUrl(url) {
  if (url.startsWith('http')) return url;
  return `http://3.125.47.101/api/${url}`;
}

function handleRequest(method, url, headers, attempts, token, body) {
  return new Promise((resolve, reject) => {
    (function internalRequest() {
      return request(method, url, headers, token, body)
        .then(resolve)
        .catch(err => --attempts > 0 ? internalRequest() : reject(err))
    })()
  })
    .then((res) => res.json())
    .catch(() => [])
};

/**
 * Request
 * @param {string} method - method name
 * @param {string} url - endpoint url.
 * @param {string} token - auth token
 * @param {object} body - request body.
 * @param {object} headers - request headers
 */
function request(method, url, headers = {}, token, body) {
  let controller = new AbortController;
  let requestOptions = {};
  if (method === 'GET' || method === 'DELETE'){
    requestOptions = {
      method: method,
      headers: {
        authorization: `IDNTTY ${token}`,
        ...headers
      },
      signal: controller.signal,
    }
  };
  if (method === 'POST' || method === 'PUT'){
    requestOptions = {
      method: method,
      headers: {
        authorization: `IDNTTY ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    }
  };
  if (!token) {
    requestOptions.headers.Authorization = null;
  }
  setTimeout(() => controller.abort(), 3000);
  return fetch(prepareUrl(url), requestOptions);
};

function get(url, headers, attempts = 1) {
  return handleRequest('GET', url, headers, attempts, null);
}

function getAuth(url, headers, attempts = 1) {
  return handleRequest('GET', url, headers, attempts, registrationStore.tokenKey);
}

function del(url, headers, attempts = 1) {
  return handleRequest('DELETE', url, headers, attempts, null);
}

function delAuth(url, headers, attempts = 1) {
  return handleRequest('DELETE', url, headers, attempts, registrationStore.tokenKey);
}

function post(url, headers, body, attempts = 1) {
  return handleRequest('POST', url, headers, attempts, null, body);
}

function postAuth(url, headers, body, attempts = 1) {
  return handleRequest('POST', url, headers, attempts, registrationStore.tokenKey, body);
}

function put(url, headers, body, attempts = 1) {
  return handleRequest('PUT', url, headers, attempts, null, body);
}

function putAuth(url, headers, body, attempts = 1) {
  return handleRequest('PUT', url, headers, attempts, registrationStore.tokenKey, body);
}

export const fetchWrapper = {
  get,
  del,
  post,
  put,
  getAuth,
  delAuth,
  postAuth,
  putAuth,
  baseUrl: ''
};
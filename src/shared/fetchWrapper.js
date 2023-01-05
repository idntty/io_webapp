import { store } from '../store/store';
import { jsonReplacer } from '../utils/Utils';

function prepareUrl(url) {
  if (url.startsWith('http')) return url;
  return `${fetchWrapper.baseUrl}${url}`;
}

function handleRequest(method, url, headers, attempts, token, body) {
  return new Promise((resolve, reject) => {
    (function internalRequest() {
      if (store) store.loading = true;
      return request(method, url, headers, token, body)
        .then(resolve)
        .catch((err) => (--attempts > 0 ? internalRequest() : reject(err)));
    })();
  })
    .then((res) => {
      store.loading = false;
      return res.json();
    })
    .catch((err) => {
      store.loading = false;
      console.log(err);
      return {};
    });
}

/**
 * Request
 * @param {string} method - method name
 * @param {string} url - endpoint url.
 * @param {string} token - auth token
 * @param {object} body - request body.
 * @param {object} headers - request headers
 */
function request(method, url, headers = {}, token, body) {
  let controller = new AbortController();
  let requestOptions = {};
  if (method === 'GET' || method === 'DELETE') {
    requestOptions = {
      method: method,
      headers: {
        Authorization: `IDNTTY ${token}`,
        ...headers,
      },
      signal: controller.signal,
    };
  }
  if (method === 'POST' || method === 'PUT') {
    requestOptions = {
      method: method,
      headers: {
        Authorization: `IDNTTY ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body, jsonReplacer),
      signal: controller.signal,
    };
  }
  if (!token) {
    requestOptions.headers.Authorization = null;
  }
  setTimeout(() => controller.abort(), 30000);
  return fetch(prepareUrl(url), requestOptions).then((res) => {
    if (res.status > 400) {
      store.addNotification(new Date().getTime(), 'error', res.statusText);
    }
    return res;
  });
}

function get(url, headers, attempts = 3) {
  return handleRequest('GET', url, headers, attempts, null);
}

function getAuth(url, headers, attempts = 3) {
  return handleRequest('GET', url, headers, attempts, store.tokenKey);
}

function del(url, headers, attempts = 3) {
  return handleRequest('DELETE', url, headers, attempts, null);
}

function delAuth(url, headers, attempts = 3) {
  return handleRequest('DELETE', url, headers, attempts, store.tokenKey);
}

function post(url, headers, body, attempts = 3) {
  return handleRequest('POST', url, headers, attempts, null, body);
}

function postAuth(url, headers, body, attempts = 3) {
  return handleRequest('POST', url, headers, attempts, store.tokenKey, body);
}

function put(url, headers, body, attempts = 3) {
  return handleRequest('PUT', url, headers, attempts, null, body);
}

function putAuth(url, headers, body, attempts = 3) {
  return handleRequest('PUT', url, headers, attempts, store.tokenKey, body);
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
  baseUrl: '',
};

fetchWrapper.baseUrl = `${window.location.origin}/api/`;

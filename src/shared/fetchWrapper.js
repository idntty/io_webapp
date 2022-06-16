function prepareUrl(url) {
  if (url.startsWith('http')) return url;
  return `/api/${url}`;
}

function handleRequest(method, url, attempts, token, body) {
  return new Promise((resolve, reject) => {
    (function internalRequest() {
      return request(method, url, token, body)
        .then(resolve)
        .catch(err => --attempts > 0 ? internalRequest() : reject(err))
    })()
  })
    .then((res) => res.json())
    .catch(() => [])
};

/**
 * Request
 * @param {string} url - endpoint url.
 * @param {object} body - request body.
 */
function request(method, url, token, body) {
  let controller = new AbortController;
  let requestOptions = {};
  if (method === 'GET' || method === 'DELETE'){
    requestOptions = {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
      },
      signal: controller.signal,
    }
  };
  if (method === 'POST' || method === 'PUT'){
    requestOptions = {
      method: method,
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    }
  };
  setTimeout(() => controller.abort(), 3000);
  return fetch(url, requestOptions);
};

function get(url, attempts = 1) {
  return handleRequest('GET', url, attempts, null);
}

function getAuth(url, attempts = 1) {
  return handleRequest('GET', url, attempts, registrationStore.tokenKey);
}

function del(url, attempts = 1) {
  return handleRequest('DELETE', url, attempts, null);
}

function delAuth(url, attempts = 1) {
  return handleRequest('DELETE', url, attempts, registrationStore.tokenKey);
}

function post(url, body, attempts = 1) {
  return handleRequest('POST', url, attempts, null, body);
}

function postAuth(url, body, attempts = 1) {
  return handleRequest('POST', url, attempts, registrationStore.tokenKey, body);
}

function put(url, body, attempts = 1) {
  return handleRequest('PUT', url, attempts, null, body);
}

function putAuth(url, body, attempts = 1) {
  return handleRequest('PUT', url, attempts, registrationStore.tokenKey, body);
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
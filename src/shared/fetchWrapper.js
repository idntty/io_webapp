function prepareUrl(url) {
  if (url.startsWith('http')) return url;
  return `/api/${url}`;
}

function handleRequest(method, url, attempts, body) {
  return new Promise((resolve, reject) => {
    (function internalRequest() {
      return request(method, url, body)
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
function request(method, url, body) {
  let controller = new AbortController;
  let requestOptions = {};
  if (method === 'get' || method === 'del'){
    requestOptions = {
      method: `${method.toUpperCase()}`,
      signal: controller.signal,
    }
  };
  if (method === 'post' || method === 'put'){
    requestOptions = {
      method: `${method.toUpperCase()}`,
      headers: {
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
  return handleRequest('get', url, attempts);
}

function del(url, attempts = 1) {
  return handleRequest('del', url, attempts);
}

function post(url, body, attempts = 1) {
  return handleRequest('post', url, attempts, body);
}

function put(url, body, attempts = 1) {
  return handleRequest('put', url, attempts, body);
}

export const fetchWrapper = {
  get,
  del,
  post,
  put,
  baseUrl: ''
};
import { ofetch } from 'ofetch';

const METHODS_WITH_BODY = ['POST', 'PUT', 'PATCH'];

function makeRequest(method, url, data) {
  let reqUrl = url;
  const opts = { method };

  if (!METHODS_WITH_BODY.includes(method)) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('data', JSON.stringify(data));
    reqUrl = urlObj.toString();
  } else {
    opts.body = data;
  }

  return ofetch(reqUrl, opts);
}

export const methods = {
  get(data, { url }) {
    return makeRequest('GET', url, data);
  },
  post(data, { url }) {
    return makeRequest('POST', url, data);
  },
  put(data, { url }) {
    return makeRequest('PUT', url, data);
  },
  patch(data, { url }) {
    return makeRequest('PATCH', url, data);
  },
  delete(data, { url }) {
    return makeRequest('DELETE', url, data);
  }
};

const RequestTimeout = 600 * 1000;
const RequesttimeoutMessage = 'Request timed out';

const RequestService = function () {
  let token = '';

  const parseUrlParam = (key, value) => {
    if (Array.isArray(value)) {
      return value.reduce(
        (accumulator, value, currentIndex, array) => (
          `${accumulator}${key}[]=${value}${currentIndex === array.length - 1 ? '' : '&'}`
        ), ''
      );
    } else {
      return `${key}=${value === undefined || value === null ? '' : value}`;
    }
  };

  const urlWithParams = data => Object.keys(data).reduce(
    (accumulator, key, currentIndex, array) => (
      `${accumulator}${parseUrlParam(key, data[key])}${currentIndex === array.length - 1 ? '' : '&'}`
    ), ''
  );


  const _fetch = (url, method = 'GET', body, rawResponse, signal) => {
    let didTimeOut = false;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        didTimeOut = true;
        reject(new Error(RequesttimeoutMessage));
      }, RequestTimeout);

      fetch(API_BASE_URL + url, {
        method,
        signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
        body: body ? JSON.stringify(body) : undefined,
      }).then(response => {
        clearTimeout(timeout);

        if (!didTimeOut) {
          if (rawResponse) {
            resolve(response);
          } else {
            resolve(response.json());
          }
        }
      }).catch(err => {
        if (didTimeOut) return;
        reject(err);
      });
      // controller.abort();
    });
  };

  this.saveToken = t => {
    token = t;
  };

  this.get = (uri, data, rawResponse, signal) => {
    const url = `${uri}${data ? `?${urlWithParams(data)}` : ''}`;
    return _fetch(url, 'GET', null, rawResponse, signal);
  };

  this.post = (uri, body, rawResponse, signal) => _fetch(uri, 'POST', body, rawResponse, signal);

  this.put = (uri, body, rawResponse, signal) => _fetch(uri, 'PUT', body, rawResponse, signal);


  this.delete = uri => _fetch(uri, 'DELETE');
};

export default new RequestService();

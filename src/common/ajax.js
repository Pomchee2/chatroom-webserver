import RSVP from 'rsvp';

const BASE_URL = 'http://185.133.192.108:5000';

/**
 * @file Helper functions for ajax requests.
 */

/**
 * Performs and AJAX request, returning the response as a promise.
 * @param {string} type - The type of the request. "GET", "POST", etc.
 * @param {string} url  - The URL to send the request to.
 * @param {Object[]} [headers] - Request headers. 
 * @param {string} headers[].header - The header name
 * @param {string} headers[].value - The header value
 * @returns {Promise} A promise, which when fulfilled, will contain the
 * 'response' of the XMLHttpRequest.
 */
function ajax(type, url, data, headers) {
  if (typeof headers === "undefined") {
    headers = [];
  }
  if (typeof data === "undefined") {
    data = "";
  }

  // Open promise
  let promise = new RSVP.Promise(function(resolve, reject) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          resolve(this.response);
        }
        else {
          reject(this);
        }
      }
    }
    req.open(type, url, true);
    // Set request headers
    for (let ii = 0; ii < headers.length; ++ii) {
      req.setRequestHeader(headers[ii].header, headers[ii].value);
    }
    console.log(req);
    req.send(data);
  });

  return promise;
}

module.exports = {ajax, BASE_URL};



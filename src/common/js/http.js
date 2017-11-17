
import URL from './url';
import $ from 'zepto';

/**
 * http request method
 * @param options { url, data, type}
 * @returns {Promise}
 */
function ajax(options) {
    let _resolve, _reject;
    const promise = new Promise((resolve, reject) => {
        _resolve = resolve;
        _reject = reject;
    });
    const defaultData = {
        // timestamp: Date.now()
    };

    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.data = Object.assign(defaultData, options.data);

    if (options.type === 'GET') {
        BNJS.http.get({
            url: options.url + '?' + URL.formatData(options.data),
            onSuccess: function (data) {
                _resolve(data);
            },
            onFail: function (res) {
                _reject(res);
            }
        });
    } else if (options.type === 'POST') {
        BNJS.http.post({
            url: options.url,
            params: options.data,
            onSuccess: function (data) {
                _resolve(data);
            },
            onFail: function (res) {
                _reject(res);
            }
        });
    } else {
        $.ajax({
            dataType: 'jsonp',
            url: options.url,
            data: options.data,
            success: function (data) {
                _resolve(data);
            },
            error: function (xhr, errType, err) {
                _reject(err);
            }
        });
    }

    return promise;
}

export default {
    request: function (options) {
        return ajax(options);
    },
    get: function (options) {
        options.type = 'get';
        return ajax(options);
    },
    post: function (options) {
        options.type = 'post';
        return ajax(options);
    },
    jsonp: function (options) {
        options.type = 'jsonp';
        return ajax(options);
    }
};
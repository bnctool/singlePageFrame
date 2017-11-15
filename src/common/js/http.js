
import URL from 'url';

let JSONPID = 1;

function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    let params = URL.formatData(options.data);

    //创建 - 第一步
    let xhr = new XMLHttpRequest();

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    //连接 和 发送 - 第二步
    if (options.type === "GET") {
        if(options.url.indexOf('?') > 0) {
            options.url += '&' + params;
        } else {
            options.url += "?" + params;
        }
        xhr.open("GET", options.url, true);
        xhr.send(null);
    } else if (options.type === "POST") {
        xhr.open("POST", options.url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

module.exports = {
    send: function (option) {
        if(option.dataType === 'jsonp') {
            this.jsonp(option);
        } else {
            ajax(option);
        }
    },
    get: function (option) {
        option.type = 'get';
        ajax(option);
    },
    post: function (option) {
        option.type = 'post';
        ajax(option);
    },
    jsonp: function (options) {
        options = options || {};
        if (!options.url) {
            throw new Error("参数不合法");
        }

        //创建 script 标签并加入到页面中
        let callbackName = 'jsonp' + JSONPID++;
        let oHead = document.getElementsByTagName('head')[0];
        options.jsonp = options.jsonp || 'callback';
        options.data[options.jsonp] = callbackName;
        let params = URL.formatData(options.data);
        let oS = document.createElement('script');
        oHead.appendChild(oS);

        //创建jsonp回调函数
        window[callbackName] = function (json) {
            oHead.removeChild(oS);
            clearTimeout(oS.timer);
            window[callbackName] = null;
            options.success && options.success(json);
        };

        //发送请求
        oS.src = options.url + '?' + params;

        //超时处理
        if (options.timeout) {
            oS.timer = setTimeout(function () {
                window[callbackName] = null;
                oHead.removeChild(oS);
                options.fail && options.fail({ message: "超时" });
            }, options.timeout);
        }
    }
};
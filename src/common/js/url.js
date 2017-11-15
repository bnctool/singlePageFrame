

module.exports = {
    formatData: function (data) {
        let arr = [];
        for (let name in data) {
            if(data.hasOwnProperty(name)) {
                arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
            }
        }
        arr.push("_t=" + new Date());
        return arr.join("&");
    },
    go: function (url) {
        location.href = url;
    },
    getQueryString: function (name) {
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r !== null) {
            return  decodeURIComponent(r[2]);
        } else {
            return null;
        }
    },
    getQueryObject: function () {
        let query = window.location.search.substr(1);
        if(query.length > 0) {
            let object = {};
            let array = query.split('&');
            array.map(function (item, index) {
                let tmp = item.split('=');
                object[tmp[0]] = tmp[1];
            });
            return object;
        } else {
            return {};
        }
    }
};
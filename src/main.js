// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from  './store/index';

Vue.config.productionTip = false;

const BNJSReady = function (readyCallback) {
    if(readyCallback && typeof readyCallback === 'function') {
        if (window.BNJS && typeof window.BNJS === 'object' && BNJS._isAllReady) {
            readyCallback();
        }
        else {
            document.addEventListener('BNJSReady', function() {
                readyCallback();
            }, false);
        }
    }
};

// mock ready
import $ from 'zepto';
window.BNJS = {
    _isAllReady: true,
    http: {
        get(options) {
            $.ajax({
                url: options.url,
                type: 'get',
                data: options.params,
                success(json) {
                    options.onSuccess(json);
                },
                error(json) {
                    options.onFail(json);
                }
            });
        }
    }
};
// need to be removed

BNJSReady(function(){
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {App}
    });
});
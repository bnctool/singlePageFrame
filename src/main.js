// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from  './store/index';

Vue.config.productionTip = false;

if(process.env.NODE_ENV === 'development') {
    require('./common/js/BNJS');  
}

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

BNJSReady(function(){
    BNJS.ui.hideLoadingPage();
    new Vue({
        el: '#app',
        router,
        store,
        template: '<App/>',
        components: {App}
    });
});
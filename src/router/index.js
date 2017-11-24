import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Show from '@/components/show';

Vue.use(Router);

export default new Router({
    // NA不支持
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: HelloWorld
        },
        {
            path: '/show',
            name: 'show',
            component: Show
        }
    ]
});

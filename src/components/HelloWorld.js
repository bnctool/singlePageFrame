import $ from 'zepto';
// var $ = require('zepto')

export default {
    // name: 'HelloWorld',
    data() {
        console.log(window.$)
        $('body').html(123)
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
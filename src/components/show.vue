<template>
    <div class="hello">
        <h1>{{ msg }}</h1>

        <div>{{ path }}</div>

        <router-link to="/">Go to HOME</router-link>

        <ul>
            <li v-for="item in myList" v-text="item.name"></li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                path: ''
            }
        },
        computed: {
            ...mapGetters({
                myList: 'list'
            })
        },
        watch: {
            myList(val) {
//                console.log(val)
            }
        },
        created() {
            this.path = this.$router.currentRoute.path;
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    h1,
    h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

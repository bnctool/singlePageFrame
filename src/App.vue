<template>
    <div id="app">
        <img src="./assets/error.png">
        <router-view/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        name: 'app',
        data: function () {
            return {name: 123};
        },
        methods: mapActions([
            'getList'
        ]),
        created() {
            this.getList({
                id: 123,
                inventory: 2
            })
        }
    };
</script>

<style lang="less" src="./common/css/reset.less"></style>
<style lang="less" src="./common/css/border.less"></style>
<style lang="less" src="./common/css/page.less"></style>

<style>

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>

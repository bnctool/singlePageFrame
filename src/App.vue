<template>
    <div id="app">
        <img src="./assets/error.png">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data: function () {
            return {name: 123};
        }
    };
</script>

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

# Framework

脚手架 vue + vue-router + vuex

## 本地开发调试

    // 安装FIS3
    npm install

    // 本地开发调试
    npm start

    // 打包NA
    npm run build

    // 打包WAP
    npm run wap

## 目录介绍

    |--build                        // 打包配置文件目录
    |--config                       // 配置注入目录
    |--dist                         // 产出目录
    |--mock                         // 模拟接口目录
    |--page
        |--index.html               // 首页模板
    |--static                       // 拷贝目录，不压缩打包，只拷贝到根目录
        |--config.json              // 组件化配置文件
    |--src                          // 源码
        |--assets                   // 资源图片目录
            |--loading.gif
        |--common                   // 通用 css + js
            |--css                  // 通用 css
                |--reset.less       // 重置浏览器样式
                |--border.less      // 1px边框
                |--page.less
            |--js                   // 通用 js
                |--BNJS.js          // BNJS mock
                |--http.js          // http请求封装
                |--url.js           // URL工具函数
        |--components               // 组件
        |--router                   // 路由vue-router
        |--store                    // vuex
        |--App.vue                  //
        |--config.js                // API接口配置
        |--main.js                  // 入口文件
    |--README.md                    // 说明文档


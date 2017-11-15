/**
 * @file FIS 配置
 * @author
 */

fis.config.set('namespace', 'framework');

let debugReceiver = [{
    receiver: 'http://cp01-rdqa-dev355.epc.baidu.com:8999/receiver',
    to: '/home/users/liuwenlong06/workspace/newoscar'
}][0];

// npm install -g fis3-hook-commonjs
fis.hook('commonjs');
// js
fis.match('/src/**.js', {
    isMod: true
});
fis.match('/src/static/**.js', {
    parser: fis.plugin('babel-5.x', {
        blacklist: ['regenerator'],
        stage: 3
    })
});
fis.match('/src/lib/(**.js)', {
    isMod: false,
    release: '${namespace}/lib/$1'
});
fis.match('/src/static/common/js/*.js', {
    packTo: '${namespace}/js/common.js'
});
fis.match('/src/static/(*)/*.js', {
    packTo: '${namespace}/js/$1.js'
});
// less -> css
fis.match('*.less', {
    // fis-parser-less 插件进行解析
    parser: fis.plugin('less'),
    // .less 文件后缀构建后被改成 .css 文件
    rExt: '.css'
});
fis.match('/src/static/common/css/*.{css, less}', {
    packTo: '${namespace}/css/common.css'
});
fis.match('/src/static/(*)/(*.{less, css})', {
    packTo: '${namespace}/css/$1.css'
});
// image
fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});
fis.match('/src/static/common/(img/*)', {
    release: '${namespace}/$1'
});
// html
fis.match('/src/page/(*.html)', {
    release: '${namespace}/$1'
});


// npm install -g fis3-postpackager-loader
fis.match('::package', {
    postpackager: fis.plugin('loader', {
        // allInOne: true
    })
});
// ignore
fis.match('{*.sh, .DS_Store, *.md, *.json, /src/page/tpl/*}', {
    release: false
});

// PRODUCT
fis.media('prod')
    .match('mock/(*)', {
        release: false
    })
    .match('::image', {
        useHash: true
    })
    .match('*.{css,less}', {
        optimizer: fis.plugin('clean-css'),
        useHash: true
    })
    .match('*.{js, jsx, es6}', {
        // optimizer: fis.plugin('uglify-js'),
        useHash: true
    })
    .match('*', {
        deploy: [
            fis.plugin('local-deliver'),
            fis.plugin('replace', {
                from: /__DEBUG__/gi,
                to: function () {
                    return true;
                }
            })
        ]
    });

// DEBUG LOCAL
fis.media('debug')
    .match('mock/(*)', {
        release: '$0'
    })
    .match('*', {
        optimizer: null,
        useHash: false,
        deploy: [
            fis.plugin('local-deliver'),
            fis.plugin('replace', {
                from: /__DEBUG__/gi,
                to: function () {
                    return true;
                }
            })
        ]
    });

// REMOTE
fis.media('remote')
    .match('*', {
        deploy: [
            fis.plugin('replace', {
                from: /__DEBUG__/gi,
                to: function () {
                    return true;
                }
            }),
            fis.plugin('http-push', {
                receiver: debugReceiver.receiver,
                to: debugReceiver.to
            })
        ]
    });
/**
 * @file FIS 配置
 * @author
 */

fis.config.set('namespace', 'framework');

let debugReceiver = [{
    receiver: 'http://xxx/receiver',
    to: '/home/users/xxx'
}][0];

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
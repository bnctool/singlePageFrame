
import $ from 'zepto';


(function(namespace){
    if (namespace.BNJS || /BDNuomiApp/.test(namespace.navigator.userAgent) || /BDNuomiAppIOS/.test(namespace.navigator.userAgent)) {
        return;
    }

    namespace = namespace || window;

    var BNJS = {
        _isAllReady: true
    };

    BNJS.version = "1.0";

    BNJS.http = {
        get: function (options) {
            options.type = "get";
            sendRequest(options);
        },
        post: function (options) {
            options.type = "post";
            sendRequest(options);
        },
        sign: function () {

        },
        getNA: function () {

        },
        postNA: function () {

        },
        getCatgData: function () {

        }
    }

    BNJS.location = {
        cityCode: "",
        cityName: "",
        shortCityName: "",
        cityUrl: "",
        latitude: "",
        longitude: "",
        address: "",
        districtId: "",
        districtName: "",
        hasLocation: "",
        selectCityCode: "",
        selectCityName: "",
        selectShortCityName: "",
        selectCityUrl: "",
        isAuthorized: "",
        watchLocation: function () {

        },
        getLocation: function () {

        },
        requestRealTimeLocation: function () {

        },
        getCLLocation: function () {

        },
        setAuthorization: function () {

        }
    }

    BNJS.device = {
        name: "",
        platform: "",
        os: "",
        screenWidth: "",
        screenHeight: "",
        setScreenRotate: function () {

        },
        call: function () {

        },
        getTelBook: function () {

        }
    }

    BNJS.env = {
        cuid: "",
        appName: "",
        appVersion: "",
        appChannel: "",
        sidList: "",
        uuid: "",
        packageName: "",
        compVersion: "",
        compId: "",
        compPage: "",
        network: function () {

        },
        getConfig: function () {

        },
        acCode: function () {

        },
        getCompConfig: function () {

        },
        getDCPSData: function () {

        }
    }

    BNJS.account = {
        isLogin: "",
        uid: "",
        uName: "",
        displayName: "",
        bduss: "",
        portrait: "",
        login: function () {

        },
        getMobile: function () {

        },
        getSecretAccount: function () {

        },
        getCommonSecretAccount: function () {

        },
        getDpassWithMobile: function () {

        },
        refreshCaptchaImage: function () {

        },
        loginWithMobile: function () {

        },
        setPortrait: function () {

        },
        watchAccount: function () {

        },
        register: function () {

        },
        logout: function () {

        }
    }

    BNJS.page = {
        start: function (url, params, action, direction) {
            if (action === 1) {
                window.location.assign(formatUrl(url, params));
                return;
            }
            setTimeout(function () {
                var opened = window.open(formatUrl(url, params), '_blank');
                // try to focus in new window
                if (opened) {
                    opened.focus();
                }
                // behavior on open failure
                if (!opened) {
                    BNJS.ui.dialog.show({
                        title: '出错了',
                        message: '打开新窗口功能被阻止，无法在新窗口中打开目标页面，点击“确定”在当前页打开，或点击“取消”并更改浏览器设置后重试。',
                        ok: '确定',
                        cancel: '取消',
                        onConfirm: function () {

                        }
                    });
                }
            }, 0);

        },
        back: function () {
            window.history.back();
            if (window.opener) {
                setTimeout(function () {
                    window.close();
                }, 500);
            }
        },
        setPageId: function () {

        },
        getData: function (callback) {
            function parse(query) {
                if (!query) {
                    return {};
                }
                var obj = {};
                query = query.split('&');
                for (var i = 0; i < query.length; i++) {
                    var p = query[i].split('=', 2);
                    if (p.length === 1) {
                        obj[p[0]] = '';
                    } else {
                        obj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
                    }
                }
                return obj;
            }
            var query = window.location.search || '';
            query = query.replace('?', '');
            callback(parse(query));
        },
        startPay: function () {

        },
        registerReceiver: function () {

        },
        unRegisterReceiver: function () {

        },
        sendBroadcast: function () {

        },
        startBind: function () {

        },
        onBtnBackClick: function (options) {
            if (options.callback) {
                options.callback();
            }
            window.history.back();
        },
        orderConfirm: function () {

        },
        reShow: function (callback) {
            window.location.replace(window.location.href);
            callback && callback();
        },
        enableBounce: function () {

        },
        onCityChange: function () {

        },
        onMessage: function () {

        },
        postMessage: function () {

        },
        startPageforResult: function () {

        },
        getAlbum: function () {

        },
        leave: function () {

        },
        startCreditPay: function () {

        },
        selectImages: function () {
            noSuppot();
        },
        uploadImages: function () {

        },
        saveImage: function () {

        },
        getScreenshots: function () {

        },
        deleteImages: function () {

        },
    }

    var timeoutHandler = null;
    BNJS.ui = {
        toast: {
            show: function (text, length) {
                var oToast = $("#bnjs-toast");
                if (oToast.length<=0) {
                    var aToasts = [
                        '<div class="bnjs-toast-conent" id="bnjs-toast">',
                        '<p class="bnjs-toast-text"></p>',
                        '</div>'
                    ];
                    $('body').append(aToasts.join(""));
                }
                $("#bnjs-toast").find('.bnjs-toast-text').html(text);
                $("#bnjs-toast").show();
                var height = $("#bnjs-toast").height();
                $("#bnjs-toast").css("marginTop","-"+height/2+"px");
                clearTimeout(timeoutHandler);
                $("#bnjs-toast").show();
                timeoutHandler = setTimeout(function() {
                    $("#bnjs-toast").hide();
                }, length == 1 ? 5000 : 3000);
            },
            hide: function () {
                $("#bnjs-toast").hide();
            }
        },
        dialog: {
            show: function (options) {
                var title = options.title || "提示",
                    message = options.message || "",
                    ok = options.ok || "确定",
                    cancel = options.cancel || "取消",
                    onConfirm = options.onConfirm,
                    onCancel = options.onCancel;
                showBg();
                if($("#bnjs-dialogs").length<=0){
                    var aDialogs = [
                        '<div class="bnjs-dialogs" id="bnjs-dialogs">',
                        '<h1 id="bnjs-dialogs-title" class="bnjs-dialogs-title"></h1>',
                        '<div>',
                        '<p  id="bnjs-dialogs-message" class="bnjs-dialogs-message"></p>',
                        '<div class="bnjs-dialogs-btn">',
                        '<span>',
                        '<a href="javascript:;" id="bnjs-dialogs-ok"></a>',
                        '<a href="javascript:;" id="bnjs-dialogs-cancel"></a>',
                        '</span>',
                        '</div>',
                        '</div>',
                        '</div>'
                    ];
                    $('body').append(aDialogs.join(""));
                }
                $("#bnjs-dialogs-title").html(title);
                $("#bnjs-dialogs-message").html(message);
                $("#bnjs-dialogs-ok").html(ok);
                $("#bnjs-dialogs-cancel").html(cancel);
                $("#bnjs-dialogs").show();
                var height = $("#bnjs-dialogs").height();
                $("#bnjs-dialogs").css("marginTop","-"+height/2+"px");
                $("#bnjs-dialogs-ok").off("click");
                $("#bnjs-dialogs-cancel").off("click");
                $("#bnjs-dialogs-ok").on("click",function(){
                    onConfirm && onConfirm() ;
                    $("#bnjs-dialogs").hide();
                    hideBg();
                });
                $("#bnjs-dialogs-cancel").on("click",function(){
                    onCancel && onCancel() ;
                    $("#bnjs-dialogs").hide();
                    hideBg();
                });
            },
            showLoading: function (type, text) {
                if($("#bnjs-loading").length<=0){
                    var aLoadings = [
                        '<div id="bnjs-loading" class="bnjs-loadding">',
                        '<div class="bnjs-loadding-text"></div>',
                        '<p></p>',
                        '</div>'
                    ];
                    $("body").append(aLoadings.join(''));
                }
                if(type && type == 1){
                    var text = text || '我们正在努力加载中..';
                    $('#bnjs-loading').find('p').css('marginTop','10px').html(text);
                }else{
                    $('#bnjs-loading').find('p').css('marginTop','0').html('');
                }
                $("#bnjs-loading").show();
                var height = $("#bnjs-loading").height();
                $("#bnjs-loading").css("marginTop","-"+height/2+"px");
            },
            hideLoading: function () {
                $("#bnjs-loading").hide();
            }
        },
        title: {
            setTitle: function (text) {
                text = decodeURIComponent(text);
                var oTitleBar = $("#titleBar");
                oTitleBar.html(text);
                var titlElement = document.getElementsByTagName('title')[0];
                if (titlElement) {
                    titlElement.innerText = text.trim()
                        ? '百度糯米 - ' + text
                        : '百度糯米';
                }
            },
            addActionButton: function () {

            },
            addShopCartButton: function () {

            },
            addBubbleIcon: function () {

            },
            addT10NoticeButton: function () {

            },
            setClickableTitle: function (text, clickHandler) {
                if(text){
                    if(typeof text  === "string"){
                        BNJS.ui.title.setTitle(text);
                        if(clickHandler){
                            $("#titleBar").off("click");
                            $("#titleBar").on("click",clickHandler);
                        }
                    }else if(typeof text  === "function"){
                        $("#titleBar").off("click");
                        $("#titleBar").on("click", text);
                    }
                }
            },
            removeBtnAll: function () {

            },
            removeBtnByTag: function () {

            },
            addTagList: function () {

            },
            addSearchBar: function () {

            },
            addSearchForm: function () {

            },
        },
        actionSheet: {
            show: function () {

            },
        },
        keyboard: {
            hide: function () {

            },
        },
        calendar: {
            createEvent: function () {

            },
            modifyEvent: function () {

            },
            deleteEvent: function () {

            },
        },
        share: function () {

        },
        showLoadingPage: function () {
            if($('#bnjs-loadPage').length<=0){
                $('body').append('<div id="bnjs-loadPage" class="bnjs-loadPage"></div>');
            }
            $('#bnjs-loadPage').show();
        },
        hideLoadingPage: function () {
            $('#bnjs-loadPage').hide();
        },
        showErrorPage: function (text, flag, type) {
            var text = text || '出错了';
            if($('#bnjs-errorPage').length<=0){
                var aErrors = [
                    '<div id="bnjs-errorPage-par" class="bnjs-errorPage-par"></div>',
                    '<div class="bnjs-errorPage" id="bnjs-errorPage">',
                    '<div></div>',
                    '<p>',
                    '</p>',
                    '</div>'
                ];
                $('body').append(aErrors.join(''));
            }
            $('#bnjs-errorPage-par').show();
            $('#bnjs-errorPage').find("p").html(text);
            $('#bnjs-errorPage').show();
            var height = $("#bnjs-errorPage").height();
            $('#bnjs-errorPage').css("marginTop","-"+height/2+"px");
        },
        hideErrorPage: function () {
            $('#bnjs-errorPage').hide();
            $('#bnjs-errorPage-par').hide();
        },
        nativeInterfere: function () {

        },
        closePullAction: function () {

        },
        startPullAction: function () {

        },
        hasBanner: function () {

        },
        copyText: function () {

        },
        toggleBtnBack: function (bshow) {
            bshow ? $('#barBack').show() : $('#barBack').hide();
        },
        getBarHeight: function () {

        }
    }

    BNJS.pay = {
        accessWallet: function () {

        },
        accessWalletCredit: function () {

        },
        getWalletServiceInfo: function () {

        },
        getPayReqData: function () {

        }
    }

    BNJS.hardware = {
        scanQRCode: function () {

        },
        getWifiAround: function () {

        },
        openVoice: function () {

        },
        stopVoice: function () {

        },
        statusBarClick: function () {

        }
    }

    BNJS.statistic = {
        addLog: function (options) {
            var src = 'https://m.nuomi.com/s.gif';
            var img = {};
            //避免被垃圾回收机制回收造成的流量损失
            var salt = (new Date()).getTime() + Math.random();
            window[salt] = img = new Image();
            img.src = src + '?' + 'da_src=' + options.actionID + '&element_type=' + options.category + '&product=nuomi&subsys=catering&module=huoguo';
            img.onload = img.onerror = function () {
                //回收对象
                window[salt] = null;
                img = null;
            };
        },
        addCtag: function () {

        },
        addMTJ: function () {

        }
    }

    BNJS.localStorage = {
        setItem: function (key, value, success, failure) {
            try {
                localStorage.setItem(key, value);
                success && success({
                    errno: 0,
                    errmsg: 'success',
                    data: ''
                });
            }
            catch (err) {
                failure && failure({
                    errno: 1,
                    errmsg: err.message,
                    data: ''
                });
            }
        },
        getItem: function (key, success, failure, version) {
            try {
                let data = localStorage.getItem(key);
                success && success({
                    errno: 0,
                    errmsg: 'success',
                    data: data
                });
            }
            catch (err) {
                failure && failure({
                    errno: 1,
                    errmsg: err.message,
                    data: ''
                });
            }
        },
        removeItem: function (key, success, failure) {
            try {
                localStorage.removeItem(key);
                success && success({
                    errno: 0,
                    errmsg: 'success',
                    data: ''
                });
            }
            catch (err) {
                failure && failure({
                    errno: 1,
                    errmsg: err.message,
                    data: ''
                });
            }
        }
    }

    BNJS.baseService = function () {

    }

    namespace.BNJS = BNJS;

    function noSuppot(name) {
        var name = name || "";
        BNJS.ui.dialog.show({
            title: name + '功能暂不支持',
            message: '去下载糯米 APP 体验完整功能？',
            ok: '确定',
            cancel: '取消',
            onConfirm: function () {
                window.location.href = 'http://download.nuomi.com/d?ddyh';
            }
        });
    }

    function showBg(){
        if($("#bnjs-blackbg").length>0){
            $("#bnjs-blackbg").show();
        }else{
            $('body').append('<div class="bnjs-blackbg" id="bnjs-blackbg"></div>');
        }
    }

    function hideBg(){
        $("#bnjs-blackbg").hide();
    }

    function formatParams(params) {
        return params
            ? Object.keys(params).map(function (key) {
                var val = params[key];
                return [key, val == null ? '' : val + ''].map(encodeURIComponent).join('=');
            }).join('&')
            : '';
    }

    function formatUrl(url, params) {
        params = formatParams(params);
        return params ? url + (url.indexOf('?') >= 0 ? '&' : '?') + params : url;
    }

    function transform(obj, method) {
        if (!obj) {
            return obj;
        }

        var target = new obj.constructor();
        forEach(obj, function (val, key) {
            method(target, val, key);
        });
        return target;
    }

    function sendRequest(options){
        $.ajax({
            url: options.url,
            type: options.type,
            data: options.params,
            dataType: options.respType || "json",
            headers: options.headers || {'Content-Type': 'application/json'},
            success: function (data) {
                options.onSuccess ? options.onSuccess.call(null, data) : '';
            },
            error: function (xhr, errType, err) {
                options.onFail ? options.onFail.call(null, errType, err) : '';
            }
        });
    }

})(window);

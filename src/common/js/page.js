

const selector = {
    errorPage: '#error-page',
    loadingPage: '#loading-page',
    retryButton: '.btn-retry',
    errorText: '.error-text',
    mask: '.mask',
    loading: '.loading'
};

module.exports = {
    showLoadingPage: function () {
        $(selector.loadingPage).removeClass('hide');
    },
    hideLoadingPage: function () {
        $(selector.loadingPage).addClass('hide');
    },
    showErrorPage: function (msg, retry) {
        $(selector.errorPage).removeClass('hide');
        $(selector.errorText).html(msg);
        if(retry) {
            $(selector.retryButton)
                .removeClass('hide')
                .on('click', function () {
                    location.reload();
                });
        }
    },
    showLoading: function () {
        $(selector.mask + ',' + selector.loading).removeClass('hide');
    },
    hideLoading: function () {
        
    }
};
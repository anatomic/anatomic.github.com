var util = require('util');

function ArticleAPIUtils() { };

ArticleAPIUtils.prototype.getArticle = function getArticle(path) {
    util.log('[ArticleAPIUtils] GET article for path %s', path);
    return get(path);
}

function get(url) {
    util.log('[ArticleAPIUtils] Create promise for XHR load');
    return  new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();

        req.open('GET', url);
        req.setRequestHeader('Accept', 'application/json');
        req.responseType = 'json';

        req.onload = function() { 
            util.log('[ArticleAPIUtils] XHR loaded');
            util.log('[ArticleAPIUtils] Status %s', util.inspect(req.status));
            if (req.status === 200) {
                resolve(req.response);
            } else {
                util.log('[ArtilceAPIUtils] Error returned %s', req.statusText);
                reject(Error(req.statusText));
            }
        };

        req.onError = function() {
            util.log('[ArticleAPIUtils] XHR failed (Error)');
            reject(Error('Network Error')); 
        };

        req.send();
    });
}

module.exports = new ArticleAPIUtils();

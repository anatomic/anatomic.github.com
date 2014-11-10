var Store = require('./Store');
var util = require('util');
var ArticleAPIUtils = require('../utils/ArticleAPIUtils');

var _articles = {};

function ArticleStore() {
    Store.call(this);
}

util.inherits(ArticleStore, Store);

ArticleStore.prototype.createFromSitemap = function(sitemap) {
    util.log('[ArticleStore] Creating articles from sitemap data');
    sitemap.forEach(function(article) {
        _articles[article.slug] = article;
    });
    util.log('[ArticleStore] Articles created');
    this.emitChange();
}

ArticleStore.prototype.getAll = function getAll(opts) {
    return Object.keys(_articles).map(function(key) {
        return _articles[key]
    }).sort(function(a, b) {
        var aD = new Date(a.date);
        var bD = new Date(b.date);

        if (opts && opts.order === "asc") {
           return aD - bD;
        }

        return bD - aD;
    });
}

ArticleStore.prototype.getBySlug = function(slug) {
    if (slug) {
        var article = _articles[slug];

        if (!article.content) {
           ArticleAPIUtils.getArticle(slug).then((response) => {
               article.content = response.article; 
               this.emitChange();
           });
        }
        return _articles[slug];
    } else {
        return _articles[Object.keys(_articles)[0]];
    }
};

module.exports = new ArticleStore();

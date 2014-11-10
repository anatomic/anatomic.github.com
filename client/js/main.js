var React = require('react');
var router = require('./router');

var ArticleStore = require('./stores/ArticleStore');
ArticleStore.createFromSitemap(sitemap);

React.render(router, document.querySelector('#page'));

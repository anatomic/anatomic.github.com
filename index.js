var express = require('express');
var app = express();

var fs = require('fs');
var mapper = require('./lib/sitemapper');

var showdown = require('showdown');
var md = new showdown.converter();

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config')

var handlebars = require('handlebars');
var template = handlebars.compile(fs.readFileSync('./server/views/main.html', 'utf-8'));

var util = require('util');

require('node-jsx').install({harmony: true});

var sitemap;
app.use(webpackMiddleware(webpack(webpackConfig), {
    publicPath: '/assets'
}));

app.use(express.static(__dirname + '/public'));

app.get('/sitemap', function(req, res) {
    res.send(sitemap);
});

app.get('/', function(req, res) {
    res.send(template({title: 'Test Blog', sitemap: JSON.stringify(sitemap.map(function(article) {return article.data; }))}));
});

app.get('/:year/:month/:slug', function(req, res) {
    var content, data;
    res.format({
        html: function() {
            res.send(template({title: 'article', sitemap: JSON.stringify(sitemap.map(function(article) { return article.data; }))}));
        },

        json: function() {
            var path = req.path.replace(/^\//, '').replace(/\/$/, '');
                sitemap.some(function(item) {
                if (item.data.slug === req.params.slug) {
                    content = item;
                    return true;
                }
            });

            if (content) {
                res.set('Content-Type', 'application/json');
                res.send(JSON.stringify({article: content.content}));
            } else {
                res.status(404).send({error: 'not found'});
            }
        }
    });
});


mapper('./_posts', function(err, siteData) {
    if (err) {
        util.error(err);
        process.exit(1);
    }   

    sitemap = siteData;

    app.listen(3000);
});

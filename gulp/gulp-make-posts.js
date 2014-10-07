var through   = require('through2'),
    utils     = require('gulp-util'),
    moment    = require('moment'),
    matter    = require('gray-matter'),
    hbs       = require('handlebars'),
    _         = require('lodash'),
    fs        = require('fs'),
    showdown  = require('showdown'),
    converter = new showdown.converter(),
    excerptify = require('../src/lib/excerptify'),
    path      = require('path');

module.exports = function(opts) {
    var defaults = { 
        template: 'article.html',
        baseDir: './src/html/',
        globals: { year: moment().format('YYYY')}
    };

    var posts = [], firstFile;

    _.merge(defaults, opts);

    template = fs.readFileSync(path.join(defaults.baseDir, defaults.template), 'utf-8');
    var compiledTemplate = hbs.compile(template);

    return through.obj(function ( file, enc, cb ) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit('error', new utils.PluginError('gulp-make-posts', 'Streaming not supported'));
            return cb();
        }

        try {

            if (!firstFile) {
                firstFile = file;
            }

            var post = matter(file.contents.toString());
            var pubDate = moment(post.data.date);
            var year = pubDate.format('YYYY');
            var month = pubDate.format('MM');

            var oldName = path.basename(file.path);
            var newName = path.join(year, month, post.data.slug, 'index.html');
            file.path = path.resolve(file.base, newName);

            post.content = converter.makeHtml(post.content);
            _.merge(post.data, defaults.globals);
            post.data.publishedAt = post.data.date;
            post.data.publishedAtFormal = pubDate.format('Do MMMM YYYY'); // this is lovely but is inaccurate

            posts.push({
                publishedAt: post.data.date,
                publishedAtHuman: pubDate.fromNow(),
                publishedAtFormal: pubDate.format('Do MMMM YYYY'),
                title: post.data.title,
                excerpt: post.data.excerpt || excerptify(post.content),
                path: file.relative.replace('index.html', '')
            });

            file.contents = new Buffer(compiledTemplate(post));


        } catch (err) {
            this.emit('error', new utils.PluginError('gulp-make-posts', err, {fileName: file.path}));
        }

        this.push(file);
        cb();
    }, function(cb){
        if (posts.length === 0 || !firstFile ) {
            return cb();
        }


        this.push(new utils.File({
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: path.join(firstFile.base, 'sitemap.json'),
            contents: new Buffer(JSON.stringify({ posts: _.sortBy(posts, 'publishedAt').reverse()}, null, '  '))
        }));
        return cb();
    });
};

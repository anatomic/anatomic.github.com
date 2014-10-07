var gulp       = require('gulp'),
    fs         = require('fs'),
    sass       = require('gulp-sass'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    bs         = require('browser-sync'),
    reload     = bs.reload;
    hbs        = require('handlebars'),
    watch      = require('gulp-watch'),
    uglify     = require('gulp-uglify'),
    streamify  = require('gulp-streamify'),
    deploy     = require('gulp-gh-pages');

var makePosts = require('./gulp/gulp-make-posts');

gulp.task('server', function() {
    return bs({
        server: {
            baseDir: './build'
        },
        open: false
    });
});

gulp.task('sass', function() {
    gulp.src('src/scss/app.scss')
        .pipe(sass({ outputStyle: 'compressed'} ))
        .pipe(gulp.dest('build/css'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function() {
    return browserify('./src/js/app.js')
        .bundle()
        .pipe(source('app.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('build/js'))
        .pipe(reload({stream:true}));
});

gulp.task('html', function() {
    return gulp.src('./_posts/**/*.markdown')
        .pipe(makePosts())
        .pipe(gulp.dest('build'))
        .pipe(reload({stream:true}));
});

gulp.task('homepage', ['html'], function() {
    var sitemap = fs.readFileSync('./build/sitemap.json', 'utf-8');
    var template = fs.readFileSync('./src/html/home.html', 'utf-8');
    var compiledTemplate = hbs.compile(template);

    var homepage = compiledTemplate(JSON.parse(sitemap));
    fs.writeFileSync('./build/index.html', homepage);
    return true;
});

gulp.task('watch', ['server'], function() {
    watch({ glob: ['./_posts/**/*', './src/html/**/*.html']}, ['html']);
    watch({ glob: ['./src/js/**/*.js']}, ['js']);
    watch({ glob: ['./src/scss/**/*.scss']}, ['sass']);
});

gulp.task('deploy', ['homepage', 'js', 'sass'], function() {
    return gulp.src('build/**/*', { base: 'build' })
        .pipe(deploy({
            branch: 'master' 
        }));
});

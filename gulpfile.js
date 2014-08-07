var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    bs = require('browser-sync'),
    reload = bs.reload;
    matter = require('gray-matter'),
    fs = require('fs'),
    showdown = require('showdown'),
    converter = new showdown.converter(),
    hbs = require('handlebars'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    streamify = require('gulp-streamify'),
    moment = require('moment'),
    deploy = require('gulp-gh-pages');

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

gulp.task('watch', ['server'], function() {
    watch({ glob: ['./_posts/**/*', './src/html/**/*.html']}, ['html']);
    watch({ glob: ['./src/js/**/*.js']}, ['js']);
    watch({ glob: ['./src/scss/**/*.scss']}, ['sass']);
});

gulp.task('deploy', ['html', 'js', 'sass'], function() {
    return gulp.src('build/**/*', { base: 'build' })
        .pipe(deploy({
            branch: 'master' 
        }));
});

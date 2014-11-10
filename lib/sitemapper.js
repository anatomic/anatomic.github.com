var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var async = require('async');
var util = require('util');

module.exports = function(postsDir, callback) {
    fs.stat(postsDir, function(err, stats) {
        if (err) {
            return callback(err);
        }

        if (stats.isDirectory() === false) {
            return callback(new Error('Sitemapper only works on folders'));
        }

        fs.readdir(postsDir, function(err, files) {
            if (err) {
                return callback(err);
            }

            async.map(files.map(function(filename) { return path.join(postsDir, filename); }), postToJson, function(err, results) {
                 return callback(err, results);
            });

        });
    });
};

function postToJson(file, cb) {
    fs.readFile(file, 'utf-8', function(err, post) {
        if (err) {
            return cb(err);
        }

        var postData = matter(post);
        return cb(null, matter(post));
    })
}

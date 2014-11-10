var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
    entry: {
        main: './client/js/main.js',
    },
    output: {
         filename: '[name].js',
         path: __dirname + '/public/assets',
         publicPath: '/assets',
         chunkFilename: '[id]-[hash].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'jsx?harmony'},
            { test: /\.scss$/, loader: 'style!css!sass!autoprefixer'}
        ]
    },
    plugins: [
        // new CommonsChunkPlugin('common.js')
    ]
};

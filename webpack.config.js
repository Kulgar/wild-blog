'use strict';

let liveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
    entry: {
        javascript: './public/js/app.js'
    },
    output: {
        filename: './public/js/app.min.js'
    },
    devtool: 'source-map',
    plugins: [
        new liveReloadPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/,
            query: {
                presets: ['env']
            }
        }, {
            test: /\.scss$/,
            loaders: ['style-loader', 'css-loader', 'sass-loader']
        }]
    }
}


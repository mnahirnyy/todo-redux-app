const path = require('path'),
      webpack = require('webpack');

module.exports = {
    entry: [
        path.resolve(__dirname, '../public/src/main.js')
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../public/dist/'),
        filename: 'bundle.js',
        // devtoolModuleFilenameTemplate: '[resource-path]'
    },
    resolve: {
        extensions: ['', '.js']
    },
    stats: {
        colors: true
    }
};
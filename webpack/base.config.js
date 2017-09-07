const path = require('path'),
      webpack = require('webpack');

module.exports = {
    entry: [
        path.resolve(__dirname, '../public/src/main.js')
    ],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react']
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
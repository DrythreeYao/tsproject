var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: true,
            __TEST__: false,
            __PRODUCTION__: false
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2
        })
    ]
}

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')

const SOURCE_CODE_ROOT = config.constants.sourceCodeRoot
const ASSETS_PATH = config.constants.assetsPath
const WEBPACK_PUBLISH_ROOT = config.constants.webpackPublishRoot
const LIB_MANIFEST = '../' + WEBPACK_PUBLISH_ROOT + '/' + config.constants.libManifest
const INCLUDE_PATHS = path.resolve(__dirname, '../' + SOURCE_CODE_ROOT + '/core')

module.exports = {
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested',
                            includePaths: [INCLUDE_PATHS]
                        }
                    }
                ],
                fallback: 'style-loader' // use style-loader extract cs's file
            })
        }, {
            test: /(\.png)|(\.jpg)|(\.jpeg)|(\.gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: 'staticimg/[name].[hash:7].[ext]'
                }
            }
        }, {
            test: /(\.ttf)|(\.eot)|(\.svg)|(\.woff)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        }]
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            path.join(__dirname, '../node_modules'),
            path.join(__dirname, '../' + SOURCE_CODE_ROOT)
        ]
    },
    entry: {
        'lib': [
            'babel-polyfill/browser.js',
            'vue/dist/vue.esm.js',
            'vue-router/dist/vue-router.min.js',
            'qs/dist/qs.js',
            'axios/dist/axios.min',
            'platform/platform',
            'store/dist/store.modern.min',
            // 'element-ui/lib/index.js'
        ],
    },
    output: {
        path: path.resolve(__dirname, '../' + WEBPACK_PUBLISH_ROOT),
        filename: '[name].js',
        publicPath: ASSETS_PATH,
        library: '[name]_[chunkhash]'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            context: path.resolve(__dirname, '../' + SOURCE_CODE_ROOT),
            path: path.resolve(__dirname, LIB_MANIFEST),
            name: '[name]_[chunkhash]'
        })
    ]
};

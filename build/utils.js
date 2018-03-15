'use strict'
const path = require('path')
const config = require('../config')
const SOURCE_CODE_ROOT = config.constants.sourceCodeRoot
const INCLUDE_PATHS = path.resolve(__dirname, './' + SOURCE_CODE_ROOT + '/core')

// css-loader
exports.cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    minimize: true,
    sourceMap: true
  }
}

// scss-loader
exports.scssLoaderConfig = {
  loader: 'sass-loader',
  options: {
    outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested',
    includePaths: [INCLUDE_PATHS],
    sourceMap: true
  }
}

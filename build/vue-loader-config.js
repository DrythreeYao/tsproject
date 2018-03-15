'use strict'
const path = require('path')
const config = require('../config')
const SOURCE_CODE_ROOT = config.constants.sourceCodeRoot
const INCLUDE_PATHS = path.resolve(__dirname, './' + SOURCE_CODE_ROOT + '/core')

module.exports = {
  loaders: {
    // jsx: 'babel-loader',
    // ts: 'ts-loader',
    tsx: 'babel-loader!ts-loader!tslint-loader',
    scss: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          minimize: true,
          sourceMap: true
        }
      },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          outputStyle: process.env.NODE_ENV === 'production' ? 'compressed' : 'nested',
          includePaths: [INCLUDE_PATHS],
          sourceMap: true
        }
      },
    ]
  },
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 21:16:16
 * @LastEditTime : 2022-06-07 23:24:32
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-ts\webpack\webpack.prod.js
 * @Description  : 
 */
const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { jsRules } = require('./rules');

const srcPath = path.join(__dirname, '../src');

module.exports = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      jsRules(srcPath),
    ]
  }
})
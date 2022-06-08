/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 21:01:13
 * @LastEditTime : 2022-06-07 23:24:29
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-ts\webpack\webpack.dev.js
 * @Description  : 
 */
const path = require('path');
const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const { jsRulesDev } = require('./rules');
const { reactRefreshPlugin } = require('./plugins');

const srcPath = path.join(__dirname, '../src');

module.exports = merge(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      jsRulesDev(srcPath),
    ]
  },
  plugins: [
    reactRefreshPlugin(),
  ],
  devServer: {
    client: {
      // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
      overlay: true,
      // 在浏览器中以百分比显示编译进度。
      progress: true,
      // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
      reconnect: true,
    },
    // 启用gzip 压缩
    compress: true,
    port: 9000,
    // 启用webpack的模块热替换
    hot: true,
    // 告诉 dev-server 在服务器已经启动后打开默认的浏览器
    open: true,
    // 代理---处理跨域转发
    proxy: {}
  },
})

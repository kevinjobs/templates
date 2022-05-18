/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-18 14:42:23
 * @LastEditTime : 2022-05-18 14:56:37
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \template-react-electron-ts\scripts\start.js
 * @Description  : 
 */
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const runElectron = require('./electron');
const prodConfig = require('./webpack/webpack.prod');
const devConfig = require('./webpack/webpack.dev');

const NODE_ENV = process.env.NODE_ENV;

console.log(`[WEBPACK]: NODE_ENV is ${NODE_ENV}.`);

const IS_DEV = NODE_ENV === 'development';

if (IS_DEV) {
  const compiler = webpack(devConfig);
  const distPath = ['dist/main/index.js'];
  runServer(compiler, devConfig.devServer, () => {
    runElectron(distPath);
  });
} else {
  const compiler = webpack(prodConfig);
  runBuild(compiler);
}

/**
 * 生成生产环境
 * @param {object} compiler webpack compiler
 */
function runBuild(compiler) {
  compiler.run((err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) console.error(info.errors);

    if (stats.hasWarnings()) console.error(info.warnings);

    console.log('start to compile...');
  })
}

/**
 * 开发服务器
 * @param {object} compiler webpack compiler
 * @param {object} opts webpack dev server options
 */
function runServer(compiler, opts, callback) {
  const server = new webpackDevServer(opts, compiler);
  server.startCallback(() => {
    console.log('Successfully started server on port: ' + opts.port);
    if (callback !== undefined && typeof callback === 'function') {
      callback();
    }
  })
}
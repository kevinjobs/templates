/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 21:14:35
 * @LastEditTime : 2022-06-08 23:37:11
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-electron-typescript\start.js
 * @Description  : 
 */
const path = require('path');
const proc = require('child_process');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const prodConfig = require('./webpack/webpack.prod');
const devConfig = require('./webpack/webpack.dev');
const mainConfig = require('./webpack/main.webpack');

const NODE_ENV = process.env.NODE_ENV;

console.log(`NODE_ENV is ${NODE_ENV}.`);

const IS_DEV = NODE_ENV === 'development';
const distMainPath = ["./dist/main.js"];

if (IS_DEV) {
  const compiler = webpack(devConfig);
  const mainCompiler = webpack(mainConfig);

  // runBuild(mainCompiler);

  // runServer(compiler, devConfig.devServer);

  runElectron(distMainPath);
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
    console.log('Start to compile...');

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

    compiler.close((closeErr) => {
      if (closeErr) {
        console.error(closeErr);
      }
    })
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
    
    if (callback) callback();
  })
}

/**
 * run electron
 * @param {args} args args arrary
 */
function runElectron(args) {
  const electron = './node_moduels/electron/dist/electron.exe';

  const opts = {
    stdio: 'inherit',
    windowsHide: false,
  }

  const child = proc.spawn(electron, args, opts);

  child.on('close', (code, signal) => {
    if (code === null) {
      console.error(electron, 'exited with signal', signal);
      process.exit(1);
    }
  })
}

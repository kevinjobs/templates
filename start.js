const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const prodConfig = require('./build/webpack.prod');
const devConfig = require('./build/webpack.dev');

const NODE_ENV = process.env.NODE_ENV;

console.log(`NODE_ENV is ${NODE_ENV}.`);

const IS_DEV = NODE_ENV === 'development';

if (IS_DEV) {
  const compiler = webpack(devConfig);
  runServer(compiler, devConfig.devServer);
} else {
  const compiler = webpack(prodConfig);
  runBuild(compiler);
}

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

function runServer(compiler, opts) {
  const server = new webpackDevServer(opts, compiler);
  server.startCallback(() => {
    console.log('Successfully started server on port: ' + opts.port);
  })
}
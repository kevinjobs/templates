import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import runElectron from './electron';
import { IRendererConfig, IMainConfig } from 'types';

interface IOpts {
  mode: string,
  mainConfig: IMainConfig,
  rendererConfig: IRendererConfig,
}

interface IWert {
  opts: IOpts,
  run(): void,
  _main(): webpack.Compiler,
  _renderer(): webpack.Compiler,
  _rendererDev(): webpackDevServer,
}

class Wert implements IWert {
  opts: IOpts;

  constructor (opts: IOpts) {
    this.opts = opts;
  }

  run () {
    if (this._isDev()) {
      this._rendererDev().startCallback(() => {
        this._main().run((err, stats) => {
          if (err || stats?.hasErrors()) {
            console.log(err || stats?.toString());
          } else {
            console.log('Renderer & Main starting...');
            runElectron(['dist/main/index.js']);
          }
        })
      })
    } else {
      this._renderer().run((err, stats) => {
        if (err || stats?.hasErrors()) {
          console.log(err || stats?.toString());
        } else {
          console.log('renderer built');
          this._main().run((err, stats) => {
            if (err || stats?.hasErrors()) {
              console.log(err || stats?.toString());
            } else {
              console.log('main built');
              runElectron(['dist/main/index.js']);
            }
          })
        }
      })
    }
  }

  _isDev () {
    return this.opts.mode === 'development';
  }

  _main () {
    const config = this.opts.mainConfig as webpack.Configuration;
    const compiler = webpack(config);
    return compiler;
  }

  _renderer () {
    const config = this.opts.rendererConfig;
    const compiler = webpack(config);
    return compiler;
  }

  _rendererDev () {
    const config = this.opts.rendererConfig;
    const devOpts = this.opts.rendererConfig.devServer || {};

    const compiler = webpack(config);
    const server = new webpackDevServer(devOpts, compiler);

    return server;
  }
}

export default Wert;
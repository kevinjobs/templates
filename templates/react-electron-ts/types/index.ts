import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

type IRendererConfig = {
  devServer?: webpackDevServer.Configuration,
} & webpack.Configuration;

type IMainConfig = {
  mode: string | undefined,
} & Omit<webpack.Configuration, 'mode'>;

export {
  IRendererConfig,
  IMainConfig,
}
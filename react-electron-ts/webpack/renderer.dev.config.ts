import path from 'path';
import { merge } from 'webpack-merge';
import rendererBaseConfig from './renderer.base.config';
import { IRendererConfig } from 'types';

const __dirname = path.resolve();

const rendererDevOpts: IRendererConfig["devServer"] = {
  // static: path.resolve(__dirname, 'dist/renderer'),
  hot: true,         // 热替换重载
  compress: true,    // gzip 压缩静态文件
  host: 'localhost', // 允许其他设备访问
  open: false,       // 启动后打开浏览器,
  port: 8080,        // 设置端口
}

const rendererDevConfig: IRendererConfig = merge(
  rendererBaseConfig,
  {
    mode: "development",
    devtool: "inline-source-map",
    devServer: rendererDevOpts,
  }
)

export default rendererDevConfig;
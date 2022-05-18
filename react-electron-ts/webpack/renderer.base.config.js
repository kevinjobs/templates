/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-07 19:13:15
 * @LastEditTime : 2022-05-18 14:59:22
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \template-react-electron-ts\webpack\renderer.base.config.js
 * @Description  : 
 */
import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const __dirname = path.resolve();

const rendererBaseConfig = {
  target: "electron-renderer",  // 设置该项后，浏览器无法打开对应网页
  devtool: false,               // 默认不启用开发工具
  entry: {
    index: path.resolve(__dirname, 'src/renderer/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/renderer'),
    filename: 'index.js',
    clean: true, // clean the old files when build everytimes. 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          }
        }
      }
    ],
  },
  plugins: [
    // 用于生成最终的 html 文件
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/renderer/public/index.html')
    }),
  ]
};

// console.log(rendererBaseConfig);

export default rendererBaseConfig;
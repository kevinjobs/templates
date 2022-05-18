/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-07 19:13:15
 * @LastEditTime : 2022-05-18 14:58:37
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \template-react-electron-ts\webpack\main.config.js
 * @Description  : 
 */
const path = require('path');
const mode = process.env['NODE_ENV'];

module.exports = {
  target: "electron-main",
  mode: mode,
  devtool: "inline-source-map",
  entry: path.join(__dirname, '../src/main/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist/main'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ]
          }
        }
      }
    ],
  },
}
const { merge } = require('webpack-merge');

const baseConfig = require('./base.config');
const devConfig = require('./dev.config');
const prodConfig = require('./prod.config');


module.exports = mode => {
  switch (mode) {
    case "production":
      return merge(baseConfig, prodConfig);
      break;
    case "development":
      return merge(baseConfig, devConfig);
      break;
    default:
      return merge(baseConfig, devConfig);
  }
}
/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-05-09 20:52:56
 * @LastEditTime : 2022-05-18 15:19:19
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-ts\webpack\rules.js
 * @Description  : 
 */
function jsRulesDev(includePath) {
  return {
    test: /\.(js|mjs|jsx)$/,
    include: includePath,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-transform-runtime',
          'react-refresh/babel'
        ]
      }
    }
  }
}

function jsRules(includePath) {
  return {
    test: /\.(js|mjs|jsx)$/,
    include: includePath,
    use: {
      loader: 'babel-loader?cacheDirectory',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ],
        plugins: [
          '@babel/plugin-transform-runtime'
        ]
      }
    }
  }
}

function tsRules(includePath) {
  return {
    test: /\.(ts|tsx)$/,
    include: includePath,
    use: {
      loader: 'awesome-typescript-loader'
    }
  }
}

module.exports = {
  jsRulesDev,
  jsRules,
  tsRules,
}
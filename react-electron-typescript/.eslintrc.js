/*
 * @Author       : Kevin Jobs
 * @Date         : 2022-06-07 22:53:19
 * @LastEditTime : 2022-06-08 22:13:44
 * @lastEditors  : Kevin Jobs
 * @FilePath     : \react-electron-typescript\.eslintrc.js
 * @Description  :
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  ignorePatterns: [".eslintrc.js", "webpack/*", "start.js", "config/"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
  },
};
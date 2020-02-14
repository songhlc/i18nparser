const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const analyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
var packageConfig = require('./package.json')
module.exports = {
  entry: './packages/index.js',
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, 'lib')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new analyzer(),
    new webpack.BannerPlugin('ycloud v' + packageConfig.version + ' author by songhlc')
  ],
  externals: {
    "html5parser-fork": "html5parser-fork",
    "fs": "fs",
    "recast": "recast",
    "string-hash": "string-hash",
  }
};
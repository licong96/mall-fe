const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'index': './src/page/index/index.js',
    'login': './src/page/login/login.js'
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/',       // 模板、样式、脚本、图片等资源对应的server上的路径
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'image/[name].[hash:5].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(HtmlPlugin('首页', 'index', ['common', 'index'])),
    new HtmlWebpackPlugin(HtmlPlugin('登陆', 'login', ['common', 'login']))
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    inline: true,
    quiet: true,    // 开启错误提示
    // host: '',
    port: 8080
  }
};

/**
 * html模板配置
 * @param {String} name 名称
 * @param {Array} chunk 依赖
 * @returns {Object}
 */
function HtmlPlugin(title, name, chunk) {
  return {
    title: title,
    filename: name + '.html',
    template: './src/view/' + name + '.html',
    chunks: chunk,
    minify: {
      // removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true // 删除空白符与换行符
      //   removeAttributeQuotes: true
    }
  }
}
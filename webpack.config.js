const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    'index': './src/page/index/index.js',
    'user-login': './src/page/user-login/index.js',
    'user-register': './src/page/user-register/index.js',
    'result': './src/page/result/index.js',
  },
  output: {
    filename: 'js/[name].js',
    publicPath: '/',       // 模板、样式、脚本、图片等资源对应的server上的路径
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.string$/,
        exclude: /node_modules/,
        // loader: 'html-loader'
        loader: 'html-loader?attrs=img:src img:data-src'
      },
      {
        test: /\.js$/,              // 所有js文件转换es5
        include: path.resolve(__dirname, 'src'),   // 指定这个文件夹
        exclude: path.resolve(__dirname, 'node_modules'),  // 排除这个文件夹
        loader: 'babel-loader'
      },
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
  // 配置路径
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(HtmlPlugin('首页', 'index', ['common', 'index'])),
    new HtmlWebpackPlugin(HtmlPlugin('用户登录', 'user-login', ['common', 'user-login'])),
    new HtmlWebpackPlugin(HtmlPlugin('用户注册', 'user-register', ['common', 'user-register'])),
    new HtmlWebpackPlugin(HtmlPlugin('操作结果', 'result', ['common', 'result'])),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    inline: true,
    quiet: true,    // 开启错误提示
    // host: '',
    port: 8080,
    historyApiFallback: true,
    overlay: true,  // 将错误显示在html之上
    proxy: {
      '/': {
        target: 'http://www.happymmall.com',
        changeOrigin: true
      }
    }
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
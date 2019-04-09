const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js',
    signin: './src/sign.js',
  }, // 入口文件
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist')
  }, //输出配置
  resolve: {
    mainFiles:["index", "default"],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.art$/,
        exclude: /node_modules/,
        include: /src/,
        use: {
          loader: 'art-template-loader',
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024*8, // 8k 以下的 base64 内联，不产生图片
            fallback: 'file-loader',
            name: '[name].[ext]?[hash]',
            outputPath: 'image/', // 输出路径
            publicPath: '../image' // 可以问到图片的引用路径
          }
        }
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader'
       },
    ]
  }, // 放置loader 加载器
  plugins: [
    // new CopyWebpackPlugin([
    //   {from: 'src/common'},
    //   {from: 'src/commonimg'}
    // ]),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/template/index.html',
      chunks: ['app','common'],
      cache: true,
      meta: {}
    }),
    new HtmlWebpackPlugin({
      filename: 'signin.html',
      template: './src/template/signin.html',
      chunks: ['signin','common'],
      cache: true,
      meta: {}
    }),
  ], 
}
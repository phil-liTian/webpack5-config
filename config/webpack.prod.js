const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')
const resolve = path.resolve

const getStyleLoader = pre => {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
    pre
  ].filter(Boolean)
}

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, '../dist'), // 所有文件的输出目录
    filename: 'static/js/boundle.js',
    // 开发环境没有输出文件，所以这个clean没有意义了
    clean: true
  },
  // loader 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: getStyleLoader()
      },
      {
        test: /\.less$/i,
        use: getStyleLoader('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoader('sass-loader')
      },
      {
        test: /\.png|jpe?g|gif|webp$/i,
        type: 'asset', // webpack5默认对图片资源进行处理
        parser: {
          dataUrlCondition: {
            // 一般限制10kb以内使用base64， 10kb以上还是使用url加载图片资源
            // 减少请求数量
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'static/img/[hash:8][ext][query]'
        }
      },
      {
        test: /\.ttf|woff2?$/i,
        type: 'asset/resource', // 设置resource之后，原封不动输出
        generator: {
          filename: 'static/font/[hash:8][ext][query]'
        }
      },
      // 将es6的新语法转化成旧语法，兼容性更好
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: resolve(__dirname, '../src')
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html') // 保留原来html中的内容
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    }),
    new CssMinimizerPlugin() // 压缩css文件啊
  ],
  // 开发模式
  mode: 'production'
}

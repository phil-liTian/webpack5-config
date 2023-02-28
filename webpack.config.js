const path = require('path')
const resolve = path.resolve

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'boundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.less$/i, use: ['style-loader', 'css-loader', 'less-loader'] },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png|jpe?g|gif|webp$/i,
        type: 'asset', // webpack5默认对图片资源进行处理
        parser: {
          dataUrlCondition: {
            // 一般限制10kb以内使用base64， 10kb以上还是使用url加载图片资源
            maxSize: 10 * 1024 // 10kb
          }
        }
      }
    ]
  },
  // 插件
  // plugins: [],
  mode: 'development'
}

const path = require('path')
const resolve = path.resolve

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'boundle.js',
  },
  // modules: [],
  // plugins: [],
  mode: 'development'
}
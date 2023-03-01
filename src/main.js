import './style/index.css'
import './style/index.less'
import './style/index.scss'
import './style/index.sass'
import './style/iconfont.css'
import { sum } from './utils/sum'

console.log(sum([1, 2, 4]))
// vue-loader 和 react-loader 已经自动实现了该热模块替换功能
if (module.hot) {
  module.hot.accept('./utils/sum', () => {
    console.log('热模块替换的回调函数')
  })
}

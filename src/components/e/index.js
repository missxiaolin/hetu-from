import config from './config'
// 重置和查询
import resetSearchBtns from './resetSearchBtns'
// 保存和取消
import cancelSaveBtns from './cancelSaveBtns'

const components = [
  resetSearchBtns,
  cancelSaveBtns
]

const install = function (Vue) {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version: config.version
}

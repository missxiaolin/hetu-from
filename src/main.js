import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

import './assets/css/index.scss'

// 剪切板
import VueClipboard from 'vue-clipboard2'

// vue 粘贴板复制插件
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(Antd)

// 我们自己封装的组件实例
import myElement from './components/e/index'
// 使用插件
Vue.use(myElement)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

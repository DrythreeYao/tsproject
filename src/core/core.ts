/**
 * 核心包，引入一些公共函数的兼容包、公共样式
 */

import 'browser-polyfill'
import { app } from './ts/app'
import config from './ts/config'
import apiService from 'services/api';
import Vue from 'vue'
import VueLazyload from 'vue-lazyload';
import { store, router } from 'core/routes'

// 初始化环境信息
config.init()
apiService.init()
app.init()

// 注册懒加载组件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./images/spacer.png'),
  loading: require('./images/spacer.png'),
  attempt: 1,
  adapter: {
    loaded({ el }) {
      el && el.parentNode && (el.parentNode.className = el.parentNode.className.replace('lazy', ''))
    },
  },
})

// 4. 创建和挂载根实例。
new Vue({
  store,
  router,
}).$mount('#app')

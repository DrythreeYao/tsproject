/**
 * 核心包，引入一些公共函数的兼容包、公共样式
 */

// 通用样式

// import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import './core.scss'

import './ts/polyfill'
import config from './ts/config'
import { app } from './ts/app'
import Vue from 'vue'
// 初始化环境配置
config.init()
app.init()

// 初始化ui
Vue.use(Element)

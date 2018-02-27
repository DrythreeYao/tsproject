/**
 * 核心包，引入一些公共函数的兼容包、公共样式
 */

// 通用样式
import './core.scss'

// 浏览器polyfill
import './ts/polyfill'

// 初始化环境信息
import config from './ts/config'
import { app } from './ts/app'
// import Cookies from 'js-cookie'
config.init()
app.init()

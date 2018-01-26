// 核心包，引入一些公共函数的兼容包、公共样式
import './core.scss'

// 处理全局对象兼容性
import 'browser-polyfill'
import URLSearchParams from 'url-search-params'

if (!('searchParams' in HTMLAnchorElement.prototype)) {
    window.URLSearchParams = URLSearchParams
}

// // 动画兼容
// if (!window.requestAnimationFrame) {
//     window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.oRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         function(callback) {
//             return window.setTimeout(callback, 1000 / 60);
//         });

// }

// if (!window.cancelAnimationFrame) {
//     window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
//         window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
//         window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
//         window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
//         window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
//         window.clearTimeout);
// }

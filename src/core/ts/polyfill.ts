/**
 * 处理全局对象兼容性
 * 为尽量减小lib大小，其他非必须兼容性问题哪里用到哪里引用
 */
import 'browser-polyfill'

// import URLSearchParams from 'url-search-params'

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

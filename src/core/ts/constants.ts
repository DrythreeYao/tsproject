/**
 * 约定的错误码
 */
export enum ERROR {
  ZERO = 0, // http网络异常，未联网
  JS_EXCEPTION = 1, // 客户端脚本异常
  SUCCESS = 101, // 业务操作成功状态
  FAILURE = 102, // 业务操作失败状态
  NO_LOGIN = 110, // 未登录
  VISITOR = 111, // 联合登录用户，游客身份
  INVALID_PARAMS = 400, // 无效参数
  SERVICE_EXCEPTION = 500, // 服务异常
  ACCOUNT_NO_ENOUGH = 100001, // 账户余额不足
  INITIALPRICE_NO_EXCEED_CEILPRICE = 200001, // 起拍价不能高于封顶价
}

/**
* 错误信息
*/
export const ERROR_MESSAGE = new Map([
  [0, 'http网络异常'],
  [1, '客户端脚本异常'],
  [101, '操作成功'],
  [102, '操作失败'],
  [110, '用户未登陆'],
  [111, '用户是游客身份'],
  [400, '请求参数无效'],
  [500, '对不起，系统繁忙，请您稍候再试'],
])

/**
* 用于本地存储的缓存名称，例如localstorage cookie
*/
export enum CACHE_KEY {
  /**
   * 应用配置
   */
  SETTING = '_setting',
  /**
   * 登录用户
   */
  USER = '_user',
}

/**
* 终端设备类型
*/
export enum DEVICE {
  // 原生应用
  APP = 'APP',
  // pc浏览器
  WEB_PC = 'WEB_PC',
  // mobile浏览器
  WEB_MOBILE = 'WEB_MOBILE',
  // mobile浏览器 && 微信应用中的webview
  WEB_WECHAT = 'WEB_WECHAT',
}

/**
* 平台系统
* https://github.com/bestiejs/platform.js/tree/master/doc#platformosfamily
*/
export enum PLATFORM {
  IOS = 'IOS',
  ANDROID = 'Android',
  OSX = 'OS X',
}

/**
* 应用key
*/
export enum APP_KEY {
  WEB = '',
}

/**
* 拍场状态
*/
export enum YD_AUCTION_STATUS {
  ALL = 0, // 全部
  UNPROCESSING = 1, // 预展中
  PROCESSING = 2, // 正在拍
  END = 3, // 已结拍
  DELAYED = 5, // 延时中
}

/**
* 拍场类型
*/
export enum AUCTION_TYPE {
  OFFLINE = 1, // 线下
  ONLINE = 2, // 线上
  OFFLINE_AND_ONLINE = 3, // 线上线下同步
}

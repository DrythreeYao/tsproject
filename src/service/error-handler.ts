import { constants, utils } from '../core/ts/app';
import { AxiosError } from 'axios'

/**
 * 错误处理函数接口
 */
interface ErrorHandler {
  network?: Function,
  httpError?: Function,
  noLogin?: Function,
  other?: Function,
}

/**
 * 默认的通用处理
 */
const defaultErrorHandler: ErrorHandler = {
  /**
   * 处理网络异常
   */
  network: function () {
    console.log(constants.ERROR_MESSAGE.get(constants.ERROR.ZERO))
  },

  /**
   * 处理 http 服务器异常
   */
  httpError: function (status: number) {
    console.log(status + ' ', constants.ERROR_MESSAGE.get(status))
  },

  /**
   * 用户未登录，弹出登录窗
   */
  noLogin: function (err: AxiosError) {
    console.log('用户未登录TODO', err)
  },

  /**
   * 处理其他异常操作
   */
  other: function (err: AxiosError) {
    let code = err.response && err.response.data.stateCode
    console.log(code + ' ', constants.ERROR_MESSAGE.get(code))
  },
}

function errorResponse(err: AxiosError, errorHandler: ErrorHandler) {
  let response = err.response
  let message = err.message

  if (response) {
    let status = response.status

    if (status === 200) {
      // http请求成功，但是业务状态码不是101
      let stateCode = response.data.stateCode
      if (stateCode === constants.ERROR.NO_LOGIN) {
        errorHandler.noLogin && errorHandler.noLogin(err)
      } else {
        errorHandler.other && errorHandler.other(err)
      }
    } else if (status < 200 || status > 300) {
      errorHandler.httpError && errorHandler.httpError(status)
    }
  } else if (err.message === 'Network Error') {
    errorHandler.network && errorHandler.network()
  } else {
    // TODO 此处脚本异常
    utils.log(constants.ERROR_MESSAGE.get(constants.ERROR.JS_EXCEPTION) + ' ' + err.stack, 'red')
  }
}

/**
 * 通用错误处理
 * @param customErrorHandler 自定义的错误处理函数
 */
export default function (customErrorHandler: ErrorHandler = defaultErrorHandler) {

  let errorHandle = Object.assign({}, defaultErrorHandler)
  Object.assign(errorHandle, customErrorHandler)

  return function (err: AxiosError) {
    errorResponse(err, errorHandle)
  }
}

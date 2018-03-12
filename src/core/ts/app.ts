import * as constants from './constants'
import utils from './utils'
import platform from 'platform'
import store from 'store'
import { passportService } from './services';

/**
 * 登录用户信息
 */
interface User {
  id: number, // 用户标识
  sid: string, // 登录后的会话id
}

/**
 * 应用信息
 */
interface AppInfo {
  uuid: string, // app设备标识
  device: string, // 设备类型
  appkey: string, // 应用key
  pt: string, // 平台系统
  ptVersion: string, // 平台系统版本
  appVersion: string // 应用版本
}

/**
 * 应用设置
 */
interface AppSetting {
  locale: string // 语言
}

/**
 * 应用级别的共享数据
 */
class App {
  private user: User
  private appInfo: AppInfo
  private appSetting: AppSetting

  /**
   * 构造
   */
  constructor() {
    this.appInfo = {
      uuid: '',
      device: '',
      appkey: '',
      pt: '',
      ptVersion: '',
      appVersion: '',
    }
    this.user = {
      id: 0,
      sid: '',
    }
    this.appSetting = {
      locale: '',
    }
  }

  /**
   * 初始化
   */
  init(): void {
    this.initAppInfo()
    this.initUser()
    this.initAppSetting()
  }

  /**
   * 初始化应用信息
   */
  private initAppInfo(): void {
    let appInfo = Object.assign({}, this.getAppInfo())
    let os = platform.os
    if (os) {
      appInfo.ptVersion = os.version || ''
      appInfo.pt = os.family || ''
    }

    if (platform.product === null) {
      appInfo.device = constants.DEVICE.WEB_PC
    } else {
      if (utils.isWeChatBrowser()) {
        appInfo.device = constants.DEVICE.WEB_WECHAT
      } else {
        appInfo.device = constants.DEVICE.WEB_MOBILE
      }
    }
    this.setAppInfo(appInfo)
    // utils.log('initAppInfo ' + JSON.stringify(this.getAppInfo()))
  }

  /**
   * 初始化user
   */
  private initUser(): void {
    // 写入本地缓存
    if (store.enabled) {
      let userCache = store.get(constants.CACHE_KEY.USER)
      if (userCache === undefined) {
        this.storageUser(this.getUser())
      }
    }
    // utils.log('initUser ' + JSON.stringify(this.getUser()))
  }

  /**
   * 初始化应用设置
   */
  private initAppSetting(): void {
    let appSetting = {
      locale: 'zh-CN',
    }
    // 写入本地缓存
    if (store.enabled) {
      let appSettingCache = store.get(constants.CACHE_KEY.SETTING)
      if (appSettingCache === undefined) {
        this.storageAppSetting(appSetting)
      }
    }
    // utils.log('initAppSetting ' + JSON.stringify(this.getAppSetting()))
  }

  /**
   * 设置登录用户信息
   * @param user 登录用户
   */
  setUser(user: User): void {
    this.user = user
  }

  /**
   * 获取登录用户信息
   */
  getUser(): User {
    return this.user
  }

  /**
   * 持久化user
   * @param user
   */
  storageUser(user: User): void {
    let userMerger = Object.assign({}, this.getUser(), user)
    this.setUser(userMerger) // 更新
    if (store.enabled) {
      store.set(constants.CACHE_KEY.USER, userMerger)
    }
  }

  /**
   * 设置应用信息
   * @param appInfo 应用信息
   */
  setAppInfo(appInfo: AppInfo): void {
    this.appInfo = appInfo
  }

  /**
   * 获取应用信息
   */
  getAppInfo(): AppInfo {
    return this.appInfo
  }

  /**
   * 设置偏好设置
   * @param appSetting 偏好设置
   */
  setAppSetting(appSetting: AppSetting): void {
    this.appSetting = appSetting
  }

  /**
   * 获取偏好设置
   */
  getAppSetting(): AppSetting {
    return this.appSetting
  }

  /**
   * 持久化偏好设置
   * @param appSetting
   */
  storageAppSetting(appSetting: AppSetting): void {
    let appSettingMerger = Object.assign({}, this.getAppSetting(), appSetting)
    this.setAppSetting(appSettingMerger) // 更新
    if (store.enabled) {
      store.set(constants.CACHE_KEY.SETTING, appSettingMerger)
    }
  }
}

let app: App = new App()

export {
  app,
  constants,
  utils
}

import constants from './constants'
import tools from './tools'
/**
 * 登录用户信息
 */
interface IUser {
    id: number, // 用户标识
    sid: string, // 登录后的会话id
}

/**
 * 应用信息
 */
interface IAppInfo {
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
interface IAppSetting {
    locale: string // 语言
}

/**
 * 应用级别的共享数据
 */
class APP {
    /**
     * instance 当前实例
     */
    static instance: APP

    /**
     * getInstantce 获取单例
     * @return {Config}
     */
    static getInstance(): APP {
        if (false === this.instance instanceof this) {
            this.instance = new this
        }
        return this.instance
    }

    private user: IUser
    private appInfo: IAppInfo
    private appSetting: IAppSetting

    /**
     * 构造
     */
    constructor() {
        this.setUser({
            id: 0,
            sid: '',
        })
        this.setAppInfo({
            uuid: '',
            device: '',
            appkey: 'web',
            pt: '',
            ptVersion: '',
            appVersion: '1.0.0',
        })
        this.setAppSetting({
            locale: 'zh-CN',
        })
    }

    /**
     * 设置登录用户信息
     * @param user 登录用户
     */
    setUser(user: IUser): void {
        this.user = user
    }

    /**
     * 获取登录用户信息
     */
    getUser(): IUser {
        return this.user
    }

    /**
     * 设置应用信息
     * @param appInfo 应用信息
     */
    setAppInfo(appInfo: IAppInfo): void {
        this.appInfo = appInfo
    }

    /**
     * 获取应用信息
     */
    getAppInfo(): IAppInfo {
        return this.appInfo
    }

    /**
     * 设置偏好设置
     * @param appSetting 偏好设置
     */
    setAppSetting(appSetting: IAppSetting): void {
        this.appSetting = appSetting
    }

    /**
     * 获取偏好设置
     */
    getAppSetting(): IAppSetting {
        return this.appSetting
    }
}

let app = APP.getInstance()

export {
    app,
    constants,
    tools
}

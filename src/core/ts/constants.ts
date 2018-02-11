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

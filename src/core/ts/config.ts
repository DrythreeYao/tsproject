import { constants, tools } from './app'
declare let __DEV__: any
declare let __TEST__: any
declare let __PRODUCTION__: any

/**
 * 环境变量
 */
interface IEnv {
    service: string, // 服务地址前缀
    domain: string, // 环境地址前缀
    cdnDomain: string, // 资源cdn前缀
    wsDomain?: string, // websocket地址前缀
}

class Config {
    /**
     * instance 当前实例
     */
    static instance: Config

    /**
     * getInstantce 获取单例
     * @return {Config}
     */
    static getInstance(): Config {
        if (false === this.instance instanceof this) {
            this.instance = new this
        }
        return this.instance
    }

    /**
     * 项目环境变量
     */
    private env: IEnv

    /**
     * 构造
     */
    constructor() {
        if (__DEV__) {
            tools.log('Current operating environment is DEV')
            this.setEnv({
                service: 'http://twei.yidianchina.com/api',
                domain: 'http://twei.yidianchina.com',
                cdnDomain: 'http://static.yidianchina.com',
            })
        }
        if (__TEST__) {
            tools.log('Current operating environment is TEST')
            this.setEnv({
                service: 'http://www.somename.com/api',
                domain: 'http://www.somename.com',
                cdnDomain: 'http://static.somename.com',
            })
        }
        if (__PRODUCTION__) {
            tools.log('Current operating environment is PRODUCTION')
            this.setEnv({
                service: 'http://www.somename.com/api',
                domain: 'http://www.somename.com',
                cdnDomain: 'http://static.somename.com',
            })
        }
    }

    /**
     * 设置项目环境变量
     * @param env 环境变量
     */
    setEnv(env: IEnv): void {
        this.env = env
    }

    /**
     * 获取项目环境变量
     */
    getEvn(): IEnv {
        return this.env
    }
}

export default Config.getInstance()


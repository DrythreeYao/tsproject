import { constants, tools } from './app'
declare let __DEV__: any
declare let __TEST__: any
declare let __PRODUCTION__: any

/**
 * 环境变量
 */
interface Env {
  service: string, // 服务地址前缀
  domain: string, // 环境地址前缀
  cdnDomain: string, // 资源cdn前缀
  wsDomain?: string, // websocket地址前缀
}

class Config {

  /**
   * 项目环境变量
   */
  private env: Env = ({
    service: '',
    domain: '',
    cdnDomain: '',
  })

  /**
   * 构造
   */
  constructor() { }

  /**
   * 初始化
   */
  init() {
    if (__DEV__) {
      tools.log('Current operating environment is DEV')
      this.setEnv({
        service: 'http://www.yidianchina.com/',
        domain: 'http://www.yidianchina.com/',
        cdnDomain: 'http://static.yidianchina.com',
      })
    }
    if (__TEST__) {
      tools.log('Current operating environment is TEST')
      this.setEnv({
        service: 'http://www.yidianchina.com/',
        domain: 'http://www.yidianchina.com/',
        cdnDomain: 'http://static.yidianchina.com',
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
  setEnv(env: Env): void {
    this.env = env
  }

  /**
   * 获取项目环境变量
   */
  getEvn(): Env {
    return this.env
  }
}

let config: Config = new Config()
export default config


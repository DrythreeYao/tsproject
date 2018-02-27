/**
 * 大部分情况使用ES6的模块即可，此类仅做单例参考
 */
class Singleton {
    static instanceCache: Map<Function, object>

    constructor() {

    }

    /**
     * getInstantce 获取单例
     * @return {Config}
     */
    static getInstance(SingleClass: any): any {
        let instance = null
        if (!Singleton.instanceCache) {
            Singleton.instanceCache = new Map<Function, object>()
        }
        instance = Singleton.instanceCache.get(SingleClass)
        if (!instance) {
            instance = new this
            Singleton.instanceCache.set(SingleClass, instance)
        }
        return instance
    }
}

export default Singleton

/**
 * 不使用上面继承方式的单例写法之一
 */
class Demo {
    static instance: Demo

    static getInstance() {
        if (this.instance === null) {
            this.instance = new this
        }
        return this.instance
    }
}

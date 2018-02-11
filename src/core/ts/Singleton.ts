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
            Singleton.instanceCache.set(instance.constructor, instance)
        }
        return instance
    }
}

export default Singleton

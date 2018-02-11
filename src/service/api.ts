import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'
import { app, constants } from '../core/ts/app'
import Singleton from '../core/ts/singleton'
import config from '../core/ts/config'
import qs from 'qs';

/**
 * http header参数
 */
interface IHeader {
    sid: string, // 会话id
}

/**
 * 异步基础函数
 */
class ApiService extends Singleton {
    constructor() {
        super()
        this.init()
    }

    /**
     * 初始化
     */
    private init(): void {
        axios.defaults.baseURL = config.getEvn().service
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            config.data = config.data.toString()
            return config
        }, function (error) {
            // Do something with request error
            return Promise.reject(error)
        })

        // Add a response interceptor
        axios.interceptors.response.use((response: AxiosResponse<any>) => {
            // Do something with response data
            return response
        }, (error: any) => {
            // Do something with response error
            return Promise.reject(error)
        })
    }

    /**
     * get
     * @param url   请求地址
     * @param data  请求参数
     */
    get(url: string, config?: AxiosRequestConfig): AxiosPromise<any> {
        return axios.get(url)
    }

    /**
    * post
    * @param url   请求地址
    * @param data  请求参数
    */
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any> {
        return axios.post(url, qs.stringify(data))
    }
}

let apiService: ApiService = ApiService.getInstance('ApiService')
export default apiService

// /**
//  * 设置header参数
//  * @param {Object} params 参数对象
//  */
// function setHeader(params: IHeader) {
//     Object.assign(axios.defaults.headers.common, params)
// }

// /**
//  * 业务成功失败的验证方法
//  * @return {Boolean} 返回业务成功or失败
//  */
// function validate() {
//     var result = true
//     return result
// }

import promiseFinally from 'promise.prototype.finally'
import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { app, constants } from '../core/ts/app'
import config from '../core/ts/config'
import qs from 'qs';

/**
 * http header参数
 */
interface Header {
    sid: string, // 会话id
}

/**
 * 服务器返回数据格式
 */
export interface ResponseData {
    message: string,
    stateCode: number,
    data?: any
}

/**
 * 异步基础函数
 */
class ApiService {
    constructor() {
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
        axios.interceptors.response.use((response: AxiosResponse<ResponseData>) => {
            // Do something with response data
            let code = response.data.stateCode
            // 业务成功
            if (code === constants.ERROR.SUCCESS) {
                return response
            } else {
                let e: AxiosError
                e = {
                    config: response.config,
                    name: 'Business Error',
                    message: 'Business Error: stateCode is not 101',
                    response: response,
                }
                return Promise.reject(e)
            }
        }, (error: AxiosError) => {
            // Do something with response error
            return Promise.reject(error)
        })
    }

    /**
     * 更新header
     * @param header
     */
    setHeader(header: Header) {
        Object.assign(axios.defaults.headers.common, header)
    }

    /**
     * get
     * @param url   请求地址
     * @param data  请求参数
     */
    get(url: string, config?: AxiosRequestConfig): AxiosPromise<ResponseData> {
        return axios.get(url).catch(err => {
            throw err
        })
    }

    /**
    * post
    * @param url   请求地址
    * @param data  请求参数
    */
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<ResponseData> {
        return axios.post(url, qs.stringify(data))
            .catch(err => {
                throw err
                // return err
            })
    }
}

let apiService: ApiService = new ApiService()
export default apiService

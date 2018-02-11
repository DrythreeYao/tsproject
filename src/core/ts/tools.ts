import Singleton from './singleton'

interface ITools {
    isWeChatBrowser(): boolean,
    log(message: string): void,
    parseTimestamp(dateStr?: string): number,
}

class Tools extends Singleton implements ITools {
    constructor() {
        super()
    }

    /**
     * 判断是否是微信应用中的浏览器
     */
    isWeChatBrowser(): boolean {
        let result = false
        let ua = window.navigator.userAgent.toLowerCase()
        let match = ua.match(/MicroMessenger/i)
        if (match && match.length > -1) {
            result = 'micromessenger' === match[0]
        }
        return result
    }

    /**
     * 打印日志
     * @param message 字符串信息
     */
    log(message: string): void {
        console.log('%c' + message, 'color: green;font-size:16px;')
    }

    /**
    * 时间格式字符串转换为时间戳，为了兼容ios的浏览器
    * @param dateStr 时间格式字符串 '2015-12-11 17:07'
    * @return {Number}
    */
    parseTimestamp(dateStr: string = ''): number {
        let timeArr, timeArrLength, dateStrArr, y, M, d, h, m, s
        y = M = d = h = m = s = 0

        dateStrArr = dateStr.split(' ')
        timeArr = dateStrArr[0].split('-')

        if (dateStrArr.length === 2) {
            timeArr = timeArr.concat(dateStrArr[1].split(':'))
        }
        timeArrLength = timeArr.length
        if (timeArrLength > 0) {
            y = parseFloat(timeArr[0]) || 0
        }
        if (timeArrLength > 1) {
            M = parseFloat(timeArr[1]) || 0
        }
        if (timeArrLength > 2) {
            d = parseFloat(timeArr[2]) || 0
        }
        if (timeArrLength > 3) {
            h = parseFloat(timeArr[3]) || 0
        }
        if (timeArrLength > 4) {
            m = parseFloat(timeArr[4]) || 0
        }
        if (timeArrLength > 5) {
            s = parseFloat(timeArr[5]) || 0
        }
        return Math.round(new Date(y, M - 1, d, h, m, s).getTime())
    }
}

let tools: ITools = Tools.getInstance('Tools')
export default tools

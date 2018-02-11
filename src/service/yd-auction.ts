import Singleton from '../core/ts/Singleton';
import { constants } from '../core/ts/app';
import apiService from './api';

/**
 * 艺典同步拍拍场
 */
export interface YDAuction {
    activeStatus: constants.YD_AUCTION_STATUS
    auctionType: constants.AUCTION_TYPE
    beginTime: number
    bidCount: number
    concern: boolean
    endTime: number
    id: number
    name: string
    pictureUrl: string
    portrait: string
    publisher: string
    publisherId: number
    tradingPriceCount: number
    visitCount: number
    whetherTodayEnd: boolean
}

/**
 * 艺典拍业务
 */
class YDAuctionService extends Singleton {
    findYDAuctions(activeStatus: number, pageNum: number = 1, pageSize: number = 5, hasSearch: number = 3) {
        return apiService.post('netauctionsite/search', {
            activeStatus: activeStatus,
            pageSize: pageSize,
            pageNum: pageNum,
            hasSearch: hasSearch,
        })
    }
}

let ydAuctionService: YDAuctionService = YDAuctionService.getInstance('YDAuctionService')
export default ydAuctionService

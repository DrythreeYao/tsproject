import { constants } from '../core/ts/app';
import Picture from './Picture';

/**
 * 艺典同步拍拍场
 */
export default interface YDAuction {
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
  isTop?: boolean // 是否置顶
  isHidden: boolean // 是否隐藏
}

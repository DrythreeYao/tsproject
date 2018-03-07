import { constants } from '../core/ts/app';
import apiService from './api';
import { YDAuction } from '../core/ts/vo';

/**
 * 艺典拍业务
 */
class YDAuctionService {
  /**
   * 获取拍场集合
   * @param activeStatus  拍场状态
   * @param pageNum   页码
   * @param pageSize  每页条目
   * @param hasSearch
   */
  findYDAuctions(activeStatus: number, pageNum: number = 1, pageSize: number = 5, hasSearch: number = 3) {
    return apiService.post('netauctionsite/search', {
      activeStatus: activeStatus,
      pageSize: pageSize,
      pageNum: pageNum,
      hasSearch: hasSearch,
    }).then(res => {
      let list: YDAuction[] = res.data.data.result
      let i = 0
      for (const item of list) {
        item.customProperty = '序列' + i++
        item.customPic = {
          id: 1,
          url: 'https://www.tslang.cn/assets/images/logo_nocircle.svg',
        }
      }
      // console.log(res.data.data.a.b)
      return res
    })
    // return apiService.post('information/findAuctionInformations')
    // return apiService.post('userinfo/getNoReadProduct')
  }
}

let ydAuctionService: YDAuctionService = new YDAuctionService()
export default ydAuctionService

import './index.scss'
import { tools, constants, app } from '../../core/ts/app';
import ydAuctionService from '../../service/yd-auction';
import Vue from 'vue';
import errorHandler from '../../service/error-handler';
import { YDAuction } from '../../vo/YDAuction';

let vm = new Vue({
    el: '#app',
    data: {
        auctionList: [],
    },
    methods: {
        init() {
            tools.log('-> begin')
            this.findYDAuctions()
                .catch(errorHandler())
                .finally(() => {
                    tools.log('-> end finally')
                })
        },
        async findYDAuctions() {
            let res = await ydAuctionService.findYDAuctions(constants.YD_AUCTION_STATUS.ALL)
            let data = res.data.data

            let auctionList = data.result
            let auction: YDAuction
            for (auction of auctionList) {
                tools.log(auction.customProperty)
                // auction.name = '改变数据'
            }
            this.auctionList = auctionList
        },
    },
})
vm.init()

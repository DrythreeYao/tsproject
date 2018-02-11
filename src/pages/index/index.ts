import './index.scss'
import { Person } from './person'
import ydAuctionService, { YDAuction } from '../../service/yd-auction';
import { constants } from '../../core/ts/app';
import Vue from 'vue';

let p = new Person('test')
p.sayHello()

let vm = new Vue({
    el: '#app',
    data: {
        auctionList: [],
    },
    methods: {
        init() {
            this.findYDAuctions()
            this.test()
        },
        async findYDAuctions() {
            console.log('loading')
            let res = await ydAuctionService.findYDAuctions(constants.YD_AUCTION_STATUS.ALL)

            let auctionList = (res.data.data.result)

            for (const item of auctionList) {
                let auction = <YDAuction>item

                console.log(auction.name)
            }
            this.auctionList = auctionList

            console.log('end ', res)
        },

        async test() {
            let data = await ydAuctionService.test(1000)
            console.log(data)

        },
    },
})
vm.init()

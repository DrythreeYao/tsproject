import './index.scss'
import { tools, constants, app } from '../../core/ts/app';
import ydAuctionService from '../../service/yd-auction';
import Vue from 'vue';
import errorHandler from '../../service/error-handler';
import { YDAuction } from '../../vo/YDAuction';

let vm = new Vue({
    el: '#app',
    data: {
        loading: true,
        totalNum: 1,
        pageNum: 1,
        pageSize: 10,
        auctionList: [],
        multipleSelection: [],
    },
    methods: {
        init() {
            this.findYDAuctions()
        },
        handleSelectionChange(rows: any) {
            console.log('选项变化: ', rows)
            this.$alert(rows.length, '选项数量')
            this.multipleSelection = rows;
        },
        handleClick(row: YDAuction) {
            console.log(row);
            this.$alert(row.name, '专场名称')
        },
        handleCurrentChange(pageNum: number) {
            console.log(`当前页: ${pageNum}`);
            this.$message.success(`当前页: ${pageNum}`)
            this.pageNum = pageNum
            this.findYDAuctions()
        },
        handleSizeChange(pageSize: number) {
            console.log(`显示条目数: ${pageSize}`);
            this.$message.success(`显示条目数: ${pageSize}`)
            this.pageSize = pageSize
            this.findYDAuctions()
        },
        findYDAuctions() {
            this.loading = true
            this.doFindYDAuctions()
                .catch(errorHandler())
                .finally(() => {
                    this.loading = false
                })
        },
        async doFindYDAuctions() {
            let res = await ydAuctionService.findYDAuctions(constants.YD_AUCTION_STATUS.ALL, this.pageNum, this.pageSize)
            let data = res.data.data
            let auctionList = data.result
            let auction: YDAuction
            for (auction of auctionList) {
                tools.log(auction.customProperty)
                // auction.name = '改变数据'
            }
            this.auctionList = auctionList
            this.totalNum = data.totalNum
        },
    },
})
vm.init()

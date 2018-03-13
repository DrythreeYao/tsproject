<template>
  <div>
    <el-table ref="multipleTable" v-loading="loading" :data="auctionList" class="table" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="标识" width="180"></el-table-column>
      <el-table-column prop="publisher" label="发布者" width="180"></el-table-column>
      <el-table-column prop="name" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :total="totalNum" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { utils, constants, app } from "../../../core/ts/app";
import { errorHandler, ydAuctionService } from "../../../core/ts/services";
import { YDAuction } from "src/core/ts/vo";

@Component
export default class MyComponent extends Vue {
  loading = true;
  totalNum = 1;
  pageNum = 1;
  pageSize = 10;
  auctionList = [];
  multipleSelection = [];

  // @Prop({ default: 0 })
  // enterCounter?: number;
  @Prop({ default: "1" })
  tabIndex?: string;

  created() {
    this.findYDAuctions();
  }
  // @Watch("enterCounter")
  // onBeforeRouteUpdate() {
  //   this.findYDAuctions();
  // }
  handleSelectionChange(rows: any) {
    console.log("选项变化: ", rows);
    this.$alert(rows.length, "选项数量");
    this.multipleSelection = rows;
  }
  handleClick(row: YDAuction) {
    console.log(row);
    this.$alert(row.name, "专场名称");
  }
  handleCurrentChange(pageNum: number) {
    console.log(`当前页: ${pageNum}`);
    this.$message.success(`当前页: ${pageNum}`);
    this.pageNum = pageNum;
    this.findYDAuctions();
  }
  handleSizeChange(pageSize: number) {
    console.log(`显示条目数: ${pageSize}`);
    this.$message.success(`显示条目数: ${pageSize}`);
    this.pageSize = pageSize;
    this.findYDAuctions();
  }
  findYDAuctions() {
    this.loading = true;
    this.doFindYDAuctions()
      .catch(errorHandler())
      .finally(() => {
        this.loading = false;
      });
  }
  getActiveStatus() {
    let status: number = constants.YD_AUCTION_STATUS.ALL;
    switch (this.tabIndex) {
      case "1":
        status = constants.YD_AUCTION_STATUS.ALL;
        break;
      case "2":
        status = constants.YD_AUCTION_STATUS.PROCESSING;
        break;
      case "3":
        status = constants.YD_AUCTION_STATUS.UNPROCESSING;
        break;
      case "4":
        status = constants.YD_AUCTION_STATUS.END;
        break;
      default:
        break;
    }
    return status;
  }
  async doFindYDAuctions() {
    let res = await ydAuctionService.findYDAuctions(
      this.getActiveStatus(),
      this.pageNum,
      this.pageSize
    );
    let data = res.data.data;
    let auctionList = data.result;
    let auction: YDAuction;
    for (auction of auctionList) {
      // utils.log(auction.customProperty);
      // auction.name = '改变数据'
    }
    this.auctionList = auctionList;
    this.totalNum = data.totalNum;
  }
}
</script>

<style lang="scss" scoped>
.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.el-pagination {
  margin-top: 15px;
}
</style>

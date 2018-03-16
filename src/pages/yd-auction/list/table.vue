<template>
  <div class="yd-auction-list" :class="{'show-hiddens': showHiddenItems}">
    <el-table ref="multipleTable" v-loading="loading"
      :row-class-name="tableRowClassName"
      :height="tableHeight"
      :data="auctionList" class="table"
      @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column sortable prop="id" label="标识" width="180">
          <template slot-scope="scope">
            <div>{{scope.row.id}}</div>
            <div class="one-line">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="publisher" label="发布者" width="180"></el-table-column>
        <el-table-column label="价格(元)" width="100">
          <template slot-scope="scope">
            ￥1000/{{tableHeight}}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="标题" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)" >查看</el-button>
            <el-button type="text" size="small" @click="setTop(scope.row)" >置顶</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-button class="button-top" type="text" @click="setTop()">置顶</el-button>
    <el-button class="button-top" type="text" @click="setHidden()">隐藏</el-button>
    <el-checkbox class="is-show-hiddens" :checked="showHiddenItems" @change="showHiddenItems = !showHiddenItems">显示隐藏拍品，已隐藏 {{totalHiddenItems}} 件拍品</el-checkbox>
    <el-pagination background layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :total="totalNum" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script lang="tsx">
import { Vue, Component, Prop, Watch, Model } from "vue-property-decorator";
import { utils, constants, app } from "core/ts/app";
import { errorHandler, ydAuctionService } from "core/ts/services";
import store from "store";
import { YDAuction } from "core/ts/vo";

@Component
export default class MyComponent extends Vue {
  loading = true;
  totalNum = 1;
  pageNum = 1;
  pageSize = 10;
  auctionList = [];
  multipleSelection = [];
  topItems: Map<number, YDAuction> = new Map(); // 置顶项集合
  hiddenItems: Map<number, YDAuction> = new Map(); // 隐藏项集合
  tableHeight = window.innerHeight - (120 + 40 + 55 + 47 + 55);
  showHiddenItems = false; // 展示已隐藏的选项

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
  get totalHiddenItems() {
    let count = 0;
    let item: YDAuction;
    for (item of this.auctionList) {
      if (item.isHidden) {
        count++;
      }
    }
    return count;
  }
  handleSelectionChange(rows: any) {
    this.multipleSelection = rows;
    // rows[rows.length - 1].isTop = true;
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
  tableRowClassName({ row, rowIndex }) {
    if (row.isTop) {
      return "row-top";
    } else if (row.isHidden) {
      return "row-hidden";
    }
    return "";
  }
  storeProductsSetting({
    topItems,
    hiddenItems
  }: {
    topItems?: Map<number, YDAuction>;
    hiddenItems?: Map<number, YDAuction>;
  }) {
    let cache = store.get(constants.CACHE_KEY.YD_PRODUCTS_SETTING) || {};
    if (topItems) cache.topItems = topItems;
    if (hiddenItems) cache.hiddenItems = hiddenItems;
    store.set(constants.CACHE_KEY.YD_PRODUCTS_SETTING, cache);
  }
  // 置顶
  setTop(row?: YDAuction) {
    if (row) {
      row.isTop = true;
      this.topItems.set(row.id, row);
      let multipleTable: any = this.$refs.multipleTable;
      multipleTable.toggleRowSelection(row, true);
      // this.$refs.multipleTable.clearSelection();
    } else {
      let item: YDAuction;
      for (item of this.multipleSelection) {
        if (!item.isHidden) {
          item.isTop = true;
          this.topItems.set(item.id, item);
        }
      }
    }
    this.storeProductsSetting({
      topItems: this.topItems
    });
    this.auctionList.sort((m: YDAuction, n: YDAuction) => {
      if (!m.isTop && n.isTop) {
        return 1;
      } else if (m.isTop && !n.isTop) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  // 隐藏
  setHidden(row?: YDAuction) {
    if (row) {
      row.isHidden = true;
      this.topItems.set(row.id, row);
    } else {
      let item: YDAuction;
      for (item of this.multipleSelection) {
        if (!item.isTop) {
          item.isHidden = true;
          this.topItems.set(item.id, item);
        }
      }
    }
  }
  // 出价
  showBidBox() {}
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
      auction.isTop = false;
      auction.isHidden = false;
    }
    this.auctionList = auctionList;
    this.totalNum = data.totalNum;
  }
}
</script>

<style lang="scss" scoped>
.el-pagination,
.button-top {
  margin-top: 15px;
}
</style>
<style lang="scss">
.yd-auction-list {
  &.show-hiddens {
    .row-hidden {
      display: table-row;
    }
  }
  .is-show-hiddens {
    margin-left: 15px;
    .el-checkbox__label {
      font-size: 13px;
      padding-left: 5px;
    }
  }
  .row-top {
    background-color: #f0f9eb;
  }
  .row-hidden {
    display: none;
    background-color: #f5f5f5;
  }
}
</style>

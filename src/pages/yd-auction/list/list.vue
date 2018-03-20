<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="全部" name="1">

      </el-tab-pane>
      <el-tab-pane label="正在拍" name="2">
        <!-- <my-table tab-index='2' :enter-counter="enterCounter" v-if="activeTab === '2'"></my-table> -->
      </el-tab-pane>
      <el-tab-pane label="预展中" name="3">
        <!-- <my-table tab-index='3' :enter-counter="enterCounter" v-if="activeTab === '3'"></my-table> -->
      </el-tab-pane>
      <el-tab-pane label="已结拍" name="4">
        <!-- <my-table tab-index='4' :enter-counter="enterCounter" v-if="activeTab === '4'"></my-table> -->
      </el-tab-pane>
    </el-tabs>
    <my-table :tab-index="activeTab" :enter-counter="enterCounter"></my-table>
  </div>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";
import MyTable from "./table.vue";

@Component({
  components: {
    MyTable
  }
})
export default class MyComponent extends Vue {
  enterCounter: number = 0;
  activeTab: string = "1";

  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next(vm => {
      console.log("beforeRouteEnter next");
    });
  }
  // beforeRouteUpdate(to, from, next) {
  //   console.log("beforeRouteUpdate");
  //   this.enterCounter++;
  //   next();
  // }
  handleTabClick(tab, event) {
    this.enterCounter++;
  }
}
</script>

<style scoped>

</style>

<template>
  <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-main>
      loginPage
    </el-main>
    <!-- <el-footer>
      <my-footer></my-footer>
    </el-footer> -->
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { utils, constants, app } from "../../../core/ts/app";
import { errorHandler } from "../../../core/ts/services";
import MyHeader from "../../../layouts/backend/standard/header.vue";
import MyFooter from "../../../layouts/backend/standard/footer.vue";

@Component({
  components: {
    MyHeader,
    MyFooter
  }
})
export default class MyComponent extends Vue {}
</script>

<style lang="scss" scoped>

</style>

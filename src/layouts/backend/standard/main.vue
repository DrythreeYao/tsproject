<template>
  <el-container>
    <el-header>
      <my-header :is-show-user="true"></my-header>
    </el-header>
    <el-container>
      <my-menu></my-menu>
      <el-main>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer>
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import MyHeader from "./header.vue";
import MyFooter from "./footer.vue";
import MyMenu from "./menu.vue";

@Component({
  components: {
    MyHeader,
    MyFooter,
    MyMenu
  }
})
export default class MyComponent extends Vue {}
</script>

<style lang="scss" scoped>

</style>

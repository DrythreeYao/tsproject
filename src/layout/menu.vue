<template>
<div>
<!-- 使用 router-link 组件来导航. -->
<!-- 通过传入 `to` 属性指定链接. -->
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<!-- <router-link to="/foo">Go to Foo</router-link> -->
<!-- <router-link to="/bar">Go to Bar</router-link> -->
<el-row>
  <el-col :span="24" class="my-col">
    <!-- <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false"><i class="el-icon-d-arrow-left"></i></el-radio-button>
      <el-radio-button :label="true"><i class="el-icon-d-arrow-right"></i></el-radio-button>
    </el-radio-group> -->
    <h3 class="my-menu-toggle">
      <el-button type="text" icon="el-icon-d-arrow-left" v-if="!isCollapse" @click="toggleMenu"></el-button>
      <el-button type="text" icon="el-icon-d-arrow-right" v-if="isCollapse"></el-button>
    </h3>
    <el-menu
      default-active="1"
      class="my-menu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#bdbdbd"
      active-text-color="#fff">

      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu :index="i + 2 + ''" v-for="(menu, i) in menus" :key="i">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="(i + 2) + '-' + j" v-for="(subMenu, j) in menu.menus" :key="j">
            <router-link :to="subMenu.link">{{subMenu.name}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
</el-row>
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MyMenu extends Vue {
  name = "MyMenu";
  isCollapse = false;
  menus = [];

  constructor() {
    super();
    this.findMenus();
  }

  handleOpen(key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose(key, keyPath) {
    console.log(key, keyPath);
  }
  handleSelect(key, keyPath) {
    console.log(key, keyPath);
  }
  toggleMenu() {
    this.isCollapse = !this.isCollapse;
  }
  async findMenus() {
    let res = await import("./menu.json");
    this.menus = res.data;
  }
}
</script>

<style lang="scss" scoped>
.my-menu-toggle {
  padding-left: 10px;

  background-color: #545c64;

  .el-button--text {
    width: 40px;

    color: #fff;
  }
}
.my-menu {
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 224px;
    min-height: 400px;
  }
  .el-menu-item {
    a {
      margin: 0 -40px;
      padding-left: 40px;
      display: block;

      text-decoration: none;

      color: #bdbdbd;
    }
    &.is-active {
      a {
        color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="my-menu-container">
    <!-- <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false"><i class="el-icon-d-arrow-left"></i></el-radio-button>
      <el-radio-button :label="true"><i class="el-icon-d-arrow-right"></i></el-radio-button>
    </el-radio-group> -->
    <h3 class="my-menu-toggle">
      <el-button type="text" icon="el-icon-d-arrow-left" v-if="!isCollapse" @click="toggleMenu"></el-button>
      <el-button type="text" icon="el-icon-d-arrow-right" v-if="isCollapse" @click="toggleMenu"></el-button>
    </h3>
    <el-menu
      default-active="home"
      class="my-menu"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="isCollapse"
      background-color="#f6f8f9"
      text-color="#666"
      active-text-color="#000">

      <!-- <el-menu-item index="home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item> -->

      <el-submenu :index="i + ''" v-for="(menu, i) in menus" :key="i">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="subMenu.link" v-for="(subMenu, j) in menu.menus" :key="j">
            <!-- 使用 router-link 组件来导航. -->
            <!-- 通过传入 `to` 属性指定链接. -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <!-- <router-link to="/foo">Go to Foo</router-link> -->
            <!-- <router-link to="/bar">Go to Bar</router-link> -->
            <!-- <router-link :to="subMenu.link">{{subMenu.name}}</router-link> -->
            {{subMenu.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MyMenu extends Vue {
  isCollapse = true;
  menus = [];

  constructor() {
    super();
    this.findMenus();
  }

  handleOpen(key, keyPath) {
    this.$router.push("/");
  }
  handleClose(key, keyPath) {
    this.$router.push("/");
  }
  handleSelect(key, keyPath) {
    this.$router.push(key);
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
.my-menu-container {
  background-color: #f6f8f9;
}
.my-menu-toggle {
  padding-left: 10px;

  background-color: #f6f8f9;

  .el-button--text {
    width: 40px;

    color: #666;
  }
}
.my-menu {
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 224px;
    min-height: 400px;
  }
}
</style>

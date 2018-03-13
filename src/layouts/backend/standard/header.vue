<template>
  <div class="my-header">
    <ul class="fl list-fl">
      <li class="logo p-img lazy">
        <img v-lazy="logo">
      </li>
      <li class="title">艺典中国控制台</li>
    </ul>
    <ul class="fr list-fr none" v-show="user.name" v-if="loginStatus">
      <li class="message" @click="handleMessage">
        <el-badge :value="messageCount" :max="99">
          <i class="el-icon-bell"></i>
        </el-badge>
      </li>
      <li class="user">
        <div class="portrait p-img lazy">
          <img v-lazy="user.portrait">
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
           {{user.name}} <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modifyPortrait">修改头像</el-dropdown-item>
            <el-dropdown-item command="exit" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { utils, constants, app } from "../../../core/ts/app";
import { errorHandler, passportService } from "../../../core/ts/services";
import { User } from "src/core/ts/vo";

@Component
export default class MyComponent extends Vue {
  logo: string = require("logo");
  messageCount: number = 120;

  @Prop({ default: false })
  isShowUser?: boolean;

  get user() {
    return this.$store.state.user.user
  }
  get loginStatus() {
    return this.$store.state.user.loginStatus
  }

  handleMessage() {
    this.$alert("消息总数: " + this.messageCount);
  }
  handleCommand(command) {
    this.$message("click on item " + command);
    if (command === "exit") {
      this.doExit();
    }
  }
  async doExit() {
    await passportService.exit();
    this.$router.push({ name: "passport/login" });
  }
}
</script>

<style lang="scss">
.my-header {
  height: 60px;
  margin: 0 -20px;
  box-shadow: 0 1px 4px 0 rgba(238, 238, 238, 0.5);
}
.list-fl,
.list-fr {
  padding: 15px 0;
  > li {
    float: left;
    padding-left: 15px;
  }
}
.logo,
.portrait {
  float: left;
  width: 30px;
  height: 30px;
  img {
    border-radius: 15px;
    width: 30px;
    height: 30px;
  }
}
.title {
  font-size: 20px;
  width: 200px;
}
.message {
  padding-right: 20px;
  padding-top: 7px;
  cursor: pointer;
  .el-icon-bell {
    font-size: 20px;
    color: #999;
  }
}
.user {
  line-height: 30px;
  padding-right: 20px;
  cursor: pointer;
}
.el-dropdown-link {
  padding-right: 5px;
  padding-left: 10px;
  .el-icon-caret-bottom {
    color: #999;
  }
}
</style>

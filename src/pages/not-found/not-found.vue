<template>
  <div class="error">
    <img class="e-404" v-lazy="bgimg" alt="">
    <ul class="text">
      <li>There was a problem</li>
      <li>The page you are looking for is not here or moved.</li>
    </ul>
    <div class="back-home">
      <i class="icon-home"></i>
      <a href="/">Back to homepage</a>
    </div>
  </div>
</template>

<script lang="tsx">
import { Vue, Component, Prop } from "vue-property-decorator";
import { utils, constants, app } from "core/ts/app";
import { errorHandler } from "core/ts/services";

@Component
export default class MyComponent extends Vue {
  bgimg: string = require("./images/404.png");
}
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
}
.text {
  color: #999;
}
.icon-home {
  display: inline-block;
  background-image: url(images/home.png);
  width: 48px;
  height: 30px;
}
.back-home {
  font-size: 18px;
  padding-top: 10px;
}
</style>

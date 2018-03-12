<template>
  <div>
    拍场详情
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { utils, constants, app } from "../../../core/ts/app";
import { errorHandler } from "../../../core/ts/services";

@Component
export default class MyComponent extends Vue {
  @Prop({ default: "" })
  title?: string = "";

  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>

</style>

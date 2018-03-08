<template>
<div>
  My Header {{title}}
</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MyHeader extends Vue {
  @Prop({ default: "default title" })
  title?: string;
  constructor() {
    super();
  }
}
</script>

<style scoped>

</style>

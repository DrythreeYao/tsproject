<template>
  <div class="hello" :style="{ height }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "MyHello",

  props: {
    height: {
      type: String,
      default: "60px"
    }
  }
};
</script>

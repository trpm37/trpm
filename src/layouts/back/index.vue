<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
    <component :is="LayoutComponents[layout]" />
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useGlobalStore } from "../../stores/modules/global";
  import layoutDefault from "./layoutDefault/index.vue";
  import layoutDhuman from "./layoutDhuman/index.vue";
  const LayoutComponents = {
    default: layoutDefault,
    dhuman: layoutDhuman
  };
  
  const globalStore = useGlobalStore();
  const layout = computed(() => globalStore.layout);
  </script>
  
  <style scoped lang="scss">
  </style>
  
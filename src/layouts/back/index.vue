<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="com_layout[layout]" />
</template>

<script setup>
import { computed } from "vue";
import { useGlobalStore } from "../../stores/modules/global";
import com_layoutDefault from "./layoutDefault/index.vue";
import com_layoutDhuman from "./layoutDhuman/index.vue";
const com_layout = {
  default: com_layoutDefault,
  dhuman: com_layoutDhuman,
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>

<style scoped lang="scss"></style>

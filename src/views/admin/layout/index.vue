<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="com_layout[layout]" />
</template>

<script setup>
import { computed,provide } from "vue";
import { useGlobalStore } from "@/stores/site/global";
import com_layoutDefault from "./default/index.vue";
import com_layoutVertical from "./vertical/index.vue";
const com_layout = {
  default: com_layoutDefault,
  vertical: com_layoutVertical,
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);

</script>

<style scoped lang="scss"></style>

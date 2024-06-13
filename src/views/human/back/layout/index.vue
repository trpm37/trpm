<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="com_layout[layout]" />
</template>

<script setup>
import { computed,provide,watch } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/modules/global";
import { humanStore } from "@/stores/human/human";

// 路由信息
const route = useRoute();

import com_layoutDefault from "./layoutDefault/index.vue";
import com_layoutVertical from "./layoutVertical/index.vue";
const com_layout = {
  default: com_layoutDefault,
  vertical: com_layoutVertical,
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);


const human_store = humanStore();
if(route.params.name){
  human_store.setName(route.params.name);
}
watch(
  () => route.params.name,
  newVal => {
    console.log(newVal);
    human_store.setName(newVal);
  }
);
// console.log(route.params.name);

import {card_fold,card_folds} from './index';
provide('layoutJs', {
  card_fold,
  card_folds
});
</script>

<style scoped lang="scss"></style>

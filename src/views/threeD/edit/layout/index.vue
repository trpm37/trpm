<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="com_layout[layout]" />
</template>

<script setup>
import { computed,provide,watch } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/site/global";
import { threeDStore } from "@/stores/threeD/threeD";

// 路由信息
const route = useRoute();

import com_layoutDefault from "./default/index.vue";
import com_layoutVertical from "./vertical/index.vue";
const com_layout = {
  default: com_layoutDefault,
  vertical: com_layoutVertical,
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);


const threeD_store = threeDStore();
if(route.params.name){
  threeD_store.setName(route.params.name);
}
watch(
  () => route.params.name,
  newVal => {
    console.log(newVal);
    threeD_store.setName(newVal);
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

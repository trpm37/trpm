<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <div class="layout-default">
    <el-container class="layout-container">
      <el-header class="layout-top cell">
        <div class="lf"><span class="name">数字人</span></div>
        <div class="ct"></div>
        <div class="rg">
          <el-button class="btn eye-btn" text size="small">
            <i class="iconfont icon-eye-line"></i>
            预览
          </el-button>
          <el-button class="btn save-btn" text size="small">
            <i class="iconfont icon-survey-line"></i>
            保存
          </el-button>
        </div>
      </el-header>
      <el-main class="layout-main">
        <com_main/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { provide,watch } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "@/stores/modules/global";
import { humanStore } from "@/stores/human/human";
import com_main from "@/views/human/edit/layout/components/main.vue";

// 路由信息
const route = useRoute();

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

<style lang="scss">
@import "./index.scss";
</style>

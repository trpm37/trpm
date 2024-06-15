<template>
  <el-container class="main-plane">
    <el-aside class="lf-plane">
      <com_lf_menu />
      <component :is="com_subMenu[name]"></component>
    </el-aside>

    <el-main class="ct-plane">
      <div class="view-plane">
        <div class="canvas-box">canvas</div>
        <component :is="com_view[name]"></component>
      </div>
      <div class="bm-plane">
        <component :is="com_bm[name]"></component>
      </div>
    </el-main>

    <div class="rg-plane">
      <component :is="com_edit[name]"></component>
    </div>
  </el-container>
</template>

<script setup>
import { computed } from 'vue';
// import { useRoute } from "vue-router";
import { threeDStore } from "@/stores/threeD/threeD";
import com_lf_menu from "@/views/threeD/edit/layout/components/menu/lfMenu.vue";

import com_scene_subMenu from "@/views/threeD/edit/scene/subMenu.vue";
import com_hotspot_subMenu from "@/views/threeD/edit/hotspot/subMenu.vue";
import com_model_subMenu from "@/views/threeD/edit/model/subMenu.vue";
import com_daolan_subMenu from "@/views/threeD/edit/daolan/subMenu.vue";
const com_subMenu = {
  scene: com_scene_subMenu,
  hotspot: com_hotspot_subMenu,
  model: com_model_subMenu,
  daolan: com_daolan_subMenu,
};
import com_scene_view from "@/views/threeD/edit/scene/view.vue";
import com_hotspot_view from "@/views/threeD/edit/hotspot/view.vue";
import com_model_view from "@/views/threeD/edit/model/view.vue";
import com_daolan_view from "@/views/threeD/edit/daolan/view.vue";
const com_view = {
  scene: com_scene_view,
  hotspot: com_hotspot_view,
  model: com_model_view,
  daolan: com_daolan_view,
};
import com_scene_edit from "@/views/threeD/edit/scene/edit.vue";
import com_hotspot_edit from "@/views/threeD/edit/hotspot/edit.vue";
import com_model_edit from "@/views/threeD/edit/model/edit.vue";
import com_daolan_edit from "@/views/threeD/edit/daolan/edit.vue";
const com_edit = {
  scene: com_scene_edit,
  hotspot: com_hotspot_edit,
  model: com_model_edit,
  daolan: com_daolan_edit,
};
import com_scene_bm from "@/views/threeD/edit/scene/bm.vue";
import com_hotspot_bm from "@/views/threeD/edit/hotspot/bm.vue";
import com_model_bm from "@/views/threeD/edit/model/bm.vue";
import com_daolan_bm from "@/views/threeD/edit/daolan/bm.vue";
const com_bm = {
  scene: com_scene_bm,
  hotspot: com_hotspot_bm,
  model: com_model_bm,
  daolan: com_daolan_bm,
};
// 路由信息
// const route = useRoute();

const threeD_store = threeDStore();
const name = computed(() => {
  // const name=route.params.name || 'hotspot';
  const name=threeD_store.name;
  console.log("路由name：", name);
  return name;
});
console.log("layout main");
</script>

<style scoped></style>

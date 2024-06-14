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
    </el-main>

    <div class="rg-plane">
      <component :is="com_edit[name]"></component>
    </div>
  </el-container>
</template>

<script setup>
import { computed } from 'vue';
// import { useRoute } from "vue-router";
import { humanStore } from "@/stores/human/human";
import com_lf_menu from "@/views/human/edit/layout/components/menu.vue";

import com_ui_subMenu from "@/views/human/edit/ui/subMenu.vue";
import com_character_subMenu from "@/views/human/edit/character/subMenu.vue";
import com_qa_subMenu from "@/views/human/edit/qa/subMenu.vue";
import com_plugin_subMenu from "@/views/human/edit/plugin/subMenu.vue";
const com_subMenu = {
  ui: com_ui_subMenu,
  character: com_character_subMenu,
  qa: com_qa_subMenu,
  plugin: com_plugin_subMenu,
};
import com_ui_view from "@/views/human/edit/ui/view.vue";
import com_character_view from "@/views/human/edit/character/view.vue";
import com_qa_view from "@/views/human/edit/qa/view.vue";
import com_plugin_view from "@/views/human/edit/plugin/view.vue";
const com_view = {
  ui: com_ui_view,
  character: com_character_view,
  qa: com_qa_view,
  plugin: com_plugin_view,
};
import com_ui_edit from "@/views/human/edit/ui/edit.vue";
import com_character_edit from "@/views/human/edit/character/edit.vue";
import com_qa_edit from "@/views/human/edit/qa/edit.vue";
import com_plugin_edit from "@/views/human/edit/plugin/edit.vue";
const com_edit = {
  ui: com_ui_edit,
  character: com_character_edit,
  qa: com_qa_edit,
  plugin: com_plugin_edit,
};
// 路由信息
// const route = useRoute();

const human_store = humanStore();
const name = computed(() => {
  // const name=route.params.name || 'character';
  const name=human_store.name;
  console.log("路由name：", name);
  return name;
});
console.log("layout main");
</script>

<style scoped></style>

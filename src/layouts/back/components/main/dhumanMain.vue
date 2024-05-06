<template>
  <el-container class="main-plane">
    <el-aside class="lf-plane">
      <com_lf_menu />
      <slot name="sub-menus"></slot>
    </el-aside>

    <el-main class="ct-plane">
      <div class="view-plane">
        <div class="canvas-box">canvas</div>
        <slot name="view"></slot>
      </div>
      <div class="bm-plane">
        <slot name="bm"></slot>
      </div>
    </el-main>

    <div class="rg-plane">
      <slot name="edit"></slot>
    </div>
  </el-container>
</template>

<script setup>
// import { ref } from 'vue';
import com_lf_menu from "../menu/defaultMenu.vue";
</script>

<style scoped></style>

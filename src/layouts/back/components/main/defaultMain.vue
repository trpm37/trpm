<template>
  <el-container class="main-plane">
    <el-aside class="lf-plane">
      <com_lf_menu />
      <slot name="sub-menus"></slot>
    </el-aside>
    <el-main class="ct-plane">中间</el-main>
    <slot name="rg-plane"></slot>
  </el-container>
</template>

<script setup>
// import { ref } from 'vue';
import com_lf_menu from "../menu/defaultMenu.vue";
</script>

<style scoped></style>

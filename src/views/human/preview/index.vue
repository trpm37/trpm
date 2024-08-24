<template>
  <div class="human-page">
    <div class="main">
      <!-- 渲染区 -->
      <div class="webgl" id="webgl"></div>
      <!-- 视口面板 -->
      <div class="plane"></div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import { Human } from "./index";
let hm = new Human();
hm.init();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<template>
  <div class="layout-default">
    <el-container class="layout-container">
      <el-header class="layout-top cell">
        <div class="lf"><span class="name">元宇宙</span></div>
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
        <router-view v-slot="{ Component, route }">
          <component :is="Component" />
        </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
</script>
<style>
@import "./index.scss";
</style>

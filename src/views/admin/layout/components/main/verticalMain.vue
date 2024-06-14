<template>
  <el-main class="ct-plane-main">
    <router-view v-slot="{ Component, route }">
      <component :is="Component" />
    </router-view>
  </el-main>
</template>

<script setup>
// import { ref } from 'vue';
</script>

<style scoped lang="scss"></style>

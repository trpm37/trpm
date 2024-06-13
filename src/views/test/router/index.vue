<template>
  <div class="page">
    <p>测试路由test/router/index页面</p>
    <router-link to="/test/router/a" class="router">a</router-link>
    <router-link to="/test/router/b" class="router">b</router-link>
    <router-link to="/test/router/c" class="router">c</router-link>
    <router-link to="/test/router/d" class="router">d</router-link>
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
</script>

<style scoped>
.page {
  border: 1px solid #000;
  padding: 10px;
  margin: 20px;
}
.router {
  color: #000;
  padding-right: 12px;
}
</style>

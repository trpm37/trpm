<template>
  <div class="page">
    <p>测试 test/index页面</p>
    <router-link to="/test/baseFun" class="router">基础</router-link>
    <router-link to="/test/computed" class="router">计算属性</router-link>
    <router-link to="/test/watch" class="router">监控</router-link>
    <router-link to="/test/slot" class="router">插槽</router-link>
    <router-link to="/test/comGlobal" class="router">全局组件</router-link>
    <router-link to="/test/comIs" class="router">动态组件</router-link>
    <router-link to="/test/comVal" class="router">组件传值</router-link>
    <router-link to="/test/callback" class="router">生命周期</router-link>
    <router-link to="/test/router" class="router">路由</router-link>
    <!-- <router-view></router-view> -->
    <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.fullPath" />
    </router-view>
    
  </div>
</template>

<script setup lang="ts"></script>

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

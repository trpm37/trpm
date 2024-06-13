<template>
  <div class="page">
    <p>测试 test/index页面</p>
    <router-link to="/t/baseFun" class="router">基础</router-link>
    <router-link to="/t/computed" class="router">计算属性</router-link>
    <router-link to="/t/watch" class="router">监控</router-link>
    <router-link to="/t/slot" class="router">插槽</router-link>
    <router-link to="/t/comGlobal" class="router">全局组件</router-link>
    <router-link to="/t/comIs" class="router">动态组件</router-link>
    <router-link to="/t/comVal" class="router">组件传值</router-link>
    <router-link to="/t/callback" class="router">生命周期</router-link>
    <router-link to="/t/r" class="router">路由</router-link>
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

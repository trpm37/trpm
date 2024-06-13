<template>
  <h1>生命周期</h1>
  <btn v-if="flag"></btn>
  <div><button @click="flag = !flag">创建/销毁组件</button></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import btn from "./components/btn.vue";

const flag = ref<boolean>(true);
</script>

<style scoped>
button {
  background-color: #eee;
}
</style>

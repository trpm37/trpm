<template>
  <div class="page" id="main">
    <p>全局组件:{{ name }}</p>
    <component_global></component_global>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name=ref<string>("小涵");

</script>

<style scoped>
.page {
  border: 1px solid #000;
  padding: 10px;
  margin: 20px;
}
</style>

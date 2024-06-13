<template>
  <div class="page" id="main">
    <p>动态组件</p>
    <div>
      <button v-for="(item,index) in coms" :key="index" @click="change(item,index)">{{item.name}}</button>
    </div>

    <component :is="componentId"></component>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from "vue";
import com_btn from "./components/btn.vue";
import com_com1 from "./components/com-com1.vue";

const componentId=ref(com_btn);
const coms=reactive([
  {
    name:"btn",
    com:com_btn
  },
  {
    name:"com1",
    com:com_com1
  }
]);

const change=(item:any,ind:number)=>{
componentId.value=item.com;
console.log(ind);
}
</script>

<style scoped>
.page {
  border: 1px solid #000;
  padding: 10px;
  margin: 20px;
}
button{background-color: #ccc;margin-right: 20px;}
</style>

<template>
  <div>监听单 个值：<input v-model="name" /> {{ name }}</div>
  <div>监听多个值：<input v-model="name2" /> {{ name2 }}</div>
  <div>监听对象obj.a.b：<input v-model="obj.a.b" /> {{ obj.a.b }}</div>
  <div>只监听对象obj.a.c：<input v-model="obj.a.c" /> {{ obj.a.c }}</div>
  <div>{{ watchVal }}</div>
  <button @click="watchChange">watch修改</button>
  
  
</template>

<script setup lang="ts">
import { ref,watch,watchEffect } from "vue";

//watchEffect 要了解

let name=ref<string>("潇涵");
let name2=ref<string>("小落");
let obj=ref({
  a:{
    b:1,
    c:2
  }
});
let watchVal=ref<string>("");
watch(name,(newVal,oldVal)=>{
  console.log(newVal,oldVal);
  watchVal.value=oldVal+"-"+newVal;
});
watch([name,name2],(newVal,oldVal)=>{
  console.log(newVal,oldVal);
});
watch(obj,(newVal,oldVal)=>{
  console.log(newVal,oldVal);
},{
  deep:true, //深度监听 reactive不需要开启
  immediate:true, //默认执行一次watch 默认是false
  flush:"pre"  //pre 组件更新之前执行 sync 同步执行 post 组件更新之后执行
});
watch(()=>obj.value.a.c,(newVal,oldVal)=>{
  console.log(newVal,oldVal);
});

const watchChange=()=>{
  name.value='小满';
  obj.value.a.c=3;
}


</script>

<style scoped>
button {
  background-color: #ccc;
}
.a {
  color: red;
  margin-top: 5px;
}
.b {
  border: 1px solid blue;
}
.c {
  font-size: 20px;
}
</style>

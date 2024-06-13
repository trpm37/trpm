<template>
    <div class="a">
        <div>我是一个组件按钮</div>
        <div ref="div">{{ str }}</div>
        <button @click="change">更改</button>
    </div>
</template>

<script setup lang='ts'>
import {ref, onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted,onRenderTracked,onRenderTriggered } from "vue";

console.log("---------");
const str=ref("aaa");
const div=ref<any>();
let change=()=>{
  str.value="我被修改！"
}

//创建之前
onBeforeMount(()=>{
  console.log("-----1---创建之前--", "onBeforeMount",div.value);
});
//创建完成
onMounted(()=>{
  console.log("-----2---创建完成--","onMounted",div.value);
});
//更新之前
onBeforeUpdate(()=>{
  console.log("-----3---更新之前--","onBeforeUpdate",div.value?.innerText);
});
//更新完成
onUpdated(()=>{
  console.log("-----4---更新完成--","onUpdated",div.value?.innerText);
});
//卸载/销毁之前
onBeforeUnmount(()=>{
  console.log("-----5---卸载/销毁之前--","onBeforeUnmount");
});
//卸载/销毁完成
onUnmounted(()=>{
  console.log("-----6---卸载/销毁完成--","onUnmounted");
});
//收集依赖
onRenderTracked((e)=>{
  console.log("-----6---收集依赖---","onRenderTracked",e);
});
//依赖更新
onRenderTriggered((e)=>{
  console.log("-----6---依赖更新--","onRenderTriggered",e);
});
</script>

<style scoped>
.a{border: 1px solid red;}
button{background-color: #ccc;}
</style>
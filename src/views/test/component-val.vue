<template>
  <div class="page" id="main">
    <p>父级 <span class="sp">sass</span></p>
    <!-- <com1 :title="tl" :full-name="name" :arr="[1,2,3]"></com1> -->
    <com1 :title="tl" :full-name="name" @on-click="res" ref="ref_res" ></com1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import com1 from "./components/com-com1.vue";

//父给子传的值--------tl,name,arr-------------------
const tl=ref<string>("标题");
const name=ref<string>("小涵");

//父接收子的值----------------------------
//方法一 通过绑定事件触发获取传过来的值
const res=(a:number,b:String)=>{
  console.log(a,b);
}
//方法二 通过ref获取传过来的值
const ref_res=ref<InstanceType<typeof com1>>();
console.log(ref_res.value?.age,ref_res.value?.open,ref_res.value);

</script>

<style>
#main p {
  color: red;
  &:hover{color: aqua;}
  .sp {
    color: blue;
    padding-left: 20px;
  }
}
</style>

<style scoped>
.page {
  border: 1px solid #000;
  padding: 10px;
  margin: 20px;
}
</style>


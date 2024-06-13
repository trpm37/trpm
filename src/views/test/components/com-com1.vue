<template>
<div>我是一个 组件</div>
<div>接收父的值:{{ title }}---{{ fullName }}--- {{ arr }}</div>
<div><button @:click="send">给父传值</button></div>
</template>

<script setup lang='ts'>
// import { ref } from "vue";

//父给子传值----------------------------
//方法一 通用写法
// const props=defineProps({
//     title:{
//         type:String,
//         default:"标题"
//     },
//     fullName:{
//         type:String,
//         default:"小美"
//     },
//     arr:{
//         type:Array,
//         default:[]
//     }
// });

//方法二 ts写法
// const props=defineProps<{
//     title:String,
//     fullName:String,
//     arr:number[]
// }>();

//方法三 ts写法 withDefaults是ts特有的 可以附上默认值
const props=withDefaults(defineProps<{
    title:String,
    fullName:String,
    arr:number[]
}>(),{
    arr:()=>[666]
});
console.log(props.title,props.fullName,props.arr);

//子给父传值---------------------------------------
//方法一 通用写法
// const emit= defineEmits(["on-click","on-mouseover"]);
//方法二 ts写法
const emit= defineEmits<{
    (e:"on-click",num:number,str:String):void,
    (evt:"on-mouseover",num:number,str:String):void,
}>();

const send=()=>{
    emit('on-click',1,"a");
}

//子给父暴露一些属性或方法-----------------------------------------
defineExpose({
    age:12,
    open:()=>console.log('暴露的方法')    
});
</script>

<style scoped>

</style>
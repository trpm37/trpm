<template>
<div class="page">
    <header class="header">
        头部
        <slot name="header"></slot>
    </header>
    <main class="main">
        主体
        <div v-for="(item,index) in data">
            <slot :data="item" :index="index"></slot>
        </div>
    </main>
    <footer class="footer">
        底部
        <slot name="footer"></slot>
    </footer>
</div>
</template>

<script setup lang='ts'>
import { reactive } from 'vue';

type obj={
    name:string,
    age:number
}
const data=reactive<obj[]>([
    {
        name:"小落",
        age:12
    },
    {
        name:"小涵",
        age:4
    }
]);
</script>

<style scoped>
.page{display: flex;flex-direction: column; width: 600px;height: 400px;}
.header{background-color: #ddd;}
.main{background-color: #eee;height: 200px;}
.footer{background-color: #ccc;}
</style>
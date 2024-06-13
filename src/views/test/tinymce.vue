<template>
    <div class="editor-box">
        <div>接收子的值：--{{ content }}</div>
        <com_tinymce :content="editor_content"  @change="editor_change"/>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import com_tinymce from '@/components/Editor/tinymce.vue'



// 传值给子
let editor_content = ref('你好!');

//接收子值
let content = ref("");
const editor_change=(a:any)=>{
  console.log(a);
  content.value=a;
}

</script>

<style scoped>
.editor-box{padding: 30px; height: 100%;box-sizing: border-box;}
</style>
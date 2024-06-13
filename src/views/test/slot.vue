<template>
  <div id="main">
    <com_slot>
      <template v-slot="{data,index}">
        <div>
          我插入了main中了,{{data.name}}:{{ data.age }}--{{ index }}
        </div>
      </template>
      <template v-slot:header>
        <div>
          我插入了header中了
        </div>
      </template>
      <template v-slot:footer>
        <div>
          我插入了footer中了
        </div>
      </template>
    </com_slot>
<div>-------------------------------------------</div>
    <com_slot>
      <template v-slot:[name]>
        <div>
          我插入了
        </div>
      </template>
    </com_slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import com_slot from "@/views/test/components/com-slot.vue";

const name=ref('default');
// const name=ref("header");
// const name=ref("footer");

</script>

<style>
button{background-color: #ccc;margin-right: 20px;}
</style>

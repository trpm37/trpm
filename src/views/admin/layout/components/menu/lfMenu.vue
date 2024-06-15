
<template>
    <template v-for="item in props.menuData" :key="item.id">
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id">
        <template #title>
          <span>{{ item.title }}</span>
        </template>
        <lf-menu :menu-data="item.children" />
      </el-sub-menu>
      <el-menu-item v-else :index="item.id"  @click="handleClickMenu(item)">{{ item.title }}</el-menu-item>
    </template>
</template>

<script setup>
// import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
//接收父值
const props=defineProps({
  menuData:{
      type:Array,
      default:[]
  }
});

const handleClickMenu = (item) => {
  console.log(item);
  router.push(item.path);
};
</script>

<style lang="scss">

</style>

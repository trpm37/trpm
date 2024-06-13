<template>
  <div class="model-container w100-flex">
    <component :is="com_main[layout]">
      <template v-slot:sub-menus>
        <div class="sub-menus">模型子菜单</div>
      </template>
      <template v-slot:view>
        <div class="">模型</div>
      </template>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGlobalStore } from "@/stores/modules/global";
import com_defaultMain from "@/views/threeD/back/layout/components/main/defaultMain.vue";
import com_verticalMain from "@/views/threeD/back/layout/components/main/verticalMain.vue";
const com_main = {
  default: com_defaultMain,
  vertical: com_verticalMain
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>


<style scoped>

</style>
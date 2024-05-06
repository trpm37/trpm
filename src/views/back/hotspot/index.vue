<template>
  <div class="hotspot-container w100-flex">
    <component :is="com_main[layout]">
      <template v-slot:sub-menus>
        <div class="sub-menus">热点子菜单</div>
      </template>
      <template v-slot:edit>
        <div class="edit-plane"></div>
      </template>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useGlobalStore } from "@/stores/modules/global";
import com_defaultMain from "@/layouts/back/components/main/defaultMain.vue";
import com_dhumanMain from "@/layouts/back/components/main/dhumanMain.vue";
const com_main = {
  default: com_defaultMain,
  dhuman: com_dhumanMain
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>


<style scoped>

</style>
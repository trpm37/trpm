<template>
  <div class="scene-container w100-flex">
    <!-- <com_defaultMain>
      <template v-slot:rg-plane>
        <div class="rg-plane"></div>
      </template>
    </com_defaultMain> -->
    <component :is="com_main[layout]">
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



import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
console.log(globalStore.layout, route, router, route.params, route.meta);
</script>

<style scoped></style>

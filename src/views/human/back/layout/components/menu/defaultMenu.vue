<template>
  <div class="menus">
    <div class="ul top-ul">
      <el-scrollbar>
        <div class="li eye" text size="small" @click="menuClick('character')">
          <i class="iconfont icon_eye-line"></i>
          <span class="txt">数字人</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">ui界面</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('qa')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">AI问答</span>
        </div>
        <div class="li eye" text size="small" @click="menuClick('plugin')">
          <i class="iconfont icon_eye-line"></i>
          <span class="txt">网页插件</span>
        </div>
      </el-scrollbar>
    </div>
    <div class="ul bottom-ul">
      <div class="li eye" text size="small">
        <i class="iconfont icon_eye-line"></i>
      </div>
      <div class="li save" text size="small">
        <i class="iconfont icon_survey-line"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { humanStore } from "@/stores/human/human";
// 路由信息
const route = useRoute();
// const router = useRouter();
// console.log(router);

const human_store = humanStore();

//tree node点击
const menuClick = (name) => {
  // console.log("--menuClick--", name);
  // 使用 history.pushState() 方法手动添加新的历史记录
  const newUrl = `#/human/edit/${route.params.id}/${name}`;
  history.pushState({}, "", newUrl);
  // 使用 路由的方式
  // const currentRoute = router.currentRoute.value;
  // const currentParams = { ...currentRoute.params }; // 复制当前路由参数
  // currentParams.name = name; // 修改 name 参数
  // const newRoute = { ...currentRoute, params: currentParams };
  // console.log(newRoute);
  // router.replace(newRoute);

  human_store.setName(name);
};
</script>

<style scoped>

</style>

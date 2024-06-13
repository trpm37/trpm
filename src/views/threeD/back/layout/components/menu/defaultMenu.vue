<template>
  <div class="menus">
    <div class="ul top-ul">
      <el-scrollbar>
        <div class="li eye" text size="small" @click="menuClick('scene')">
          <i class="iconfont icon_eye-line"></i>
          <span class="txt">场景</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('model')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">模型</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('hotspot')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">热点</span>
        </div>
        <div class="li eye" text size="small" @click="menuClick('daolan')">
          <i class="iconfont icon_eye-line"></i>
          <span class="txt">导览</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">相机</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">音乐</span>
        </div>
        <div class="li eye" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_eye-line"></i>
          <span class="txt">背景</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">动画</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">变换</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">NPC</span>
        </div>
        <div class="li eye" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_eye-line"></i>
          <span class="txt">反射</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">菜单</span>
        </div>
        <div class="li save" text size="small" @click="menuClick('ui')">
          <i class="iconfont icon_survey-line"></i>
          <span class="txt">爆炸</span>
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
import { threeDStore } from "@/stores/threeD/threeD";
// 路由信息
const route = useRoute();
// const router = useRouter();
// console.log(router);

const threeD_store = threeDStore();

//tree node点击
const menuClick = (name) => {
  // console.log("--menuClick--", name);
  // 使用 history.pushState() 方法手动添加新的历史记录
  const newUrl = `#/threeD/edit/${route.params.id}/${name}`;
  history.pushState({}, "", newUrl);
  // 使用 路由的方式
  // const currentRoute = router.currentRoute.value;
  // const currentParams = { ...currentRoute.params }; // 复制当前路由参数
  // currentParams.name = name; // 修改 name 参数
  // const newRoute = { ...currentRoute, params: currentParams };
  // console.log(newRoute);
  // router.replace(newRoute);

  threeD_store.setName(name);
};
</script>

<style scoped>

</style>

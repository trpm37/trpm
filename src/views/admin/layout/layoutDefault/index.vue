<template>
  <div class="layout-default">
    <el-container class="layout-container">
      <el-header class="layout-top cell">
        <div class="lf"><span class="name">管理后台</span></div>
        <div class="ct"></div>
        <div class="rg">
          <el-button class="btn eye-btn" text size="small">
            <i class="iconfont icon-eye-line"></i>
            预览
          </el-button>
          <el-button class="btn save-btn" text size="small">
            <i class="iconfont icon-survey-line"></i>
            保存
          </el-button>
        </div>
      </el-header>
      <el-main class="layout-main">
        <el-container class="main-plane">
          <el-aside class="lf-plane">
            <el-menu class="lf-menu" :router="false" :unique-opened="false" :collapse-transition="false">
              <com_lf_menu :menu-data="menuData"/>
            </el-menu>            
          </el-aside>

          <el-main class="ct-plane">
            <com_main/>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import com_lf_menu from "@/views/admin/layout/components/menu.vue";
import com_main from "@/views/admin/layout/components/main/defaultMain.vue";

const menuData = ref([  
  {
    id: "1",
    title: "主页",
    path: "/admin/home",
  },
  {
    id: "2",
    title: "素材库",
    path: "/admin/material",
  },
  {
    id: "3",
    title: "订单",
    path: "/admin/order",
  },
  {
    id: "4",
    title: "编辑",
    path: "/admin/edit/:id",
    children: [
      {
        id: "41",
        title: "场景",
        path: "/admin/edit/:id/scene",
      },
      {
        id: "42",
        title: "模型",
        path: "/admin/edit/:id/model",
      }
    ],
  }
]);

</script>
<style scoped lang="scss">
@import "./index.scss";
</style>

<template>
    <div class="page wh100">
      <el-container class="page-container">
        <el-header class="top-box cell">
          <div class="lf"><span class="name">元宇宙</span></div>
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
        <el-main class="plane-box">
          <el-container class="main-plane">
            <el-aside class="lf-plane">
              <div class="menus">
                <div class="ul top-ul">
                  <el-scrollbar wrap-class="aaa" view-class="bbb">
                    <div class="li eye" text size="small">
                      <i class="iconfont icon-eye-line"></i>
                      <span class="txt">场景</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">模型</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">热点</span>
                    </div>
                    <div class="li eye" text size="small">
                      <i class="iconfont icon-eye-line"></i>
                      <span class="txt">导览</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">相机</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">音乐</span>
                    </div>
                    <div class="li eye" text size="small">
                      <i class="iconfont icon-eye-line"></i>
                      <span class="txt">背景</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">动画</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">变换</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">NPC</span>
                    </div>
                    <div class="li eye" text size="small">
                      <i class="iconfont icon-eye-line"></i>
                      <span class="txt">反射</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">菜单</span>
                    </div>
                    <div class="li save" text size="small">
                      <i class="iconfont icon-survey-line"></i>
                      <span class="txt">爆炸</span>
                    </div>
                  </el-scrollbar>
                </div>
                <div class="ul bottom-ul">
                  <div class="li eye" text size="small">
                    <i class="iconfont icon-eye-line"></i>
                  </div>
                  <div class="li save" text size="small">
                    <i class="iconfont icon-survey-line"></i>
                  </div>
                </div>
              </div>
              <div class="sub-menus"></div>
            </el-aside>
            <el-main class="ct-plane">中间</el-main>
            <el-aside class="rg-plane">
              <component :is="LayoutComponents[layout]" />
            </el-aside>
          </el-container>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup>
  // import { ref } from 'vue';
  </script>
  
  <style scoped>
  @import "./index.scss";
  </style>
  
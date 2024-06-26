<template>
  <div class="recorder-box">
    <div class="recorder-txt">{{ recorderObj.vueData.tips }}</div>
    <div class="recorder-txt">
        {{ recorderObj.vueData.online_text }}
    </div>
    <br>
    <div class="recorder-txt">
        {{ recorderObj.vueData.offline_text }}
    </div>
    <el-button
      class="btn con-btn"
      type="primary"
      @click="recorderObj.connect()"
    >
      连接
    </el-button>
    <el-button
      class="btn con-btn"
      type="primary"
      @click="recorderObj.record_start()"
    >
      开始
    </el-button>
    <el-button
      class="btn con-btn"
      type="primary"
      @click="recorderObj.record_stop()"
    >
      停止
    </el-button>
    <div><audio id="audio_record" type="audio/wav" controls style="margin-top: 12px; width: 100%;"></audio></div>
  </div>
</template>

<script setup lang="ts">
// import { reactive } from 'vue';

import recorderObj from './recorder.js';
</script>

<style scoped></style>

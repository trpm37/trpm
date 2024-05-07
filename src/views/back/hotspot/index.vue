<template>
  <div class="hotspot-container w100-flex">
    <component :is="com_main[layout]">
      <template v-slot:sub-menus>
        <div class="sub-menus">热点子菜单</div>
      </template>
      <template v-slot:edit>
        <div class="edit-plane">
          <div class="box flex-column">
            <div class="box-h cell">
              <div class="lf">
                <span class="lab">热点</span>
              </div>
              <div class="rg">
                <span class="icon spread" @click="card_folds">
                  <el-tooltip
                    class="tooltip"
                    effect="black"
                    content="全部收起"
                    placement="left"
                  >
                    <i class="iconfont icon_piliangshouqi"></i>
                  </el-tooltip>
                </span>
              </div>
            </div>
            <div class="box-main">
              <el-scrollbar>
                <el-card class="edit-card">
                  <template #header>
                    <div class="card-tl cell">
                      <div class="lf flex">
                        <span class="icon arrow" @click="card_fold"
                          ><i class="iconfont icon_arrow-down-s-line"></i
                        ></span>
                        <span class="lab" @click="card_fold">热点信息</span>
                      </div>
                    </div>
                  </template>
                  <div class="card-m">
                    <div class="card-sub_tl cell">
                      <div class="lf"><span class="lab">热点标题</span></div>
                    </div>
                    <div class="inp-d">
                      <el-input
                        class="inp"
                        placeholder="请输入"
                        v-model="value1"
                      />
                    </div>
                    <div class="card-ts">注意：仅用于热点列表中展示</div>
                  </div>
                </el-card>
                <el-card class="edit-card mg-t">
                  <template #header>
                    <div class="card-tl cell">
                      <div class="lf flex">
                        <span class="icon arrow" @click="card_fold"
                          ><i class="iconfont icon_arrow-down-s-line"></i
                        ></span>
                        <span class="lab" @click="card_fold">开关</span>
                      </div>
                    </div>
                  </template>
                  <div class="card-m">
                    <div class="cell">
                      <div class="lf"><span class="lab">视频抠图</span></div>
                      <div class="rg">
                        <el-switch
                          class="switch"
                          size="small"
                          v-model="value2"
                        />
                      </div>
                    </div>
                    <div class="cell mg-t">
                      <div class="lf"><span class="lab">朝向相机</span></div>
                      <div class="rg">
                        <el-switch
                          class="switch"
                          size="small"
                          v-model="value3"
                        />
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-scrollbar>
            </div>
            <div class="box-bm flex-center">
              <el-button class="btn del-btn" type="danger" size="default">
                <i class="iconfont icon-survey-line"></i>
                删除
              </el-button>
            </div>
          </div>
        </div>
      </template>
    </component>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import com_defaultMain from "@/layouts/back/components/main/defaultMain.vue";
import com_dhumanMain from "@/layouts/back/components/main/dhumanMain.vue";
const com_main = {
  default: com_defaultMain,
  dhuman: com_dhumanMain,
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);

import {card_fold,card_folds} from '@/layouts/back/layoutDefault/index'

const value1 = ref("");
const value2 = ref(false);
const value3 = ref(true);
</script>

<style scoped></style>

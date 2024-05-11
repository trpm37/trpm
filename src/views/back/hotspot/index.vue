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
                <span class="icon spread" @click="layoutJs.card_folds">
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
                <div class="btns-group2 mg-b">
                  <el-button class="btn btn-txt on"> 属性 </el-button>
                  <el-button class="btn btn-txt" type="primary">
                    交互
                  </el-button>
                </div>
                <el-card class="edit-card">
                  <template #header>
                    <div class="card-tl cell">
                      <div class="lf flex">
                        <span class="icon arrow" @click="layoutJs.card_fold"
                          ><i class="iconfont icon_arrow-down-s-line"></i
                        ></span>
                        <span class="lab" @click="layoutJs.card_fold"
                          >热点信息</span
                        >
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
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">缩放</span></div>
                    </div>
                    <div class="inp-group flex">
                      <div class="lf">
                        <i class="iconfont icon_link-unlink-m suo"></i>
                      </div>
                      <div class="inps flex">
                        <div class="inp-cell">
                          <div class="upDown">
                            <i class="iconfont icon_arrow-up-s-fill up"></i>
                            <i class="iconfont icon_arrow-down-s-fill1 down"></i>
                          </div>
                          <el-input
                            class="inp"
                            placeholder=""
                            v-model="value1"
                          >
                            <template #prepend>x</template>
                          </el-input>
                        </div>
                        <div class="inp-cell">
                          <div class="upDown">
                            <i class="iconfont icon_arrow-up-s-fill up"></i>
                            <i class="iconfont icon_arrow-down-s-fill1 down"></i>
                          </div>
                          <el-input
                            class="inp"
                            placeholder=""
                            v-model="value1"
                          >
                            <template #prepend>y</template>
                          </el-input>
                        </div>
                        <div class="inp-cell">
                          <div class="upDown">
                            <i class="iconfont icon_arrow-up-s-fill up"></i>
                            <i class="iconfont icon_arrow-down-s-fill1 down"></i>
                          </div>
                          <el-input
                            class="inp"
                            placeholder=""
                            v-model="value1"
                          >
                            <template #prepend>z</template>
                          </el-input>
                        </div>
                      </div>
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">热点描述</span></div>
                    </div>
                    <div class="inp-d">
                      <el-input
                        class="inp"
                        placeholder="请输入"
                        v-model="value1"
                        type="textarea"
                        :rows="4"
                      />
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">选择模型</span></div>
                    </div>
                    <div class="select">
                      <el-select
                        v-model="value1"
                        placeholder="选择"
                        popper-class="select-popper-dark"
                      >
                        <el-option
                          v-for="item in list"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">选择颜色</span></div>
                    </div>
                    <div class="color-d">
                      <div class="color-inp">
                        <div class="lf">
                          <span class="color"></span>
                          <span class="color-val">#ffffff</span>
                        </div>
                        <div class="rg">
                          <i class="iconfont icon_refresh inp-icon reset"></i>
                        </div>
                      </div>
                      <div class="color-btn">
                        <el-color-picker v-model="color" show-alpha />
                        <div class="icon-btn"></div>
                      </div>                      
                    </div>
                    <div class="card-ts">注意：仅用于热点列表中展示</div>
                  </div>
                </el-card>
                <el-card class="edit-card mg-t">
                  <template #header>
                    <div class="card-tl cell">
                      <div class="lf flex">
                        <span class="icon arrow" @click="layoutJs.card_fold"
                          ><i class="iconfont icon_arrow-down-s-line"></i
                        ></span>
                        <span class="lab" @click="layoutJs.card_fold"
                          >开关</span
                        >
                      </div>
                    </div>
                  </template>
                  <div class="card-m">
                    <div class="btns-group">
                      <el-button class="btn btn2" size="small">
                        按钮1
                      </el-button>
                      <el-button class="btn" type="primary" size="small">
                        按钮2
                      </el-button>
                      <el-button class="btn btn2" type="primary" size="small">
                        按钮3
                      </el-button>
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">半径</span></div>
                    </div>
                    <div class="drag-bar">
                      <el-slider v-model="value4" show-input size="small" :show-tooltip="false"/>
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">长度</span></div>
                    </div>
                    <div class="drag-bar" id="slider1">
    
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">范围</span></div>
                    </div>
                    <div class="drag-bar" id="slider2">
    
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">范围2</span></div>
                    </div>
                    <div class="drag-bar" id="slider3">
    
                    </div>
                    <div class="cell mg-t">
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
                <el-card class="edit-card mg-t">
                  <template #header>
                    <div class="card-tl cell">
                      <div class="lf flex">
                        <span class="icon arrow" @click="layoutJs.card_fold"
                          ><i class="iconfont icon_arrow-down-s-line"></i
                        ></span>
                        <span class="lab" @click="layoutJs.card_fold"
                          >图片</span
                        >
                      </div>
                      <div class="rg">
                        <el-switch
                          class="switch"
                          size="small"
                          v-model="value3"
                        />
                      </div>
                    </div>
                  </template>
                  <div class="card-m">
                    <div class="card-sub_tl cell">
                      <div class="lf"><span class="lab">LOGO</span></div>
                    </div>
                    <div class="img-up img-up2">
                      <div class="lf">
                        <div class="img-d">
                          <el-image class="img" :src="src">
                            <template #error>
                              <div class="img-error"></div>
                            </template>
                          </el-image>
                        </div>
                      </div>
                      <div class="rg">
                        <div class="btns flex">
                          <el-button class="btn btn2" size="small">
                            截取
                          </el-button>
                          <el-button class="btn" type="primary" size="small">
                            选择图片
                          </el-button>
                        </div>
                        <div class="card-ts">注意：仅用于热点列表中展示</div>
                      </div>
                    </div>
                    <div class="card-sub_tl cell mg-t">
                      <div class="lf"><span class="lab">封面</span></div>
                    </div>
                    <div class="img-up mg-t">
                      <div class="img-d img-1_2">
                        <el-image class="img" :src="src">
                          <template #error>
                            <div class="img-error"></div>
                          </template>
                        </el-image>
                      </div>
                      <div class="btns-group mg-t">
                        <el-button class="btn btn2" size="small">
                          删除
                        </el-button>
                        <el-button class="btn" type="primary" size="small">
                          选择
                        </el-button>
                      </div>
                    </div>
                    <div class="card-ts">注意：仅用于热点列表中展示</div>
                  </div>
                </el-card>
              </el-scrollbar>
            </div>
            <div class="box-bm flex-center">
              <el-button class="btn del-btn" type="danger">
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
import { ref, computed,onMounted, inject } from "vue";
import { useGlobalStore } from "@/stores/modules/global";
import com_defaultMain from "@/layouts/back/components/main/defaultMain.vue";
import com_dhumanMain from "@/layouts/back/components/main/dhumanMain.vue";
import { slider,sliderRange,sliderRange2 } from "@/utils/slider";
const com_main = {
  default: com_defaultMain,
  dhuman: com_dhumanMain,
};
const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);

const layoutJs = inject("layoutJs");

const value1 = ref("");
const value2 = ref(false);
const value3 = ref(true);
const value4 = ref(1);
const src = ref("");
const color = ref();
const range = ref([4, 8]);
const list = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
];

onMounted(()=>{
  slider({
    selector:"#slider1",
    min:-200,
    max:-100,
    // val:20,
    callBack:function(res){
      console.log('move：',res);
    },
    endCallBack:function(res){
      console.log('end：',res);
    }
  });
  sliderRange({
    selector:"#slider2",
    lf_val:10,
    rg_val:90,
    // isInp:false,
    callBack:function(res){
      console.log('move：',res);
    },
    endCallBack:function(res){
      console.log('end：',res);
    }
  });
  sliderRange2({
    selector:"#slider3",
    lf_val:10,
    rg_val:90,
    ct_val:20,
    callBack:function(res){
      console.log('move：',res);
    },
    endCallBack:function(res){
      console.log('end：',res);
    }
  });
});

</script>

<style scoped></style>

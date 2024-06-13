<template>
  <div>{{ str }}</div>

  <div v-text="str"></div>

  <div v-html="ht"></div>

  <div v-show="a">"v-show"</div>

  <div v-if="b == 1">"v-if"</div>
  <div v-else-if="b == 2">"v-else-if"</div>
  <div v-else>"v-else"</div>

  <div :id="id">"v-band":id</div>

  <div :style="sty">"v-band":style</div>

  <div class="a" :class="['b', 'c']">"v-band":class:["a","b"]</div>

  <div class="a" :class="cls">"v-band":class:{b:true,c:false}</div>

  <div @click="parentFun">
    <button @click="clickFun">点击我-固定事件名</button>
    <button @[eventName].stop="clickFun">点击我-动态事件名</button>
  </div>

  <div class="">
    <input v-model="inp" type="text" />{{ inp }} <span v-once>{{ inp }}</span>
  </div>

  <div>v-for [] {}</div>
  <div v-for="(item, index) in arr" :key="index">
    {{ index }}---{{ item }}
    <div
      class="a"
      v-for="(item2, index2) in item"
      :key="id"
      v-if="typeof item == 'object'"
    >
      {{ index2 }}---{{ item2.id }}
    </div>
  </div>

  <div ref="refDom">refDom</div>
  <button @click="refChange">ref修改---{{ refObj.name }}</button>
  <form>
    <input v-model="reactiveObj.name" type="text">
    <br/>
    <input v-model="reactiveObj.age" type="text">
    <br/>
    <button @click.prevent="submitFun">form提交</button>
  </form>
  <ul>
    <li v-for="(item,index) in reactiveArr" key="index">{{ index }}---{{item}}</li>
  </ul>
  <div>
    原始值:{{ reactiveObj2 }}，
    <br/>
    toRef:{{ toRef_name }}---{{ toRef_name2 }}
    <br/>
    toRefs:{{ toRefs_name }},{{ toRefs_age }}
    <br/>
    toRaw:{{ toRaw_val }}
  </div>
  <div><button @click="reactiveChange">reactive修改</button></div>
  <button @click="toRefChange">toRef修改</button>
  <button @click="toRefsChange">toRefs修改</button>
  <button @click="toRawChange">toRaw修改</button>

</template>

<script setup lang="ts">
import { ref, isRef, reactive,readonly,toRef,toRefs,toRaw } from "vue";
// import type {Ref} from 'vue';

const str: string = "v-text";
const ht: string = `<h style="color:red;">v-html</h>`;
const a: boolean = true;
const b: number = 2;

const id: string = "1";
const sty = {
  color: "red",
  border: "1px solid blue",
};
const cls = {
  b: true,
  c: false,
};

const eventName = "click";
type NoArgsNoReturn = () => void;
const clickFun: NoArgsNoReturn = () => {
  alert("点击了");
};
const parentFun: NoArgsNoReturn = () => {
  alert("点击父级了");
};

type obj = {
  name: string;
  age: number;
};
const inp = ref(1);

const arr = ["a", "b", "c", [{ id: 1 }, { id: 2 }, { id: 3 }]];

const refObj = ref({ name: "小艾" });
const refChange = () => {
  refObj.value.name = "小美";
  console.log(refObj.value, isRef(refObj), isRef(a));

  console.log(refDom.value?.innerText);
};

const refDom = ref<HTMLDivElement>();
let reactiveObj = reactive<obj>({
  name: "小满",
  age: 12,
});
let reactiveObj2 = reactive({
  name: "小满",
  age: 12,
});
let reactiveArr=reactive(['a','b','c']);

const submitFun = () => {
  reactiveObj.name="小美";
  console.log(reactiveObj);
};

let rd=readonly(reactiveObj2);

const reactiveChange = () => {
  reactiveObj.name="小美";

  reactiveArr[2]='bb';
  reactiveArr.push("d");
  let arr=['e','f'];
  reactiveArr.push(...arr);
  console.log(reactiveObj,reactiveArr);

  // rd.name="小时";//无法为“name”赋值，因为它是只读属性
  console.log('修改readonly的值不变',reactiveObj2,rd);
  reactiveObj2.name="小寒";
  console.log('修改原值readonly的值会变',reactiveObj2,rd);
};

let toRef_name=reactiveObj2.name;
let toRef_name2=toRef( reactiveObj2,"name");
let {name:toRefs_name,age:toRefs_age}=toRefs(reactiveObj2);
let toRaw_val=toRaw(reactiveObj2);

const toRefChange = () => {
  toRef_name="小涵"
  toRef_name2.value="小涵2";
  console.log(reactiveObj2,toRef_name,toRef_name2);
};
const toRefsChange = () => {
  toRefs_name.value="小小";
  console.log(reactiveObj2,toRefs_name);
};
const toRawChange = () => {
  toRaw_val.name="美美";
  console.log(reactiveObj2,toRaw_val);
};

</script>

<style scoped>
button{background-color: #ccc;}
.a {
  color: red;
  margin-top: 5px;
}
.b {
  border: 1px solid blue;
}
.c {
  font-size: 20px;
}
</style>

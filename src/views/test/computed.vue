<template>
  <div>姓：<input v-model="firstName" /></div>
  <div>名：<input v-model="lastName" /></div>
  <div>全名：{{ fullName }}</div>
  <button @click="computedChange">computed修改</button>
  <div style="text-align: left;"><input v-model="keyword" type="text" placeholder="搜索"></div>
  <table border="1" style="width: 600px;" cellpadding="0" cellspacing="0">
    <thead>
      <tr><td>物品名称</td><td>单价</td><td>数量</td><td>总价</td><td>操作</td></tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in searchData" :key="index">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td><button @click="item.num<100 ?item.num++ : null; console.log(data);">加</button>{{ item.num }}<button @click="item.num>1 ?item.num-- : null">减</button></td>
        <td>{{ item.num*item.price }}</td>
        <td><button @click="del_shopCar(index)">删除</button></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4">总数：{{sumNum}}，总价：{{ sumPrice }}</td>
        <td align="right"><button @click="add_shopCar">添加</button></td>
      </tr>
    </tfoot>
  </table>
  
</template>

<script setup lang="ts">
import { ref,reactive, computed } from "vue";

// let firstName="潇";
// let lastName="涵";
let firstName=ref("潇");
let lastName=ref("涵");
//方法一 接收getter和setter函数，可以修改值
var fullName=computed<string>({
  get(){
    return firstName.value+"-"+lastName.value;
  },
  set(newVal){
    [firstName.value,lastName.value]=newVal.split('-');
  }
})
//方法二 接收一个getter函数，不能修改值只能读取
// var fullName =computed(()=>{
//   return firstName.value+"-"+lastName.value;
// });

const computedChange=()=>{
  fullName.value='小-满';
}

interface Data{
  name:string,
  price:number,
  num:number
}

let keyword=ref<string>("");

let data=reactive<Data[]>([
  {
    name:"商品1",
    price:10,
    num:1
  },
  {
    name:"商品2",
    price:10,
    num:1
  }
])

let sumNum=computed({
  get(){
    // let num=0;
    // data.forEach((item)=>{
    //   num+=item.num;
    // })
    // return num;
    return data.reduce((reVal:number,cur:Data)=>{
      return reVal+cur.num;
    },0);
  },
  set(val){
    console.log(val);
  }
});

let sumPrice=computed({
  get(){
    // let price=0;
    // data.forEach((item)=>{
    //   price+=item.num*item.price;
    // })
    // console.log("----",price);
    // return price;

    return data.reduce((reVal:number,cur:Data)=>{
      return reVal+cur.num * cur.price;
    },0);
  },
  set(val){
    console.log(val);
  }
});
const searchData=computed(()=>{
  return data.filter((item:Data)=>{
    return item.name.includes(keyword.value);
  });
});

const del_shopCar=(index:number)=>{
  data.splice(index,1);
}

const add_shopCar=()=>{
  data.push({
    name:"商品3",
    price:10,
    num:1
  });
}

</script>

<style scoped>
button {
  background-color: #ccc;
}
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

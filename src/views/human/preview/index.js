import Three3D from "../public/three/three3d";

export default class Human {
   #LM = "2023-02-01 18:05";
  constructor() {
    this.three3d = new Three3D();
  }

  init() {
    console.log("init");
  }

  static fun1() {
    // 静态
  }

  #fun2() {
    // 私有
  }
}

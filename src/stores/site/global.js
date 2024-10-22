import { defineStore } from "pinia";
import { DEFAULT_PRIMARY } from "@/config";
// import piniaPersistConfig from "@/stores/helper/persist";

export const useGlobalStore = defineStore({
  id: "3d-global",
  // 修改默认值之后，需清除 localStorage 数据
  state: () => ({
    // 布局模式 (default | 数字人：dhuman)
    layout: "default",
    // element 组件大小 'large' | 'default' | 'small'
    assemblySize: "default",
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 深色模式
    isDark: false,
    // 灰色模式
    isGrey: false,
    // 色弱模式
    isWeak: false,
    // 侧边栏反转
    asideInverted: false,
    // 头部反转
    headerInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: false,
    // 标签页
    tabs: false,
    // 标签页图标
    tabsIcon: false,
    // 页脚
    footer: false
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  // persist: piniaPersistConfig("3d-global")
});

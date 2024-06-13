import router from "@/routers/index";
import { LOGIN_URL } from "@/config";
// import { ElNotification } from "element-plus";
// import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";

// 引入 views 文件夹下所有 vue 文件
// const modules = import.meta.glob("@/views/**/*.vue");
// const modules = import.meta.glob("../../views/**/*.vue");
// console.log(modules);
/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  // const userStore = useUserStore();
  const authStore = useAuthStore();

  try {
    authStore.setAuthInfo({
      expires: "1",
    });

    let item={
      path: "/test/temp",
      name: "test-temp",
      component: () => import("@/views/test/temp.vue")
    };
    await router.addRoute(item);
    // await router.addRoute('test', item);

  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    userStore.setToken("");
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};

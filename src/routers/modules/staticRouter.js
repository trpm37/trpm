
import { HOME_URL, LOGIN_URL } from "@/config";

/**
 * frontRouter (前台页面路由)
 */
export const frontRouter = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: HOME_URL,
    name: "home",
    component: () => import("@/views/front/home.vue")
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/front/login/index.vue"),
    meta: {
      title: "登录/注册"
    }
  }
];

/**
 * backRouter (后台页面路由)
 */
export const backRouter = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/back/home.vue")
  }
];


/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面"
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue")
  }
];


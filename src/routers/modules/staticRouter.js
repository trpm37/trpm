
import { HOME_URL, LOGIN_URL } from "@/config";

let meta={
  title: "元宇宙", 
  isHide: false,      
  isKeepAlive: false          
};
/**
 * frontRouter (前台页面路由)
 */
export const frontRouter = [
  {
    path: "/",
    redirect: {name:"home"}
  },
  {
    path: HOME_URL,
    name: "home",
    component: () => import("@/views/front/home.vue"),
    meta:Object.assign({},meta,{title:"首页"}),
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/front/login/index.vue"),
    meta:Object.assign({},meta,{title:"登录/注册"}),
  }
];

/**
 * backRouter (后台页面路由)
 */
export const backRouter = [
  {
    path: "/admin/:id",
    name: "admin",
    component: () => import("@/layouts/back/index.vue"),
    redirect: {name:"scene"},
    meta:Object.assign({},meta,{title:"管理首页"}),
    children:[
      {
        path: "/admin/:id/scene",
        name: "scene",
        component: () => import("@/views/back/scene/index.vue"),
        meta:Object.assign({},meta,{title:"场景"})
      },
      {
        path: "/admin/:id/hotspot",
        name: "hotspot",
        component: () => import("@/views/back/hotspot/index.vue"),
        meta:Object.assign({},meta,{title:"热点"})
      },
      {
        path: "/admin/:id/model",
        name: "model",
        component: () => import("@/views/back/model/index.vue"),
        meta:Object.assign({},meta,{title:"模型"})
      },
      {
        path: "/admin/:id/daolan",
        name: "daolan",
        component: () => import("@/views/back/daolan/index.vue"),
        meta:Object.assign({},meta,{title:"导览"})
      }
    ]
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

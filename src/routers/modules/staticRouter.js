import { HOME_URL, LOGIN_URL } from "@/config";

let meta = {
  title: "描述",
  isHide: false,
  isKeepAlive: false,
};

/**
 * webRouter
 */
export const webRouter = [
  {
    path: "/",
    redirect: HOME_URL,
  },
  {
    path: "/web",
    name: "web",
    component: () => import("@/views/web/index.vue"),
    meta: { ...meta, title: "首页" },
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录/注册",
    },
  },
];

/**
 * 3d (3d页面路由)
 */
export const threeDRouter = [
  {
    path: "/threeD",
    name: "threeD",
    redirect: { name: "threeD-preview" },
  },
  {
    path: "/threeD/preview",
    name: "threeD-preview",
    component: () => import("@/views/threeD/preview/index.vue"),
    meta: { ...meta, title: "首页" },
  },
  {
    path: "/threeD/edit/:id/:name?",
    name: "threeD-edit",
    component: () => import("@/views/threeD/edit/layout/index.vue"),
    meta: { ...meta, title: "编辑页" },
  },
];

/**
 * humanRouter (数字人页面路由)
 */
export const humanRouter = [
  {
    path: "/human",
    name: "human",
    redirect: { name: "human-preview" },
  },
  {
    path: "/human/preview",
    name: "human-preview",
    component: () => import("@/views/human/preview/index.vue"),
    meta: { ...meta, title: "首页" },
  },
  {
    path: "/human/edit/:id/:name?",
    name: "human-edit",
    component: () => import("@/views/human/edit/layout/index.vue"),
    meta: { ...meta, title: "编辑页" },
  },
];

/**
 * 后台管理 (后台管理页面路由)
 */
export const adminRouter = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/admin/layout/index.vue"),
    redirect: { name: "admin-home" },
    meta: { ...meta, title: "首页" },
    children: [
      {
        path: "/admin/home",
        name: "admin-home",
        component: () => import("@/views/admin/home/index.vue"),
        meta: { ...meta, title: "首页" },
      },
      {
        path: "/admin/material",
        name: "admin-material",
        component: () => import("@/views/admin/material/index.vue"),
        meta: { ...meta, title: "素材库" },
      },
      {
        path: "/admin/order",
        name: "admin-order",
        component: () => import("@/views/admin/order/index.vue"),
        meta: { ...meta, title: "订单页" },
      },
      {
        path: "/admin/edit/:id",
        name: "admin-edit",
        redirect: { name: "admin-edit-scene" },
        meta: { ...meta, title: "编辑页" },
        children: [
          {
            path: "/admin/edit/:id/scene",
            name: "admin-edit-scene",
            component: () => import("@/views/admin/edit/scene/index.vue"),
            meta: { ...meta, title: "场景" },
          },
          {
            path: "/admin/edit/:id/model",
            name: "admin-edit-model",
            component: () => import("@/views/admin/edit/model/index.vue"),
            meta: { ...meta, title: "模型" },
          }
        ]
      }
    ],
  },
];

/**
 * testRouter (测试页面路由)
 */
export const testRouter = [
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
    children: [
      {
        path: "/test/comVal",
        name: "test-comVal",
        component: () => import("@/views/test/component-val.vue"),
      },
      {
        path: "/test/comIs",
        name: "test-comIs",
        component: () => import("@/views/test/component-is.vue"),
      },
      {
        path: "/test/comGlobal",
        name: "test-comGlobal",
        component: () => import("@/views/test/component-global.vue"),
      },
    ],
  },
  {
    path: "/test/baseFun",
    name: "test-baseFun",
    component: () => import("@/views/test/base.vue"),
  },
  {
    path: "/test/slot",
    name: "test-slot",
    component: () => import("@/views/test/slot.vue"),
  },
  {
    path: "/test/computed",
    name: "test-computed",
    component: () => import("@/views/test/computed.vue"),
  },
  {
    path: "/test/watch",
    name: "test-watch",
    component: () => import("@/views/test/watch.vue"),
  },
  {
    path: "/test/callback",
    name: "test-callback",
    component: () => import("@/views/test/callback.vue"),
  },
  {
    path: "/test/router",
    name: "test-router",
    component: () => import("@/views/test/router/index.vue"),
    // redirect: "t",
    children: [
      {
        path: "/test/router/a",
        name: "test-router-a",
        component: () => import("@/views/test/router/a.vue"),
        meta: {
          title: "测试a",
          isFull: false,
          isKeepAlive: false,
        },
      },
      {
        path: "/test/router/b",
        name: "test-router-b",
        component: () => import("@/views/test/router/b.vue"),
        meta: {
          title: "测试b",
          isFull: false,
          isKeepAlive: false,
        },
      },
    ],
  },
  {
    path: "/test/editor",
    name: "test-editor",
    component: () => import("@/views/test/tinymce.vue"),
  },
  {
    path: "/test/recorder",
    name: "test-recorder",
    component: () => import("@/views/test/recorder/recorder.vue"),
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
      title: "403页面",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面",
    },
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面",
    },
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/components/ErrorMessage/404.vue"),
  },
];

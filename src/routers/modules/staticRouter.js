
import { HOME_URL, LOGIN_URL } from "@/config";

let meta={
  title: "描述", 
  isHide: false,      
  isKeepAlive: false          
};

/**
 * otherRouter
 */
export const otherRouter = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录/注册"
    }
  },
];

/**
 * 3d (3d页面路由)
 */
export const threeDRouter = [
  {
    path: "/threeD",
    name: "threeD",
    redirect: {name:"threeD-home"},
  },
  {
    path: "/threeD/home",
    name: "threeD-home",
    component: () => import("@/views/threeD/front/index.vue"),
    meta:{...meta,title:"首页"},
  },
  {
    path: "/threeD/edit/:id/:name?",
    name: "threeD-edit",
    component: () => import("@/views/threeD/back/layout/index.vue"),
    meta:{...meta,title:"编辑页"}
  }
];

/**
 * 3d (3d页面路由)
 */
export const threeD2Router = [
  {
    path: "/threeD2",
    name: "threeD2",
    redirect: {name:"threeD2-home"},
  },
  {
    path: "/threeD2/home",
    name: "threeD2-home",
    component: () => import("@/views/threeD2/front/index.vue"),
    meta:{...meta,title:"首页"},
  },
  {
    path: "/threeD2/edit/:id",
    name: "threeD2-edit",
    component: () => import("@/views/threeD2/back/layout/index.vue"),
    redirect: {name:"threeD2-edit-scene"},
    meta:{...meta,title:"编辑页"},
    children:[
      {
        path: "/threeD2/edit/:id/scene",
        name: "threeD2-edit-scene",
        component: () => import("@/views/threeD2/back/scene/index.vue"),
        meta:{...meta,title:"场景"}
      },
      {
        path: "/threeD2/edit/:id/hotspot",
        name: "threeD2-edit-hotspot",
        component: () => import("@/views/threeD2/back/hotspot/index.vue"),
        meta:{...meta,title:"热点"}
      },
      {
        path: "/threeD2/edit/:id/model",
        name: "threeD2-edit-model",
        component: () => import("@/views/threeD2/back/model/index.vue"),
        meta:{...meta,title:"模型"}
      },
      {
        path: "/threeD2/edit/:id/daolan",
        name: "threeD2-edit-daolan",
        component: () => import("@/views/threeD2/back/daolan/index.vue"),
        meta:{...meta,title:"导览"}
      }
    ]
  }
];

/**
 * humanRouter (数字人页面路由)
 */
export const humanRouter = [
  {
    path: "/human",
    name: "human",
    redirect: {name:"human-home"},
  },
  {
    path: "/human/home",
    name: "human-home",
    component: () => import("@/views/human/front/index.vue"),
    meta:{...meta,title:"首页"},
  },
  {
    path: "/human/edit/:id/:name?",
    name: "human-edit",
    component: () => import("@/views/human/back/layout/index.vue"),
    meta:{...meta,title:"编辑页"}
  }
];


/**
 * testRouter (测试页面路由)
 */
export const testRouter = [
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test/index.vue"),
    children:[
      {
        path: "/test/comVal",
        name: "test-comVal",
        component: () => import("@/views/test/component-val.vue")
      },
      {
        path: "/test/comIs",
        name: "test-comIs",
        component: () => import("@/views/test/component-is.vue")
      },
      {
        path: "/test/comGlobal",
        name: "test-comGlobal",
        component: () => import("@/views/test/component-global.vue")
      }
    ]
  },
  {
    path: "/test/baseFun",
    name: "test-baseFun",
    component: () => import("@/views/test/base.vue")
  },
  {
    path: "/test/slot",
    name: "test-slot",
    component: () => import("@/views/test/slot.vue")
  },
  {
    path: "/test/computed",
    name: "test-computed",
    component: () => import("@/views/test/computed.vue")
  },
  {
    path: "/test/watch",
    name: "test-watch",
    component: () => import("@/views/test/watch.vue")
  },
  {
    path: "/test/callback",
    name: "test-callback",
    component: () => import("@/views/test/callback.vue")
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
          isKeepAlive: false
        }
      },
      {
        path: "/test/router/b",
        name: "test-router-b",
        component: () => import("@/views/test/router/b.vue"),
        meta: {
          title: "测试b",
          isFull: false,
          isKeepAlive: false
        }
      }
    ]
  },
  {
    path: "/test/editor",
    name: "test-editor",
    component: () => import("@/views/test/tinymce.vue")
  },
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



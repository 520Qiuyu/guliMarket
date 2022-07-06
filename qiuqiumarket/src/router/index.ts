import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // 主页面
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/index.vue"),
    meta: {
      showFooter: true,
      showSort:true,
    },
  },
  // Search页面
  {
    path: "/search/:keyword?",
    name: "search",
    component: () => import("@/views/Search/index.vue"),
    meta: {
      showFooter: true,
      showSort:false
    },
  },
  // 登录页面
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/index.vue"),
  },
  // 注册页面
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register/index.vue"),
  },
  // 重定向
  {
    path: "/",
    redirect: (to) => {
      return { name: "home" };
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  // 主页面
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/index.vue"),
    meta: {
      showFooter: true,
      showSort: true,
    },
  },
  // Search页面
  {
    path: "/search/:keyword?",
    name: "search",
    component: () => import("@/views/Search/index.vue"),
    meta: {
      showFooter: true,
      showSort: false,
    },
  },
  // 商品详情页面
  {
    path: "/detail/:skuId",
    name: "detail",
    component: () => import("@/views/Detail/index.vue"),
  },
  // 添加购物车成功
  {
    path:"/addcartsuccess",
    name:"addcartsuccess",
    component:()=>import("@/views/AddCarts/index.vue"),
    meta:{
      showFooter: true,
    }
  },
  // 购物车
  {
    path:'/shopcart',
    name:'shopcart',
    component:()=>import("@/views/ShopCart/index.vue")
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
  scrollBehavior (to, from, savedPosition) {
    if(from.name ==="search" && to.name === "detail"){
      return{
        top:0,
        behavior: 'smooth',
      }
    }
  }
});

export default router;

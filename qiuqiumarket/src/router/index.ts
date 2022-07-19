import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { getUserInfo } from "@/api";
import { ElMessage } from "element-plus";
import { delStorage } from "@/utils/user";
import { fromPairs } from "lodash";

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
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/views/AddCarts/index.vue"),
    meta: {
      showFooter: true,
      needLogin: true,
    },
    beforeEnter: (to, from) => {
      if (from.name === "detail") return true;
      return {name:"shopcart"};
    },
  },
  // 购物车
  {
    path: "/shopcart",
    name: "shopcart",
    component: () => import("@/views/ShopCart/index.vue"),
    meta: { needLogin: true },
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
  // 提交订单
  {
    path: "/trade",
    name: "trade",
    component: () => import("@/views/Trade/index.vue"),
    meta: {
      needLogin: true,
    },
    beforeEnter: (to, from) => {
      console.log('from.name',to.name)
      if (from.name === "shopcart" || from.name === "pay" ||!from.name) return true;
      return false;
    },
  },
  // 支付页面
  {
    path: "/pay",
    name: "pay",
    component: () => import("@/views/Pay/index.vue"),
    meta: {
      needLogin: true,
    },
    beforeEnter: (to, from) => {
      if (from.name === "trade" || from.name === "paysuccess" ||!from.name) return true;
      return from;
    },
  },
  // 支付成功
  {
    path: "/paysuccess",
    name: "paysuccess",
    component: () => import("@/views/PaySuccess/index.vue"),
    meta: {
      needLogin: true,
    },
    beforeEnter: (to, from) => {
      if (from.name === "pay" && to.params.paysuccess === "支付成功")
        return true;
      return {name:"myorder"};
    },
  },
  // 个人中心
  {
    path: "/center",
    name: "center",
    component: () => import("@/views/Center/index.vue"),
    children: [
      {
        path: "myorder",
        name: "myorder",
        component: () => import("@/views/Center/MyOrder/index.vue"),
      },
      {
        path: "",
        redirect: () => {
          return { name: "myorder" };
        },
      },
    ],
    meta: {
      needLogin: true,
    },
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
  scrollBehavior(to, from, savedPosition) {
    if (from.name === "search" && to.name === "detail") {
      return {
        top: 0,
        behavior: "smooth",
      };
    }
  },
});

// 全局前置路由守卫
router.beforeEach(async (to, from) => {
  const userInfo = await getUserInfo();
  // 判断用户登录
  if (userInfo.data.code === 200) {
    // 不能去登录页面
    if (to.name === "login") {
      return false;
    }
    // 其他页面可以求
    return true;
  }
  // 用户未登录
  else {
    // 进入需要登录的页面，则被打到登录页面
    // 页面要求登录状态
    if (to.meta.needLogin) {
      // 本地缓存token,假登录，过期登录
      if ((store.state as { user: { token: string } }).user.token) {
        // 删除本地数据
        delStorage();
        // 删除vuex数据
        store.commit("user/LOGIN", "");
        store.commit("user/SETUSERINFO", {});
        ElMessage({
          message: "登录过期",
          center: true,
          type: "warning",
        });
      }
      // 未登录
      else {
        ElMessage({
          message: "未登录",
          center: true,
          type: "warning",
        });
      }

      return `/login?redirect=${to.name as string}&query=${JSON.stringify(to.query)}&params=${JSON.stringify(to.params)}`;
    }
    return true;
  }
});

export default router;

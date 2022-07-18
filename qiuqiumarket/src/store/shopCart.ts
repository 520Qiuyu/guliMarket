import {
  addToCart,
  changeSkuChecked,
  delCart,
  getShopCartList,
} from "@/api/index";
import { cartInfo } from "@/types/types";
import { ElMessage } from "element-plus";
export default {
  namespaced: true,
  actions: {
    async addToCart(context: any, params: { skuId: number; skuNum: number }) {
      const res = await addToCart(params.skuId, params.skuNum);
      if (res.data.code === 200) {
        context.dispatch("getShopCartList");
        return "ok";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    async getShopCartList(context: any) {
      const res = await getShopCartList();
      if (res.data.code === 200) {
        context.commit("GETSHOPCARTLIST", res.data.data);
      }
    },
    async delCart(context: any, skuId: number) {
      const res = await delCart(skuId);
      if (res.data.code === 200) {
        context.dispatch("getShopCartList");
        return "ok";
      } else {
        return Promise.reject(new Error("删除失败"));
      }
    },
    async changeChecked(
      context: any,
      val: { skuId: number; isChecked: "0" | "1" }
    ) {
      const res = await changeSkuChecked(val.skuId, val.isChecked);
      if (res.data.code) context.dispatch("getShopCartList");
      else
        ElMessage({
          message: "网络错误",
          type: "error",
          center: true,
        });
    },
    async changeAllChecked(context: any, isChecked: "0" | "1") {
      /* 
        先用数组的map方法生层一个Promise数组，在调用Promise.all方法
      */
      const array = context.state.shopCartInfo[0].cartInfoList.map(
        (element: cartInfo) => {
          return changeSkuChecked(element.skuId, isChecked);
        }
      );
      Promise.all(array)
        .then(() => context.dispatch("getShopCartList"))
        .catch((error) => {
          ElMessage({
            message: (error as Error).message,
            type: "error",
            center: true,
          });
        });
    },
    async delCheckedGoods(context: any) {
      const array = context.state.shopCartInfo[0].cartInfoList.map(
        (item: cartInfo) => {
          if (item.isChecked) {
            return delCart(item.skuId);
          }
        }
      );
      Promise.all(array)
        .then(() => {
          context.dispatch("getShopCartList");
        })
        .catch((error) =>
          ElMessage({
            message: (error as Error).message,
            type: "error",
            center: true,
          })
        );
    },
  },
  mutations: {
    GETSHOPCARTLIST(state: any, val: any) {
      state.shopCartInfo = val;
    },
  },
  getters: {},
  state: {
    shopCartInfo: [],
  },
};

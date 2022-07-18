import { getTrade } from "@/api";
import { tradeInfo } from "@/types/types";

export default {
  namespaced: true,
  actions: {
    async getTrade(context: any) {
      const res = await getTrade();
      if (res.data.code === 200) {
        context.commit("GETTRADE", res.data.data);
        return "ok";
      } else if (res.data.code === 208) {
        return "未登录";
      }
      return Promise.reject(new Error(res.data.message));
    },
  },
  mutations: {
    GETTRADE(state: any, value: tradeInfo) {
      state.tradeInfo = value;
    },
  },
  getters: {
    userAddressList(state: any) {
      return state.tradeInfo.userAddressList || [];
    },
    detailArrayList(state: any) {
      return state.tradeInfo.detailArrayList || [];
    },
    orderDetailList(state: any) {
      if (state.tradeInfo.orderDetailVoList)
        return state.tradeInfo.orderDetailVoList[0].orderDetailList;
      return [];
    },
  },
  state: {
    tradeInfo: {} as tradeInfo,
  },
};

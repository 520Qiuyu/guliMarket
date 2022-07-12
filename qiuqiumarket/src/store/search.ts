import { searchParams, searchResult } from "@/types/types";
import { getSearchResult } from "@/api";
export default {
  namespaced: true,
  actions: {
    async getSearchResult(context: any, value: searchParams) {
      const res = await getSearchResult(value);
      console.log("getSearchResult", res.data);
      if (res.data.code === 200)
        context.commit("GETSEARCHRESULT", res.data.data);
    },
  },
  mutations: {
    GETSEARCHRESULT(state: any, val: searchResult) {
      state.searchResult = val;
    },
  },
  getters: {
    attrsList: (state: any) => state.searchResult.attrsList,
    goodsList: (state: any) => state.searchResult.goodsList,
    pageNo: (state: any) => state.searchResult.pageNo,
    pageSize: (state: any) => state.searchResult.pageSize,
    total: (state: any) => state.searchResult.total,
    totalPages: (state: any) => state.searchResult.totalPages,
    trademarkList: (state: any) => state.searchResult.trademarkList,
  },
  state: {
    searchResult: {} as searchResult,
  },
};

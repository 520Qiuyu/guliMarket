import {
  getBannerList,
  getFloorList,
  getBaseCategoryList,
  getCateGory1,
  getCateGory2,
  getCateGory3,
  delCateGory2,
} from "@/api/index";
import { category1, category2, category3, banner, floor } from "@/types/types";
export default {
  namespaced: true,
  actions: {
    // 请求三级级联列表
    getBaseCategoryList: async (context: any) => {
      const res = await getBaseCategoryList();
      if (res.data.code === 200)
        context.commit("GETBASECATEGORYLIST", res.data.data);
    },
    // 获取首页轮播图列表
    getBannerList: async (context: any) => {
      const res = await getBannerList();
      if (res.data.code === 200) context.commit("GETBANNERLIST", res.data.data);
    },
    //
    getFloorList: async (context: any) => {
      const res = await getFloorList();
      if (res.data.code === 200) context.commit("GETFLOORLIST", res.data.data);
    },
  },
  mutations: {
    GETBASECATEGORYLIST(state: any, val: category1[]) {
      state.categoryList = val.slice(0,15);
    },
    LOADCATEGORYLIST(state: any, val: category1[]) {
      state.categoryList = val;
    },
    GETBANNERLIST(state: any, val: banner[]) {
      state.bannerList = val;
    },
    GETFLOORLIST(state: any, val: floor[]) {
      state.floorList = val;
    },
  },
  getters: {},
  state: {
    categoryList: [] as category1[],
    bannerList: [] as banner[],
    floorList: [] as floor[],
  },
};

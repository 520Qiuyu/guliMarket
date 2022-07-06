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
    // 加载三级及联，多层异步请求
    loadCategoryList: async (context: any) => {
      let categoryList: any = [];
      //   获取一级菜单
      const res = await getCateGory1();
      if (res.data.code === 200) {
        categoryList = res.data.data;
        // 获取二级菜单
        await categoryList.forEach(async (category1: any) => {
          const res2 = await getCateGory2(category1.id);
          if (res2.data.code === 200) {
            category1.childList = res2.data.data;
            // 获取三级菜单
            await category1.childList.forEach(async (category2: any) => {
              const res3 = await getCateGory3(category2.id);
              if (res3.data.code === 200) {
                category2.childList = res3.data.data;
              }
            });
          }
        });
      }

      console.log("categoryList", categoryList);
      context.commit("LOADCATEGORYLIST", categoryList);
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
      state.categoryList = val;
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

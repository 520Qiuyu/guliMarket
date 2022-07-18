import { getSkuDetail } from "@/api/index";
import { skuDetail } from "@/types/types";
export default {
  namespaced: true,
  actions: {
    async getSkuDetail(context: any, skuId: number) {
      const res = await getSkuDetail(skuId);
      if (res.data.code === 200) context.commit("GETSKUDETAIL", res.data.data);
    },
  },
  mutations: {
    GETSKUDETAIL(state: any, val: skuDetail) {
      state.skuDetail = val;
    },
  },
  state: {
    skuDetail: {} as skuDetail,
  },
  getters: {
    categoryView:(state:any)=>state.skuDetail.categoryView || {},
    spuSaleAttrList:(state:any)=>state.skuDetail.spuSaleAttrList || [],
    skuInfo:(state:any)=>state.skuDetail.skuInfo || {},
    skuImageList:(state:any)=>state.skuDetail.skuInfo?.skuImageList || []
  }
};

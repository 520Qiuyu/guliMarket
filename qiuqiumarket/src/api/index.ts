// api接口统一管理
import axios from "axios";
import request from "./request";
import mockAjax from "./mockAjax";
import { searchParams } from "@/types/types";

// 获取首页轮播图
export const getBannerList = () =>
  mockAjax({
    method: "get",
    url: "banner",
  });
//获取floorList
export const getFloorList = () =>
  mockAjax({
    method: "get",
    url: "floor",
  });
// 获取首页三级级联分类列表
export const getBaseCategoryList = () =>
  request({
    method: "get",
    url: "/api/product/getBaseCategoryList",
  });
// 获取一级商品分类列表
export const getCateGory1 = () =>
  request({
    method: "get",
    url: "/admin/product/getCategory1",
  });
// 获取二级商品分类列表
export const getCateGory2 = (cateGory1Id: number) =>
  request({
    method: "get",
    url: `/admin/product/getCategory2/${cateGory1Id}`,
  });
// 获取三级商品分类列表
export const getCateGory3 = (cateGory2Id: number) =>
  request({
    method: "get",
    url: `/admin/product/getCategory3/${cateGory2Id}`,
  });
// 删除一级分类列表
export const delCateGory1 = (cateGory1Id: number) =>
  request({
    method: "delete",
    url: `/admin/product/removeCategory1/${cateGory1Id}`,
  });
// 删除二级分类列表
export const delCateGory2 = (cateGory2Id: number) =>
  request({
    method: "delete",
    url: `/admin/product/removeCategory2/${cateGory2Id}`,
  });
// 删除三级分类列表
export const delCateGory3 = (cateGory3Id: number) =>
  request({
    method: "delete",
    url: `/admin/product/removeCategory3/${cateGory3Id}`,
  });
// 获取搜索结果
export const getSearchResult = (params: searchParams) =>
  request({
    method: "post",
    url: "/api/list",
    data: params,
  });
// 获取商品详情
export const getSkuDetail = (skuId: number) =>
  request({
    method: "get",
    url: `/api/item/${skuId}`,
  });
// 切换商品选中状态
export const changeSkuChecked = (skuId: number, isChecked: "0" | "1") =>
  request({
    method: "get",
    url: `/api/cart/checkCart/${skuId}/${isChecked}`,
  });
// 添加购物车
export const addToCart = (skuId: number, skuNum: number) =>
  request({
    method: "post",
    url: `/api/cart/addToCart/${skuId}/${skuNum}`,
  });
// 获取购物车列表
export const getShopCartList = () =>
  request({
    method: "get",
    url: "/api/cart/cartList",
  });
// 删除购物车中已添加的商品
export const delCart = (skuId: number) =>
  request({
    method: "DELETE",
    url: `/api/cart/deleteCart/${skuId}`,
  });

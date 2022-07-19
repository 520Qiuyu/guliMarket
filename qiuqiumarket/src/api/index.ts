// api接口统一管理
import axios from "axios";
import request from "./request";
import mockAjax from "./mockAjax";
import { orderDetail, searchParams } from "@/types/types";

/* // 获取首页轮播图
export const getBannerList = () =>
  mockAjax({
    method: "get",
    url: "banner",
  }); */
  // 获取首页轮播图
export const getBannerList = () =>
mockAjax({
  method: "get",
  url: "centerBannerList",
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
// 注册
export const register = (phone: string, password: string, code: string) =>
  request({
    method: "post",
    url: "/api/user/passport/register",
    data: {
      phone,
      password,
      code,
    },
  });
// 获取验证码
export const getCode = (phone: string) =>
  request({
    method: "get",
    url: `/api/user/passport/sendCode/${phone}`,
  });
// 登录
export const login = (phone: string, password: string) =>
  request({
    method: "post",
    url: "/api/user/passport/login",
    data: {
      phone,
      password,
    },
  });
// 注销登录
export const logout = () =>
  request({
    method: "get",
    url: "/api/user/passport/logout",
  });
// 获取订单页信息
export const getTrade = () =>
  request({
    method: "get",
    url: "/api/order/auth/trade",
  });
// 提交订单
export const submitOrder = (
  tradeNo: string,
  data: {
    consignee: string;
    consigneeTel: string;
    deliveryAddress: string;
    paymentWay: string;
    orderComment: string;
    orderDetailList: orderDetail[];
  }
) =>
  request({
    method: "post",
    url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
  });
// 获取订单支付信息
export const getPayInfo = (orderId: number) =>
  request({
    method: "get",
    url: `/api/payment/weixin/createNative/${orderId}`,
  });
// 查询订单状态
export const queryPayStatus = (orderId: number) =>
  request({
    method: "get",
    url: `/api/payment/weixin/queryPayStatus/${orderId}`,
  });
// 查询用户信息
export const getUserInfo = () =>
  request({
    method: "get",
    url: "/api/user/passport/auth/getUserInfo",
  });
// 获取我的订单列表
export const getMyOrderList = (page: number, limit: number) =>
  request({
    method: "get",
    url: `/api/order/auth/${page}/${limit}`,
  });

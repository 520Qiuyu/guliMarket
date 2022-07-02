// api接口统一管理
import axios from "axios";
import request from "./request";

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

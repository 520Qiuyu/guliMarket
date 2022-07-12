export interface category1 {
  categoryId: number;
  categoryName: string;
  categoryChild: category2[];
}
export interface category2 {
  categoryId: number;
  categoryName: string;
  categoryChild: category3[];
}
export interface category3 {
  categoryId: number;
  categoryName: string;
}
export interface banner {
  id: number;
  imgUrl: string;
}
export interface floorNav {
  url: string;
  text: string;
}
export interface carousel {
  id: string;
  imgUrl: string;
}
export interface floor {
  bigImg: string;
  carouselList: carousel[];
  id: string;
  imgUrl: string;
  navList: floorNav[];
  keywords: string[];
  name: string;
  recommendList: string[];
}
export interface searchParams {
  category1Id?: number;
  category2Id?: number;
  category3Id?: number;
  categoryName?: string;
  keyword?: string;
  props?: string[];
  trademark?: string;
  order?: string;
  pageNo?: number;
  pageSize?: number;
}
export interface attr {
  attrId: number;
  attrName: string;
  attrValueList: string[];
}
export interface good {
  attrs: any;
  category1Id: number | null;
  category1Name: string | null;
  category2Id: number | null;
  category2Name: string | null;
  category3Id: number | null;
  category3Name: string | null;
  createTime: string | null;
  defaultImg: string;
  hotScore: number;
  id: number;
  price: number;
  title: string;
  tmId: number | null;
  tmName: number | null;
}
export interface trademark {
  tmId: number;
  tmName: string;
}
export interface searchResult {
  attrsList: attr[];
  goodsList: good[];
  pageNo: number;
  pageSize: number;
  total: number;
  totalPages: number;
  trademarkList: trademark[];
}
export interface categoryView {
  category1Id: number;
  category1Name: string;
  category2Id: number;
  category2Name: string;
  category3Id: number;
  category3Name: string;
  id: number;
}
export interface skuAttrValue {
  attrId: number;
  attrName: string;
  id: number;
  skuId: number;
  valueId: number;
  valueName: string;
}
export interface skuImage {
  id: number;
  imgName: string;
  imgUrl: string;
  isDefault: string;
  skuId: number;
  spuImgId: number;
}
export interface skuSaleAttrValue {
  id: number;
  saleAttrId: number;
  saleAttrName: string;
  saleAttrValueId: number;
  saleAttrValueName: string;
  skuId: number;
  spuId: number;
}
export interface skuInfo {
  category3Id: number;
  createTime: string;
  id: number;
  isSale: number;
  price: number;
  skuAttrValueList: skuAttrValue[];
  skuDefaultImg: string;
  skuDesc: string;
  skuImageList: skuImage[];
  skuName: string;
  skuSaleAttrValueList: skuAttrValue[];
  spuId: number;
  tmId: number;
  weight: string;
}
export interface spuSaleAttrValue {
  baseSaleAttrId: number;
  id: number;
  isChecked: "0" | "1";
  saleAttrName: string;
  saleAttrValueName: string;
  spuId: number;
}
export interface spuSaleAttr {
  baseSaleAttrId: number;
  id: number;
  saleAttrName: string;
  spuId: number;
  spuSaleAttrValueList: spuSaleAttrValue[];
}
export interface skuDetail {
  categoryView: categoryView;
  price: number;
  skuInfo: skuInfo;
  spuSaleAttrList: spuSaleAttr[];
  valuesSkuJson: string;
}
export interface cartInfo {
  cartPrice: number;
  couponInfoList?: [];
  createTime: string;
  id: number;
  imgUrl: string;
  isChecked: 1 | 0;
  isOrdered: number;
  operateTime: string;
  orderTime?: string;
  skuId: number;
  skuName: string;
  skuNum: number;
  skuPrice: number;
  sourceId: number;
  sourceType: string;
  userId: string;
}

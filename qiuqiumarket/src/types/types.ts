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
  props?: [];
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

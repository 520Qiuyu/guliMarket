<template>
  <TypeNav></TypeNav>
  <!--list-content-->
  <div class="main">
    <div class="py-container">
      <Bread
        :searchParams="searchParams"
        @setSearchParams="setSearchParams"
      ></Bread>
      <!--selector-->
      <Selector
        :searchParams="searchParams"
        @setSearchParams="setSearchParams"
      ></Selector>
      <!--details-->
      <Details
        :searchParams="searchParams"
        @setSearchParams="setSearchParams"
      ></Details>
      <!--hotsale-->
      <HotSale></HotSale>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
  watchEffect,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import TypeNav from "../../components/TypeNav/index.vue";
import { searchParams, searchResult } from "@/types/types";
import Bread from "./Bread/index.vue";
import Selector from "./Selector/index.vue";
import Details from "./Details/index.vue";
import HotSale from "./HotSale/index.vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Search",
  components: { TypeNav, Bread, Selector, Details, HotSale },
  props: {},
  setup(props, ctx) {
    const Route = useRoute();
    const Store = useStore();

    const searchParams = reactive({
      category1Id: undefined,
      category2Id: undefined,
      category3Id: undefined,
      categoryName: undefined, //产品的名字
      keyword: undefined, //关键字
      props: [], //平台属性的选择参数
      trademark: undefined, //品牌参数
      //上面这七个参数：有用户选择决定的，因此初始值为空的
      //下面这三个：都有初始值
      order: "1:desc", //携带给服务器参数order--->初始值"1:desc"[综合降序]
      pageNo: 1,
      // pageNo:parseInt(localStorage.getItem('pageNo'))||1, //获取第几页的数据，默认即为第一个的数据
      pageSize: 3, //每一页需要展示多少条数据
    } as searchParams);
    const setSearchParams = (newParams: searchParams) => {
      console.log("我出发了修改搜索参数： ", newParams);
      // 如果不是修改pageNo，那么必定会引起结果的改变，必须将要显示的页面置零
      if (!("pageNo" in newParams)) {
        Object.assign(newParams, { pageNo: 1 });
      }
      Object.assign(searchParams, newParams);
    };
    // 监视路由，当有路由传参时，会引起路由的变化，然后改变searchParams参数
    watch(
      Route,
      () => {
        searchParams.keyword = Route.params.keyword as string;
        // 置空Id，防止上次的数据影响下次搜索
        // 将相关参数设置为undefined，发送请求时，undefined的数据不会被发送
        searchParams.category1Id = undefined;
        searchParams.category2Id = undefined;
        searchParams.category3Id = undefined;
        searchParams.categoryName = undefined;
        Object.assign(searchParams, Route.query, { pageNo: 1 });
        console.log("路由：我变化了", searchParams);
      },
      { immediate: true }
    );
    // 监视searchParams，一旦变化，就要去更新搜索结果
    watch(searchParams, (newVal) => {
      console.log("searchParams：我变化了", searchParams);
      Store.dispatch("search/getSearchResult", newVal);
    });
    const searchResult = computed<searchResult>(
      () => Store.state.search.searchResult
    );
    return {
      Route,
      Store,
      searchResult,
      searchParams,
      setSearchParams,
    };
  },
  created() {
    this.Store.dispatch("search/getSearchResult", this.searchParams);
  },
});
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
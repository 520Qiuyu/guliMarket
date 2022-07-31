<template>
  <Header></Header>
  <router-view></router-view>
  <!-- 使用v-show无效且报警 -->
  <!-- <Footer v-show="Route.meta.showFooter"></Footer> -->
  <Footer v-if="Route.meta.showFooter"></Footer>
</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { delCateGory2 } from "@/api/index.ts";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  components: { Header, Footer },
  props: {},
  setup(props, ctx) {
    const Route = useRoute();
    const Router = useRouter();
    const Store = useStore();

    return {
      Route,
      Router,
      Store,
    };
  },
  created() {
    // 复合三级及联
    // this.$store.dispatch("loadCategoryList");
    // 三级及联
    this.Store.dispatch("home/getBaseCategoryList");
    // 获取首页轮播图列表
    this.$store.dispatch("home/getBannerList");
    //
    this.$store.dispatch("home/getFloorList");
  },
});
</script>

<style scoped>
a{
  text-decoration: none !important;
}
</style>

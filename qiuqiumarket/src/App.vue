<template>
  <MyTest></MyTest>
  <Header></Header>
  <router-view></router-view>
  <!-- 使用v-show无效且报警 -->
  <!-- <Footer v-show="Route.meta.showFooter"></Footer> -->
  <Footer v-if="Route.meta.showFooter"></Footer>
</template>

<script>
import { defineComponent } from "vue";
import MyTest from "@/components/test.vue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  components: { Header, Footer, MyTest },
  props: {},
  setup(props, ctx) {
    const Route = useRoute();
    const Router = useRouter();
    return {
      Route,
    };
  },
});
</script>

<style scoped>
</style>

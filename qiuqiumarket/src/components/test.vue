<template>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
import { getCateGory1, getCateGory2,getCateGory3,getBannerList } from "../api";
export default defineComponent({
  name: "MyTest",
  components: {},
  props: {},
  setup(props, ctx) {
    const getBannerList_ = async () => {
      const res = await getBannerList(2);
    };
    return {
      getBannerList_,
    };
  },
  created() {
    this.getBannerList_();
  },
});
</script>

<style scoped>
</style>
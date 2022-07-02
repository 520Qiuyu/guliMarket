<template>
  <div></div>
</template>

<script>
import { defineComponent } from "vue";
import { getCateGory1, getCateGory2,getCateGory3 } from "../api";
export default defineComponent({
  name: "MyTest",
  components: {},
  props: {},
  setup(props, ctx) {
    const getCateGory = async () => {
      const res = await getCateGory3(2);
      console.log("res", res);
    };
    return {
      getCateGory,
    };
  },
  created() {
    this.getCateGory();
  },
});
</script>

<style scoped>
</style>
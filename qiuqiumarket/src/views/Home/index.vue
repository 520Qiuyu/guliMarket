<template>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <TodayRecommend></TodayRecommend>
  <Rank></Rank>
  <Like></Like>
  <Floor></Floor>
  <Floor></Floor>
  <Brand></Brand>
</template>

<script>
import { defineComponent } from "vue";
import TypeNav from "@/views/Home/TypeNav";
import ListContainer from "@/views/Home/ListContainer";
import TodayRecommend from "@/views/Home/TodayRecommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";
export default defineComponent({
  name: "Home",
  components: { TypeNav, ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped>
</style>
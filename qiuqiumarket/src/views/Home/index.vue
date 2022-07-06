<template>
  <TypeNav></TypeNav>
  <ListContainer></ListContainer>
  <TodayRecommend></TodayRecommend>
  <Rank></Rank>
  <Like></Like>
  <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
  <Brand></Brand>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import TypeNav from "../../components/TypeNav/index.vue";
import ListContainer from "./ListContainer/index.vue";
import TodayRecommend from "./TodayRecommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { useStore } from "vuex";
import { floor } from "@/types/types";
export default defineComponent({
  name: "Home",
  components: {
    TypeNav,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  props: {},
  setup(props, ctx) {
    const Store = useStore();
    const floorList = computed<floor[]>(() => Store.state.home.floorList);
    return {
      floorList,
    };
  },
});
</script>

<style scoped>
</style>
<template>
  <Swiper
    :modules="modules"
    :slides-per-view="3"
    :space-between="20"
    navigation
    :loop="true"
  >
    <SwiperSlide v-for="skuImage in skuImageList" :key="skuImage.id">
      <img
        :src="skuImage.imgUrl"
        @click="currentImgHandle(skuImage.id)"
        :class="currentImage == skuImage.imgUrl ? 'active' : ''"
      />
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "@vue/runtime-core";
import { skuImage } from "@/types/types";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    currentImage: {
      type: String,
      default: '',
    },
  },
  emits: ["setCurrentImage"],
  name: "ImageList",
  setup(props, ctx) {
    const Store = useStore();
    const skuImageList = computed<skuImage[]>(
      () => Store.getters["goods/skuImageList"]
    );
    const currentImgHandle = (id: number) => {
      ctx.emit("setCurrentImage", id);
    };
    return {
      skuImageList,
      currentImgHandle,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
});
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;
  margin-top: 5px;
  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      margin: 0 auto;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
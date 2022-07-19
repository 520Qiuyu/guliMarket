<template>
  <div class="spec-preview">
    <img :src="currentImage || skuInfo.skuDefaultImg" />
    <div class="event" @mousemove="showBig($event)"></div>
    <div class="big">
      <img :src="currentImage || skuInfo.skuDefaultImg" :style="styleBig" />
    </div>
    <div class="mask" :style="style"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { skuImage, skuInfo } from "@/types/types";
import { computed, PropType, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Zoom",
  props: {
    currentImage: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const Store = useStore();
    const style = ref<string>();
    const styleBig = ref<string>();
    const showBig = (event: MouseEvent) => {
      style.value = `top:${event.offsetY}px;left:${event.offsetX}px`;
      styleBig.value = `top:${-2 * event.offsetY + 200}px;left:${-2 * event.offsetX + 200}px`;
    };
    const skuInfo = computed<skuInfo>(() => Store.getters["goods/skuInfo"]);
    return {
      skuInfo,
      showBig,
      style,
      styleBig,
    };
  },
});
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
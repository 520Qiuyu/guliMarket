<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="50"
          navigation
          :autoplay="{ delay: 2000, disableOnInteraction: false }"
          :pagination="{ clickable: true }"
          :loop="true"
        >
          <swiper-slide v-for="banner in bannerList" :key="banner.id"
            ><img class="center-banner" :src="banner.imgUrl"
          /></swiper-slide>
        </Swiper>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><AddLocation /></el-icon>
            <span class="service-intro">配送</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Bell /></el-icon>
            <span class="service-intro">抢购</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><ChatRound /></el-icon>
            <span class="service-intro">详情</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Filter /></el-icon>
            <span class="service-intro">筛选</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Headset /></el-icon>
            <span class="service-intro">耳机</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Service /></el-icon>
            <span class="service-intro">服务</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><User /></el-icon>
            <span class="service-intro">用户</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Setting /></el-icon>
            <span class="service-intro">设置</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Sell /></el-icon>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Postcard /></el-icon>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Goods /></el-icon>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <el-icon :size="20" :color="`#333`"><Apple /></el-icon>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/cover1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { banner } from "@/types/types";
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
  name: "ListContainer",
  components: { Swiper, SwiperSlide },
  props: {},
  setup(props, ctx) {
    const Store = useStore();
    const bannerList = computed<banner[]>(() => Store.state.home.bannerList);
    return {
      bannerList,
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
  created() {},
});
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;

      .swiper{
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .center-banner{
        width: 100%;

      }
    }

    .right {
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          cursor: pointer;
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;

          .list-item

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

         
        }
      }

      .ads {
        margin-top: 5px;

        img {
          width: 250px;
          opacity: 1;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
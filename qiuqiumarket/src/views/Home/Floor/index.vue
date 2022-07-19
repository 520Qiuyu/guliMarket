<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floor.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active">
              <a href="#tab1" data-toggle="tab">热门</a>
            </li>
            <li>
              <a href="#tab2" data-toggle="tab">大家电</a>
            </li>
            <li>
              <a href="#tab3" data-toggle="tab">生活电器</a>
            </li>
            <li>
              <a href="#tab4" data-toggle="tab">厨房电器</a>
            </li>
            <li>
              <a href="#tab5" data-toggle="tab">应季电器</a>
            </li>
            <li>
              <a href="#tab6" data-toggle="tab">空气/净水</a>
            </li>
            <li>
              <a href="#tab7" data-toggle="tab">高端电器</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li
                  v-for="(keyword, index) in floor.keywords"
                  :key="index + keyword"
                >
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <div class="floorBanner">
              <swiper
                :modules="modules"
                :slides-per-view="1"
                :space-between="50"
                navigation
                :pagination="{ clickable: true }"
                :autoplay="{
                  delay: 2000,
                  disableOnInteraction: false,
                }"
                :loop="true"
              >
                <swiper-slide v-for="carousel in floor.carouselList" :key="carousel.id"><img class="carousel" :src="carousel.imgUrl" /></swiper-slide>
              </swiper>
            </div>
            <div class="split">
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { floor } from "@/types/types";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default defineComponent({
  name: "Floor",
  components: { Swiper, SwiperSlide },
  props: {
    floor: {
      type: Object as PropType<floor>,
      required: true,
    },
  },
  setup(props, ctx) {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    };
  },
});
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #333;
        font-size: 22px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 500;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-radius: 5px;
      margin:10px;
      background-color: #f7f7f7;
      padding: 10px;
      .tab-pane {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .floor-1 {
          height: 380px;
          display: flex;
          &>div{
            padding:5px;
          }

          .blockgary {
            width: 210px;
            height: 100%;
            padding: 5px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            

            .jd-list {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              
              li {
                list-style-type: none;
                width: 40%;
                margin: 5px 10px;
                background-color: #fff;
                text-align: center;
                line-height: 26px;
              }
            }

          }

          .floorBanner {
            width: 330px;
            height: 380px;
            padding:5px;
            display: flex;
            align-items: center;

            .carousel{
              width: 100%;
              height: 380px;
            }
          }

          .split {
            height: 100%;
            position: relative;

            

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            background-color: #fff;
            display: flex;
            justify-content: center;
            img{
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/82abdba456e8caaea5848a0cddce03db.png?w=48&h=48" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner">
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/290270b6fc499fc5fcb653417e99fe91.jpg?w=632&h=340" />
        </li>
        <li class="banner">
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5d1892854c8bb165e755d68bde287d71.jpg?w=632&h=340" />
        </li>
        <li class="banner">
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/28c13d0d11b38ec17fa5d83bc6ba5912.jpg?w=632&h=340" />
        </li>
        <li class="banner">
          <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/101b19aca4bb489bcef0f503e44ec866.jpg?thumb=1&w=370&h=225&f=webp&q=90" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TodayRecommend",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped lang="less">
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .recommend {
      height: 165px;
      background-color: #eaeaea;
      margin: 10px 0;
      display: flex;

      .clock {
        width: 16.67%;
        background-color: #5F5750;
        color: #fff;
        font-size: 18px;
        text-align: center;

        .time {
          padding: 30px 0;
        }

        h3 {
          margin: 9px 0;
          font-weight: 500;
          font-size: 18px;
          line-height: 30.06px;
        }
      }

      .banner {
        width: 20.83%;

        img {
          width: 100%;
          height: 100%;
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
<template>
  <!-- 猜你喜欢 -->
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">猜你喜欢</h3>
        <a href="javascript:;" class="fr tip changeBnt">换一换</a>
      </div>
      <div class="bd">
        <ul class="favourate">
          <li>
            <img
              src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/7fccce9e65aff2d7c913e40f4bee1b0b.png?thumb=1&w=250&h=250&f=webp&q=90"
            />
            <div class="like-text">
              <p>Redmi Note 11SE</p>
              <span>双卡双5G｜疾速登陆</span>
              <h3>¥999起</h3>
            </div>
          </li>
          <li>
            <img
              src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0bcd64f412dfb5e15695fa96d21ecb23.png?thumb=1&w=250&h=250&f=webp&q=90"
            />
            <div class="like-text">
              <p>XiaoMi Civi 1s</p>
              <span>原生美肌人像｜奇迹阳光动人新色｜骁龙778G Plus</span>
              <h3>¥999起</h3>
            </div>
          </li>
          <li>
            <img
              src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/b8259e8fb355acf168c66f75d375c6af.jpg?thumb=1&w=250&h=250&f=webp&q=90"
            />
            <div class="like-text">
              <p>XiaoMi Watch S1</p>
              <span>蓝宝石玻璃镜面 | 不锈钢中框 | 1.43”AMOLED大屏幕</span>
              <h3>¥339元</h3>
            </div>
          </li>
          <li>
            <img
              src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/0b271a074e087848357aa61ae665b214.jpg?thumb=1&w=250&h=250&f=webp&q=90"
            />
            <div class="like-text">
              <p>Xiaomi真无线降噪耳机3</p>
              <span>40dB宽频主动降噪 | HiFi高保真音质 | HRTF专业调音</span>
              <h3>¥379</h3>
            </div>
          </li>
          <li>
            <img
              src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/f84503dbf5adbdf17111c61d4a7cf893.jpg?thumb=1&w=250&h=250&f=webp&q=90"
            />
            <div class="like-text">
              <p>RedMi 手表2</p>
              <span>1.6"AMOLED大屏 | 117种运动模式 | 24小时心率监测</span>
              <h3>¥116.00</h3>
            </div>
          </li>
          <li>
            <img
              src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/b28153b80cb2c67564608e56d5c2f3f3.jpg?thumb=1&w=250&h=250&f=webp&q=90"
            />
            <div class="like-text">
              <p>小米手环6 NFC版</p>
              <span>1.56" 跑道全面彩屏 | 30种运动模式 | 24小时心率监测</span>
              <h3>¥249</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Like",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped lang="less">
.like {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      overflow: hidden;

      .fl {
        float: left;
        font-size: 22px;
        line-height: 30px;
        color: #333;
        margin-bottom: 10px;
        font-weight: 500;
      }

      .fr {
        float: right;
        background-image: url(./images/icons.png);
        width: 66px;
        height: 25px;
        background-position: 182px -104px;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        text-decoration: none;
      }
    }

    .bd {
      .favourate {
        // border: 1px solid #e4e4e4;
        overflow: hidden;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        border-radius: 5px;

        li {
          box-shadow: 0 0 5px rgb(0 0 0 / 30%);
          border-radius: 5px;
          height: 250px;
          margin: 0 -1px;
          overflow: hidden;
          background: #fff;
          position: relative;
          width: 15%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          img {
            width: 142px;
            height: 142px;
            transition: all 400ms;

            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
            }
          }

          .like-text {
            padding: 0;
            width: 142px;
            text-align: center;

            p,
            span {
              margin: 5px 0;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }

            span {
              display: block;
              width: 100%;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              color:#b0b0b0;
            }

            h3 {
              color: #ff6700;
              font-size: 14px;
              line-height: 30px;
              margin: 9px 0;
              font-weight: 500;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div class="tab">
      <div class="tab-tit clearfix">
        <a href="javascript:;" class="on">
          
          <p class="text">热卖排行</p>
        </a>
        
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="img-item">
            <p class="tab-pic">
              <a>
                <img src="./images/小米12SUltra.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a>Xiaomi 12S Ultra</a>
                <span>这真徕卡 | 专业徕卡影像</span>
              </div>
              <p class="info-price">¥100.00 起</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a>
                <img src="./images/小米12PRO天玑版.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a>Xiaomi 12 Pro 天玑版</a>
                <span
                  >全球首发天玑9000+｜叶脉冷泵散热系统｜2K AMOLED 超视感屏
                  ｜5000万疾速影像</span
                >
              </div>
              <p class="info-price">¥100.00 起</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a>
                <img src="./images/小米12S.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a>Xiaomi 12S </a>
                <span>小尺寸性能旗舰 | 徕卡影像</span>
              </div>
              <p class="info-price">¥100.00 起</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a>
                <img src="./images/小米civi1s.png" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a> Xiaomi Civi 1S </a>
                <span>原生美肌人像｜奇迹阳光动人新色｜骁龙778G Plus</span>
              </div>
              <p class="info-price">¥100.00 起</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Rank",
  components: {},
  props: {},
  setup(props, ctx) {
    return {};
  },
});
</script>

<style scoped lang="less">
.rank {
  width: 1200px;
  margin: 0 auto;

  .tab {
    margin: 0 auto;
    overflow: hidden;
    width: 312px;

    .tab-tit {
      text-align: center;

      a {
        display: block;
        padding: 0 18px;
        text-decoration: none;
        font-size: 20px;
        font-weight: 600;
        margin: 10px 0;

        p {
          margin: 5px 0;
        }

        .img {
          i {
            width: 35px;
            height: 35px;
            display: block;
            margin-left: 10px;
          }
        }

        .text {
          line-height: 28px;
        }
      }

      .on {
        color: #ff6700;

        .img {
          i {
            background-position: -35px 0;
          }
        }
      }
    }
  }

  .content {
    overflow: hidden;
    display: flex;
    justify-content: center;

    ul {
      flex-grow: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        overflow: hidden;
        list-style: none;
        line-height: 18px;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .img-item {
          width: 269px;
          float: left;
          overflow: hidden;
          margin: 10px 10px 10px;
          background: #fff;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          transition: all 0.2s linear;

          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
          }

          .tab-pic {
            width: 230px;
            height: 210px;
            overflow: hidden;
            text-align: center;
            margin: 5px auto 18px;

            a {
              img {
                width: 200px;
                height: 200px;
              }
            }
          }

          .tab-info {
            .info-title {
              margin: 0 auto;
              padding-left: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;

              a {
                color: #333;
                text-decoration: none;
              }
              span {
                width: 90%;
                color: #b0b0b0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
              }
            }

            .info-price {
              font-size: 14px;
              color: #ff6700;
              height: 35px;
              text-align: center;
              display: block;
              line-height: 24px;
              margin: 10px auto 0;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              payInfo.orderId
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">￥{{ payInfo.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="payIt">立即支付</a>
          <el-dialog v-model="dialogVisible" title="请使用微信支付" width="50%">
            <QrcodeVue :value="payInfo.codeUrl" :size="200"></QrcodeVue>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getPayInfo } from "@/api/index";
import { computed, defineComponent } from "@vue/runtime-core";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { payInfo } from "../../types/types";
import { ElDialog } from "element-plus";
import QrcodeVue from "qrcode.vue";
import { queryPayStatus } from "../../api";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Pay",
  components: { ElDialog, QrcodeVue },
  setup(props, ctx) {
    const Route = useRoute();
    const Router = useRouter();
    const orderId = computed(() => parseInt(Route.query.orderId as string));
    const payInfo = ref({} as payInfo);
    const getPayInfo_ = async () => {
      const res = await getPayInfo(orderId.value);
      if (res.data.code === 200) {
        payInfo.value = res.data.data;
      }
    };
    const dialogVisible = ref(true);
    let timer: any = undefined;
    watch(
      dialogVisible,
      (newVal) => {
        // 如果打开了支付码，则定时发送请求是否支付成功
        if (newVal) {
          clearInterval(timer);
          timer = setInterval(async () => {
            const res = await queryPayStatus(payInfo.value.orderId);
            console.log("res", res.data);
            // 支付成功
            if (res.data.code === 200) {
              clearInterval(timer);
              dialogVisible.value = false;
              ElMessage({
                message: "支付成功",
                type: "success",
                center: true,
              });
              Router.push({
                name: "paysuccess",
                params: {
                  paysuccess: "支付成功",
                },
              });
            }
          }, 1000);
        } else {
          clearInterval(timer);
        }
      },
      { immediate: true }
    );
    const payIt = () => {
      dialogVisible.value = true;
    };
    return {
      Router,
      orderId,
      payInfo,
      getPayInfo_,
      dialogVisible,
      payIt,
      timer,
    };
  },
  async created() {
    this.getPayInfo_();
    const res = await queryPayStatus(this.orderId);
    if (res.data.code === 200) {
      ElMessage({
        message: "该订单已支付",
        type: "warning",
        center: true,
      });
      this.Router.push({
        name: "home",
      });
    }
  },
  beforeRouteLeave() {
    // 清除定时器
    clearInterval(this.timer);
  },
});
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color:#ff6700;
    }

    .orange {
      color:#ff6700;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color:#ff6700;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #ff6700;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color:#ff6700;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color:#ff6700;
        border: 1px solid #ff6700;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
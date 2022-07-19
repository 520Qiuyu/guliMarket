<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="userAddress in userAddressList"
        :key="userAddress.id"
      >
        <span
          :class="`username ${
            consigneeInfo.id
              ? userAddress.id === consigneeInfo.id
                ? 'selected'
                : ''
              : userAddress.id === deafultConsignInfo.id
              ? 'selected'
              : ''
          }`"
          @click="changeConsigee(userAddress)"
          >{{ userAddress.consignee }}</span
        >
        <p>
          <span class="s1">{{ userAddress.fullAddress }}</span>
          <span class="s2">{{ userAddress.phoneNum }}</span>
          <span class="s3" v-if="userAddress.isDefault === '1'">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="orderDetail in orderDetailList"
          :key="orderDetail.skuId"
        >
          <li
            class="imgBox"
            :style="`background-image:url(${orderDetail.imgUrl})`"
          ></li>
          <li class="skuInfo">
            <p>
              {{ orderDetail.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li class="skuPrice">
            <h3>￥{{ orderDetail.orderPrice }}</h3>
          </li>
          <li class="skuNum">X{{ orderDetail.skuNum }}</li>
          <li class="skuStatus">有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="reamrk"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ tradeInfo.totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>{{ tradeInfo.totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:　<span>¥{{ tradeInfo.totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ consigneeInfo.fullAddress }}</span>
        收货人：<span>{{ consigneeInfo.consignee }}</span>
        <span>{{ consigneeInfo.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder_">提交订单</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/runtime-core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { orderDetail, userAddress, tradeInfo } from "../../types/types";
import { delStorage } from "../../utils/user";
import { submitOrder } from "@/api/index";
import { ElMessage } from "element-plus";
import { getUserInfo } from "../../api";

export default defineComponent({
  name: "Trade",
  setup() {
    const Store = useStore();
    const Router = useRouter();
    const userAddressList = computed<userAddress[]>(
      () => Store.getters["trade/userAddressList"]
    );
    const orderDetailList = computed<orderDetail[]>(
      () => Store.getters["trade/orderDetailList"]
    );
    // 交易信息
    const tradeInfo = computed<tradeInfo>(() => Store.state.trade.tradeInfo);
    // 获取默认收货地址
    const deafultConsignInfo = computed(() => {
      for (let i = 0; i < userAddressList.value.length; i++) {
        
        if (userAddressList.value[i].isDefault === "1")
          return userAddressList.value[i];
      }
      return {} as userAddress;
    });

    // 送货地址
    const consigneeInfo = ref(deafultConsignInfo.value);

    // 更改收货地址
    const changeConsigee = (userAddress: userAddress) => {
      consigneeInfo.value = userAddress;
    };
    // 备注
    const reamrk = ref("");

    const submitOrderHandle = async (consigneeInfo: {
      consignee: string;
      consigneeTel: string;
      deliveryAddress: string;
    }) => {
      const res = await submitOrder(tradeInfo.value.tradeNo, {
        consignee: consigneeInfo.consignee,
        consigneeTel: consigneeInfo.consigneeTel,
        deliveryAddress: consigneeInfo.deliveryAddress,
        paymentWay: "ONLINE",
        orderComment: reamrk.value,
        orderDetailList: orderDetailList.value,
      });
      // 提交订单成功
      if (res.data.code === 200) {
        Router.push({
          name: "pay",
          query: {
            orderId: res.data.data as number,
          },
        });
      }
      // 重复提交订单
      else if (res.data.code === 201) {
        ElMessage({
          message: res.data.message,
          center: true,
          type: "warning",
        });
      } else {
        ElMessage({
          message: res.data.message,
          center: true,
          type: "warning",
        });
        
      }
    };
    // 提交订单
    const submitOrder_ = async () => {
      // 判断收货信息

      if ("consignee" in consigneeInfo.value) {
        submitOrderHandle({
          consignee: consigneeInfo.value.consignee,
          consigneeTel: consigneeInfo.value.phoneNum,
          deliveryAddress: consigneeInfo.value.consignee,
        });
      }
      // 判断是否有默认地址
      else if (deafultConsignInfo.value.id) {
        submitOrderHandle({
          consignee: deafultConsignInfo.value.consignee,
          consigneeTel: deafultConsignInfo.value.phoneNum,
          deliveryAddress: deafultConsignInfo.value.consignee,
        });
      } else {
        ElMessage({
          message: "请填写收货地址",
          center: true,
          type: "warning",
        });
      }
    };
    return {
      Store,
      userAddressList,
      orderDetailList,
      tradeInfo,
      reamrk,
      Router,
      consigneeInfo,
      changeConsigee,
      submitOrder_,
      deafultConsignInfo,
    };
  },
  async created() {
    try {
      const res = await this.Store.dispatch("trade/getTrade");
      if (res === "未登录") {
        ElMessage({
          message: "未登录",
          center: true,
          type: "error",
        });
        await this.Store.dispatch("user/logout");
        this.Router.push({
          path: "/login",
        });
      }
    } catch (error) {
      ElMessage({
        message: (error as Error).message,
        center: true,
        type: "error",
      });
    }
  },
});
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #ff6700;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        border-bottom:1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        height: 70px;
        margin-bottom: 15px;
        padding: 10px 20px;
        li {
          height: 100%;

          h4 {
            color: #ff6700;
            font-weight: 400;
          }

          h3 {
            color: #ff6700;
          }
        }
        .imgBox {
          background-size: cover;
          background-position: center;
          width: 70px;
        }
        .skuInfo {
          width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .skuPrice,
        .skuNum,
        .skuStatus {
          width: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .skuPrice,
        .skuNum {
          justify-content: flex-start;
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 2;
        outline: none;
        resize: none;
        padding: 5px 10px;
        box-sizing: border-box;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #ff6700;
    }
  }
}
</style>
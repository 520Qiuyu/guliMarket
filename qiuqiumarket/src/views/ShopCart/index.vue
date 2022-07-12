<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body" v-if="shopCartInfo">
        <ul
          class="cart-list"
          v-for="info in shopCartInfo.cartInfoList"
          :key="info.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="info.isChecked"
              @change="changeChecked(info.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="info.imgUrl" />
            <div class="item-msg">
              {{ info.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ info.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeSkuNum(info, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="info.skuNum"
              minnum="1"
              class="itxt"
              @change.lazy="changeHandle(info, info.skuNum, $event)"
            />
            <a class="plus" @click="changeSkuNum(info, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{
              parseInt(info.skuPrice) * parseInt(info.skuNum)
            }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delThisGoods(info.skuId)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @change="changeAllChecked($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delCheckedGoods">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{checkedPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
import { throttle } from "lodash";
import { cartInfo, skuInfo } from "@/types/types";
import { changeSkuChecked } from "../../api";

export default defineComponent({
  name: "ShopCart",
  setup(props, ctx) {
    const Store = useStore();
    // 购物车商品信息
    const shopCartInfo = computed(() => Store.state.shopCart.shopCartInfo[0]);
    // 商品数量更改的回调
    const changeHandle = (
      cartInfo: cartInfo,
      oldSkuNum: number,
      event: Event
    ) => {
      const target = event.target as HTMLInputElement;
      changeSkuNum(cartInfo, parseInt(target.value) - oldSkuNum);
    };
    // 更改商品数量
    const changeSkuNum = throttle((cartInfo: cartInfo, Variation: number) => {
      if (cartInfo.skuNum + Variation > 0)
        Store.dispatch("shopCart/addToCart", {
          skuId: cartInfo.skuId,
          skuNum: Variation,
        });
    }, 1000);
    // 购物车商品的选中状态构成的数组
    const checkList = computed(() => {
      const list = [] as number[];
      if (shopCartInfo.value)
        shopCartInfo.value.cartInfoList.forEach((element: cartInfo) => {
          list.push(element.isChecked);
        });
      return list;
    });
    // 商品选中状态改变的回调，告诉仓库向服务器提交选中状态
    const changeChecked = async (skuId: number, event: Event) => {
      const target = event.target as HTMLInputElement;
      Store.dispatch("shopCart/changeChecked", {
        skuId,
        isChecked: target.checked ? "1" : "0",
      });
    };
    // 删除商品
    const delThisGoods = async (skuId: number) => {
      try {
        await Store.dispatch("shopCart/delCart", skuId);
        console.log("删除成功");
      } catch (error) {
        console.log("error", error);
      }
    };
    // 计算是否全选
    const isAllChecked = computed(() =>
      checkList.value.every((item) => item === 1)
    );
    // 全选状态改变时，向服务器发送请求，改变购物车所有商品的选中状态
    const changeAllChecked = (event: Event) => {
      const target = event.target as HTMLInputElement;
      Store.dispatch("shopCart/changeAllChecked", target.checked ? "1" : "0");
    };
    // 删除选中商品
    const delCheckedGoods = () => {
      Store.dispatch("shopCart/delCheckedGoods");
    };
    // 已选中的商品数量
    const checkedNum = computed(() => {
      let sum = 0;
      shopCartInfo.value?.cartInfoList.forEach((item: cartInfo) => {
        if (item.isChecked === 1) {
          sum += item.skuNum;
        }
      });
      return sum;
    });
    // 已选中商品的价格
    const checkedPrice = computed(() => {
      let sum = 0;
      shopCartInfo.value?.cartInfoList.forEach((item: cartInfo) => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.skuPrice;
        }
      });
      return sum;
    })
    return {
      shopCartInfo,
      changeHandle,
      changeSkuNum,
      checkList,
      changeChecked,
      delThisGoods,
      isAllChecked,
      changeAllChecked,
      delCheckedGoods,
      checkedNum,
      checkedPrice,
    };
  },
  created() {
    this.$store.dispatch("shopCart/getShopCartList");
  },
});
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
<template>
  <!--details-->
  <div class="details clearfix">
    <div class="sui-navbar">
      <div class="navbar-inner filter">
        <ul class="sui-nav" @click="changeOrder($event)">
          <li>
            <a
              :class="currentOrder === '1:asc' ? 'active' : ''"
              :order="`1:asc`"
              >综合⬆</a
            >
          </li>
          <li>
            <a
              :class="currentOrder === '1:desc' ? 'active' : ''"
              :order="`1:desc`"
              >综合⬇</a
            >
          </li>
          <li>
            <a
              :class="currentOrder === '2:asc' ? 'active' : ''"
              :order="`2:asc`"
              >价格⬆</a
            >
          </li>
          <li>
            <a
              :class="currentOrder === '2:desc' ? 'active' : ''"
              :order="`2:desc`"
              >价格⬇</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="goods-list">
      <ul class="yui3-g">
        <li
          class="yui3-u-1-5"
          v-for="goods in goodsList"
          @click="goDetail(goods.id)"
        >
          <div class="list-wrap">
            <div class="p-img">
              <a><img v-lazy="goods.defaultImg" /></a>
            </div>
            <div class="price">
              <strong>
                <em>¥</em>
                <i>{{ goods.price }}</i>
              </strong>
            </div>
            <div class="attr">
              <a
                href="item.html"
                title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                v-html="goods.title"
              ></a>
            </div>
            <div class="commit">
              <i class="command">已有<span>2000</span>人评价</i>
            </div>
            <div class="operate">
              <a target="_blank" class="sui-btn btn-bordered btn-danger"
                >加入购物车</a
              >
              <a class="sui-btn btn-bordered">收藏</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Pagination
      v-if="totalPages"
      :currentPage="(currentPage as number)"
      :totalPages="totalPages"
      :pageShowNum="5"
      @toPrevPage="toPrevPage"
      @toNextPage="toNextPage"
      @toThisPage="toThisPage"
    ></Pagination>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import { searchParams } from "@/types/types";
import { computed, defineComponent, PropType, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Details",
  components: { Pagination },
  emits: ["setSearchParams"],
  props: {
    searchParams: {
      type: Object as PropType<searchParams>,
      default: {},
    },
  },
  setup(props, ctx) {
    const Store = useStore();
    const Router = useRouter();
    // 商品列表
    const goodsList = computed(() => Store.getters["search/goodsList"]);
    // 总页数
    const totalPages = computed<number>(
      () => Store.getters["search/totalPages"]
    );
    // 商品总数
    const total = computed(() => Store.getters["search/total"]);
    // 当前排序方式
    const currentOrder = ref("1:desc");
    // 改变排序方式
    const changeOrder = (event: PointerEvent) => {
      const target = event.target as HTMLAnchorElement;
      ctx.emit("setSearchParams", { order: target.getAttribute("order") });
      currentOrder.value = target.getAttribute("order") as string;
    };
    // 当前所在页数
    const currentPage = computed(() => props.searchParams.pageNo as number);
    // 上一页
    const toPrevPage = () => {
      if (currentPage.value === 1 || totalPages.value === 0)
        return alert("买油上一页啦！");
      else
        ctx.emit("setSearchParams", {
          pageNo: (currentPage.value as number) - 1,
        });
    };
    // 下一页
    const toNextPage = () => {
      if ((currentPage.value as number) >= (totalPages.value as number))
        return alert("买油下一页啦！");
      else
        ctx.emit("setSearchParams", {
          pageNo: (currentPage.value as number) + 1,
        });
    };
    // 跳转到指定页
    const toThisPage = (index: number) => {
      ctx.emit("setSearchParams", {
        pageNo: index,
      });
    };
    // 跳转到详情页
    const goDetail = (skuId: number) => {
      Router.push({
        name: "detail",
        params: {
          skuId,
        },
      });
    };
    return {
      goodsList,
      totalPages,
      total,
      currentOrder,
      changeOrder,
      currentPage,
      toPrevPage,
      toNextPage,
      toThisPage,
      goDetail,
    };
  },
});
</script>

<style scoped lang="less">
.details {
  margin-bottom: 5px;
  .sui-navbar {
    overflow: visible;
    margin-bottom: 0;

    .filter {
      min-height: 40px;
      padding-right: 20px;
      background: #fbfbfb;
      border: 1px solid #e2e2e2;
      padding-left: 0;
      border-radius: 0;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
      .sui-nav {
        position: relative;
        left: 0;
        display: block;
        float: left;
        margin: 0 10px 0 0;
        li {
          float: left;
          line-height: 18px;
          a {
            display: block;
            cursor: pointer;
            padding: 11px 15px;
            color: #777;
            text-decoration: none;
          }
          .active {
            background: #e1251b;
            color: #fff;
          }
        }
      }
    }
  }
  .goods-list {
    margin: 20px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 100%;
        width: 20%;
        margin-top: 10px;
        line-height: 28px;
        .list-wrap {
          .p-img {
            padding-left: 15px;
            width: 215px;
            height: 255px;
            a {
              color: #666;
              img {
                max-width: 100%;
                height: auto;
                vertical-align: middle;
              }
            }
          }
          .price {
            padding-left: 15px;
            font-size: 18px;
            color: #c81623;
            strong {
              font-weight: 700;
            }
          }
          .attr {
            padding-left: 15px;
            width: 85%;
            overflow: hidden;
            margin-bottom: 8px;
            min-height: 38px;
            cursor: pointer;
            line-height: 1.8;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            a {
              color: #333;
              text-decoration: none;
            }
          }
          .commit {
            padding-left: 15px;
            height: 22px;
            font-size: 13px;
            color: #a7a7a7;
            span {
              font-weight: 700;
              color: #646fb0;
            }
          }
          .operate {
            padding: 12px 15px;
            .sui-btn {
              display: inline-block;
              padding: 2px 14px;
              box-sizing: border-box;
              margin-bottom: 0;
              font-size: 12px;
              line-height: 18px;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              border-radius: 0;
              background-color: transparent;
              margin-right: 15px;
            }
            .btn-bordered {
              min-width: 85px;
              background-color: transparent;
              border: 1px solid #8c8c8c;
              color: #8c8c8c;
              &:hover {
                border: 1px solid #666;
                color: #fff !important;
                background-color: #666;
                text-decoration: none;
              }
            }
            .btn-danger {
              border: 1px solid #e1251b;
              color: #e1251b;
              &:hover {
                border: 1px solid #e1251b;
                background-color: #e1251b;
                color: white !important;
                text-decoration: none;
              }
            }
          }
        }
      }
    }
  }
  .page {
    width: 733px;
    height: 66px;
    overflow: hidden;
    float: right;
    .sui-pagination {
      margin: 18px 0;
      ul {
        margin-left: 0;
        margin-bottom: 0;
        vertical-align: middle;
        width: 490px;
        float: left;
        li {
          line-height: 18px;
          display: inline-block;
          a {
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            border: 1px solid #e0e9ee;
            margin-left: -1px;
            font-size: 14px;
            padding: 9px 18px;
            color: #333;
          }
          &.active {
            a {
              background-color: #fff;
              color: #e1251b;
              border-color: #fff;
              cursor: default;
            }
          }
          &.prev {
            a {
              background-color: #fafafa;
            }
          }
          &.disabled {
            a {
              color: #999;
              cursor: default;
            }
          }
          &.dotted {
            span {
              margin-left: -1px;
              position: relative;
              float: left;
              line-height: 18px;
              text-decoration: none;
              background-color: #fff;
              font-size: 14px;
              border: 0;
              padding: 9px 18px;
              color: #333;
            }
          }
          &.next {
            a {
              background-color: #fafafa;
            }
          }
        }
      }
      div {
        color: #333;
        font-size: 14px;
        float: right;
        width: 241px;
      }
    }
  }
}
</style>
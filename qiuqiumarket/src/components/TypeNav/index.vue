<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="hideAllSort">
      <h2 class="all" @mouseenter="showAllSort">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort">
        <div class="sort" v-show="showSort">
          <div class="all-sort-list2" @click="goSearch($event)">
            <div
              :class="`item ${hoverIndex === index ? 'active' : ''}`"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="hoverIt(index)"
              @mouseleave="hoverIndex = -1"
            >
              <h3>
                <a
                  :category-name="c1.categoryName"
                  :category1-id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix" v-show="hoverIndex === index">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                  v-cloak
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :category-name="c2.categoryName"
                        :category2-id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :category-name="c3.categoryName"
                          :category3-id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { throttle } from "lodash";
import { useStore } from "vuex";
import { category1, category2, category3 } from "@/types/types";
import { useRoute, useRouter } from "vue-router";
import "animate.css";
export default defineComponent({
  name: "TypeNav",
  components: {},
  props: {},
  setup(props, ctx) {
    const Router = useRouter();
    const Route = useRoute();
    const Store = useStore();
    // 获取三级及联分类列表
    const categoryList = computed<category1[]>(
      () => Store.state.home.categoryList
    );
    // 当前鼠标正在那个一级分类上
    const hoverIndex = ref(-1);
    const hoverIt = throttle(function (index: number) {
      hoverIndex.value = index;
    }, 50);
    // 跳转至search
    const goSearch = (event: PointerEvent) => {
      const target = event.target as HTMLAnchorElement;
      if (target.getAttribute("category-name")) {
        const location = {
          name: "search",
          query: {
            categoryName: target.getAttribute("category-name"),
          },
          params: Route.params,
        };

        if (target.getAttribute("category1-id")) {
          Reflect.set(
            location.query,
            "category1Id",
            target.getAttribute("category1-id") as ThisType<number>
          );
        } else if (target.getAttribute("category2-id")) {
          Reflect.set(
            location.query,
            "category2Id",
            target.getAttribute("category2-id") as ThisType<number>
          );
        } else if (target.getAttribute("category3-id")) {
          Reflect.set(
            location.query,
            "category3Id",
            target.getAttribute("category3-id") as ThisType<string>
          );
        }

        Router.push(location);
      }
    };
    const showSort = ref(true);
    const showAllSort = () => {
      // 默认为不显示全部分类时才会触发该函数，否则在home界面（默认显示全部分类）会随着鼠标的移除而隐藏
      if (!Route.meta.showSort) showSort.value = true;
    };
    const hideAllSort = () => {
      if (!Route.meta.showSort) showSort.value = false;
    };
    return {
      Store,
      categoryList,
      hoverIndex,
      hoverIt,
      goSearch,
      showSort,
      showAllSort,
      hideAllSort,
    };
  },
  created() {},
  mounted() {
    this.showSort = this.$route.meta.showSort as boolean;
  },
});
</script>

<style scoped lang="less">
[v-cloak] {
  display: none;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            margin: 0;
            width: 210px;
            box-sizing: border-box;
            display: flex;
            a {
              color: #333;
              cursor: pointer;
              flex: 1;
              padding: 0 20px;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  a {
                    cursor: pointer;
                  }
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                    a {
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
        }
        .active {
          background-color: skyblue;
        }
      }
    }
    .sort-enter-from {
      height: 0;
    }
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: height 0.3s linear;
      overflow: hidden;
    }
  }
}
</style>
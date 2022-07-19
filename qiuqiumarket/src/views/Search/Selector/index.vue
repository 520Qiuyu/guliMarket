<template>
  <!--selector-->
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list" @click="selectTradeMark($event)">
          <li
            v-for="trademark in trademarkList"
            :key="trademark.tmId"
            :tmId="trademark.tmId"
          >
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      
    </div>
    <div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list" @click="selectProps($event)">
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
            <a :props="`${attr.attrId}:${attrValue}:${attr.attrName}`">{{
              attrValue
            }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { searchParams } from "@/types/types";
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  name: "Selector",
  components: {},
  emits: ["setSearchParams"],
  props: {
    searchParams: {
      type: Object as PropType<searchParams>,
      default: {},
    },
  },
  setup(props, ctx) {
    const Store = useStore();
    const trademarkList = computed(
      () => Store.state.search.searchResult.trademarkList
    );
    const selectTradeMark = (event: MouseEvent) => {
      const target = event.target as HTMLLIElement;
      const tmId = target.getAttribute("tmId");
      const tmName = target.innerText;
      ctx.emit("setSearchParams", { trademark: `${tmId}:${tmName}` });
    };
    const selectProps = (event: MouseEvent) => {
      const target = event.target as HTMLLIElement;
      // 获取原有的属性
      let searchParamsProps = props.searchParams.props;
      // 在原有属性上添加本次选中的属性
      searchParamsProps?.push(target.getAttribute("props") as string);
      searchParamsProps = [...new Set(searchParamsProps)];
      ctx.emit("setSearchParams", { props: searchParamsProps });
    };
    const attrsList = computed(() => Store.state.search.searchResult.attrsList);
    return {
      trademarkList,
      selectTradeMark,
      attrsList,
      selectProps,
    };
  },
});
</script>

<style scoped lang="less">
.selector {
  // box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border:1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;
    .key {
      padding-bottom: 87px !important;
    }
  }
  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;
    &:first-child{
      border-top:none;
    }
    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }
    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;
      .logo-list {
        display: flex;
        justify-content: flex-start;
        li {
          border: 1px solid #e4e4e4;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 600;
          color: #ff6700;
          font-style: italic;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;
          a {
            text-decoration: none;
            color: #666;
            cursor: pointer;
          }
          &:hover a {
            color: #ff6700;
          }
        }
      }
    }
    .ext {
      position: absolute;
      top: 10px;
      right: 10px;
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
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }
      a {
        color: #666;
      }
    }
  }
}
</style>
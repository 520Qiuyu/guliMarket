<template>
  <!--bread-->
  <div class="bread">
    <ul class="fl sui-breadcrumb">
      <li>
        <a>全部结果</a>
      </li>
    </ul>
    <ul class="fl sui-tag">
      <li class="with-x" v-show="keyword">
        {{ keyword }}
        <i @click="deleteKeyword">×</i>
      </li>
      <li class="with-x" v-show="categoryName">
        {{ categoryName }}<i @click="deleteCategory">×</i>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { searchParams } from "@/types/types";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "Bread",
  components: {},
  props: {
    searchParams: {
      type: Object as PropType<searchParams>,
      default: {},
    },
  },
  setup(props, ctx) {
    const Route = useRoute();
    const Router = useRouter();
    const Store = useStore();
    const keyword = computed(() => Route.params.keyword);
    const categoryName = computed(() => Route.query.categoryName);
    const deleteKeyword = () => {
      Route.params.keyword = "";
      Router.push({
        name: "search",
        query: Route.query,
      });
    };
    const deleteCategory = () => {
      for (const key in Route.query) {
        Reflect.deleteProperty(Route.query, key);
      }
      console.log('Route.query',Route)
      Router.push({
        name: "search",
        params: Route.params,
      });
    };
    return {
      Route,
      keyword,
      categoryName,
      deleteKeyword,
      deleteCategory,
    };
  },
});
</script>

<style scoped lang="less">
.bread {
  margin-bottom: 5px;
  overflow: hidden;
  .sui-breadcrumb {
    padding: 3px 15px;
    margin: 0;
    font-weight: 400;
    border-radius: 3px;
    float: left;
    li {
      display: inline-block;
      line-height: 18px;
      a {
        color: #666;
        text-decoration: none;
        &:hover {
          color: #4cb9fc;
        }
      }
    }
  }
  .sui-tag {
    margin-top: -5px;
    list-style: none;
    font-size: 0;
    line-height: 0;
    padding: 5px 0 0;
    float: left;
    .with-x {
      font-size: 12px;
      margin: 0 5px 5px 0;
      display: inline-block;
      overflow: hidden;
      color: #000;
      background: #f7f7f7;
      padding: 0 7px;
      height: 20px;
      line-height: 20px;
      border: 1px solid #dedede;
      white-space: nowrap;
      transition: color 400ms;
      cursor: pointer;
      i {
        margin-left: 10px;
        cursor: pointer;
        font: 400 14px tahoma;
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      &:hover {
        color: #28a3ef;
      }
    }
  }
}
</style>
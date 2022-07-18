<template>
  <div class="pagination" @click="toThisPageHandle($event)">
    <button @click="prevHandle">上一页</button>
    <span
      class="prev-has"
      disabled
      v-show="currentPage > (pageShowNum + 1) / 2 && totalPages > pageShowNum"
      >· · ·</span
    >
    <button
      v-for="page in totalPages"
      v-show="isShow(page)"
      :class="page === currentPage ? 'active' : ''"
      :toThisPage="page"
    >
      {{ page }}
    </button>
    <span
      class="next-has"
      disabled
      v-show="
        currentPage < totalPages - pageShowNum / 2 && totalPages > pageShowNum
      "
      >· · ·</span
    >
    <button @click="nextHandle">下一页</button>

    <button style="margin-left: 30px" disabled>共 {{ totalPages }} 条</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef, watch } from "vue";
export default defineComponent({
  name: "Pagination",
  components: {},
  props: {
    totalPages: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageShowNum: {
      type: Number,
      required: true,
    },
  },
  emits: ["toPrevPage", "toNextPage", "toThisPage"],
  setup(props, ctx) {
    // const totalPages = computed(() => props.totalPages);
    const totalPages = toRef(props, "totalPages");
    const currentPage = toRef(props, "currentPage");
    const pageShowNum = toRef(props, "pageShowNum");
    const showList = ref<boolean[]>([]);
    watch(currentPage, () => {
      const array = [] as boolean[];
      for (let i = 1; i <= totalPages.value; i++) {
        array.push(isShow(i));
      }
      showList.value = array;
    });
    // 是否显示页标签算法
    const isShow = (page: number) => {
      // 如果总共的页数小于要显示的页数，则全部显示
      if (totalPages.value < pageShowNum.value) return true;
      else {
        // . . . . . - - - -
        // 1 2 3 4 5 6 7 8 9
        // √ √ |
        if (currentPage.value < pageShowNum.value / 2) {
          if (page <= pageShowNum.value) return true;
          else return false;
        }
        // - - - - . . . . .
        // 1 2 3 4 5 6 7 8 9
        //             | √ √
        else if (currentPage.value > totalPages.value - pageShowNum.value / 2) {
          if (page > totalPages.value - pageShowNum.value) return true;
          else return false;
        }
        // - - . . . . . - -
        // 1 2 3 4 5 6 7 8 9
        //     √ √ | √ √
        else {
          if (
            page >=
              currentPage.value -
                pageShowNum.value / 2 -
                ((pageShowNum.value % 2) - 1) &&
            page <= currentPage.value + pageShowNum.value / 2
          )
            return true;
          return false;
        }
      }
    };
    // 上一页点击事件
    const prevHandle = () => {
      ctx.emit("toPrevPage");
    };
    // 下一页点击事件
    const nextHandle = () => {
      ctx.emit("toNextPage");
    };
    // 跳转到指定页面
    const toThisPageHandle = (event: PointerEvent) => {
      const target = event.target as HTMLButtonElement;
      const pageNo = Number(target.getAttribute("toThisPage"));
      if (pageNo) {
        ctx.emit("toThisPage", pageNo);
      }
    };
    return {
      showList,
      isShow,
      prevHandle,
      nextHandle,
      toThisPageHandle,
    };
  },
});
</script>

<style scoped lang="less">
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  button,
  span {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
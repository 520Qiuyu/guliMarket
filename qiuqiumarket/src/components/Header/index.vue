<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>邱哥杂货铺欢迎您！</p>
          <p v-show="!userInfo.nickName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-show="userInfo.nickName">
            欢迎
            <router-link to="">{{ userInfo.nickName }}</router-link>
            <i> | </i>
            <a @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a>我的尚品汇</a>
          <a>尚品汇会员</a>
          <a>企业采购</a>
          <a>关注尚品汇</a>
          <a>合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="尚品汇" href="/">
          <img src="./images/logo.png" alt="" />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm" @submit.native.prevent>
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
            @keydown.enter="goSearch"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { computed, defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "Header",
  components: {},
  props: {},
  setup(props, ctx) {
    const Store = useStore();
    const Route = useRoute();
    const Router = useRouter();
    // 搜索关键词
    const keyword = ref("");
    // 搜索事件，跳转至search
    const goSearch = () => {
      // 判断是否为空
      if (keyword.value) {
        Router.push({
          name: "search",
          params: {
            keyword: keyword.value,
          },
          query: Route.query,
        });
        keyword.value = "";
      } else {
        alert("请输入内容");
      }
    };
    const userInfo = computed(() => Store.state.user.userInfo);
    const logout = async () => {
      try {
        await Store.dispatch("user/logout");
        Router.push({
          name: "login",
        });
      } catch (error) {
        ElMessage({
          message:(error as Error).message,
          type:"error",
          center:true
        })
      }
    };
    return {
      keyword,
      goSearch,
      userInfo,
      logout,
    };
  },
});
</script>

<style scoped lang="less">
.header {
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .top {
    width: 100%;
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;

    .container {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      width: 1200px;

      .loginList {
        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    padding: 20px 0;
    height: 100px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .logoArea {

      .logo {
        img {
          width: 175px;
        }
      }
    }

    .searchArea {

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
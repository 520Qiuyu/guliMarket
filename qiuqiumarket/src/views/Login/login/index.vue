<template>
  <!-- 两个输入框 -->
  <div class="inputs">
    <el-form :model="loginInfo" :rules="rules" status-icon>
      <el-form-item prop="username">
        <el-input
          placeholder="邮箱/手机号码/邱邱ID"
          v-model="username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password"
        ><el-input
          placeholder="密码"
          type="password"
          show-password
          v-model="password"
          autocomplete="new-password"
        ></el-input
      ></el-form-item>
    </el-form>
  </div>
  <!-- 协议 -->
  <div class="autologin">
    <el-checkbox :label="'自动登录'" v-model="autoLogin"></el-checkbox>
  </div>
  <!-- 登录按钮 -->
  <div class="login-btn">
    <button @click="loginHandle">登录</button>
    <h2>没有账号？<router-link to="/register">去注册</router-link></h2>
  </div>
  <!-- 其他登录方式 -->
  <div class="other-login-ways">
    <h2 class="other-login-header">其他方式登录</h2>
    <ul class="other-login-ways-list">
      <li class="other-login-ways-list-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhifubao"></use>
        </svg>
      </li>
      <li class="other-login-ways-list-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </li>
      <li class="other-login-ways-list-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-QQ"></use>
        </svg>
      </li>
      <li class="other-login-ways-list-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-apple"></use>
        </svg>
      </li>
      <li class="other-login-ways-list-item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weixin"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ElMessage, FormRules } from "element-plus";
import { computed, defineComponent, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "LoginBody",
  components: {},
  props: {},
  setup(props, ctx) {
    const Store = useStore();
    const Router = useRouter();
    const Route = useRoute();
    const loginInfo = computed(() => ({
      username: username.value,
      password: password.value,
    }));
    const rules = reactive<FormRules>({
      username: [{ required: true, message: "请输入账号", trigger: "blur" }],
      password: [{ required: true, message: "请输入账号", trigger: "blur" }],
    });
    const username = ref("");
    const password = ref("");
    const autoLogin = ref(true);
    const loginHandle = async () => {
      if (username.value && password.value) {
        try {
          // 派发登录操作
          await Store.dispatch("user/login", {
            phone: username.value,
            password: password.value,
            autoLogin: autoLogin.value,
          });
          Router.push({
            name: (Route.query.redirect as string) || "home",
            query: Route.query.query && JSON.parse(Route.query.query as string),
            params:
              Route.query.params && JSON.parse(Route.query.params as string),
          });
          ElMessage({
            message: "登录成功",
            type: "success",
            center: true,
          });
        } catch (error) {
          ElMessage({
            message: (error as Error).message,
            type: "error",
            center: true,
          });
        }
      } else {
        ElMessage({
          message: "请填写完整信息",
          type: "error",
          center: true,
        });
      }
    };
    return {
      loginInfo,
      username,
      password,
      autoLogin,
      loginHandle,
      rules,
    };
  },
});
</script>

<style scoped lang="less">
.inputs {
  padding-top: 20px;

  & /deep/ .el-input {
    width: 100%;
    height: 60px;

    box-sizing: border-box;
    margin-bottom: 15px;
    background-color: #f9f9f9 !important;
    overflow: hidden;
    border-radius: 3px;

    .el-input__wrapper {
      padding-left: 10px;
      padding-right: 10px;
      .el-input__inner {
        width: 100%;
        height: 100%;

        font-size: 16px;
        background-color: transparent;

        &:-webkit-autofill,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
          -webkit-text-fill-color: #fff !important;
          background-color: transparent;
          background-image: none;
          transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
        }
      }
    }
  }
}

& /deep/ .autologin {
  margin-bottom: 20px;
  .el-checkbox__inner {
    &:hover {
      border-color: #ff6700;
    }
  }
  .is-checked .el-checkbox__inner {
    background-color: #ff6700;
    border: #ff6700;
  }
  .el-checkbox__label {
    color: #aaa;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }
}

.login-btn {
  button {
    width: 100%;
    height: 60px;
    color: #fff;
    background-color: #ff5c00;
    border-radius: 5px;
    border: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: #ff7e29;
    }
  }

  h2 {
    margin-top: 15px;
    color: #ff5c00;
    font-weight: 400;
    display: flex;
    justify-content: space-between;

    a {
      color: #ff5c00;
    }
  }
}

.other-login-ways {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .other-login-header {
    color: #aaa;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.5;
  }

  .other-login-ways-list {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 10px;

    .other-login-ways-list-item {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      overflow: hidden;

      svg,
      use {
        width: 100%;
        height: 100%;
        font-size: 100%;
      }
    }
  }
}
</style>
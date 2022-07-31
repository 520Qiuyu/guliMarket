<template>
  <div class="login-container">
    <!-- 新版登录 -->
    <div class="new-login-box">
      <!-- 左侧图片 -->
      <div class="left-img"></div>
      <!-- 右侧登录主体 -->
      <div class="right-login-content">
        <!-- 头部 -->
        <div class="header">
          <!-- 左侧logo -->
          <div class="left-logo">
            <img src="./images/logo.png" class="logo" />
            <h1 class="logo-title">邱邱账号</h1>
          </div>
          <!-- 右侧导航栏 -->
          <div class="right-nav">
            <ul class="nav-list">
              <li class="nav-list-item">用户协议</li>
              <li class="nav-list-item">隐私政策</li>
              <li class="nav-list-item">帮助中心</li>
            </ul>
            <div class="language-selector">
              中文(简体)<el-icon><CaretBottom /></el-icon>
            </div>
          </div>
        </div>
        <!-- main body -->
        <div class="main-body">
          <!-- 登录注册按钮导航 -->
          <div class="logo-btns">
            <router-link to="/login/login" active-class="active">登录</router-link>
            <router-link to="/login/register" active-class="active">注册</router-link>
          </div>
          <router-view></router-view>
        </div>
        <!-- 底部 -->
        <div class="footer">
          邱邱公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  name: "Login",
  setup(props, ctx) {
    
    
    return {
      
    };
  },
});
</script>

<style lang="less" scoped>
.login-container {
  

  .new-login-box {
    display: flex;
    height: calc(100vh);

    .left-img {
      width: 375px;
      background-image: url(https://cdn.web-global.fds.api.mi-img.com/mcfe--mi-account/static/static/media/banner.5b1efcd8.jpg);
      background-size: cover;
      background-position: center;
    }
    .right-login-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .header {
        width: 100%;
        height: 80px;
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .left-logo {
          height: 40px;
          display: flex;
          align-items: center;

          img {
            width: 40px;
            height: 40px;
            object-fit: cover;
            object-position: 37%;
            margin-right: 10px;
          }

          h1 {
            font-size: 26px;
            line-height: 40px;
          }
        }

        .right-nav {
          display: flex;
          color: #838383;
          line-height: 40px;

          .nav-list {
            display: flex;

            .nav-list-item {
              margin: 0 10px;
            }
          }

          .language-selector {
            display: flex;
            align-items: center;

            &::before {
              content: "";
              margin-right: 10px;
              display: block;
              width: 1px;
              height: 14px;
              background-color: #ddd;
            }
          }
        }
      }

      .main-body {
        width: 450px;
        padding: 40px 45px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);

        .logo-btns {
          color: rgba(0, 0, 0, 0.85);
          font-size: 22px;
          line-height: 40px;
          margin-bottom: 16px;

          a {
            margin-right: 20px;
            font-weight: 600;
            color: #bbb;
            padding-bottom: 2px;
          }

          & .active {
            color: #333;
            border-bottom: 3px solid #ff5c00;
          }
        }

       

        
      }

      .footer{
          color: #999;
          font-size: 12px;
        }
    }
  }
}
</style>
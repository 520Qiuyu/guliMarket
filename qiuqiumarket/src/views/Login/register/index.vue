<template>
  <el-form
    :model="registerInfo"
    :rules="rules"
    status-icon
    scroll-to-error
    ref="ruleFormRef"
  >
    <!-- 手机号码 -->
    <el-form-item prop="phone">
      <el-input
        v-model="registerInfo.phone"
        placeholder="请输入你的手机号码"
      ></el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item prop="code" class="code-wrapper">
      <el-input
        v-model="registerInfo.code"
        placeholder="请输入验证码"
        class="code"
      ></el-input>
      <el-button type="default" @click="getcode">获取验证码</el-button>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        v-model="registerInfo.password"
        placeholder="请输入密码"
        type="password"
        autocomplete="new-password"
      ></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item prop="confirmPwd">
      <el-input
        v-model="registerInfo.confirmPwd"
        placeholder="请确认密码"
        type="password"
      ></el-input>
    </el-form-item>
    <!-- 同意协议 -->
    <el-form-item prop="checked" class="protocol">
      <el-checkbox
        label="同意邱邱商城协议"
        v-model="registerInfo.checked"
      ></el-checkbox>
    </el-form-item>
  </el-form>
  <div class="register-btn">
    <button @click="register(ruleFormRef)">注册</button>
  </div>
</template>

<script lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCode } from "../../../api";
export default defineComponent({
  name: "RegisterBody",
  components: {},
  props: {},
  setup(props, ctx) {
    const Store = useStore();
    const Router = useRouter();
    const registerInfo = reactive({
      phone: "",
      code: "",
      password: "",
      confirmPwd: "",
      checked: true,
    });
    const stringValidate = (rule: any, value: any, callback: any) => {
      let field = "";
      switch (rule.field) {
        case "phone":
          field = "手机";
          break;
        case "password":
          field = "密码";
          break;
        case "confirmPwd":
          field = "确认密码";
          break;
        default:
          break;
      }
      if (!value.match(/\d{3,}/)) {
        callback(new Error(`${field}为3个或以上的数字组成`));
      } else {
        callback();
      }
    };
    const codeValidate = (rule: any, value: any, callback: any) => {
      if (!value.match(/\d{6}/)) {
        callback(new Error("验证码格式错误"));
      } else {
        callback();
      }
    };
    const confirmPwdValidate = (rule: any, value: any, callback: any) => {
      if (value !== registerInfo.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    const rules = reactive({
      phone: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { validator: stringValidate, trigger: "blur" },
      ],
      code: [
        { required: true, message: "请输入验证码", trigger: "blur" },
        { validator: codeValidate, trigger: "change" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator: stringValidate, trigger: "blur" },
      ],
      confirmPwd: [
        { required: true, message: "请再次输入密码", trigger: "blur" },
        { validator: stringValidate, trigger: "blur" },
        { validator: confirmPwdValidate, trigger: "blur" },
      ],
    });
    const ruleFormRef = ref<FormInstance>();
    // 注册的回调
    const register = async (formEl: FormInstance) => {
      if (!registerInfo.checked)
        return ElMessage({
          message: "请同意协议",
          type: "error",
          center: true,
        });
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          try {
            await Store.dispatch("user/register", {
              phone: registerInfo.phone,
              password: registerInfo.password,
              code: registerInfo.code,
            });
            // 跳转到登录
            Router.push({
              name: "login1",
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
          return false;
        }
      });
    };
    // 获取验证码的回调
    const getcode = async () => {
      try {
        if (registerInfo.phone) {
          const res = await getCode(registerInfo.phone);
          if (res.data.code == 200) {
            registerInfo.code = res.data.data;
          } else {
            return Promise.reject(new Error("错误"));
          }
        } else {
          ElMessage({
            message: "请输入手机号",
            type: "error",
            center: true,
          });
        }
      } catch (error) {
        ElMessage({
          message: (error as Error).message,
          type: "error",
          center: true,
        });
      }
    };
    return {
      registerInfo,
      rules,
      ruleFormRef,
      register,
      getcode,
    };
  },
});
</script>

<style scoped lang="less">
.el-form {
  padding: 20px 0 0;

  .el-form-item {
    margin-bottom: 20px;

    .el-input {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      background-color: #f9f9f9 !important;
      overflow: hidden;
      border-radius: 3px;
      
    }

    .code {
      width: calc(100% - 120px);
    }

    &.code-wrapper {
      & /deep/ .el-form-item__content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
          height: 60px;
          background-color: #ff5c00;
          color: #fff;
        }
      }
    }

    &.protocol {
      margin-bottom: 20px;
      height: 30px;
      & /deep/ .el-form-item__content {
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
    }
  }
}
.register-btn {
  width: 100%;

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
}
</style>
import { getCode, login, logout, register } from "@/api";
import { loginParams, registerParams } from "@/types/types";
import { delStorage, getUserInfo, setStorge } from "@/utils/user";

export default {
  namespaced: true,
  actions: {
    // 注册
    async register(context: any, params: registerParams) {
      const res = await register(params.phone, params.password, params.code);
      if (res.data.code === 200) {
        return "ok";
      } else if (res.data.code == 202) {
        return Promise.reject(new Error("参数不正确"));
      } else if (res.data.code == 223) {
        return Promise.reject(new Error("手机已被注册"));
      } else if (res.data.code == 206) {
        return Promise.reject(new Error("验证码错误"));
      } else {
        return Promise.reject(new Error("网络错误"));
      }
    },
    // 登录
    async login(context: any, params: loginParams) {
      const res = await login(params.phone, params.password);
      if (res.data.code === 200) {
        context.commit("LOGIN", res.data.data.token);
        context.commit("SETUSERINFO", res.data.data);
        setStorge(params.autoLogin, res.data.data.token, res.data.data);
        return "ok";
      }
      return Promise.reject(new Error(res.data.message));
    },
    // 注销
    async logout(context:any){
        const res  =await logout();
        if(res.data.code === 200){
            // 删除本地数据
            delStorage();
            // 删除vuex数据
            context.commit("LOGIN",'')
            context.commit("SETUSERINFO",{})
            return "ok"
        }
        return Promise.reject(new Error("注销失败"))
    }
  },
  mutations: {
    LOGIN(state: any, value: string) {
      state.token = value;
    },
    SETUSERINFO(state: any, value: {}) {
      state.userInfo = value;
    },
  },
  getters: {},
  state: {
    token: localStorage.getItem("token") || sessionStorage.getItem("token") || '',
    userInfo: getUserInfo() || {},
  },
};

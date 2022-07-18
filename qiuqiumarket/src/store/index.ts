import { createStore } from "vuex";
import home from "./home";
import search from "./search";
import goods from "./goods";
import shopCart from "./shopCart";
import user from "./user";
import trade from "./trade";
import center from "./center";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    search,
    goods,
    shopCart,
    user,
    trade,
    center,
  },
});

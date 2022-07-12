import { createStore } from "vuex";
import home from "./home";
import search from "./search";
import goods from "./goods";
import shopCart from "./shopCart";

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
  },
});

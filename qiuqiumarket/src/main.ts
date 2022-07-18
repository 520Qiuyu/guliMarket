import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import  "@/mock/mock";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyload from "vue-lazyload";

const loadimage = require('./assets/images/loading.gif') ;
// import errorimage from './assets/error.gif';

createApp(App).use(store).use(router).use(ElementPlus).use(VueLazyload,{
  loading: loadimage,
  attempt: 2
}).mount("#app");

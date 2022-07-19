import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import  "@/mock/mock";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueLazyload from "vue-lazyload";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const loadimage = require('./assets/images/loading.gif') ;
const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.use(VueLazyload,{
  loading: loadimage,
  attempt: 2
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount("#app")



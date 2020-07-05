import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/utils/rem.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/css/index.less";
import ClipboardJS from "clipboard";
import { timestampToTime } from "@/filter";
import { Copy, MyHeader,FirstInfoContainer,ShowContainer } from "@/components";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Copy);
Vue.use(MyHeader);
Vue.use(FirstInfoContainer);
Vue.use(ShowContainer);
Vue.prototype.ClipboardJS = ClipboardJS;
Vue.filter("timestampToTime", timestampToTime);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

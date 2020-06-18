import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import ClipboardJS from "clipboard";
import { timestampToTime } from "@/filter";
import { Copy, MyHeader } from "@/components";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Copy);
Vue.use(MyHeader);
Vue.prototype.ClipboardJS = ClipboardJS;
Vue.filter("timestampToTime", timestampToTime);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

import MyCopy from "./Copy.vue";
import Header from "./Header.vue";

// 这里是重点
export const Copy = {
  install: function(Vue) {
    Vue.component("Copy", MyCopy);
  }
};

export const MyHeader = {
  install: function(Vue) {
    Vue.component("MyHeader", Header);
  }
};
// 导出组件
// export  Copy;

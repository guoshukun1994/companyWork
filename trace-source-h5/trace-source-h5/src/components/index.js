import MyCopy from "./Copy.vue";
import Header from "./Header.vue";
import InfoContainer from "./InfoContainer.vue";
import myShowContainer from "./ShowContainer.vue";

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

export const FirstInfoContainer = {
  install: function(Vue) {
    Vue.component("FirstInfoContainer", InfoContainer);
  }
};

export const ShowContainer = {
  install: function(Vue) {
    Vue.component("ShowContainer", myShowContainer);
  }
};
// 导出组件
// export  Copy;

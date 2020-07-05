import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/checkCode",
    name: "CheckCode",
    component: () =>
      import(/* webpackChunkName: */ "../views/CheckCode.vue"),
  },
  {
    path: "/checkCode:code",
    redirect: "/home"
  },
  {
    path: "/baseChainInfo",
    name: "BaseChainInfo",
    component: () =>
      import(/* webpackChunkName: */ "../views/BaseChainInfo.vue"),
  },
  {
    path: "/baseChainDetail",
    name: "BaseChainDetail",
    component: () =>
      import(/* webpackChunkName: */ "../views/BaseChainDetail.vue"),
  },
  {
    path: "/applicationTra",
    name: "ApplicationTra",
    component: () =>
      import(/* webpackChunkName: */ "../views/ApplicationTra.vue"),
  },
  {
    path: "/applicationDetail",
    name: "ApplicationDetail",
    component: () =>
      import(/* webpackChunkName: */ "../views/ApplicationDetail.vue"),
  },
  {
    path: "/proInfoPage",
    name: "ProInfoPage",
    component: () =>
      import(/* webpackChunkName: */ "../views/ProInfoPage.vue"),
  },
  {
    path: "/compInfoPage",
    name: "CompInfoPage",
    component: () =>
      import(/* webpackChunkName: */ "../views/CompInfoPage.vue"),
  },
  {
    path: "/none",
    name: "None",
    component: () =>
      import(/* webpackChunkName: */ "../views/None.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

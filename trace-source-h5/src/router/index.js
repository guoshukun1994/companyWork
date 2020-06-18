import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
    // name: 'Home',
    // component: Home
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
      import(/* webpackChunkName: "about" */ "../views/CheckCode.vue"),
  },
  {
    path: "/checkCode:code",
    name: "CheckCode",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CheckCode.vue"),
  },
  {
    path: "/consumeCode",
    name: "ConsumeCode",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ConsumeCode.vue"),
  },
  {
    path: "/goodDetail",
    name: "GoodDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GoodDetail.vue"),
  },
  {
    path: "/companyDetail",
    name: "CompanyDetail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CompanyDetail.vue"),
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Transaction.vue"),
  },
  {
    path: "/subTransaction",
    name: "SubTransaction",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SubTransaction.vue"),
  },
  {
    path: "/block",
    name: "Block",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Block.vue"),
  },
  {
    path: "/subBlock",
    name: "SubBlock",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SubBlock.vue"),
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/none",
    name: "None",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/None.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import ElBigdataTable from "vue-elementui-bigdata-table.js";
import SlideVerify from 'vue-monoplasty-slide-verify';

import '@/styles/index.scss'; // global css

import VCharts from 'v-charts';

import App from './App';
import store from './store';
import router from './router';
import './utils/directives';
import '@/icons'; // icon
import '@/permission'; // permission control

import plTbale from 'pl-table';
import 'pl-table/themes/index.css';
// import 'pl-table/themes/plTableStyle.css';
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock';
if (process.env.NODE_ENV === 'production') {
    mockXHR();
}

// set ElementUI lang to EN
Vue.use(ElementUI);
Vue.use(SlideVerify);
Vue.use(VCharts);
Vue.use(plTbale);
// Vue.use(ElBigdataTable);
// Vue.config.lang = 'zh-cn'

Vue.config.productionTip = false;

// eslint-disable-next-line no-new
new Vue({
    el: '#app',
    router,
    store,
    render: (h) => h(App)
});

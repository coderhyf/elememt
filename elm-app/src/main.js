import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'normalize.css/normalize.css';
import 'lib-flexible/flexible';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import {Indicator, Swipe, SwipeItem, } from 'mint-ui';

Vue.use (MintUI)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
// 请求拦截
axios.interceptors.request.use (config => {
  Indicator.open ();
  return config;
}, error => {
  Indicator.open ();
  return Promise.reject (error)
})
// 响应拦截
axios.interceptors.response.use (response => {
  Indicator.close ();
  return response;
}, error => {
  Indicator.close ();
  return Promise.reject (error)
})
new Vue ({
  router,
  store,
  render: h => h (App)
}).$mount ('#app')

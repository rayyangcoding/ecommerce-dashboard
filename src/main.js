import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store";
import axios from "axios";

import SocketService from "./utils/socket_service";
SocketService.Instance.connect();
// 引入全局的样式文件
import "./assets/css/global.less";
// 引入字体文件
import "./assets/font/iconfont.css";

// 请求基准路径的配置
axios.defaults.baseURL = "http://127.0.0.1:8888/api";
// 将axios挂载到Vue的原型对象上
// 在别的组件中 axios即为this.$http
Vue.prototype.$http = axios;

// 将全局的echarts对象挂载到Vue的原型对象上
// 在别的组件中使用这个全局echarts对象；this.$echarts
Vue.prototype.$echarts = window.echarts;

// 在别的组件中使用；this.$socket
Vue.prototype.$socket = SocketService.Instance;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

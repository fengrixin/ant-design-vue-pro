import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/ant-design-vue";

/**
 * 全局注册权限组件
 */
import Authorized from "./components/Authorized";
Vue.component("Authorized", Authorized);

/**
 * 全局注册权限指令
 * @type {boolean}
 */
import Auth from "./directives/auth";
Vue.use(Auth);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

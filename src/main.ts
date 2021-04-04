import "@/assets/scss/index.scss";
import Vue from "vue";
import App from "@/modules/base/views/App.vue";

import { router } from "@/core/router";
import { store } from "@/core/store";
import { vuetify } from "@/core/plugins/vuetify";

import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");

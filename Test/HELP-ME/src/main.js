import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import * as VueGoogleMaps from "vue2-google-maps";
Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCA9geSJL9s7xIXxYFNWBOWphry6LcYaTI",
    //    AIzaSyBTU24Pq2DNbDuRopXqv4SG2TU-IlyfuLs
    libraries: "places"
  }
});


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

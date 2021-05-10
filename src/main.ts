import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import axios from "axios";
axios.defaults.baseURL = "/api";
axios.interceptors.request.use((config) => {
  store.commit("setLoading", true);
  store.commit("setError", { status: false, message: "" });
  return config;
});
axios.interceptors.response.use(
  (config) => {
    store.commit("setLoading", false);
    return config;
  },
  (e) => {
    // const { error } = e.response.data;
    // store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(e);
  }
);
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

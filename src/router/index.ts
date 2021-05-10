import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store/index";
import axios from "axios";
const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/columnDetail/:id",
    component: () => import("@/views/ColumnDetail.vue"),
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: {
      redireactAlreadyLogin: true,
    },
  },
  {
    path: "/create",
    component: () => import("@/views/CreatePost.vue"),
    meta: { requireLogin: true },
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/post/:id",
    component: () => import("@/views/PostDetail.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requireLogin, redireactAlreadyLogin } = to.meta;
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      store
        .dispatch("fetchCurrentUser")
        .then((res) => {
          if (redireactAlreadyLogin) {
            next("/");
          } else {
            next();
          }
        })
        .catch((e) => {
          store.commit("logut");
          next("/login");
        });
    } else {
      if (requireLogin) {
        next("/login");
      } else {
        next();
      }
    }
  } else {
    if (redireactAlreadyLogin) {
      next("/");
    } else {
      next();
    }
  }
});
export default router;

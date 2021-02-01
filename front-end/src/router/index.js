import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import VueCookies from "vue-cookies";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { unauthorized: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(function(to, from, next) {
  if (
    to.matched.some(record => record.meta.unauthorized) ||
    VueCookies.get("token")
  ) {
    return next();
  }

  alert("로그인 해주세요");
  return next("/login");
});

export default router;

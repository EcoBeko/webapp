import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/modules/welcome/views/WelcomeView.vue"),
  },
  {
    path: "/sign-in",
    name: "sign-in",
  },
  {
    path: "/sign-up",
    name: "sign-up",
  },
  {
    path: "/",
    name: "index",
    children: [
      {
        path: "news",
        name: "news",
      },
      {
        path: "map",
        name: "map",
      },
      {
        path: "messages",
        name: "messages",
      },
      {
        path: "friends",
        name: "friends",
      },
      {
        path: "profile",
        name: "profile",
      },
      {
        path: "communities",
        name: "communities",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/app",
  routes,
});

export { router };

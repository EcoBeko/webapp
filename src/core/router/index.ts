import { BaseModule } from "@/modules";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/welcome",
    name: "welcome",
    component: () => import("@/modules/welcome/views/WelcomeView.vue"),
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: () => import("@/modules/auth/views/SignInView.vue"),
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: () => import("@/modules/auth/views/SignUpView.vue"),
    meta: {
      isPublic: true,
    },
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

router.beforeEach((to, from, next) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  const transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  BaseModule.setTransitionName(transitionName);

  next();
});

export { router };

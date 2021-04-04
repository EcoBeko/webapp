import { BaseModule } from "@/modules";
import { AuthService } from "@/modules/auth/services/auth.service";
import Vue from "vue";
import VueRouter, {
  NavigationFailure,
  RawLocation,
  Route,
  RouteConfig,
} from "vue-router";

import AppMain from "@/modules/base/views/AppMain.vue";

const originalPush = VueRouter.prototype.push as (
  location: RawLocation,
) => Promise<Route>;
VueRouter.prototype.push = async function(
  this: VueRouter,
  location: RawLocation,
) {
  return originalPush.call(this, location).catch((err: NavigationFailure) => {
    if (err.name == "NavigationDuplicated") return err;
    if (err.name == "Error") return err;
    throw err;
  });
} as (location: RawLocation) => Promise<Route>;

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
    component: AppMain,
    redirect: {
      name: "news",
    },
    children: [
      {
        path: "news",
        name: "news",
        component: () => import("@/modules/news/views/NewsView.vue"),
        meta: {
          index: 1,
        },
      },
      {
        path: "map",
        name: "map",
        meta: {
          index: 2,
        },
      },
      {
        path: "messages",
        name: "messages",
        meta: {
          index: 3,
        },
      },
      {
        path: "friends",
        name: "friends",
        meta: {
          index: 4,
        },
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("@/modules/profile/views/ProfileView.vue"),
        meta: {
          index: 5,
        },
      },
      {
        path: "communities",
        name: "communities",
        meta: {
          index: 6,
        },
      },
      {
        path: "eco-projects",
        name: "eco-projects",
        meta: {
          index: 7,
        },
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
  if (to.meta.index) {
    const transitionName =
      to.meta.index < from.meta.index ? "slide-right" : "slide-left";
    BaseModule.setTransitionName(transitionName);
  } else {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    const transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    BaseModule.setTransitionName(transitionName);
  }

  const token = AuthService.getLocalToken();

  if (to.meta.isPublic && token) {
    return next({
      name: "news",
    });
  } else if (!to.meta.isPublic && !token) {
    return next({
      name: "welcome",
    });
  }

  next();
});

export { router };

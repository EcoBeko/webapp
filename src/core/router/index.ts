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
    path: "/logout",
    name: "logout",
    meta: {},
  },
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
    path: "/admin",
    name: "admin",
    component: () => import("@/modules/admin/views/AdminView.vue"),
    redirect: {
      name: "admin-users",
    },
    children: [
      {
        path: "auth",
        name: "admin-auth",
        component: () => import("@/modules/admin/views/AdminAuthView.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("@/modules/admin/views/AdminUsersView.vue"),
        meta: {
          isAdmin: true,
        },
      },
    ],
  },
  {
    path: "/moderation",
    name: "moderation",
    component: () => import("@/modules/moderation/views/ModerationView.vue"),
    redirect: {
      name: "moderation-projects",
    },
    children: [
      {
        path: "auth",
        name: "moderation-auth",
        component: () =>
          import("@/modules/moderation/views/ModerationAuthView.vue"),
        meta: {
          isPublic: true,
        },
      },
      {
        path: "projects",
        name: "moderation-projects",
        component: () =>
          import("@/modules/moderation/views/ModerationProjectsView.vue"),
        meta: {
          isModerator: true,
        },
      },
    ],
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
        path: "users/:id",
        name: "users-id",
        component: () => import("@/modules/friends/views/UserView.vue"),
        meta: {
          index: 0,
        },
      },
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
        component: () => import("@/modules/map/views/MapView.vue"),
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
        component: () => import("@/modules/friends/views/FriendsView.vue"),
        meta: {
          index: 4,
        },
        redirect: {
          name: "my-friends",
        },
        children: [
          {
            path: "my",
            name: "my-friends",
            component: () =>
              import("@/modules/friends/views/MyFriendsView.vue"),
            meta: {
              index: 1,
            },
          },
          {
            path: "search",
            name: "search-friends",
            component: () =>
              import("@/modules/friends/views/SearchFriendsView.vue"),
            meta: {
              index: 2,
            },
          },
        ],
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
        component: () =>
          import("@/modules/communities/views/CommunitiesView.vue"),
        meta: {
          index: 6,
        },
      },
      {
        path: "communities/:id",
        name: "communities-id",
        component: () =>
          import("@/modules/communities/views/CommunityView.vue"),
        meta: {
          index: 0,
        },
      },
      {
        path: "eco-projects",
        name: "eco-projects",
        component: () =>
          import("@/modules/eco-projects/views/EcoProjectsView.vue"),
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

  if (to.name == "logout") {
    localStorage.removeItem("token");
  }

  const token = AuthService.getLocalToken();

  if (to.meta.isPublic && token) {
    const name = to.meta.isAdmin
      ? "admin-auth"
      : to.meta.isModerator
      ? "moderation-auth"
      : "news";

    return next({
      name,
    });
  } else if (!to.meta.isPublic && !token) {
    const name = to.meta.isAdmin
      ? "admin-auth"
      : to.meta.isModerator
      ? "moderation-auth"
      : "welcome";

    return next({
      name,
    });
  }

  next();
});

export { router };

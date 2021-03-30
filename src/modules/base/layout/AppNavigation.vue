<template>
  <nav id="app-navigation" class="d-flex justify-center">
    <div class="container full-width d-flex align-center">
      <router-link
        v-for="item in items"
        :key="item.name"
        :to="item.path"
        class="nav-item mr-8"
        active-class="nav-item_active"
      >
        {{ item.name }}
      </router-link>
      <span class="nav-item" @click="logout">Logout</span>
    </div>
  </nav>
</template>

<script lang="ts">
import { AuthService } from "@/modules/auth/services/auth.service";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AppNavigation extends Vue {
  logout() {
    AuthService.logout();
  }
  get items() {
    return [
      {
        name: "News",
        path: "/news",
      },
      {
        name: "Map",
        path: "/map",
      },
      {
        name: "Messages",
        path: "/messages",
      },
      {
        name: "Friends",
        path: "/friends",
      },
      {
        name: "Profile",
        path: "/profile",
      },
      {
        name: "Communities",
        path: "/communities",
      },
      {
        name: "Eco Projects",
        path: "/eco-projects",
      },
    ];
  }
}
</script>

<style lang="scss" scoped>
#app-navigation {
  height: 56px;
  background-color: white;
}
.nav-item {
  display: block;
  color: rgba($color: #000000, $alpha: 0.38);
  text-decoration: none;
  font-size: 1.125rem;

  cursor: pointer;
  position: relative;
  z-index: 0;
  transition: 0.3s all ease;

  &_active {
    color: rgba($color: #000000, $alpha: 0.87);

    &::before {
      content: "";
      display: block;
      position: absolute;
      bottom: -14px;
      left: -6px;

      width: calc(100% + 12px);
      height: 2px;
      border-radius: 5px;
      background-color: $primary;
      z-index: 10;
    }
  }
}
</style>

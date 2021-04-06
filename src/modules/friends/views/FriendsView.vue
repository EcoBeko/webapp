<template>
  <div id="friends-view">
    <v-card class="tabs white px-8 d-flex" tag="nav">
      <router-link
        class="nav-link d-flex align-center mr-8"
        active-class="nav-link_active"
        to="/friends/my"
      >
        My Friends
      </router-link>
      <router-link
        class="nav-link d-flex align-center"
        active-class="nav-link_active"
        to="/friends/search"
      >
        Search for Friends
      </router-link>
    </v-card>
    <transition mode="out-in" :name="transitionName">
      <router-view class="friends-tab mt-8"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { BaseModule } from "@/modules/base";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class FriendsView extends Vue {
  get transitionName() {
    return BaseModule.transitionName;
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  border-radius: 5px;
}
.nav-link {
  height: 64px;
  text-decoration: none;
  color: rgba($color: #000000, $alpha: 0.38);

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
      bottom: 0px;
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

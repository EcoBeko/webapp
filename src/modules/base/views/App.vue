<template>
  <v-app id="app">
    <v-main>
      <transition
        :name="transitionName"
        mode="out-in"
        @beforeLeave="beforeLeave"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <router-view></router-view>
      </transition>
    </v-main>

    <loading-bar />
    <app-notification />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseModule } from "@/modules";
import { AuthService } from "@/modules/auth/services/auth.service";

import LoadingBar from "../components/LoadingBar.vue";
import AppNotification from "../components/AppNotification.vue";

@Component({
  components: {
    LoadingBar,
    AppNotification,
  },
})
export default class App extends Vue {
  prevHeight = "0";
  get transitionName() {
    return BaseModule.transitionName;
  }

  beforeLeave(el: HTMLDivElement) {
    this.prevHeight = getComputedStyle(el).height;
  }

  enter(el: HTMLDivElement) {
    const { height } = getComputedStyle(el);

    el.style.height = this.prevHeight;

    setTimeout(() => {
      el.style.height = height;
    });
  }

  afterEnter(el: HTMLDivElement) {
    el.style.height = "";
  }

  async created() {
    await AuthService.login();
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>

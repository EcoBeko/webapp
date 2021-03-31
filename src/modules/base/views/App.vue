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
        <router-view v-if="!isLoading"></router-view>
      </transition>
    </v-main>

    <LoadingBar />
    <AppNotification />
    <UploadImageDialog ref="imageDialog" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseModule } from "@/modules";
import { AuthService } from "@/modules/auth/services/auth.service";

import LoadingBar from "../components/LoadingBar.vue";
import AppNotification from "../components/AppNotification.vue";
import UploadImageDialog from "@/core/components/UploadImageDialog.vue";

@Component({
  components: {
    LoadingBar,
    AppNotification,
    UploadImageDialog,
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

  isLoading = false;
  async created() {
    this.isLoading = true;
    await AuthService.login();
    this.isLoading = false;
  }

  mounted() {
    window.imageDialog = this.$refs.imageDialog;
  }
}
declare global {
  interface Window {
    imageDialog: any;
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
}
</style>

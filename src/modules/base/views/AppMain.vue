<template>
  <div id="app-main" class="full-height">
    <AppHeader />
    <AppNavigation />
    <main class="d-flex justify-center py-6">
      <transition :name="transitionName" mode="out-in">
        <router-view class="container full-width"></router-view>
      </transition>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseModule } from "..";
import AppHeader from "../layout/AppHeader.vue";
import AppNavigation from "../layout/AppNavigation.vue";

@Component({
  components: {
    AppHeader,
    AppNavigation,
  },
})
export default class AppMain extends Vue {
  get transitionName() {
    return BaseModule.transitionName;
  }
}
</script>

<style lang="scss" scoped>
#app-main {
  background-image: url("../../../assets/app/background.svg");
  background-size: cover;
}
</style>

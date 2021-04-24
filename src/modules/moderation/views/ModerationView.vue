<template>
  <div id="moderation-view" class="pa-4 d-flex flex-column">
    <header class="header d-flex align-center mb-8">
      <img class="logo-image mr-4" src="@/assets/logo.svg" alt="logo" />
      <h1 class="logo-text text-h4">EcoBeko - Moderation Module</h1>
    </header>
    <nav class="d-flex">
      <router-link to="/moderation/projects" class="mr-4">
        Eco-Projects
      </router-link>
      <router-link to="/logout">Logout</router-link>
    </nav>
    <main class="flex-grow-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ModerationView extends Vue {}
</script>

<style lang="scss" scoped>
#moderation-view {
  height: 100vh;
}

.header {
  height: 64px;
}

.logo-image {
  height: 100%;
}
.logo-text {
  pointer-events: none;
}
</style>

<template>
  <div id="admin-view" class="pa-4 d-flex flex-column">
    <header class="header d-flex align-center mb-8">
      <img class="logo-image mr-4" src="@/assets/logo.svg" alt="logo" />
      <h1 class="logo-text text-h4">EcoBeko - Admin Module</h1>
    </header>
    <nav class="d-flex">
      <router-link to="/admin/users">Users</router-link>
    </nav>
    <main class="flex-grow-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AdminView extends Vue {}
</script>

<style lang="scss" scoped>
#admin-view {
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

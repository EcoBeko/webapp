<template>
  <v-snackbar
    id="app-notification"
    class="mb-4"
    v-model="snackBarPayload.show"
    :color="snackBarPayload.color"
    :timeout="snackBarPayload.timeout"
    top
    right
    vertical
  >
    <p class="message">{{ snackBarPayload.message }}</p>
    <v-btn text @click="snackBarPayload.show = false">Close</v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseModule } from "../index";

@Component({})
export default class AppNotification extends Vue {
  get snackBarPayload() {
    return BaseModule.snackBarPayload;
  }
}
</script>

<style lang="scss" scoped>
#app-notification {
  max-width: 420px;

  .message {
    font-size: 1rem;
  }
}
</style>

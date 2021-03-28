<template>
  <v-dialog v-model="isLoading" persistent width="400">
    <v-card height="80px">
      <v-progress-linear
        class="mx-0 mt-0"
        height="15"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <p class="text-h6 mx-4 mt-4">
        Please, wait...
      </p>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BaseModule } from "@/modules";

@Component({})
export default class LoadingBar extends Vue {
  get isLoading() {
    return BaseModule.isLoading;
  }
}
</script>

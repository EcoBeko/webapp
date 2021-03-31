<template>
  <v-card id="stats-window" class="stats">
    <v-card-title>Recycling statistics</v-card-title>
    <v-card-text class="px-0">
      <v-tabs fixed-tabs v-model="tab">
        <v-tab>My statistics</v-tab>
        <v-tab>Global statistics</v-tab>
      </v-tabs>
      <div class="types pa-4 pb-0">
        <div v-for="type in stats" :key="type.id" class="mb-4 d-flex">
          <div class="label mr-5 d-flex align-center">
            <static-image
              class="mr-3 image"
              :src="type.icon"
              :alt="type.title"
            ></static-image>
            <span>{{ type.title }}</span>
          </div>
          <div class="value d-flex align-center">
            <span class="mr-1 text-h6">{{ type.sum }}</span>
            <span>{{ type.postfix }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="px-4 pb-4">
      <v-btn color="primary">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { NewsModule } from "..";
import StaticImage from "@/core/components/StaticImage.vue";
import { AuthModule } from "@/modules/auth";
import { BaseModule } from "@/modules/base";

@Component({
  components: {
    StaticImage,
  },
})
export default class StatsWindow extends Vue {
  tab = 0;

  @Watch("tab")
  async updateStats() {
    BaseModule.setLoadingStatus(true);
    if (this.tab) {
      await NewsModule.getGlobalStats();
    } else {
      await NewsModule.getUserStats(AuthModule._user.id);
    }

    BaseModule.setLoadingStatus(false);
  }

  get stats() {
    if (NewsModule.stats.length) return NewsModule.stats;
    return NewsModule.statsTypes.map(type => ({
      ...type,
      sum: 0,
    }));
  }

  async created() {
    await NewsModule.getStatsTypes();
    await NewsModule.getUserStats(AuthModule._user.id);
  }
}
</script>

<style lang="scss">
#stats-window {
  .v-slide-group__next {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
.types {
  .image {
    max-width: 30px;
  }
  .label {
    width: 180px;
  }
}
</style>

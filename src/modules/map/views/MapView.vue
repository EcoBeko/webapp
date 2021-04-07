<template>
  <div id="map-view">
    <v-card id="map-filter">
      <v-card-title>Recycling points search</v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs v-model="tab">
          <v-tab>Recycling</v-tab>
          <v-tab>Utilization</v-tab>
        </v-tabs>
        <ul class="pa-0 pt-4 waste-types">
          <li
            v-for="type in wasteTypes"
            :key="type.id"
            class="d-flex align-center justify-space-between"
          >
            <div class="icon d-flex align-center mr-4">
              <static-image
                :src="type.icon"
                :alt="type.title"
                class="waste-type-icon mr-4"
              />
              <span>{{ type.title }}</span>
            </div>
            <v-checkbox v-model="selected" :value="type.id"></v-checkbox>
          </li>
        </ul>
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-btn color="primary" @click="search">Search</v-btn>
      </v-card-actions>
    </v-card>

    <div id="map-handler"></div>

    <v-dialog v-model="isShow" ref="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="mb-4">{{ point.title }}</v-card-title>
        <v-card-text>
          <v-text-field
            label="Address"
            v-model="point.address"
            outlined
            readonly
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="Phone"
            v-model="point.phone"
            outlined
            readonly
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="Working time"
            v-model="point.working_time"
            outlined
            readonly
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="Additional info"
            v-model="point.additional_info"
            outlined
            readonly
            class="mb-4"
          ></v-text-field>
          <v-text-field
            label="Site"
            v-model="point.site"
            outlined
            readonly
            class="mb-4"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-btn color="primary" text outlined @click="isShow = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import DG from "2gis-maps";
import { Component, Vue } from "vue-property-decorator";
import { BaseModule } from "@/modules/base";
import { StatsService } from "@/modules/news/services/stats.service";
import StaticImage from "@/core/components/StaticImage.vue";
import { MapService } from "../services/map.service";

@Component({
  components: {
    StaticImage,
  },
})
export default class MapView extends Vue {
  map: any = null;
  tab = 0;
  wasteTypes = [];
  selected = [];
  points = [];
  isShow = false;
  point = {};

  async search() {
    BaseModule.setLoadingStatus(true);

    const result = await MapService.getPoints(
      "almaty",
      this.tab ? "utilization" : "recycling",
      this.selected,
    );

    this.points.forEach(point => point.remove());

    this.points = result.map(point => {
      const marker = DG.marker([point.latitude || 0, point.longitude || 0], {
        title: point.title,
        riseOnHover: true,
      });
      marker.addTo(this.map);
      marker.addEventListener("click", () => {
        this.showPoint(point);
      });
      return marker;
    });
    BaseModule.setLoadingStatus(false);
  }

  showPoint(point: any) {
    this.isShow = true;
    this.point = point;
  }

  async created() {
    BaseModule.setLoadingStatus(true);
    this.wasteTypes = await StatsService.getWasteTypes();
    BaseModule.setLoadingStatus(false);
  }

  mounted() {
    DG.then(() => {
      this.map = DG.map("map-handler", {
        center: [43.23, 76.92],
        zoom: 13,
        fullscreenControl: false,
      });
    });
  }
}
</script>

<style lang="scss" scoped>
#map-handler {
  position: fixed;
  top: calc(64px + 56px);
  left: 0px;
  width: calc(100vw - 12px);
  height: calc(100vh - 64px + 56px);
  z-index: 0;
}
#map-filter {
  position: fixed;
  top: calc(64px + 56px + 16px);
  min-width: 300px;
  right: 16px;
  z-index: 1;

  .waste-types {
    max-height: 450px;
    overflow-y: auto;
  }
}
.waste-type-icon {
  width: 30px;
  height: 30px;
}
</style>

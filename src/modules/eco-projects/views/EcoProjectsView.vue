<template>
  <div id="eco-projects-view" class="d-flex align-start">
    <v-data-table
      :items="projects"
      hide-default-header
      class="flex-grow-1 mr-6"
    >
      <template #item="{ item }">
        <v-card class="mb-6">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            <div>Description: {{ item.description }}</div>
            <div>Date: {{ item.date | date }}</div>
            <div class="mb-4">
              Link:
              <a :href="item.link">{{ item.link }}</a>
            </div>
            <post-image :path="item.main_image" />
          </v-card-text>
        </v-card>
      </template>
    </v-data-table>
    <v-card class="filter">
      <v-card-title>Project Filter</v-card-title>
      <v-card-text>
        <v-form :ref="formRef">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            class="full-width field"
            :rules="[rules.stringLengthMinOptional(2)]"
          ></v-text-field>
          <v-select
            v-model="status"
            label="Status"
            outlined
            class="full-width field"
            :items="statuses"
            item-value="value"
            item-text="text"
          ></v-select>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0 d-flex">
        <v-btn color="primary" @click="fetch">Search</v-btn>
        <v-btn color="primary" text outlined @click="clearForm">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import FormValidator from "@/core/mixins/FormValidator";
import { Component, Mixins } from "vue-property-decorator";
import { EcoProjectsService } from "../services/eco-projects.service";
import PostImage from "@/modules/news/components/PostImage.vue";
import moment from "moment";

@Component({
  filters: {
    date(value: string) {
      return moment(value).format("DD.MM.YYYY");
    },
  },
  components: {
    PostImage,
  },
})
export default class EcoProjectsView extends Mixins(FormValidator) {
  projects = [];
  title = "";
  status = "ongoing";

  async fetch() {
    this.projects = await EcoProjectsService.search(this.title, this.status);
  }

  created() {
    this.fetch();
  }

  get statuses() {
    return [
      {
        text: "Announced",
        value: "announced",
      },
      {
        text: "Ongoing",
        value: "ongoing",
      },
      {
        text: "Finished",
        value: "finished",
      },
    ];
  }

  clearForm() {
    this.title = "";
    this.status = "ongoing";
    this.resetForm();
  }
}
</script>

<style lang="scss" scoped>
.filter {
  max-width: 350px;
  min-width: 350px;
}
</style>

<style lang="scss">
#eco-projects-view {
  .v-data-table {
    background-color: transparent;

    .v-data-footer {
      background-color: white;
    }
  }
}
</style>

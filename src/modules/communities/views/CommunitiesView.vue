<template>
  <div id="communities-view" class="d-flex align-start">
    <v-card class="mr-8 flex-grow-1">
      <v-data-table :items="communities" no-data-text="No communities found!">
        <template #item="{ item }">
          <div class="community d-flex align-center">
            <router-link
              class="d-flex align-center pa-4 text-decoration-none"
              :to="buildPath(item.id)"
            >
              <AvatarIcon :path="item.main_image" class="avatar mr-4" />
              <div class="text">
                <div class="c-title">{{ item.title | filter }}</div>
                <v-tooltip right max-width="400" open-delay="500">
                  <template #activator="{ on, attrs }">
                    <div class="c-description" v-on="on" v-bind="attrs">
                      {{ item.description | filterD }}
                    </div>
                  </template>
                  <div class="c-description">{{ item.description }}</div>
                </v-tooltip>
              </div>
            </router-link>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-card>
      <v-card-title>Community Filter</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            class="full-width field"
            :rules="[rules.stringLengthMinOptional(2)]"
          ></v-text-field>
          <v-text-field
            v-model="description"
            label="Description"
            outlined
            class="full-width field"
            :rules="[rules.stringLengthMinOptional(2)]"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-btn color="primary" @click="fetch">Search</v-btn>
        <v-btn color="primary" text outlined @click="resetForm">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { BaseModule } from "@/modules";
import { Component, Mixins } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import FormValidator from "@/core/mixins/FormValidator";
import { CommunitiesService } from "../services/communities.service";

@Component({
  components: {
    AvatarIcon,
  },
  filters: {
    filter(str: string) {
      return str.replace(/\\/g, "");
    },
    filterD(str: string) {
      const threshold = 100;
      if (str.length < threshold) {
        return str.replace(/\\/g, "");
      }
      return str.slice(0, threshold - 3).replace(/\\/g, "") + "...";
    },
  },
})
export default class CommunitiesView extends Mixins(FormValidator) {
  communities = [];
  title = "";
  description = "";
  formRef = "form";

  async fetch() {
    if (this.$refs[this.formRef] && !this.validateForm()) return;

    BaseModule.setLoadingStatus(true);
    this.communities = await CommunitiesService.getCommunities(
      this.title || undefined,
      this.description || undefined,
    );
    BaseModule.setLoadingStatus(false);
  }

  async created() {
    await this.fetch();
  }

  buildPath(id: string) {
    return `/communities/${id}`;
  }
}
</script>

<style lang="scss" scoped>
#communities-view {
  .text {
    max-width: 500px;
  }
  .c-title {
    font-size: 1rem;
    color: rgba($color: #000000, $alpha: 0.86);
  }
  .c-description {
    font-size: 0.875rem;
    color: rgba($color: #000000, $alpha: 0.54);
  }
}

.avatar {
  width: 48px;
  height: 48px;
}
.field {
  min-width: 300px;
}
</style>

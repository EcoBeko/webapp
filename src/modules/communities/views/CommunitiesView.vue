<template>
  <div id="communities-view" class="d-flex align-start">
    <v-card class="mr-8 flex-grow-1">
      <v-data-table :items="communities" no-data-text="No communities found!">
        <template #item="{ item }">
          <div class="community d-flex align-center">
            <router-link
              class="d-flex align-center pa-4 text-decoration-none full-width"
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
              <v-spacer></v-spacer>
              <div class="mr-4">{{ item.subscribers }}</div>
            </router-link>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-card max-width="350">
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
      <v-card-actions class="pa-6 pt-0 d-flex flex-wrap">
        <v-btn color="primary" @click="fetch">Search</v-btn>
        <v-btn color="primary" text outlined @click="resetForm">Clear</v-btn>
        <v-btn color="primary" text outlined @click="add" class="ml-0 mt-2">
          Add community
        </v-btn>
      </v-card-actions>
    </v-card>
    <AddCommunityModal ref="addModal" />
  </div>
</template>

<script lang="ts">
import { BaseModule } from "@/modules";
import { Component, Mixins } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import FormValidator from "@/core/mixins/FormValidator";
import { CommunitiesService } from "../services/communities.service";
import { descriptionFilter, titleFilter } from "@/core/utils";
import AddCommunityModal from "../layouts/AddCommunityModal.vue";

@Component({
  components: {
    AvatarIcon,
    AddCommunityModal,
  },
  filters: {
    filter: titleFilter,
    filterD: descriptionFilter,
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

  $refs: {
    addModal: AddCommunityModal;
  };
  async add() {
    this.$refs.addModal.show();
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

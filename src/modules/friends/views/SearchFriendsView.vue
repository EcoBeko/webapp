<template>
  <div id="search-friends-view" class="d-flex align-start">
    <v-card class="user-list mr-8 flex-grow-1">
      <v-data-table :items="users" no-data-text="Try searching">
        <template #item="{ item }">
          <router-link
            class="user d-flex align-center pa-4 text-decoration-none"
            :to="buildPath(item.id)"
          >
            <AvatarIcon :path="item.avatar" class="avatar mr-4" />
            <div class="username-wrapper d-flex flex-column">
              <span class="username">
                {{ "@" + item.username }}
              </span>
              <span class="full-name black--text">
                {{ item.first_name + " " + item.last_name }}
              </span>
            </div>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
    <v-card class="user-filter">
      <v-card-title>User filter</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="firstName"
            label="First name"
            outlined
            class="full-width field"
            :rules="[rules.stringLengthMinOptional(2)]"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last name"
            outlined
            class="full-width field"
            :rules="[rules.stringLengthMinOptional(2)]"
          ></v-text-field>
          <v-radio-group
            label="Gender"
            v-model="gender"
            class="mt-0 align-self-start"
            row
          >
            <v-radio :value="'female'">
              <template #label>
                <span class="black--text">
                  Female
                </span>
              </template>
            </v-radio>
            <v-radio :value="'male'">
              <template #label>
                <span class="black--text">
                  Male
                </span>
              </template>
            </v-radio>
          </v-radio-group>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-6 pt-0">
        <v-btn color="primary" @click="fetch">Search</v-btn>
        <v-btn color="primary" text outlined @click="clear">Clear</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { capitalize } from "@/core/utils";
import FormValidator from "@/core/mixins/FormValidator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import { FriendsService } from "../services/friends.service";
import { BaseModule } from "@/modules/base";

@Component({
  components: {
    AvatarIcon,
  },
})
export default class SearchFriendsView extends Mixins(FormValidator) {
  users = [];
  capitalize = capitalize;
  formRef = "form";

  firstName = "";
  lastName = "";
  gender = null;

  buildPath(id: string) {
    return `/users/${id}`;
  }

  async fetch() {
    if (!this.validateForm()) return;
    BaseModule.setLoadingStatus(true);

    this.users = await FriendsService.fetchUsers(
      this.firstName,
      this.lastName,
      this.gender,
    );

    BaseModule.setLoadingStatus(false);
  }

  mounted() {
    this.fetch();
  }

  clear() {
    this.resetForm();
    this.fetch();
  }
}
</script>

<style lang="scss" scoped>
.field {
  min-width: 300px;
}
</style>

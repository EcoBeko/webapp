<template>
  <div id="admin-users-view" class="mt-8">
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title>Add User</v-card-title>
        <v-card-text>
          <v-form :ref="formRef" class="form mb-4">
            <v-text-field
              v-model="username"
              label="Username"
              outlined
              class="full-width"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              class="full-width"
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0 d-flex">
          <v-btn @click="add" color="primary" class="mr-4">Add</v-btn>
          <v-btn @click="dialog = false" color="primary" text outlined>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :items="moderatorsParsed" :headers="headers">
      <template #top>
        <v-btn @click="dialog = true" color="primary">Add User</v-btn>
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="actions">
          <v-btn dark @click="remove(item.id)" color="red">Remove</v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import FormValidator from "@/core/mixins/FormValidator";
import { BaseModule } from "@/modules/base";
import { Component, Mixins } from "vue-property-decorator";
import { AdminService } from "../services/admin.service";

@Component({})
export default class AdminUsersView extends Mixins(FormValidator) {
  moderators = [];
  dialog = false;

  formRef = "form";

  username = "";
  password = "";
  show = false;

  get moderatorsParsed() {
    return this.moderators.map(m => ({ ...m, actions: "" }));
  }

  async add() {
    if (!this.validateForm()) return;
    BaseModule.setLoadingStatus(true);

    await AdminService.addModerator(this.username, this.password);

    this.username = "";
    this.password = "";
    this.resetForm();
    this.fetch();
    BaseModule.setLoadingStatus(false);
  }

  async remove(id: string) {
    BaseModule.setLoadingStatus(true);
    await AdminService.removeId(id);
    BaseModule.setLoadingStatus(false);

    this.fetch();
  }

  get headers() {
    return [
      {
        text: "Username",
        value: "username",
      },
      {
        text: "Status",
        value: "status",
      },
      {
        text: "Actions",
        value: "actions",
      },
    ];
  }

  async fetch() {
    this.moderators = await AdminService.getModerators();
  }

  async created() {
    await this.fetch();
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
}
</style>

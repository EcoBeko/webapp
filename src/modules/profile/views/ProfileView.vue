<template>
  <v-card id="profile-view">
    <v-card-title>Profile</v-card-title>
    <v-card-text>
      <v-form :ref="formRef" class="form">
        <v-text-field
          v-model="first_name"
          label="First name"
          outlined
          class="full-width"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="last_name"
          label="Last name"
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
    <v-card-actions class="pa-4 pt-0">
      <v-btn color="primary" @click="update()">Update</v-btn>
      <v-btn color="primary" @click="upload">Upload new Avatar</v-btn>
    </v-card-actions>
    <UploadImageDialog ref="imageDialog" />
  </v-card>
</template>

<script lang="ts">
import { UserGender } from "@/@types";
import FormValidator from "@/core/mixins/FormValidator";
import { AuthModule } from "@/modules/auth";
import { AuthService } from "@/modules/auth/services/auth.service";
import { BaseModule } from "@/modules/base";
import { Component, Mixins } from "vue-property-decorator";
import UploadImageDialog from "@/core/components/UploadImageDialog.vue";

@Component({
  components: {
    UploadImageDialog,
  },
})
export default class ProfileView extends Mixins(FormValidator) {
  formRef = "form";
  first_name = this.user.first_name;
  last_name = this.user.last_name;
  password = "";
  gender: UserGender = this.user.gender;
  show = false;

  $refs: {
    imageDialog: UploadImageDialog;
  };

  get user() {
    return AuthModule._user;
  }

  async update(avatar?: string) {
    const result = await AuthService.updateUser(
      this.user.id,
      this.first_name,
      this.last_name,
      this.password,
      this.gender,
      this.user.role,
      avatar,
    );

    if (result.successful) {
      BaseModule.showMessage({
        message: "Successful",
        color: "success",
        timeout: 2000,
      });
      AuthModule.setUser({
        id: this.user.id,
        username: this.user.username,
        gender: this.gender,
        avatar: avatar || this.user.avatar,
        role: this.user.role,
        status: this.user.status,
        first_name: this.first_name,
        last_name: this.last_name,
      });
    } else {
      BaseModule.showMessage({
        message: "Something bad happened",
        color: "error",
      });
    }
  }

  async upload() {
    const result = await this.$refs.imageDialog.show(
      `users/${this.user.username}`,
      "avatar",
    );

    if (result.successful) {
      return this.update(result.path);
    }
    BaseModule.showMessage({
      message: "Something bad happened",
      color: "error",
    });
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
}
</style>

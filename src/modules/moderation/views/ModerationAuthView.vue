<template>
  <div id="moderation-auth-view" class="d-flex align-center justify-center">
    <v-card class="form">
      <v-card-title class="text-h4 mb-4">Authentication</v-card-title>
      <v-card-text class="pb-0">
        <v-form :ref="formRef">
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
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-4 pt-0">
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import FormValidator from "@/core/mixins/FormValidator";
import { BaseModule } from "@/modules/base";
import { Component, Mixins } from "vue-property-decorator";
import { ModerationService } from "../services/moderation.service";

@Component({})
export default class ModerationAuthView extends Mixins(FormValidator) {
  username = "";
  password = "";
  formRef = "form";

  async login() {
    if (!this.validateForm()) return;

    const result = await ModerationService.authenticate(
      this.username,
      this.password,
    );

    if (result?.statusCode === 400) {
      return BaseModule.showMessage({
        message: "Bad credentials",
        color: "error",
      });
    }

    localStorage.setItem("token", result.token);
    this.$router.push({
      name: "moderation-projects",
    });
  }
}
</script>

<style lang="scss" scoped>
#moderation-auth-view {
  height: 100%;
}

.form {
  width: 350px;
}
</style>

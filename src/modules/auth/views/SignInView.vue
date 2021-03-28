<template>
  <div id="sign-in-view" class="d-flex flex-column align-center">
    <div class="wrapper d-flex flex-column justify-space-between py-8">
      <div class="logo d-flex align-center">
        <img class="logo__image" src="@/assets/logo.svg" alt="logo" />
        <span class="accent--text font-weight-medium ml-3 text-h5">
          Eco Beko
        </span>
      </div>
      <div class="content">
        <p class="content__title mb-4">Sign In</p>
        <p class="content__sub-title mb-9">Login to your account</p>
        <v-form
          :ref="formRef"
          lazy-validation
          class="d-flex flex-column align-center"
        >
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
          <v-btn color="primary" large class="mb-10" @click="authenticate">
            Sign In
          </v-btn>
          <p>
            Don't have an account?
            <router-link to="/sign-up">Sign Up</router-link>
          </p>
        </v-form>
      </div>
      <div aria-hidden></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import FormValidator from "@/core/mixins/FormValidator";
import { AuthService } from "../services/auth.service";
import { UserRole } from "@/@types";
import { BaseModule } from "@/modules/base";
import { AuthModule } from "..";

@Component({})
export default class SignInView extends Mixins(FormValidator) {
  formRef = "form";
  username = "";
  password = "";
  show = false;

  async authenticate() {
    if (!this.validateForm()) return;

    const result = await AuthService.authenticate(
      this.username,
      this.password,
      UserRole.USER,
    );

    if (result.successful == false) {
      return BaseModule.showMessage({
        message: result.message.message,
        color: "error",
        timeout: 2000,
      });
    }
    AuthService.setLocalToken(result.token);
    AuthModule.setUser(result.user);
    this.$router.push({
      name: "news",
    });
  }
}
</script>

<style lang="scss" scoped>
#sign-in-view {
  height: 100%;
  background: url("../../../assets/sign-in/background.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper {
  height: 100%;
  width: 100%;
  max-width: 1100px;
}

.logo__image {
  height: 70px;
}
.content {
  max-width: 500px;
  &__title,
  &__sub-title {
    text-align: center;
  }

  &__title {
    font-size: 1.5rem;
  }
  &__sub-title {
    font-size: 1.125rem;
  }
}
</style>

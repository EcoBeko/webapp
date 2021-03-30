<template>
  <div id="sign-up-view" class="d-flex flex-column align-center">
    <div
      class="wrapper container d-flex flex-column justify-space-between py-8"
    >
      <div class="logo d-flex align-center">
        <img class="logo__image" src="@/assets/logo.svg" alt="logo" />
        <span class="accent--text font-weight-medium ml-3 text-h5">
          Eco Beko
        </span>
      </div>
      <div class="content align-self-end">
        <p class="content__title mb-4">Sign Up</p>
        <p class="content__sub-title mb-9">Create a new account</p>
        <v-form
          :ref="formRef"
          lazy-validation
          class="d-flex flex-column align-center"
        >
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
          <v-radio-group
            label="Gender"
            v-model="gender"
            class="mt-0 mb-10 align-self-start"
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
          <v-btn color="primary" large class="mb-10" @click="register">
            Sign Up
          </v-btn>
          <p>
            Already have an account?
            <router-link to="/sign-in">Sign In</router-link>
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
import { UserGender, UserRole } from "@/@types";
import { AuthService } from "../services/auth.service";
import { BaseModule } from "@/modules/base";
import { AuthModule } from "@/modules";

@Component({})
export default class SignUpView extends Mixins(FormValidator) {
  formRef = "form";
  first_name = "";
  last_name = "";
  username = "";
  password = "";
  gender: UserGender = UserGender.FEMALE;
  show = false;

  async register() {
    if (!this.validateForm()) return;

    const result = await AuthService.createUser(
      this.first_name,
      this.last_name,
      this.username,
      this.password,
      this.gender,
      UserRole.USER,
    );

    if (result.successful == false) {
      return BaseModule.showMessage({
        message: result.message.message,
        color: "error",
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
#sign-up-view {
  height: 100%;
  background: url("../../../assets/sign-up/background.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper {
  height: 100%;
  width: 100%;
}

.logo__image {
  height: 70px;
}
.content {
  width: 500px;
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

<template>
  <header id="app-header" class="d-flex justify-center">
    <div
      class="container d-flex justify-space-between py-3 full-height full-width"
    >
      <div class="logo d-flex align-center">
        <img class="logo__image" src="@/assets/logo.svg" alt="logo" />
        <span class="logo__text white--text font-weight-medium ml-3 text-h5">
          Eco Beko
        </span>
      </div>
      <div class="profil d-flex align-center">
        <AvatarIcon :path="user.avatar" class="mr-4" />
        <span class="white--text">
          {{ fullName }}
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import { AuthModule } from "@/modules/auth";
import { capitalize } from "@/core/utils";

@Component({
  components: {
    AvatarIcon,
  },
})
export default class AppHeader extends Vue {
  get user() {
    return AuthModule._user;
  }

  get fullName() {
    return (
      capitalize(this.user.first_name || " ") +
      " " +
      capitalize(this.user.last_name || " ")
    );
  }
}
</script>

<style lang="scss" scoped>
#app-header {
  height: 64px;
  background-color: $dark;
}

.logo__image {
  height: 100%;
}
.logo__text {
  pointer-events: none;
}
</style>

<template>
  <div id="welcome-view" class="d-flex flex-column align-center">
    <div
      class="wrapper container d-flex flex-column justify-space-between py-8"
    >
      <div class="logo d-flex align-center">
        <img class="logo__image" src="@/assets/logo.svg" alt="logo" />
        <span class="accent--text font-weight-medium ml-3 text-h5">
          Eco Beko
        </span>
      </div>
      <div class="content d-flex">
        <div class="text">
          <h1 class="header accent--text">
            <span class="font-weight-regular">Be smart</span> <br />
            <span class="font-weight-bold">be eco friendly</span>
          </h1>
          <p class="p-info font-weight-regular mt-6 dark--text">
            We are with eco-future and you can be with us. We are a group of
            people who cares. Exciting future, lots of possibilities.
          </p>
          <div class="buttons my-12">
            <v-btn class="mr-16" color="primary" large to="/sign-up">
              Sign-Up
            </v-btn>
            <v-btn
              class="text-decoration-underline"
              color="primary"
              large
              text
              to="/sign-in"
            >
              Sign-In
            </v-btn>
          </div>
        </div>
        <div class="arts">
          <img class="arts__image" src="@/assets/welcome/arts.png" alt="arts" />
          <img class="arts__clip" src="@/assets/welcome/clip.gif" alt="clip" />
        </div>
      </div>
      <div aria-hidden></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class WelcomeView extends Vue {}
</script>

<style lang="scss" scoped>
#welcome-view {
  height: 100%;
}

.wrapper {
  height: 100%;
  width: 100%;
}

.logo__image {
  height: 70px;
}

.content {
  .header {
    font-size: 4rem;
    line-height: 1.125em;
  }
  .p-info {
    max-width: 550px;
    font-size: 1.375rem;
  }

  .arts {
    position: relative;

    &__image {
      max-height: 525px;
      position: absolute;
      transform: translate(20%, -15%);
    }
    &__clip {
      max-height: 150px;
      position: absolute;
      left: 0px;
      bottom: -10%;
    }
  }
}
</style>

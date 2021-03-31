<template>
  <div class="avatar-icon">
    <template v-if="path">
      <static-image
        class="avatar-image"
        :src="path"
        alt="avatar"
      ></static-image>
    </template>
    <template v-else>
      <div
        class="full-width full-height d-flex align-center justify-center"
        :class="[style.background]"
      >
        <v-icon :color="style.icon">mdi-account</v-icon>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StaticImage from "./StaticImage.vue";

@Component({
  components: {
    StaticImage,
  },
})
export default class AvatarIcon extends Vue {
  @Prop({
    type: String,
    required: false,
  })
  readonly path?: string;

  get style() {
    return {
      background: "grey lighten-2",
      icon: "grey",
    };
  }
}
</script>

<style lang="scss" scoped>
.avatar-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>

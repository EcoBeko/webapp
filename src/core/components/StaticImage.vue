<template>
  <img v-lazy="computedPath" :alt="alt" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class StaticImage extends Vue {
  @Prop(String)
  readonly alt: string;

  @Prop(String)
  readonly src: string;

  get computedPath() {
    if (process.env.NODE_ENV === "production") {
      return "static/" + this.src;
    }
    return "http://localhost:3000/static/" + this.src;
  }
}
</script>

<style lang="scss" scoped></style>

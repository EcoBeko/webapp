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
    return "https://eco-beko.ryspekov.life/app/static/" + this.src;
  }
}
</script>

<style lang="scss" scoped></style>

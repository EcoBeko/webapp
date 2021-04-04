<template>
  <div class="post-image" @click="isExpanded = !isExpanded">
    <static-image
      :src="path"
      alt="post-image"
      :class="{
        image: true,
        image_expanded: isExpanded,
      }"
    ></static-image>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import StaticImage from "@/core/components/StaticImage.vue";

@Component({
  components: {
    StaticImage,
  },
})
export default class PostImage extends Vue {
  @Prop(String)
  readonly path: string;

  isExpanded = false;
}
</script>

<style lang="scss" scoped>
.image {
  cursor: pointer;
  width: 100%;
  max-height: 230px;
  object-fit: cover;
}
.image_expanded {
  max-height: none;
}
</style>

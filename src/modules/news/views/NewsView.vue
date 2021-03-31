<template>
  <div id="news-view" class="d-flex">
    <div class="feed"></div>
    <aside class="modules">
      <StatsWindow />
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatsWindow from "../layout/StatsWindow.vue";

@Component({
  components: {
    StatsWindow,
  },
})
export default class NewsView extends Vue {}
</script>

<style lang="scss" scoped>
.modules > * {
  width: 350px;
}
</style>

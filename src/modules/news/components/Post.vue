<template>
  <article class="post">
    <template v-if="post.type == 'post'">
      <v-card>
        <v-card-title class="d-flex">
          <AvatarIcon :path="post.author_avatar" class="avatar mr-4" />
          <div class="d-flex flex-column">
            <span class="name">{{ post.author_name }}</span>
            <span class="date">{{ date }}</span>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="text mb-4">{{ post.content.text }}</div>
          <div class="images">
            <PostImage v-for="path in images" :key="path" :path="path" />
          </div>
        </v-card-text>
      </v-card>
    </template>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import PostImage from "./PostImage.vue";
import moment from "moment";

@Component({
  components: {
    AvatarIcon,
    PostImage,
  },
})
export default class Post extends Vue {
  @Prop(Object)
  readonly post: any;

  get date() {
    return moment(this.post.date).format("DD MMM [at] HH:mm a");
  }

  get images() {
    return this.post.content.files.map(
      (name: string) => `posts/${this.post.id}/${name}`,
    );
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
}
.name,
.date {
  line-height: 1.5em;
}
.name {
  font-size: 1rem;
  color: rgba($color: #000000, $alpha: 0.54);
}
.date {
  font-size: 0.875rem;
  color: rgba($color: #000000, $alpha: 0.38);
}
.text {
  font-size: 1rem;
}
</style>

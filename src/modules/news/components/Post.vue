<template>
  <article class="post">
    <v-card>
      <v-card-title class="d-flex">
        <AvatarIcon :path="post.author_avatar" class="avatar mr-4" />
        <div class="d-flex flex-column">
          <span class="name">{{ post.author_name }}</span>
          <span class="date">{{ date }}</span>
        </div>
      </v-card-title>
      <v-card-text>
        <template v-if="post.type == 'post'">
          <div class="text mb-4">{{ post.content.text }}</div>
          <div class="images">
            <PostImage v-for="path in images" :key="path" :path="path" />
          </div>
        </template>
        <template v-else>
          <Editor
            class="article-content"
            :id="post.id"
            :data="post.content"
            readonly
          />
        </template>
        <v-divider class="my-4"></v-divider>
        <div class="likes d-flex align-center">
          <v-icon class="mr-1 cursor-p" @click="setLike">{{ icon }}</v-icon>
          <span class="text-h7">{{ likesCount }}</span>
        </div>
      </v-card-text>
    </v-card>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import Editor from "@/core/components/Editor.vue";
import PostImage from "./PostImage.vue";
import moment from "moment";
import { AuthModule } from "@/modules/auth";

@Component({
  components: {
    AvatarIcon,
    PostImage,
    Editor,
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

  get likesCount() {
    return this.post.content.likes.length;
  }

  get icon() {
    const like = this.post.content.likes.find(
      (id: string) => id === AuthModule._user.id,
    );
    return like ? "mdi-heart" : "mdi-heart-outline";
  }

  public setLike() {
    this.$emit("like", this.post.id);
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

<style lang="scss">
.article-content {
  .codex-editor__redactor {
    padding-bottom: 0px !important;
  }
}
</style>

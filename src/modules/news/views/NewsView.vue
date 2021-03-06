<template>
  <div id="news-view" class="d-flex">
    <div class="feed flex-grow-1 mr-6">
      <ArticleField @post-added="fetchPosts" />
      <div class="posts mt-6">
        <Post
          v-for="post in sortedPosts"
          :key="post.id"
          :post="post"
          class="mb-6"
          @like="setLike"
        />
        <template v-if="!posts.length">
          <p class="pt-4">
            No posts are available! Make friends or write posts yourself
          </p>
        </template>
      </div>
    </div>
    <aside class="modules">
      <keep-alive>
        <StatsWindow class="mb-8" />
      </keep-alive>
      <RecommendationsWindow />
    </aside>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatsWindow from "../layout/StatsWindow.vue";
import RecommendationsWindow from "../layout/RecommendationsWindow.vue";
import ArticleField from "../layout/ArticleField.vue";
import Post from "../components/Post.vue";
import { PostsService } from "../services/posts.service";
import { AuthModule } from "@/modules/auth";
import moment from "moment";

@Component({
  components: {
    StatsWindow,
    RecommendationsWindow,
    ArticleField,
    Post,
  },
})
export default class NewsView extends Vue {
  posts = [];
  async fetchPosts() {
    this.posts = await PostsService.fetchPosts(AuthModule._user.id);
  }

  created() {
    this.fetchPosts();
  }

  get sortedPosts() {
    const temp = [...this.posts];
    temp.sort((a, b) => moment(a.date).diff(b.date) * -1);
    return temp;
  }

  async setLike(postId: string) {
    const post = this.posts.find(post => post.id == postId);
    const hasLike = !!post.content.likes.find(
      (id: string) => id === AuthModule._user.id,
    );

    if (hasLike) {
      post.content.likes = post.content.likes.filter(
        (id: string) => id !== AuthModule._user.id,
      );
    } else {
      post.content.likes.push(AuthModule._user.id);
    }

    PostsService.setLike(post.id, AuthModule._user.id);
  }
}
</script>

<style lang="scss" scoped>
.modules > * {
  width: 350px;
}
</style>

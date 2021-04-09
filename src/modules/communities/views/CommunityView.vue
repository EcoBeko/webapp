<template>
  <div id="community-view">
    <v-card class="c-info mb-4">
      <template v-if="community">
        <v-card-title class="d-flex justify-space-between align-start">
          <div class="wrapper d-flex flex-column align-start">
            <h1 class="text-h4 mb-8">
              Community: {{ community.title | filter }}
            </h1>
            <p class="text-h6 c-description">
              {{ community.description | filter }}
            </p>
          </div>
          <div class="image-wrapper" v-if="community.main_image">
            <StaticImage
              :src="community.main_image"
              :alt="community.title + ' main image'"
              class="full-height image"
            />
          </div>
        </v-card-title>
        <v-card-text></v-card-text>
      </template>

      <template v-else>
        <v-card-title>404: Community not found</v-card-title>
      </template>
    </v-card>
    <div class="editor-wrapper mb-8 d-flex">
      <ArticleField
        v-if="community.is_moderator"
        :community-id="community.id"
        @post-added="fetchPosts"
        class="mr-8"
      />
      <v-btn
        color="primary"
        class="subs mr-4"
        @click="subscribe"
        v-if="!community.is_subscribed"
      >
        Subscribe
      </v-btn>
      <v-btn color="primary" class="subs" @click="showSubs">
        Subscribers ({{ community.subscribers }})
      </v-btn>
      <SubsModal :community="community" ref="subsModal" />
    </div>
    <div class="posts">
      <Post
        v-for="post in sortedPosts"
        :key="post.id"
        :post="post"
        class="mb-6"
        @like="setLike"
      />
      <template v-if="!posts.length">
        <p class="pt-4">
          No posts are available!
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { BaseModule } from "@/modules/base";
import { Component, Vue } from "vue-property-decorator";
import { CommunitiesService } from "../services/communities.service";
import { PostsService } from "@/modules/news/services/posts.service";
import { descriptionFilter, titleFilter } from "@/core/utils";
import StaticImage from "@/core/components/StaticImage.vue";
import ArticleField from "@/modules/news/layout/ArticleField.vue";
import Post from "@/modules/news/components/Post.vue";
import SubsModal from "../layouts/SubsModal.vue";
import { AuthModule } from "@/modules/auth";

@Component({
  components: {
    StaticImage,
    Post,
    ArticleField,
    SubsModal,
  },
  filters: {
    filter: titleFilter,
    filterD: descriptionFilter,
  },
})
export default class CommunityView extends Vue {
  community: Record<string, any> = {};
  posts = [];

  $refs: {
    subsModal: SubsModal;
  };

  async fetchPosts() {
    BaseModule.setLoadingStatus(true);
    this.posts = await PostsService.fetchPosts(this.community.id);
    BaseModule.setLoadingStatus(false);
  }

  get sortedPosts() {
    const temp = [...this.posts];
    temp.sort((a, b) => moment(a.date).diff(b.date) * -1);
    return temp;
  }

  async created() {
    const { id } = this.$route.params;

    BaseModule.setLoadingStatus(true);
    this.community = await CommunitiesService.getCommunity(
      AuthModule._user.id,
      id,
    );
    if (this.community.id) await this.fetchPosts();
    BaseModule.setLoadingStatus(false);
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

  async subscribe() {
    BaseModule.setLoadingStatus(true);
    await CommunitiesService.subscribe(this.community.id, AuthModule._user.id);
    BaseModule.setLoadingStatus(false);

    BaseModule.showMessage({
      message: "Subscribed!",
      color: "success",
    });

    this.community.is_subscribed = true;
  }

  async showSubs() {
    this.$refs.subsModal.show(this.community.id);
  }
}
</script>

<style lang="scss" scoped>
#community-view {
  .subs {
    height: 56px;
  }
}

.c-info {
  min-height: 400px;
}
.avatar {
  min-width: 100px;
  height: 100px;
}
.c-description {
  max-width: 500px;
}
.image-wrapper {
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
.image {
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
}
</style>

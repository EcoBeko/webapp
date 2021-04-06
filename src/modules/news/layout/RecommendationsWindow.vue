<template>
  <v-card id="recommendations-window">
    <v-card-title>Recommendations list</v-card-title>
    <v-card-text class="d-flex flex-column">
      <router-link
        v-for="user in friends"
        :key="user.id"
        class="user d-flex align-center pa-4 text-decoration-none"
        :to="buildPath(user.id)"
      >
        <AvatarIcon :path="user.avatar" class="avatar mr-4" />
        <div class="username-wrapper d-flex flex-column">
          <span class="username">
            {{ "@" + user.username }}
          </span>
          <span class="full-name black--text">
            {{ user.first_name + " " + user.last_name }}
          </span>
        </div>
      </router-link>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthModule } from "@/modules/auth";
import { FriendsService } from "@/modules/friends/services/friends.service";
import AvatarIcon from "@/core/components/AvatarIcon.vue";

@Component({
  components: {
    AvatarIcon,
  },
})
export default class RecommendationsWindow extends Vue {
  friends = [];

  async created() {
    this.friends = await FriendsService.getUserRecommendations(
      AuthModule._user.id,
    );
  }

  buildPath(id: string) {
    return `/users/${id}`;
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
}
.username,
.full-name {
  line-height: 1.5em;
  text-decoration: none;
}
.full-name {
  font-size: 1rem;
}
.username {
  font-size: 0.875rem;
  color: rgba($color: #000000, $alpha: 0.38);
}
</style>

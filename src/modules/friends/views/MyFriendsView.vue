<template>
  <v-card id="my-friends-view">
    <v-data-table
      :items="friends"
      no-data-text="No friends! Try find one"
      show-group-by
      group-by="friend_status"
    >
      <template #item="{ item }">
        <div class="user d-flex align-center">
          <router-link
            class="d-flex align-center pa-4 text-decoration-none"
            :to="buildPath(item.id)"
          >
            <AvatarIcon :path="item.avatar" class="avatar mr-4" />
            <div class="username-wrapper d-flex flex-column">
              <span class="username">
                {{ "@" + item.username }}
              </span>
              <span class="full-name black--text">
                {{ item.first_name + " " + item.last_name }}
              </span>
            </div>
          </router-link>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            v-if="item.friend_status == 'created' && item.id === item.first_id"
            @click="update(item, 'accept')"
            class="mr-4"
          >
            Accept Request
          </v-btn>
          <v-btn
            color="red"
            v-if="item.friend_status == 'created' && item.id === item.first_id"
            @click="update(item, 'remove')"
            class="mr-4"
            dark
          >
            Decline Request
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { AuthModule } from "@/modules/auth";
import { Component, Vue } from "vue-property-decorator";
import { FriendsService } from "../services/friends.service";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import { capitalize } from "@/core/utils";
import { BaseModule } from "@/modules";
import { IUser } from "@/@types";

@Component({
  components: {
    AvatarIcon,
  },
})
export default class MyFrindsView extends Vue {
  friends = [];
  capitalize = capitalize;

  async created() {
    BaseModule.setLoadingStatus(true);
    this.friends = await FriendsService.getUserFriends(AuthModule._user.id);
    BaseModule.setLoadingStatus(false);
  }

  buildPath(id: string) {
    return `/users/${id}`;
  }

  async update(friend: IUser, status: string) {
    BaseModule.setLoadingStatus(true);
    await FriendsService.updateStatus(AuthModule._user.id, friend.id, status);

    if (status === "accept") {
      friend.friend_status = "accepted";
    } else if (status === "remove") {
      this.friends = this.friends.filter(f => f.id !== friend.id);
    }
    BaseModule.setLoadingStatus(false);
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

<template>
  <v-card id="user-view">
    <v-card-title>Profile</v-card-title>
    <v-card-text>
      <template v-if="user">
        <AvatarIcon :path="user.avatar" class="mb-6 avatar" />
        <v-form class="form">
          <v-text-field
            v-model="user.first_name"
            label="First name"
            outlined
            class="full-width"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="user.last_name"
            label="Last name"
            outlined
            class="full-width"
            readonly
          ></v-text-field>
          <v-radio-group
            label="Gender"
            v-model="user.gender"
            class="mt-0 align-self-start"
            row
            readonly
          >
            <v-radio :value="'female'">
              <template #label>
                <span class="black--text">
                  Female
                </span>
              </template>
            </v-radio>
            <v-radio :value="'male'">
              <template #label>
                <span class="black--text">
                  Male
                </span>
              </template>
            </v-radio>
          </v-radio-group>
        </v-form>
      </template>
      <template v-else>
        <h1 class="mb-4">404</h1>

        <p>User does not exists!</p>
      </template>
    </v-card-text>
    <v-card-actions class="pa-4 pt-0">
      <template v-if="user">
        <v-btn
          color="primary"
          v-if="!user.friend_status"
          @click="update('send')"
        >
          Send friend request
        </v-btn>
        <v-btn
          color="primary"
          v-else-if="user.friend_status == 'created'"
          text
          outlined
        >
          Request has been sent
        </v-btn>
        <v-btn
          color="primary"
          v-else-if="user.friend_status == 'accepted'"
          text
          outlined
          @click="update('remove')"
        >
          Remove from friends
        </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import { IUser } from "@/@types";
import { AuthModule } from "@/modules/auth";
import { BaseModule } from "@/modules/base";
import { FriendsService } from "../services/friends.service";

@Component({
  components: {
    AvatarIcon,
  },
})
export default class UserView extends Vue {
  user: IUser = null;

  async created() {
    const { id } = this.$route.params;

    if (AuthModule._user.id == id) return this.$router.push("/profile");

    BaseModule.setLoadingStatus(true);

    const result = await FriendsService.fetchFriend(AuthModule._user.id, id);

    BaseModule.setLoadingStatus(false);

    if (!result || result.statusCode == 404) {
      return;
    }

    this.user = result;
  }

  async update(status: string) {
    BaseModule.setLoadingStatus(true);
    await FriendsService.updateStatus(
      AuthModule._user.id,
      this.user.id,
      status,
    );

    if (status === "send") {
      this.user.friend_status = "created";
    } else if (status === "remove") {
      this.user.friend_status = null;
    }
    BaseModule.setLoadingStatus(false);
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 500px;
}
#user-view {
  .avatar {
    width: 100px;
    height: 100px;
  }
}
</style>

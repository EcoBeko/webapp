<template>
  <v-dialog v-model="isShow" max-width="700">
    <v-card>
      <v-card-title>Subscribers</v-card-title>

      <v-card-text>
        <v-data-table
          :items="subs"
          :search="search"
          :headers="headers"
          hide-default-header
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="Search"
              outlined
              append-icon="mdi-magnify"
            ></v-text-field>
          </template>
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
              <template v-if="isAdmin && notAdmin(item)">
                <v-btn
                  color="green"
                  v-if="item.sub_status == 'disabled'"
                  @click="update(item, 'enabled')"
                  class="mr-4"
                  dark
                >
                  Enable
                </v-btn>
                <v-btn
                  color="primary"
                  v-if="
                    item.sub_status == 'enabled' &&
                      item.sub_status != 'moderator'
                  "
                  @click="update(item, 'moderator')"
                  class="mr-4"
                >
                  Make Moderator
                </v-btn>
                <v-btn
                  color="red"
                  v-if="
                    item.sub_status == 'enabled' ||
                      item.sub_status == 'moderator'
                  "
                  @click="update(item, 'disabled')"
                  class="mr-4"
                  dark
                >
                  Ban
                </v-btn>
              </template>
            </div>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="pa-5">
        <v-btn color="primary" text outlined @click="isShow = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AvatarIcon from "@/core/components/AvatarIcon.vue";
import { BaseModule } from "@/modules/base";
import { CommunitiesService } from "../services/communities.service";
import { AuthModule } from "@/modules/auth";

@Component({
  components: {
    AvatarIcon,
  },
})
export default class SubsModal extends Vue {
  isShow = false;
  subs = [];
  search = "";

  get headers() {
    return [
      {
        text: "",
        value: "username",
      },
      {
        text: "",
        value: "first_name",
      },
      {
        text: "",
        value: "last_name",
      },
    ];
  }

  @Prop(Object)
  readonly community: any;

  public async show(id: string) {
    BaseModule.setLoadingStatus(true);
    this.isShow = true;
    this.subs = await CommunitiesService.getSubs(id);
    BaseModule.setLoadingStatus(false);
  }

  buildPath(id: string) {
    return `/users/${id}`;
  }

  get isAdmin() {
    return !this.notAdmin(AuthModule._user);
  }

  notAdmin(user: any) {
    return user.id !== this.community.admin_id;
  }

  async update(user: any, status: string) {
    BaseModule.setLoadingStatus(true);
    await CommunitiesService.updateStatus(this.community.id, user.id, status);
    BaseModule.setLoadingStatus(false);

    BaseModule.showMessage({
      message: "Status updated",
      color: "success",
    });

    user.sub_status = status;
  }
}
</script>

<style lang="scss" scoped></style>

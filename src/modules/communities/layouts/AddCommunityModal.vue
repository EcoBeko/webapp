<template>
  <v-dialog v-model="isShow" persistent max-width="550">
    <v-card>
      <v-card-title class="pb-8">Add Community</v-card-title>

      <v-card-text class="pb-0">
        <v-form ref="form">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            class="full-width"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="description"
            label="Description"
            outlined
            class="full-width"
            :rules="[rules.required]"
          ></v-text-field>
          <v-file-input
            v-model="image"
            label="Attach main image"
            show-size
            prepend-icon="mdi-camera"
            :rules="[rules.required]"
          ></v-file-input>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-6 pt-4">
        <v-btn color="primary" @click="add">Add</v-btn>
        <v-btn color="primary" text outlined @click="isShow = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import FormValidator from "@/core/mixins/FormValidator";
import { ImageService } from "@/core/services/image.service";
import { getFileName } from "@/core/utils";
import { AuthModule } from "@/modules/auth";
import { BaseModule } from "@/modules/base";
import { Component, Mixins } from "vue-property-decorator";
import { CommunitiesService } from "../services/communities.service";

@Component({})
export default class AddComunityModal extends Mixins(FormValidator) {
  isShow = false;

  title = "";
  description = "";
  image: File = null;
  formRef = "form";

  public show() {
    this.isShow = true;
  }

  async add() {
    if (!this.validateForm()) return;

    BaseModule.setLoadingStatus(true);
    const path = this.image.name;
    const { _id } = await CommunitiesService.create(
      AuthModule._user.id,
      this.title,
      this.description,
      path,
    );

    await ImageService.uploadFile(
      this.image,
      `communities/${_id}`,
      getFileName(this.image),
    );

    BaseModule.setLoadingStatus(false);

    BaseModule.showMessage({
      message: "Community successfully added",
      color: "success",
    });

    this.title = "";
    this.description = "";
    this.image = null;

    this.isShow = false;
    this.$router.push("/communities/" + _id);
  }
}
</script>

<style lang="scss" scoped></style>

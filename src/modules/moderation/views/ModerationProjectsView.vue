<template>
  <div id="moderation-projects-view" class="pt-4">
    <v-dialog v-model="show" persistent max-width="500">
      <v-card>
        <v-card-title>
          Add Project
        </v-card-title>
        <v-card-text>
          <v-form :ref="formRef" class="form mb-4">
            <v-text-field
              v-model="title"
              label="Title"
              class="full-width"
              :rules="[rules.required]"
              outlined
            ></v-text-field>
            <v-textarea
              label="Description"
              v-model="description"
              auto-grow
              clearable
              counter
              :rules="[rules.required, rules.stringLengthMin(2)]"
            ></v-textarea>
            <v-file-input
              v-model="file"
              label="Attach project image"
              prepend-icon="mdi-camera"
              :rules="[rules.required]"
              show-size
              chips
            ></v-file-input>
            <v-text-field
              v-model="link"
              label="Project Link"
              class="full-width"
              :rules="[rules.required]"
              outlined
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-btn @click="add" color="primary">Add</v-btn>
          <v-btn @click="show = false" color="primary" text outlined>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table :items="projects" :headers="headers">
      <template #top>
        <v-btn color="primary" @click="show = true">Add Project</v-btn>
      </template>
      <template #[`item.actions`]="{ item }">
        <div class="actions d-flex">
          <v-btn
            dark
            @click="updateStatus(item.id, 'ongoing')"
            color="green"
            class="mr-2"
          >
            Ongoing
          </v-btn>
          <v-btn dark @click="updateStatus(item.id, 'finished')" color="red">
            Finish
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import FormValidator from "@/core/mixins/FormValidator";
import { ImageService } from "@/core/services/image.service";
import { getFileName } from "@/core/utils";
import { BaseModule } from "@/modules";
import { Component, Mixins } from "vue-property-decorator";
import { ModerationService } from "../services/moderation.service";

@Component({})
export default class ModerationProjectsView extends Mixins(FormValidator) {
  projects = [];
  formRef = "form";

  title = "";
  description = "";
  file: File = null;
  link = "";
  show = false;

  get headers() {
    return [
      {
        text: "Title",
        value: "title",
      },
      {
        text: "Description",
        value: "description",
      },
      {
        text: "Status",
        value: "status",
      },
      {
        text: "Actions",
        value: "actions",
      },
    ];
  }

  async fetch() {
    this.projects = await ModerationService.getProjects();
  }

  async updateStatus(id: string, status: string) {
    BaseModule.setLoadingStatus(true);
    await ModerationService.updateProject(id, status);
    await this.fetch();
    BaseModule.setLoadingStatus(false);
  }

  created() {
    this.fetch();
  }

  async add() {
    if (!this.validateForm()) return;

    BaseModule.setLoadingStatus(true);

    const { _id } = await ModerationService.addProject(
      this.title,
      this.description,
      this.file.name,
      this.link,
    );

    ImageService.uploadFile(
      this.file,
      `projects/${_id}`,
      getFileName(this.file),
    );

    BaseModule.showMessage({
      message: "Projects successfully added",
      color: "success",
    });

    this.title = "";
    this.description = "";
    this.file = null;
    this.link = "";

    this.resetForm();

    this.show = false;
    await this.fetch();
    BaseModule.setLoadingStatus(false);
  }
}
</script>

<style lang="scss" scoped></style>

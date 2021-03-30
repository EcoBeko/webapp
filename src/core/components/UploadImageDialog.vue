<template>
  <v-dialog v-model="isShow" persistent max-width="550">
    <v-card>
      <v-card-title>Upload dialog</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="file"
          label="Click here"
          show-size
          prepend-icon="mdi-camera"
        ></v-file-input>
      </v-card-text>
      <v-card-actions class="py-4 px-6">
        <v-btn color="primary" @click="upload">Upload</v-btn>
        <v-btn color="primary" text outlined @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { BaseModule } from "@/modules";
import { Component, Vue } from "vue-property-decorator";
import { api } from "../services/api.service";

@Component({})
export default class UploadImageDialog extends Vue {
  isShow = false;
  resolve: Function = () => 0;
  file: File = null;
  path = "";
  name = "";

  public async show(path: string, name: string): Promise<any> {
    return new Promise(res => {
      this.isShow = true;
      this.resolve = res;
      this.path = path;
      this.name = name;
    });
  }

  cancel() {
    this.isShow = false;
    this.resolve();
  }

  async upload() {
    BaseModule.setLoadingStatus(true);
    const formData = new FormData();
    formData.append("file", this.file);
    formData.append("path", this.path);
    formData.append("name", this.name);
    const { data } = await api.post("images", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    this.isShow = false;
    this.resolve(data);
    BaseModule.setLoadingStatus(false);
  }
}
</script>

<style lang="scss" scoped></style>

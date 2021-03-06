<template>
  <v-expansion-panels id="article-field" v-model="panels">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <div class="wrapper">
          <v-icon color="primary" class="mr-4">mdi-grease-pencil</v-icon>
          Write an article/post
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-form class="post-editor" ref="form">
          <v-textarea
            label="Write a post..."
            v-model="postData.text"
            auto-grow
            clearable
            counter
            :rules="[rules.required, rules.stringLengthMin(2)]"
          ></v-textarea>
          <v-file-input
            v-model="postData.files"
            label="Attach photos"
            show-size
            multiple
            chips
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-form>
        <div class="button-wrappers d-flex justify-space-between mt-4">
          <v-btn color="primary" @click="publishPost">Publish post</v-btn>
          <v-btn color="primary" @click="showArticleEditor">
            Open article editor
          </v-btn>
        </div>
        <EditArticleModal ref="articleModal" @create="createArticle" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";
import StaticImage from "@/core/components/StaticImage.vue";
import FormValidator from "@/core/mixins/FormValidator";
import EditArticleModal from "./EditArticleModal.vue";
import { PostsService } from "../services/posts.service";
import { AuthorType, PostType } from "@/@types";
import { AuthModule } from "@/modules/auth";
import { ImageService } from "@/core/services/image.service";
import { getFileName } from "@/core/utils";
import { BaseModule } from "@/modules/base";
import { OutputData } from "@editorjs/editorjs";

@Component({
  components: {
    StaticImage,
    EditArticleModal,
  },
})
export default class ArticleField extends Mixins(FormValidator) {
  postData = {
    text: "",
    files: [],
    likes: [],
  };
  formRef = "form";
  panels = [];

  @Prop({
    type: String,
    required: false,
  })
  readonly communityId: string;

  async publishPost() {
    if (!this.validateForm()) return;

    BaseModule.setLoadingStatus(true);

    const data = {
      text: this.postData.text,
      files: this.postData.files.map(file => file.name),
      likes: [],
    };

    const { _post_id } = await PostsService.createPost(
      data,
      PostType.POST,
      this.communityId ? AuthorType.COMMUNITY : AuthorType.USER,
      this.communityId || AuthModule._user.id,
      data.files,
    );

    await Promise.all(
      this.postData.files.map((file: File) =>
        ImageService.uploadFile(file, `posts/${_post_id}`, getFileName(file)),
      ),
    );

    BaseModule.setLoadingStatus(false);

    BaseModule.showMessage({
      message: "Post successfully added",
      color: "success",
    });

    this.postData.text = "";
    this.postData.files = [];
    this.postData.likes = [];

    this.panels = [];
    this.resetForm();

    this.$emit("post-added");
    this.$refs.articleModal.cancel();
  }

  $refs: {
    articleModal: EditArticleModal;
  };
  showArticleEditor() {
    this.$refs.articleModal.show();
  }

  async createArticle(data: OutputData) {
    BaseModule.setLoadingStatus(true);

    await PostsService.createPost(
      {
        ...data,
        likes: [],
      },
      PostType.ARTICLE,
      this.communityId ? AuthorType.COMMUNITY : AuthorType.USER,
      this.communityId || AuthModule._user.id,
      [],
    );

    BaseModule.setLoadingStatus(false);

    BaseModule.showMessage({
      message: "Article successfully added",
      color: "success",
    });

    this.panels = [];

    this.$emit("post-added");
  }
}
</script>

<style lang="scss" scoped></style>

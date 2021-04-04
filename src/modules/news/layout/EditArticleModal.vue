<template>
  <v-dialog v-model="isShow" fullscreen persistent>
    <v-card>
      <v-card-title>Write an article</v-card-title>
      <v-card-text>
        <Editor id="edit-article-modal" ref="editor" />
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-btn color="primary" @click="publish">Publish article</v-btn>
        <v-btn color="primary" text outlined @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Editor from "@/core/components/Editor.vue";
import { BaseModule } from "@/modules/base";
import { getBlock } from "@/core/utils";

@Component({
  components: {
    Editor,
  },
})
export default class EditArticleModal extends Vue {
  isShow = false;

  show() {
    this.isShow = true;
  }

  $refs: {
    editor: Editor;
  };
  async publish() {
    const data = await this.$refs.editor.save();
    if (!data.blocks.length) {
      return BaseModule.showMessage({
        message: "Article cannot be empty",
        color: "error",
      });
    }

    const h = getBlock(data.blocks, "header");
    if (!h) {
      return BaseModule.showMessage({
        message: "Article must contain at least one header",
        color: "error",
      });
    }

    const p = getBlock(data.blocks, "paragraph");
    if (!p) {
      return BaseModule.showMessage({
        message: "Article must contain at least one paragraph",
        color: "error",
      });
    }

    this.$emit("create", data);
  }

  cancel() {
    this.isShow = false;
    this.$refs.editor.clear();
  }
}
</script>

<style lang="scss" scoped></style>

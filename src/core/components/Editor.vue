<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";

@Component({})
export default class Editor extends Vue {
  edtitor: EditorJS = null;

  @Prop(String)
  readonly id: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly readonly: boolean;

  @Prop({
    type: Object,
    required: false,
  })
  readonly data: any;

  mounted() {
    this.edtitor = new EditorJS({
      holder: this.id,
      tools: {
        header: Header,
        list: List,
        embed: Embed,
        quote: Quote,
        checklist: Checklist,
        image: SimpleImage,
      },
      autofocus: true,
      placeholder: "Let`s write an awesome story!",
      readOnly: this.readonly,
      data: this.data,
    });
  }

  public async save() {
    return this.edtitor.save();
  }

  public clear() {
    this.edtitor.clear();
  }
}
</script>

<style lang="scss" scoped></style>

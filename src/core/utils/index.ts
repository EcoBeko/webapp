import { OutputBlockData } from "@editorjs/editorjs";

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function getFileName(file: File) {
  return file.name.substr(0, file.name.lastIndexOf("."));
}

export function getBlock(blocks: OutputBlockData[], type: string) {
  return blocks.find(block => block.type == type);
}

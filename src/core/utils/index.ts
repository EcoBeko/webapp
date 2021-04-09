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

export function titleFilter(str: string) {
  if (!str) return;
  return str?.replace(/\\/g, "");
}
export function descriptionFilter(str: string) {
  if (!str) return;

  const threshold = 100;
  if (str.length < threshold) {
    return str.replace(/\\/g, "");
  }
  return str.slice(0, threshold - 3).replace(/\\/g, "") + "...";
}

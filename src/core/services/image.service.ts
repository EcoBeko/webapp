import { api } from "./api.service";

export class ImageService {
  public static async uploadFile(
    file: File,
    filePath: string,
    fileName: string,
  ) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("path", filePath);
    formData.append("name", fileName);
    const { data } = await api.post("images", formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    return data;
  }
}

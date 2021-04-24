import { ApiCatch } from "@/core/decorators";
import { api } from "@/core/services/api.service";

export class ModerationService {
  @ApiCatch
  public static async authenticate(username: string, password: string) {
    const { data } = await api.post("moderation/authenticate", {
      username,
      password,
    });

    return data;
  }

  public static async addProject(
    title: string,
    description: string,
    image_path: string,
    link: string,
  ) {
    const { data } = await api.post("moderation/projects", {
      title,
      description,
      image_path,
      link,
    });

    return data;
  }

  public static async updateProject(id: string, status: string) {
    const { data } = await api.put("moderation/projects/" + id, {
      status,
    });

    return data;
  }

  public static async getProjects() {
    const { data } = await api.get("moderation/projects");
    return data;
  }
}

import { api } from "@/core/services/api.service";

export class EcoProjectsService {
  public static async search(title: string, status: string) {
    const { data } = await api.get("eco-projects", {
      params: {
        title,
        status,
      },
    });
    return data;
  }
}

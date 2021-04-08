import { api } from "@/core/services/api.service";

export class CommunitiesService {
  public static async getCommunities(title: string, description: string) {
    const { data } = await api.get("communities", {
      params: {
        title,
        description,
      },
    });

    return data;
  }
}

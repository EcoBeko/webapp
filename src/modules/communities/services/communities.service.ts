import { ApiCatch } from "@/core/decorators";
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

  @ApiCatch
  public static async getCommunity(userId: string, id: string) {
    const { data } = await api.get("communities/" + id, {
      params: {
        userId,
      },
    });

    return data;
  }

  public static async create(
    userId: string,
    title: string,
    description: string,
    imagePath: string,
  ) {
    const { data } = await api.post("communities", {
      userId,
      title,
      description,
      imagePath,
    });

    return data;
  }

  public static async getSubs(id: string) {
    const { data } = await api.get("communities/" + id + "/subs");

    return data;
  }

  public static async updateStatus(id: string, userId: string, status: string) {
    const { data } = await api.put("communities/" + id + "/subs/" + userId, {
      status,
    });

    return data;
  }

  public static async subscribe(id: string, userId: string) {
    const { data } = await api.post("communities/" + id + "/subs/" + userId);

    return data;
  }
}

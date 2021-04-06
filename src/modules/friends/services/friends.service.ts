import { ApiCatch } from "@/core/decorators";
import { api } from "@/core/services/api.service";

export class FriendsService {
  public static async getUserFriends(userId: string) {
    const { data } = await api.get("friends/" + userId);

    return data;
  }

  public static async fetchUsers(
    firstName: string,
    lastName: string,
    gender: string,
  ) {
    const { data } = await api.get("users", {
      params: {
        firstName: firstName || null,
        lastName: lastName || null,
        gender: gender || null,
      },
    });

    return data;
  }

  @ApiCatch
  public static async fetchFriend(userId: string, friendId: string) {
    const { data } = await api.get(`friends/${userId}/friend/${friendId}`);

    return data;
  }

  public static async updateStatus(
    userId: string,
    friendId: string,
    status: string,
  ) {
    const { data } = await api.put(`friends/${userId}/friend/${friendId}`, {
      status,
    });

    return data;
  }

  public static async getUserRecommendations(userId: string) {
    const { data } = await api.get(`friends/${userId}/recommendations`);

    return data;
  }
}

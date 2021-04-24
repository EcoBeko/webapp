import { ApiCatch } from "@/core/decorators";
import { api } from "@/core/services/api.service";

export class AdminService {
  @ApiCatch
  public static async authenticate(username: string, password: string) {
    const { data } = await api.post("admin/authenticate", {
      username,
      password,
    });

    return data;
  }

  public static async getModerators() {
    const { data } = await api.get("admin/moderators");

    return data;
  }

  public static async addModerator(username: string, password: string) {
    const { data } = await api.post("admin/moderators", {
      username,
      password,
    });

    return data;
  }

  public static async removeId(id: string) {
    const { data } = await api.delete("admin/moderators/" + id);

    return data;
  }
}

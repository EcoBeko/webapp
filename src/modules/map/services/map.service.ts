import { api } from "@/core/services/api.service";

export class MapService {
  public static async getPoints(city: string, type: string, ids: string[]) {
    const { data } = await api.post("points/" + city, {
      type,
      ids,
    });

    return data;
  }
}

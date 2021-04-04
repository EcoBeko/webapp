import { api } from "@/core/services/api.service";

export class StatsService {
  public static async getStatsTypes() {
    const { data } = await api.get("stats/types");
    return data;
  }

  public static async getUserStats(id: string) {
    const { data } = await api.get("stats/" + id);
    return data;
  }

  public static async getGlobalStats() {
    const { data } = await api.get("stats");
    return data;
  }

  public static async getWasteTypes() {
    const { data } = await api.get("stats/waste-types");
    return data;
  }

  public static async addStatsRecord(
    userId: string,
    wasteTypeId: string,
    amount: number,
  ) {
    const { data } = await api.post("stats", {
      userId,
      wasteTypeId,
      amount,
    });

    return data;
  }
}

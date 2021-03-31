import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "@/core/store";
import { api } from "@/core/services/api.service";

@Module({
  namespaced: true,
  dynamic: true,
  name: "news",
  store,
})
class NewsVuexModule extends VuexModule {
  stats = [];
  statsTypes = [];

  @MutationAction
  public async getStatsTypes() {
    const { data } = await api.get("stats/types");
    return {
      statsTypes: data,
    };
  }

  @MutationAction
  public async getUserStats(id: string) {
    const { data } = await api.get("stats/" + id);
    return {
      stats: data,
    };
  }

  @MutationAction
  public async getGlobalStats() {
    const { data } = await api.get("stats");
    return {
      stats: data,
    };
  }
}

export const NewsModule = getModule(NewsVuexModule);

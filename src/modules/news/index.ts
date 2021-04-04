import {
  getModule,
  Module,
  MutationAction,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "@/core/store";
import { StatsService } from "./services/stats.service";

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
    return {
      statsTypes: await StatsService.getStatsTypes(),
    };
  }

  @MutationAction
  public async getUserStats(id: string) {
    return {
      stats: await StatsService.getUserStats(id),
    };
  }

  @MutationAction
  public async getGlobalStats() {
    return {
      stats: await StatsService.getGlobalStats(),
    };
  }
}

export const NewsModule = getModule(NewsVuexModule);

import {
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "@/core/store";
import { TransitionName } from "./@types";

@Module({
  namespaced: true,
  dynamic: true,
  name: "base",
  store,
})
class BaseVuexModule extends VuexModule {
  transitionName: TransitionName = "slide-left";

  @Mutation
  public setTransitionName(name: TransitionName) {
    this.transitionName = name;
  }
}

export const BaseModule = getModule(BaseVuexModule);

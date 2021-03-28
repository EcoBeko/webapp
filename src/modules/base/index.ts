import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "@/core/store";
import { TransitionName } from "./@types";
import { SnackBarPayload } from "@/@types";

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

  snackBarPayload: SnackBarPayload = {
    show: false,
    message: "",
    color: "success",
    timeout: -1,
  };
  isLoading = false;

  @Mutation
  setSnackBarPayload(snackBarPayload: SnackBarPayload) {
    this.snackBarPayload = snackBarPayload;
  }

  @Mutation
  setLoadingStatus(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  @Action
  public async showMessage({ message, color, timeout = -1 }: SnackBarPayload) {
    this.setSnackBarPayload({
      message,
      color,
      timeout,
      show: true,
    });
  }
}

export const BaseModule = getModule(BaseVuexModule);

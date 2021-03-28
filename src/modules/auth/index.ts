import {
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { store } from "@/core/store";
import { IUser } from "@/@types";

@Module({
  namespaced: true,
  dynamic: true,
  name: "auth",
  store,
})
class AuthVuexModule extends VuexModule {
  _user: IUser | null = null;

  @Mutation
  public setUser(user: IUser) {
    this._user = user;
  }
}

export const AuthModule = getModule(AuthVuexModule);

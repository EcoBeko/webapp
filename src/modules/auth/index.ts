import { getModule, Module, VuexModule } from "vuex-module-decorators";
import { store } from "@/core/store";

@Module({
  namespaced: true,
  dynamic: true,
  name: "auth",
  store,
})
class AuthVuexModule extends VuexModule {}

export const AuthModule = getModule(AuthVuexModule);

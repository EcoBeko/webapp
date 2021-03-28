import { router } from "@/core/router";
import { api } from "@/core/services/api.service";
import { AuthModule } from "..";

export class AuthService {
  public static async login() {
    const token = AuthService.getLocalToken();

    if (!token) {
      return router.push({
        name: "welcome",
      });
    }

    try {
      // get user info
      const { data } = await api.get("users/info");

      AuthModule.setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      return router.push({
        name: "welcome",
      });
    }
  }

  public static getLocalToken() {
    return localStorage.getItem("token");
  }
}

import { UserRole } from "@/@types";
import { ApiCatch } from "@/core/decorators";
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

  @ApiCatch
  public static async authenticate(
    username: string,
    password: string,
    role: UserRole,
  ) {
    const { data } = await api.post("users/authenticate", {
      username,
      password,
      role,
    });

    return data;
  }

  public static getLocalToken() {
    return localStorage.getItem("token");
  }

  public static setLocalToken(token: string) {
    return localStorage.setItem("token", token);
  }
}

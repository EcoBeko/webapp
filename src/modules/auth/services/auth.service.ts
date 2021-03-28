import { router } from "@/core/router";
import { api } from "@/core/services/api.service";

export class AuthService {
  public static async login() {
    const token = AuthService.getLocalToken();

    if (!token) {
      router.push({
        name: "welcome",
      });
    }

    // get user info
    const { data } = await api.get("users/info");
  }

  public static getLocalToken() {
    return localStorage.getItem("token");
  }
}

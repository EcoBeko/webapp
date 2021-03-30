import { UserGender, UserRole } from "@/@types";
import { ApiCatch } from "@/core/decorators";
import { api } from "@/core/services/api.service";
import { AuthModule } from "..";

export class AuthService {
  public static async login() {
    const token = AuthService.getLocalToken();

    if (!token) return;

    try {
      // get user info
      const { data } = await api.get("users/info");

      AuthModule.setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  public static logout() {
    localStorage.removeItem("token");

    location.reload();
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

  @ApiCatch
  public static async createUser(
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    gender: UserGender,
    role: UserRole,
  ) {
    const { data } = await api.post("users", {
      first_name,
      last_name,
      username,
      password,
      gender,
      role,
    });

    return data;
  }

  @ApiCatch
  public static async updateUser(
    id: string,
    first_name: string,
    last_name: string,
    password: string,
    gender: UserGender,
    role: UserRole,
  ) {
    const { data } = await api.put("users/" + id, {
      first_name,
      last_name,
      password,
      gender,
      role,
    });

    return data;
  }

  public static getLocalToken() {
    return localStorage.getItem("token");
  }

  public static setLocalToken(token?: string) {
    return localStorage.setItem("token", token);
  }
}

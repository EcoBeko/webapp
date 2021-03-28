import axios, { AxiosResponse } from "axios";

import { AuthService } from "@/modules/auth/services/auth.service";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(config => {
  const token = AuthService.getLocalToken();
  if (token) {
    config.headers["authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  _ => _,
  async error => {
    const res = error.response as AxiosResponse;

    switch (res.status) {
      case 401:
        try {
          // await AuthModule.keycloak.updateToken(30);
          // token is valid, try original request again
          // updateLocalTokens();

          return api.request(res.config);
        } catch (error) {
          // AuthModule.keycloak.logout();
        }
        break;
      case 403:
        // HealthModule.changeSystemStatus();
        break;
    }
    return Promise.reject(error);
  },
);

export { api };

import axios, { AxiosResponse } from "axios";
import { router } from "@/core/router";

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
  error => {
    const response = error.response as AxiosResponse;

    if (response.status === 403) {
      localStorage.removeItem("token");
      router.push({
        path: "/",
      });
    }

    return Promise.reject(error);
  },
);

export { api };

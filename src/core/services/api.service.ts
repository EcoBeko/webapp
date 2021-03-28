import axios from "axios";

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

export { api };

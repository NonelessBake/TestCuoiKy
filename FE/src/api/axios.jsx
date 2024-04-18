import axios from "axios";
import { APP_CONFIG } from "../config/appConfig";
import { store } from "../store/config";
import { login, logout } from "../store/slice/auth";
import { authService } from "../services/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_BASE_URL || "http://localhost:5000",
  timeout: import.meta.env.VITE_REQUEST_HTTP_TIMEOUT || 10000,
});

axiosInstance.interceptors.request.use(function (config) {
  const {
    auth: { isLogin, accessToken },
  } = store.getState();

  if (isLogin && accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }

  return config;
});
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      if (error.config.url.includes("/authentication")) {
        localStorage.removeItem(APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN);
        const {
          auth: { isLogin },
        } = store.getState();
        if (isLogin) {
          store.dispatch(logout());
        }
      } else {
        const refreshToken = localStorage.getItem(
          APP_CONFIG.STORAGE_TOKEN_NAME.REFRESH_TOKEN
        );
        if (refreshToken) {
          const { accessToken, userInfo } = await authService.renewAccessToken(
            refreshToken
          );
          store.dispatch(login({ accessToken, userInfo }));
        } else {
          const {
            auth: { isLogin },
          } = store.getState();
          if (isLogin) {
            store.dispatch(logout());
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

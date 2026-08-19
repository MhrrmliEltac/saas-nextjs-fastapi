import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    // 401 alınsa belə /login-ə məcburi yönləndirmə etmə (məs. ictimai səhifələrdəki sakit auth yoxlamaları üçün).
    skipAuthRedirect?: boolean;
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/";

export const request = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Refresh çağırışı üçün ayrıca instance — əks halda özü də 401 interceptor-una düşüb sonsuz dövr yaradar.
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  try {
    await refreshClient.post("/auth/refresh");
    return true;
  } catch {
    return false;
  }
}

request.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/login")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null;
    });

    const refreshed = await refreshPromise;

    if (!refreshed) {
      if (!originalRequest.skipAuthRedirect && typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    return request(originalRequest);
  },
);

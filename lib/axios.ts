import axios from "axios";
import { getSession } from "next-auth/react";

export const API_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL;
export const API_SERVICE_URL = process.env.NEXT_PUBLIC_API_SERVICE_URL;
export const API_AIRTABLE_URL = process.env.NEXT_PUBLIC_API_AIRTABLE_URL;

const createApiClient = (baseURL: string) => {
  const noRedirect401Routes = [
    "/auth/verify-otp",
    "/auth/request-otp",
    "/auth/confirm-email",
  ];

  const pathname =
    globalThis.window === undefined ? "" : globalThis.window.location.pathname;

  const shouldSkipRedirect = noRedirect401Routes.some((r) =>
    pathname.startsWith(r)
  );

  const client = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60000,
  });

  client.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 && !shouldSkipRedirect) {
        // Fixed: Use globalThis consistently
        if (globalThis.window !== undefined) {
          globalThis.window.location.href = "/auth/login";
          console.log("401");
        }
      }
      throw error;
    }
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
        console.error("Request timeout:", error);
        error.message = "La requête a pris trop de temps. Veuillez réessayer.";
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const authApiClient = createApiClient(API_AUTH_URL as string);
export const api = createApiClient(API_SERVICE_URL as string);
export const airtableApiClient = createApiClient(API_AIRTABLE_URL as string);

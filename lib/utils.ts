import axios from "axios";
import Cookie from "js-cookie";

export const TOKEN_COOKIE = "token";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

API.interceptors.request.use((request) => {
  const token = Cookie.get(TOKEN_COOKIE);

  if (token) {
    request.headers!.Authorization = `Bearer ${token}`;
  }

  return request;
});

export const setCookies = (token: string) => {
  Cookie.set(TOKEN_COOKIE, token, {
    expires: 24 * 60 * 60 * 1000,
  });
};

export const logOut = () => {
  Cookie.remove(TOKEN_COOKIE);
};
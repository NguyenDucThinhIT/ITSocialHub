import http from "@/utils/http";

export const registerAccount = (body) => http.post("auth/register", body);

export const loginAccount = (body) => http.post("auth/login", body);

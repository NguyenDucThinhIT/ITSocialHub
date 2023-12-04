import http from "@/utils/http";

export const registerAccount = (body) => http.post("signup", body);
export const activeAccount = (body) => http.post("active-account", body);
export const loginAccount = (body) => http.post("login", body);

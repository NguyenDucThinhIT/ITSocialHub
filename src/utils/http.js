import axios from "axios";
import {
  getAccessTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
} from "./auth";

class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: "https://talenthabour.onrender.com/api/",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        this.accessToken = getAccessTokenFromLS();
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "login" || url === "register") {
          this.accessToken = response.data.access_token;
          setAccessTokenToLS(this.accessToken);
          setProfileToLS(response.data.user);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;

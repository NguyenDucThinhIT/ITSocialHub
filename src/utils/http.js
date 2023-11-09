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
      baseURL:
        "https://talenthabour.onrender.com/api/v1/",
      timeout: 15000,
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
        if (url === "auth/login" || url === "auth/register") {
          this.accessToken = response.data.data.token;
          setAccessTokenToLS(this.accessToken);
          setProfileToLS(response.data.data);
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

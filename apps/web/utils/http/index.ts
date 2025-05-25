import type { AxiosRequestConfig, AxiosResponse } from "axios";

import axios from "axios";

const instance = axios.create({
  // baseURL: "http://127.0.0.1:3001",
  baseURL: "http://192.168.132.23:3001",
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (config.headers) {
      const curToken = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${curToken}`;
    }
    return config;
  },
  function (error: unknown) {
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: unknown) {
    return Promise.reject(error);
  },
);

interface Data {
  [index: string]: unknown;
}

interface Http {
  get: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    data?: Data | Array<string>,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse<T>>;
  put: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  patch: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T>(url: string, data?: Data, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

const http: Http = {
  get(url, data, config) {
    return instance.get(url, {
      params: data,
      ...config,
    });
  },
  post(url, data, config) {
    return instance.post(url, data, config);
  },
  put(url, data, config) {
    return instance.put(url, data, config);
  },
  patch(url: string, data: any, config) {
    return instance.patch(url, data, config);
  },
  delete(url, data, config) {
    return instance.delete(url, {
      data,
      ...config,
    });
  },
};

export default http;

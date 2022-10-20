import Axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

export type AxiosResponse = {
  message: string;
  error: string;
  data: any;
};

const axios = Axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-token": process.env.SERVER_API_TOKEN!,
  },
});

axios.interceptors.response.use(
  (response) => response.data,
  ({ response }) => {
    // TODO: Custom login login
    // if (response.status === 401) {
    // }

    toast.error(response.data?.error);
    return Promise.reject(response.data);
  }
);

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");

  if (token) {
    config!.headers!.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default axios;

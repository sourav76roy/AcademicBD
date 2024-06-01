import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({ baseURL: import.meta.env.VITE_serverURL });

// console.log("import.meta.env.VITE_serverURL ", import.meta.env.VITE_serverURL);

export default function useAxiosSecure() {
  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  return { axiosSecure, baseURL: import.meta.env.VITE_serverURL };
}

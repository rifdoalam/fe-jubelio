import axios, { AxiosInstance } from "axios";

const clientSideApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default clientSideApi;

import axios from "axios";

const API_URL = "https://localhost:7014/api/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

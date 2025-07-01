import axios from "axios";
import config from "@/utils/config";

const apiClient = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

export default apiClient;

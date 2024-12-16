import { serverUrl } from "@/constants";
import axios from "axios";

const apiClient = () => {
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken) accessToken = JSON.parse(accessToken);

  return axios.create({
    baseURL: serverUrl,
    headers: {
      "Content-Type": "application/json", // Set default content type
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });
};

export default apiClient;

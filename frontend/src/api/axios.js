// Import axios
import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "https://rare-medicine-backend.onrender.com",
});

// Automatically send token
API.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    config.headers.Authorization =
      token;

  }

  return config;

});

// Export API
export default API;
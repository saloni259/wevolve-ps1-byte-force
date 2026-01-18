import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies (refreshToken, accessToken)
});

// Interceptor to add access token to requests if needed
// The backend uses cookies for tokens, so we might not need to manually add them to headers if withCredentials is true
// However, if the backend expects it in Authorization header:
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";

// if (!apiUrl) console.warn("Missing VITE_API_URL in .env");

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});


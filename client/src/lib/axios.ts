import axios, { AxiosError } from "axios"

const API_BASE_URL = import.meta.env.VITE_DEV_API

// Create axios instance
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // if you use cookies/sessions
    headers: {
        "Content-Type": "application/json",
    },
})

// Request Interceptor → attach token
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// Response Interceptor → handle errors globally
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        // If token expired or unauthorized
        if (error.response?.status === 401) {
            console.warn("Unauthorized! Token expired or invalid.")

            // Example auto-logout:
            if (typeof window !== "undefined") {
                localStorage.removeItem("token")
                window.location.href = "/login"
            }
        }

        return Promise.reject(error)
    }
)

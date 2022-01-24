import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

export default AxiosInstance;
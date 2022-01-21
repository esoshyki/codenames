import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json"
    }
});

export default API;
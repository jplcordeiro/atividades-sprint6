import axios from "axios";

export const api = axios.create({
    baseURL: "https://todolist-api-mu.vercel.app/",
    timeout: 8 * 1000,
})
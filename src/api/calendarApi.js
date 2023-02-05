import { getEnvVariables } from "../helpers";
import axios from "axios";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

// interceptors
calendarApi.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    config.headers = {
        ...config.headers,
        'x-token': token,
    };

    return config;
});

export default calendarApi;

    
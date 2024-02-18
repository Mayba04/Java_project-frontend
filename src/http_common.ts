import axios from "axios";
import {APP_ENV} from "./env";

console.log("URL", APP_ENV.BASE_URL);

const http_common = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

const http_get = axios.create({
    baseURL: APP_ENV.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    method: "GET" // Задаємо метод запиту GET
});

export default  http_common;
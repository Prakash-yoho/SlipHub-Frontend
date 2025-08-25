/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLocalStorage } from "../utils/localstorage";
import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_API_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
    },
});

Axios.interceptors.request.use((config: any) => {
    const token = GetLocalStorage("sh_tkn_a")
    if (token) {
        config.headers["Authorization"] = token
    }
    return config
})

Axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
        if (
            error?.response &&
            error?.response?.status === 401 &&
            error?.response?.statusText === 'Unauthorized'
        ) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('permissions');
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

class HttpClient {
    async get(url: string, params?: any) {
        const reponse = await Axios.get(url, { params });
        return reponse.data;
    }
    async post(url: string, data: any, params?: any) {
        const response = await Axios.post(url, data, { params });
        return response.data;
    }
    async put(url: string, data: any) {
        const response = await Axios.put(url, data);
        return response.data;
    }
    async delete(url: string) {
        const response = await Axios.delete(url);
        return response.data;
    }
    async uploadFile(url: string, data: any) {
        const response = await Axios.post(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }
    async getfile(url: string) {
        const response = await Axios.get(url, {
            responseType: "blob",
        })
        return response.data
    }
}

export default new HttpClient();

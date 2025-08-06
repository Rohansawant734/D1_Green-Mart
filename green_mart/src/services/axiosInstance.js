import axios from "axios";
import { config } from "./config";

const axiosInstance = axios.create({
    baseURL: config.serverUrl
})

axiosInstance.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('token')
        if(token){
            request.headers.Authorization = `Bearer ${token}`
        }
        return request
    },
    (error) => Promise.reject(error)
)

export default axiosInstance
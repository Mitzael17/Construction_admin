import axios from "axios";
import {URL} from "../data/config";
import {getCookie} from "../utils/cookie";
import {InternalAxiosRequestConfig} from "axios/index";

export const $API = axios.create({
    baseURL: URL,
});

export const $authAPI = axios.create({
    baseURL: URL,
});

const authInterceptor = (config: InternalAxiosRequestConfig) => {

    const token = getCookie('token');

    config.headers.authorization = `Bearer ${token}`;
    //config.withCredentials = false;

    return config;

}

const interceptor = (config: InternalAxiosRequestConfig) => {

   // config.withCredentials = false;

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;

}

$authAPI.interceptors.request.use(authInterceptor);
$API.interceptors.request.use(interceptor);
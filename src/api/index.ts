import axios from "axios";
import {URL} from "../data/config";
import {getCookie} from "../utils/cookie";
import {InternalAxiosRequestConfig} from "axios/index";
import {BaseData, EndPoints, ErrorResponse, SearchParameters} from "../types/API";

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
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    config.validateStatus = (status: number) => {

        return (status >= 200 && status < 300) || status == 404;

    }

    return config;

}

const interceptor = (config: InternalAxiosRequestConfig) => {

   // config.withCredentials = false;

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;

}

$authAPI.interceptors.request.use(authInterceptor);
$API.interceptors.request.use(interceptor);


export const $search = async (parameters: SearchParameters&{value:string}): Promise<BaseData[]|ErrorResponse> => {

    return await $baseGetRequest(EndPoints.search, parameters);

}


export async function $baseGetRequest<T, P extends Object>(url: string, params?: P): Promise<T> {


    const {data} = await $authAPI.get(url, {
        params
    }).catch(handlerErrorToken);

    return data;

}

export async function $basePostRequest<T, P extends Object>(url: string, params?: P): Promise<T> {

    const {data} = await $authAPI.post(url, params).catch(handlerErrorToken);

    return data;

}


export async function $baseDeleteRequest<T, P extends Object>(url: string, params?: P): Promise<T> {

    const {data} = await $authAPI.delete(url, {
        data: params
    }).catch(handlerErrorToken);

    return data;

}


export function handlerErrorToken(response: any) {

        if(response.request.status === 403) location.reload();

        return response;

}
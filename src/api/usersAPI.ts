import {$API, $authAPI} from "./index";
import {setCookie} from "../utils/cookie";
import {
    LoginResponse,
    OwnUserAccount,
    UserAccountResponse,
    UserCreateData,
    UserUpdateData
} from "../types/API/usersAPI";
import {EndPoints, ErrorResponse, SuccessResponse} from "../types/API";


export const $login = async (name: string, password: string): Promise<LoginResponse> => {


    const {data}: {data: LoginResponse} = await $API.post(EndPoints.login, {name, password});

    if(data.status === 'success') {

        setCookie('token', data.token, {"max-age": 3600});

    }

    return data;

}


export const $getUser = async (id: number): Promise<OwnUserAccount|UserAccountResponse> => {

    const {data} = await $authAPI.get(`${EndPoints.admins}/${id}`);

    return data;

}


export const $updateUser = async (id: number, args: UserUpdateData): Promise<ErrorResponse|SuccessResponse> => {

    const {data} = await $authAPI.post(`${EndPoints.admins}/${id}`, {...args});

    return data;

}


export const $createUser = async (args: UserCreateData): Promise<ErrorResponse|SuccessResponse> => {

    const {data} = await $authAPI.post(EndPoints.admins, {...args});

    return data;

}


export const $checkUserName = async (name: string): Promise<ErrorResponse|SuccessResponse> => {

    const {data} = await $authAPI.get(EndPoints.admins, {
        params: {check_name: name}
    })

    return data;

}
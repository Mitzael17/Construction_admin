import {$API, $baseGetRequest, $basePostRequest} from "./index";
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

    return await $baseGetRequest(`${EndPoints.admins}/${id}`);

}


export const $updateUser = async (id: number, args: UserUpdateData): Promise<ErrorResponse|SuccessResponse> => {

    return await $basePostRequest(`${EndPoints.admins}/${id}`, args);

}


export const $createUser = async (args: UserCreateData): Promise<ErrorResponse|SuccessResponse> => {

    return await $basePostRequest(EndPoints.admins, args);

}


export const $checkUserName = async (name: string): Promise<ErrorResponse|SuccessResponse> => {

    return await $baseGetRequest(EndPoints.admins, {check_name: name});

}
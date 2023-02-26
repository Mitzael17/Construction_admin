import {ErrorResponse, SuccessResponse} from "./index";

export type LoginResponse = SuccessResponse & {token: string} | ErrorResponse;

export interface UserAccountsResponse {

    id: number,
    name: string,
    image: string,
    blocked: 0 | 1,
    role: string

}

export interface UserAccountResponse extends UserAccountsResponse {

    priority: number
    password: null

}

export interface OwnUserAccount extends Omit<UserAccountResponse, 'password'> {

    password: string

}


export interface UserUpdateData {
    name ?: string,
    role_id?: number,
    password?: string,
    image?: string,
    blocked?: 0 | 1
}


export interface UserCreateData extends Omit<UserUpdateData, 'name' | 'role_id' | 'password'> {

    password: string,
    role_id: number,
    name: string

}
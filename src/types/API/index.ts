export enum Statuses {
    success = 'success',
    warning = 'warning',
    error = 'error'
}

interface Response<T> {

    status: T,
    message: string

}

export type ErrorResponse = Response<Statuses.error>;
export type WarningResponse = Response<Statuses.warning>;

export interface SuccessResponse {

    status: Statuses.success
    id?: number

}


export interface TokenData {

    id: number,
    password: string

}


export interface DecodeTokenResult {
    aud: string,
    data: TokenData,
    exp: number,
    iss: string
}


export type PostResponse = SuccessResponse|ErrorResponse|WarningResponse;

export interface BaseData {

    id: number;
    name: string;

}

export interface GetRequestDefaultParameters {

    search?: string,
    limit?: number,
    page?: number,
    sort?: string,

}
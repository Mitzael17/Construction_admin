export enum Statuses {
    success = 'success',
    warning = 'warning',
    error = 'error'
}

export enum Sorts {
    newest = 'newest',
    oldest = 'oldest'
}

export const enum EndPoints {

    files = '/files',
    clients = '/clients',
    projects = '/projects',
    route = '/route',
    admins = '/admins',
    login = '/login',
    services = '/services',
    search = '/search',
    logs = '/logs',
}

interface Response<T> {

    status: T,
    message: string,
    arr_id?: number[]

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

export interface SearchParameters {

    table: string,
    limit?: number,
    field?: string

}


export interface DefaultGetListParameters {

    search?: string,
    sort?: string,
    limit?: number,
    page?: number

}

//export type ProjectSorts = Sorts.newest|Sorts.oldest;
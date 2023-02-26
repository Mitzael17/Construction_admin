export enum Statuses {
    success = 'success',
    warning = 'warning',
    error = 'error'
}

export interface ErrorResponse {
    status: Statuses.error,
    message: string

}

export interface PartialSuccessResponse {
    status: Statuses.warning,
    'not removed': string
}

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


export type PostResponse = SuccessResponse|ErrorResponse|PartialSuccessResponse;
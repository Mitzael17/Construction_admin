
enum Statuses {
    success = 'success',
    partial_success = 'partial_success',
    error = 'error'
}

export interface ErrorResponse {
    status: Statuses.error,
    message: string

}

export interface PartialSuccessResponse {
    status: Statuses.partial_success,
    'not removed': string
}

interface SuccessResponse {

    status: Statuses.success

}

export interface InsertSuccessResponse extends SuccessResponse {
    id: number
}

interface LoginSuccessResponse extends SuccessResponse {

    token: string

}

export type LoginResponse = LoginSuccessResponse | ErrorResponse;

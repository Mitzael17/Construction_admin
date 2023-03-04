import {ErrorResponse, SuccessResponse, WarningResponse} from "./index";

export interface FilesResponse {
    directories: string[],
    files: {name: string, link: string}[]
}


export type UploadFilesResponse = Pick<FilesResponse, 'files'>&SuccessResponse|ErrorResponse|WarningResponse&Pick<FilesResponse, 'files'>;

export type CheckNames = SuccessResponse|Pick<WarningResponse, 'status'>&{busy_names: string[]};
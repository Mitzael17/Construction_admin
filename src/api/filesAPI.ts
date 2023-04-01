import {CheckNames, FilesResponse, UploadFilesResponse} from "../types/API/files";
import {$authAPI, $baseDeleteRequest, $baseGetRequest, $basePostRequest, handlerErrorToken} from "./index";
import {EndPoints, ErrorResponse, PostResponse} from "../types/API";

export const $getFiles = async (dir = ''): Promise<FilesResponse | ErrorResponse> => {

    return await $baseGetRequest(EndPoints.files, {dir});

}

export const $checkFileNames = async (check_names: string[], dir = ''): Promise<CheckNames> => {

    return await $baseGetRequest(EndPoints.files, {check_names, dir});

}

export const $uploadFiles = async (files: FileList|File[], directory = '', auto_rename = false):  Promise<UploadFilesResponse> => {

    const formData = new FormData();

    [...files].forEach( (file, index) => {

        formData.append(`files[${index}]`, file);

    });

    formData.append('dir', directory)

    if(auto_rename) {
        formData.append('auto_rename', 'true');

    }

    const {data}: {data: UploadFilesResponse} = await $authAPI.post(EndPoints.files, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).catch(handlerErrorToken);

    return data;

}

export const $createFolder = async (new_directory: string): Promise<PostResponse> => {

    return await $basePostRequest(EndPoints.files, {new_directory});

}

export const $deleteFiles = async (files: string[]): Promise<PostResponse> => {

    return await $baseDeleteRequest(EndPoints.files, {files});

}
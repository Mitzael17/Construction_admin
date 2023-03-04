import {CheckNames, FilesResponse, UploadFilesResponse} from "../types/API/files";
import {$authAPI} from "./index";
import {ErrorResponse, PostResponse, SuccessResponse, WarningResponse} from "../types/API";

export const $getFiles = async (dir = ''): Promise<FilesResponse | ErrorResponse> => {

    const {data}: {data: FilesResponse} = await $authAPI.get('/files', {params: {
        dir: dir
    }});

    return data;

}

export const $checkFileNames = async (names: string[], dir = ''): Promise<CheckNames> => {

    const {data}: {data: CheckNames} = await $authAPI.get('/files', {params: {
        check_names: names,
        dir: dir
    }})

    return data;

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

    const {data}: {data: UploadFilesResponse} = await $authAPI.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return data;

}

export const $createFolder = async (new_directory: string): Promise<PostResponse> => {

    const {data} = await $authAPI.post('/files', {new_directory});

    return data;

}

export const $deleteFiles = async (files: string[]): Promise<PostResponse> => {

    const {data} = await $authAPI.delete('/files', {
       data: {
           files: files
       }
    })

    return data;

}
import {FilesResponse} from "../types/API/files";
import {$authAPI} from "./index";
import {ErrorResponse, PostResponse} from "../types/API";

export const $getFiles = async (dir = ''): Promise<FilesResponse | ErrorResponse> => {

    const {data}: {data: FilesResponse} = await $authAPI.get('/files', {params: {
        dir: dir
    }});

    return data;

}


export const $uploadFiles = async (files: FileList, directory = ''): Promise<PostResponse> => {

    const formData = new FormData();

    [...files].forEach( (file, index) => {

        formData.append(`files[${index}]`, file);

    });

    formData.append('dir', directory);

    const {data}: {data: PostResponse} = await $authAPI.post('/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return data;

}
import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {FilesResponse} from "../API/files";
import {FileManagerProps} from "../components/ModalsComponents";

export interface FileManagerContextValues extends Omit<FileManagerProps, 'setImage'>{
    arrDirectories: string[],
    isLoading: boolean,
    data: FilesResponse,
    filteredData: FilesResponse,
    checkedNames: string[],
    inputFileRef: MutableRefObject<null|HTMLInputElement>,
    uploadedFiles: FileList|null,

}
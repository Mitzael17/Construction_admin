import {MutableRefObject} from "react";
import {FilesResponse} from "../API/files";
import {FileManagerProps} from "../components/ModalsComponents";

export interface FileManagerContextValues extends Omit<FileManagerProps, 'setFile'>{
    arrDirectories: string[],
    isLoading: boolean,
    data: FilesResponse,
    filteredData: FilesResponse,
    checkedNames: string[],
    inputFileRef: MutableRefObject<null|HTMLInputElement>,
    uploadedFiles: FileList|null,

}
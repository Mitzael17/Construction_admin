import {StateCallbackProps} from "./index";
import {Dispatch, SetStateAction} from "react";
import {FilesResponse} from "../API/files";
import {BaseData} from "../API";


export interface ModalProps extends StateCallbackProps<boolean> {

    children: JSX.Element | string,
    title: string,
    zIndex?: number,

}


export interface FileManagerProps {
    setFile: Dispatch<SetStateAction<{inner_link: string, out_link: string}>>,
    setVisible: Dispatch<SetStateAction<boolean>>,
    prevTitle?: string|null,
}


export interface FilePreview {

    id: number,
    fileData: File,
    preview: string,
    name: string,
    extension: string

}

interface FileReducerActionSet {

    type: 'set',
    data: FilePreview[],

}

interface FileReducerActions {
    type: 'change'|'delete',
    data: FilePreview
}

export type FileReducerAction = FileReducerActionSet|FileReducerActions;

export interface FileManagerDirectoriesListProps {

    directory: string;
    directories: string[];
    setDirectory: (dir: string) => void;
    setCheckedNames: Dispatch<SetStateAction<string[]>>;

}

export type FileManagerFilesListProps =
    Omit<FileManagerDirectoriesListProps, 'directories'|'setDirectory'> &
    Pick<FileManagerProps, 'setFile'> &
    Pick<FilesResponse, 'files'> &
    {hideFileManager: () => void};



export interface FilterProjectProps {

    statuses: BaseData[],
    setStatus: Dispatch<SetStateAction<BaseData[]>>;
    clients: BaseData[],
    setClient: Dispatch<SetStateAction<BaseData[]>>;
    service: BaseData[];
    setService: Dispatch<SetStateAction<BaseData[]>>;

}
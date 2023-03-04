import {StateProps} from "./index";
import {Dispatch, MutableRefObject, SetStateAction} from "react";


export interface ModalProps extends StateProps<boolean> {

    children: JSX.Element | string,
    title: string,
    zIndex?: number,

}


export interface FileManagerProps {
    setImage: Dispatch<SetStateAction<{inner_link: string, out_link: string}>>,
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
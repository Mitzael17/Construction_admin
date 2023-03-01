import {StateProps} from "./index";
import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {FilesResponse} from "../API/files";

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


export interface FileManagerHeaderProps extends Omit<FileManagerProps, 'setImage'>{
    directory: string,
    setArrDirectories: Dispatch<SetStateAction<string[]>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    data: MutableRefObject<null|FilesResponse>,
    filteredData: FilesResponse,
    setFilteredData: Dispatch<SetStateAction<FilesResponse>>,
    checkedNames: string[],
    contentRef: MutableRefObject<null|HTMLDivElement>



}
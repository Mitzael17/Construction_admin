import {StateProps} from "./index";
import {Dispatch, SetStateAction} from "react";

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
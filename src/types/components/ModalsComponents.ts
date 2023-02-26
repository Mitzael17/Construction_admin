import {StateProps} from "./index";

export interface ModalProps extends StateProps<boolean> {

    children: JSX.Element | string,
    title: string

}
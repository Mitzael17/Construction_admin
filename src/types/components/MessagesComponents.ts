import {StateProps} from "./index";
import {Dispatch, SetStateAction} from "react";

export interface ErrorProps extends Pick<StateProps<boolean>, 'value'> {

    children: string
    setValue?: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void)

}
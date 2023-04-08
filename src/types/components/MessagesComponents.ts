import {StateCallbackProps} from "./index";
import {Dispatch, SetStateAction} from "react";

export interface ErrorProps extends Pick<StateCallbackProps<boolean>, 'value'> {

    children: string
    setValue?: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void)

}
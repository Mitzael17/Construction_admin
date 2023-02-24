import {stateProps} from "./index";
import {ComponentProps} from "react";

export interface InputProps extends stateProps<string>{

    placeholder: string,
    type?: 'password' | 'text'

}

export interface ButtonProps {

    children: any,
    props?: any

}
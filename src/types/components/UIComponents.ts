import {StateProps} from "./index";
import {MouseEventHandler} from "react";

export interface InputProps extends StateProps<string>{

    placeholder: string,
    type?: 'password' | 'text'

}

export interface ButtonProps {

    children: any,
    onClick?: MouseEventHandler

}
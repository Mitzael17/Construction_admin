import {StateProps} from "./index";
import {MouseEventHandler} from "react";

export interface InputProps extends StateProps<string>{

    placeholder: string,
    type?: 'password' | 'text'

}

export interface ButtonProps {

    children: any,
    type?: 'button' | 'submit',
    onClick?: MouseEventHandler

}

export interface SearchInputProps extends Omit<InputProps, 'type'> {

    onClick: MouseEventHandler

}
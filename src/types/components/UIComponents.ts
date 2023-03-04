import {StateProps} from "./index";
import {ChangeEventHandler, MouseEventHandler, RefObject} from "react";

export interface InputProps extends StateProps<string>{

    placeholder: string,
    type?: 'password' | 'text',

}

export interface ButtonProps {

    children: any,
    type?: 'button' | 'submit',
    onClick?: MouseEventHandler,
    disabled?: boolean,

}

export interface SearchInputProps extends Omit<InputProps, 'type'> {

    onClick: MouseEventHandler

}

export interface CheckBoxProps {

    placeholder?: string
    name?: string
    onChange: ChangeEventHandler<HTMLInputElement>

}
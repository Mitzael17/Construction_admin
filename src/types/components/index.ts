import {Dispatch, SetStateAction} from "react";


export interface StateCallbackProps<Type> {
    value: Type,
    setValue: Dispatch<SetStateAction<Type>> | ((value: Type, prevValue?: Type) => void)

}


export interface StateProps<Type> {

    value: Type,

    setValue: Dispatch<SetStateAction<Type>>

}
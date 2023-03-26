import {Dispatch, SetStateAction} from "react";


export interface StateProps<Type> {
    value: Type,
    setValue: Dispatch<SetStateAction<Type>> | ((value: Type, prevValue?: Type) => void)

}
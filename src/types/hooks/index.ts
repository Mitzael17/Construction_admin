import React, {Dispatch, SetStateAction} from "react";
import {BaseData} from "../API";



interface UseValidationDefault<T> {

    name: string;
    value: T;
    callbackChecker?: (value: T) => {isValid: boolean, message: string} | Promise<{isValid: boolean, message: string}>,

}

interface UseValidationStringOrNumber<T extends string|number> extends UseValidationDefault<T> {
    max?: number;
    min?: number;
}


export type UseValidation =
    UseValidationStringOrNumber<number>|
    UseValidationStringOrNumber<string>|
    UseValidationDefault<boolean>;

export interface ValidationErrors {
    name: string;
    message: string;
}

export type UseForeignKeysListReturnValue = [string, Dispatch<SetStateAction<string>>, BaseData[], boolean];

export type UseHeightTransitionValue = [boolean, Dispatch<SetStateAction<boolean>>, React.MutableRefObject<HTMLDivElement|null>]




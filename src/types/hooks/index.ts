
export type UseStateCallback = <Type>(initialState: Type, callback: (state: Type) => Type, dependencies?: any[]) => [Type, (state: Type) => void];

export interface UseFilterDuplicateData<T> {
    [name: string]: T[keyof T]
}

interface UseValidationDefault<T> {

    name: string;
    value: T;
    callbackChecker?: () => {isValid: boolean, message: string}|Promise<{isValid: boolean, message: string}>,

}
interface UseValidationStringOrNumber<T extends string|number> extends UseValidationDefault<T> {
    max?: number;
    min?: number;
}


export type UseValidation =
    UseValidationDefault<boolean>|
    UseValidationStringOrNumber<number>|
    UseValidationStringOrNumber<string>


export interface ValidationErrors {
    name: string;
    message: string;
}

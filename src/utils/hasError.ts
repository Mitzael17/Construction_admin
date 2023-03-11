import {ValidationErrors} from "../types/hooks";

export function hasError(errors: ValidationErrors[], name: string): ValidationErrors | undefined {

    return errors.find( obj => obj.name === name);

}
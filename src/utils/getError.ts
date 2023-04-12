import {ValidationErrors} from "../types/hooks";

export function getError(errors: ValidationErrors[], name: string): ValidationErrors | undefined {

    return errors.find( obj => obj.name === name);

}
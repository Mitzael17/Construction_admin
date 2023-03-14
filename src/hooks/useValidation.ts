import {UseValidation, ValidationErrors} from "../types/hooks";
import {useEffect, useState} from "react";

export const useValidation = (data: UseValidation[]): [errors: ValidationErrors[], isLoading: boolean] => {

    const copyData: UseValidation[] = [...data];

    const [errors, setErrors] = useState<ValidationErrors[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {

        let ignore = false;

        setIsLoading(true);

        const timer = setTimeout( async () => {


            const arrToCheck: UseValidation[] = [];

            copyData.forEach( (obj, index) => {

                if(obj.value === data[index].value) arrToCheck.push(obj);

            });

            const newErrors: ValidationErrors[] = [];

            for (const obj of arrToCheck) {

                if(typeof obj.value === 'string') {

                    if(typeof obj.max !== 'undefined' && obj.value.length > obj.max) {

                        newErrors.push(
                            {
                                name: obj.name,
                                message: 'Length must be less than ' + (obj.max + 1),
                            }
                        );

                        continue;

                    }

                    if(typeof obj.min !== 'undefined' && obj.value.length < obj.min) {

                        newErrors.push(
                            {
                                name: obj.name,
                                message: 'Length must be more than ' + (obj.min - 1),
                            }
                        );

                        continue;


                    }

                }

                if(typeof obj.value === 'number') {

                    if(typeof obj.max !== 'undefined' && obj.value > obj.max) {

                        newErrors.push(
                            {
                                name: obj.name,
                                message: 'Number must be less than ' + (obj.max + 1),
                            }
                        );

                        continue;


                    }

                    if(typeof obj.min !== 'undefined' && obj.value < obj.min) {

                        newErrors.push(
                            {
                                name: obj.name,
                                message: 'Number must be more than ' + (obj.min - 1),
                            }
                        );

                        continue;


                    }

                }


                if(obj.callbackChecker) {


                    const result = await obj.callbackChecker();

                    if(!result.isValid) {

                        newErrors.push(
                            {
                                name: obj.name,
                                message: result.message,
                            }
                        );


                    }

                }

                if(ignore) return;

                setErrors(newErrors);

            }

            setIsLoading(false);

        }, 500);

        return () => {
            clearTimeout(timer);
            ignore = true;
        }

    }, [data]);

    return [errors, isLoading];

}
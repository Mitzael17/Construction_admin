import {useEffect, useState} from "react";
import {BaseData, SearchParameters} from "../types/API";
import {$search} from "../api";
import {UseForeignKeysListReturnValue} from "../types/hooks";

export const useListForeignKeys = (parameters: SearchParameters): UseForeignKeysListReturnValue => {

    const [searchValue, setSearchValue] = useState('');
    const [values, setValues] = useState<BaseData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let ignore = false;

        const timer = setTimeout( async () => {

            setIsLoading(true);

            const result = await $search({...parameters, value: searchValue});

            if(ignore) return;

            if('message' in result) {
                console.log(result.message);
                return;
            }

            setValues(result);
            setIsLoading(false);


        }, 500)

        return () => {

            ignore = true;
            clearTimeout(timer);

        }

    }, [searchValue])

    return [searchValue, setSearchValue, values, isLoading];

}
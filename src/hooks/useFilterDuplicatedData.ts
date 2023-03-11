import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {UseFilterDuplicateData} from "../types/hooks";
import {isEqual} from "../utils/isEqual";

export const useFilterDuplicatedData = <T>(initialData: T, newData: T): [UseFilterDuplicateData<T>, Dispatch<SetStateAction<T>>] => {

    const [data, setData] = useState<UseFilterDuplicateData<T>>({});
    const [initialDataState, setInitialDataState]= useState(initialData);

    let buffer: UseFilterDuplicateData<T> = {};

    useEffect( () => {

        for(let key in newData) {

            if( !isEqual(initialDataState[key], newData[key]) ) buffer[key] = newData[key];
            else delete buffer[key];
        }

        if(isEqual(buffer, data)) return;

        setData(buffer);

    }, [newData, initialDataState, data]);


    return [data, setInitialDataState];

}
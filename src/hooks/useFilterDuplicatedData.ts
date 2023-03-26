import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {isEqual} from "../utils/isEqual";
import {ObjectAnyStructure} from "../types";

export const useFilterDuplicatedData = <T>(initialData: T, newData: T): [ObjectAnyStructure<T>, Dispatch<SetStateAction<T>>] => {

    const [data, setData] = useState<ObjectAnyStructure<T>>({});
    const [initialDataState, setInitialDataState]= useState(initialData);

    let buffer: ObjectAnyStructure<T> = {};

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
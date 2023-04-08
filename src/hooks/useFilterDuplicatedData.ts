import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {isEqual} from "../utils/isEqual";
import {ObjectSameTypeValues} from "../types";

export const useFilterDuplicatedData = <T>(initialData: T, newData: T): [ObjectSameTypeValues<T>, Dispatch<SetStateAction<T>>] => {

    const [data, setData] = useState<ObjectSameTypeValues<T>>({});
    const [initialDataState, setInitialDataState]= useState(initialData);

    let buffer: ObjectSameTypeValues<T> = {};

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
import {useCallback, useState} from "react";
import {UseStateCallback} from "../types/hooks";

export const useStateCallback: UseStateCallback = <Type>(initialState: Type, callback: () => void) => {

    const [state, setState] = useState(initialState);

    const setStateCallback = useCallback((state: Type) =>  {

        setState(state);

        callback();

    }, []);

    return [state, setStateCallback];
}
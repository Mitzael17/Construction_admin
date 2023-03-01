import {useCallback, useState} from "react";
import {UseStateCallback} from "../types/hooks";

export const useStateCallback: UseStateCallback = <Type>(initialState: Type, callback: (state: Type) => Type) => {

    const [state, setState] = useState(initialState);

    const setStateCallback = useCallback((state: Type) =>  {

        const nextState = callback(state);

        setState(nextState);

    }, []);

    return [state, setStateCallback];
}
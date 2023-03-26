import {useCallback, useState} from "react";

export const useStateCallback =
    <Type>(initialState: Type,
                             callback: (value: Type, state: Type) => Type, dependencies: any[] = []
    ): [Type, (value: Type) => void] => {

    const [state, setState] = useState(initialState);

    const setStateCallback = useCallback((value: Type) =>  {

        const nextState = callback(value, state);

        setState(nextState);

    }, [state, ...dependencies]);

    return [state, setStateCallback];
}
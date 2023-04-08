import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {useSearchContext} from "./contextHooks/useSearchContext";

export const useSearchForSearchContext = (callback: Function): [string, Dispatch<SetStateAction<string>>] => {

    const [search, setSearch] = useSearchContext();
    const prevSearch = useRef(search);

    useEffect( () => {

        if(search === prevSearch.current) return;

        const timer = setTimeout( () => {

            prevSearch.current = search;

            callback();

        }, 500);

        return () => {
            clearTimeout(timer);
        };

    }, [search])

    return [search, setSearch];

}

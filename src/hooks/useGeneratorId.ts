import {useRef} from "react";

export const useGeneratorId = () => {

    const arr_id = useRef(0);

    return () => arr_id.current++;

}
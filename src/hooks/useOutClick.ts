import {Dispatch, RefObject, SetStateAction, useEffect, useState} from "react";

export const useOutClick = (ref: RefObject<Element>): [boolean, Dispatch<SetStateAction<boolean>>] => {

    const [show, setShow] = useState(false);

    useEffect(() => {

        function hide(event: MouseEvent) {

            if(!ref.current || ref.current.contains(event.target as HTMLElement) || !show) return;

            setShow(false);

        }

        document.body.addEventListener('click', hide);

        return () => {
            document.body.removeEventListener('click', hide);
        }

    }, [ref, show]);

    return [show, setShow];

}
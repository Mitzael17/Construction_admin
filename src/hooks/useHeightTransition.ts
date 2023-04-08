import {useEffect, useRef, useState} from "react";
import {UseHeightTransitionValue} from "../types/hooks";

export const useHeightTransition = (transition = 500): UseHeightTransitionValue => {

    const [isOpen, setIsOpen] = useState(false);
    const nodeRef = useRef<HTMLDivElement>(null);

    // Base styles for correct work
    useEffect(() => {

        if(!nodeRef.current) return;

        nodeRef.current.style.height = '0px';
        nodeRef.current.style.overflow = 'hidden';

        nodeRef.current.style.transition = `${transition}ms height`;

    }, [nodeRef.current])

    useEffect(() => {

        if(!nodeRef.current) return;

        nodeRef.current.ontransitionend = handlerTransitionEnd;

        if(isOpen) {

            nodeRef.current.style.height = nodeRef.current.scrollHeight + 'px';

            return;

        }

        // Height must be in "px" for animation
        nodeRef.current.style.height = nodeRef.current.offsetHeight + 'px';

        // Delay the height reduction to avoid errors in animation
        setTimeout(() => {

            if(!nodeRef.current) return;

            nodeRef.current.style.height = '0px';

        }, 20);


    }, [isOpen]);


    return [isOpen, setIsOpen, nodeRef];

    function handlerTransitionEnd(event: TransitionEvent) {

        if(!isOpen || event.propertyName !== 'height') return;

        (nodeRef.current as HTMLDivElement).style.height = 'auto';

    }

}
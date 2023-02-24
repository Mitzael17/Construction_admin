import React, {useRef} from 'react';
import {ErrorProps} from "../../types/components/messagesComponents";
import {CSSTransition} from "react-transition-group";

const Error = ({value, setValue, children}: ErrorProps) => {

    const nodeError = useRef(null);

    return (
        <CSSTransition nodeRef={nodeError} unmountOnExit timeout={500} in={value} className='error-container'>
            <div className='error-container' ref={nodeError}>
                <div className='error-content'>{children} <span onClick={() => setValue(false)}></span></div>
            </div>
        </CSSTransition>
    );
};

export default Error;
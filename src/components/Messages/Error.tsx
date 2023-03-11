import React, {useRef} from 'react';
import {ErrorProps} from "../../types/components/MessagesComponents";
import {CSSTransition} from "react-transition-group";

const Error = ({value, setValue = undefined, children}: ErrorProps) => {

    const nodeError = useRef(null);

    return (
        <CSSTransition nodeRef={nodeError} unmountOnExit timeout={500} in={value} >
            <div className='error-container' ref={nodeError}>
                <div className='error-content'>{children}
                    {setValue && <span onClick={() => setValue(false)}></span>}
                </div>
            </div>
        </CSSTransition>
    );
};

export default Error;
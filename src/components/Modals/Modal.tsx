import React, {useRef} from 'react';
import classes from "./Modals.module.scss";
import {ModalProps} from "../../types/components/ModalsComponents";
import {CSSTransition} from "react-transition-group";
const Modal = ({value, title, setValue, children}: ModalProps) => {

    const nodeRef = useRef(null);

    return (
        <CSSTransition nodeRef={nodeRef} in={value} unmountOnExit timeout={300}>
            <div ref={nodeRef} onClick={(event) => {

                if(event.target === event.currentTarget) setValue(false);

            } } className={`${classes.modalContainer} fade-container`}>
                <div className={classes.modal}>
                    <div className={classes.header}>
                        <h2>{title}</h2>
                        <div onClick={() => setValue(false)} className={classes.exitIcon}><span></span></div>
                    </div>
                    <div className={classes.content}>
                        {children}
                    </div>
                </div>
            </div>
        </CSSTransition>

    );

};

export default Modal;
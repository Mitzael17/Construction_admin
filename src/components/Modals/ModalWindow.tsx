import React, {useEffect, useRef} from 'react';
import classes from "./Modals.module.scss";
import {ModalProps} from "../../types/components/ModalsComponents";
import {CSSTransition} from "react-transition-group";
import {createPortal} from "react-dom";
import {useModal} from "../../hooks/useModal";
const ModalWindow = ({value, title, setValue, children, zIndex = 100}: ModalProps) => {

    const nodeRef = useRef(null);

    const [modalData, setModalData] = useModal();

    useEffect( () => {
        setModalData({title});
    }, []);

    return (
        createPortal(
            <CSSTransition nodeRef={nodeRef} in={value} unmountOnExit timeout={300}>
                <div style={{zIndex: zIndex}} ref={nodeRef} onClick={(event) => {

                    if(event.target === event.currentTarget) {

                        setValue(false);
                        if(modalData.onExit) modalData.onExit();

                    }

                } } className={`${classes.modalContainer} fade-container`}>
                    <div className={`${classes.modal} ${modalData.class ? modalData.class : ''}`}>
                        <div className={classes.header}>
                            <h2>{modalData.title}</h2>
                            <div onClick={() => {

                                setValue(false);
                                if(modalData.onExit) modalData.onExit();

                            }} className={classes.exitIcon}><span></span></div>
                        </div>
                        <div className={classes.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </CSSTransition>
            , document.body)
    );

};

export default ModalWindow;
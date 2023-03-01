import React, {useRef} from 'react';
import classes from "./Modals.module.scss";
import {ModalProps} from "../../types/components/ModalsComponents";
import {CSSTransition} from "react-transition-group";
import {createPortal} from "react-dom";
import ModalWindow from "./ModalWindow";
import ModalProvider from "../Providers/ModalProvider";
const Modal = ({value, title, setValue, children, zIndex = 100}: ModalProps) => {

    return (
        <ModalProvider>
            <ModalWindow title={title} value={value} setValue={setValue} zIndex={zIndex}>{children}</ModalWindow>
        </ModalProvider>
    );

};

export default Modal;
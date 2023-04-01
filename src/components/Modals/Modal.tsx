import React, {memo} from 'react';
import {ModalProps} from "../../types/components/ModalsComponents";
import ModalWindow from "./ModalWindow";
import ModalProvider from "../Providers/ModalProvider";
const Modal = memo(({value, title, setValue, children, zIndex = 100}: ModalProps) => {

    return (
        <ModalProvider>
            <ModalWindow title={title} value={value} setValue={setValue} zIndex={zIndex}>{children}</ModalWindow>
        </ModalProvider>
    );

});

export default Modal;
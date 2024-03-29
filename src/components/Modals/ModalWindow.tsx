import React, {memo, useEffect, useRef} from 'react';
import classes from "./Modals.module.scss";
import {ModalProps} from "../../types/components/ModalsComponents";
import {CSSTransition} from "react-transition-group";
import {createPortal} from "react-dom";
import {useModalContext} from "../../hooks/contextHooks/useModalContext";
import {useThemeContext} from "../../hooks/contextHooks/useThemeContext";
import {Themes} from "../../types/contexts/Themes";

const ModalWindow = memo(({value, title, setValue, children, zIndex = 100}: ModalProps) => {

    const nodeRef = useRef(null);

    const [theme] = useThemeContext();
    const [modalData, setModalData] = useModalContext();

    // The ref is necessary to block an accident click on the back area
    const blockedClick = useRef(false);

    useEffect(() => {

        if(value) document.documentElement.classList.add('blocked-scroll');
        else document.documentElement.classList.remove('blocked-scroll');

    }, [value]);


    useEffect( () => {
        setModalData({title});

        const unblockClick = () => {

            setTimeout(() => blockedClick.current = false, 10);

        }

        document.addEventListener('pointerup', unblockClick);

        return () => {
            document.removeEventListener('pointerup', unblockClick);
        }

    }, []);

    return (
        createPortal(
            <CSSTransition nodeRef={nodeRef} in={value} unmountOnExit timeout={300}>
                <div style={{zIndex: zIndex}} ref={nodeRef} onClick={(event) => {

                    if(event.target === event.currentTarget && !blockedClick.current) {

                        onExit();

                    }

                }}
                     className={`${classes.modalContainer} ${theme === Themes.light ? classes.light : classes.dark} fade-container customScroll`}
                >
                    <div
                        onPointerDown={() => {

                            blockedClick.current = true;

                        }}
                         className={`${classes.modal} ${modalData.class ? modalData.class : ''}`}>
                        <div className={`${classes.header} ${theme === Themes.light ? classes.light : classes.dark}`}>
                            <h2>{modalData.title}</h2>
                            <div onClick={onExit} className={classes.exitIcon}><span></span></div>
                        </div>
                        <div className={classes.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </CSSTransition>
            , document.body)
    );

    function onExit() {

        setValue(false);
        if(modalData.onExit) modalData.onExit();
        setModalData(prev => ({
            ...prev,
            class: undefined
        }));

    }

});

export default ModalWindow;
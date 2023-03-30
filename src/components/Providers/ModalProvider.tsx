import React, {useState} from 'react';
import {ModalChangeContext, ModalContext } from '../../context/ModalContext';
import {ModalContextValues} from "../../types/contexts/ModalContextValues";

const ModalProvider = ({children}: {children: any}) => {

    const [data, setData] = useState<ModalContextValues>({});

    return (
        <ModalContext.Provider value={data}>
        <ModalChangeContext.Provider value={setData}>
            {children}
        </ModalChangeContext.Provider>
        </ModalContext.Provider>
    );
};

export default ModalProvider;
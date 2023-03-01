import React, {useState} from 'react';
import {modalChangeContext, modalContext } from '../../context/modalContext';
import {ModalContextValues} from "../../types/contexts/ModalContextValues";

const ModalProvider = ({children}: {children: any}) => {

    const [data, setData] = useState<ModalContextValues>({});

    return (
        <modalContext.Provider value={data}>
        <modalChangeContext.Provider value={setData}>
            {children}
        </modalChangeContext.Provider>
        </modalContext.Provider>
    );
};

export default ModalProvider;
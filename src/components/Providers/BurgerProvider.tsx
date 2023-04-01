import React, {useState} from 'react';
import {BurgerChangeContext, BurgerContext} from "../../context/BurgerContext";

const BurgerProvider = ({children}: {children: JSX.Element}) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <BurgerContext.Provider value={isActive}>
            <BurgerChangeContext.Provider value={setIsActive}>
                {children}
            </BurgerChangeContext.Provider>
        </BurgerContext.Provider>
    );
};

export default BurgerProvider;
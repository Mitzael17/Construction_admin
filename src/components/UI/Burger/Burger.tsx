import React from 'react';
import classes from "./Burger.module.scss"
import {useBurgerContext} from "../../../hooks/contextHooks/useBurgerContext";
const Burger = () => {

    const [isActive, setIsActive] = useBurgerContext();

    return (
        <div
            onClick={() => setIsActive(prev => !prev)}
            className={`${classes.burger} ${isActive ? classes.active : ''}`}>
            <span></span>
        </div>
    );
};

export default Burger;
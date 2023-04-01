import React from 'react';
import classes from "./Burger.module.scss"
import {useBurger} from "../../../hooks/contextHooks/useBurger";
const Burger = () => {

    const [isActive, setIsActive] = useBurger();

    return (
        <div
            onClick={() => setIsActive(prev => !prev)}
            className={`${classes.burger} ${isActive ? classes.active : ''}`}>
            <span></span>
        </div>
    );
};

export default Burger;
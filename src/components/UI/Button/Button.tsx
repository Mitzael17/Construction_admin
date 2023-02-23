import React from 'react';
import {ButtonProps} from "../../../types/UIComponents";
import classes from "./Button.module.scss";

const Button = ({children, ...props}: ButtonProps) => {

    return (
        <button className={classes.button} {...props}>{children}</button>
    );
};

export default Button;
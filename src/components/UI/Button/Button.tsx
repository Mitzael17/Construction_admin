import React, {memo} from 'react';
import {ButtonProps} from "../../../types/components/UIComponents";
import classes from "./Button.module.scss";

const Button = memo(({children, ...props}: ButtonProps) => {

    return (
        <button className={classes.button} {...props}>{children}</button>
    );
});

export default Button;
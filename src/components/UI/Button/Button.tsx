import React, {memo} from 'react';
import {ButtonProps} from "../../../types/components/UIComponents";
import classes from "./Button.module.scss";

const Button = memo(({children, type = 'button', theme = 'dark', ...props}: ButtonProps) => {

    return (
        <button type={type} className={`${classes[theme]} ${classes.button}`} {...props} >{children}</button>
    );
});

export default Button;
import React, {memo} from 'react';
import {ButtonProps} from "../../../types/components/UIComponents";
import classes from "./Button.module.scss";
import {useTheme} from "../../../hooks/useTheme";
import {Themes} from "../../../types/contexts/Themes";

const Button = memo(({children, type = 'button', ...props}: ButtonProps) => {

    const [theme] = useTheme();

    return (
        <button
            type={type}
            className={`${classes.button} ${theme === Themes.dark ? classes.dark : classes.light}`}
            {...props}
        >
            <span>{children}</span>
        </button>
    );
});

export default Button;
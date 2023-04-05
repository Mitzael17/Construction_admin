import React, {ButtonHTMLAttributes, memo} from 'react';
import classes from "./Button.module.scss";
import {useThemeContext} from "../../../hooks/contextHooks/useThemeContext";
import {Themes} from "../../../types/contexts/Themes";

const Button = memo(({children, type = 'button', ...props}: ButtonHTMLAttributes<any>) => {

    const [theme] = useThemeContext();

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